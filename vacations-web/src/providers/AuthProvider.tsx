import AuthContext, { IAuthContext } from '@/context/AuthContext';
import NewPasswordRequiredChallenge from '@/features/auth/challenges/NewPasswordRequiredChallenge';
import { Hub } from 'aws-amplify/utils';
import {
    type AuthTokens,
    signIn as authSignIn,
    signOut as authSignOut,
    confirmSignIn,
    fetchAuthSession,
} from 'aws-amplify/auth';
import {
    PropsWithChildren,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import LoadingIndicator from '@/components/common/loadingIndicator/LoadingIndicator';

export type UserAuth = {
    userId: string | undefined;
    username: string | undefined;
    tokens: AuthTokens | undefined;
};

const AuthProvider = ({ children }: PropsWithChildren) => {
    const [userAuth, setUserAuth] = useState<UserAuth | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isValidating, setIsValidating] = useState<boolean>(true);

    const getUserAuth = useCallback(async (): Promise<UserAuth | undefined> => {
        try {
            const session = await getSession();
            const user: UserAuth = {
                userId: session?.userSub,
                username: session?.tokens?.idToken?.payload?.[
                    'cognito:username'
                ] as string,
                tokens: session?.tokens,
            };
            return user;
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        const removeHubListener = Hub.listen('auth', async ({ payload }) => {
            const { event } = payload;
            if (event === 'signedIn') {
                const user = await getUserAuth();
                setUserAuth(user ?? null);
                setIsAuthenticated(true);
            }
            if (event === 'signedOut') {
                setUserAuth(null);
                setIsAuthenticated(false);
            }
            setIsValidating(false);
        });

        return () => {
            removeHubListener();
        };
    }, [getUserAuth]);

    useEffect(() => {
        const verifySession = async () => {
            try {
                const session = await getUserAuth();
                if (session) {
                    setUserAuth(session);
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error(error);
                setIsAuthenticated(false);
            } finally {
                setIsValidating(false);
            }
        };

        verifySession();
    }, [getUserAuth]);

    const signIn = useCallback(
        async (username: string, password: string) => {
            try {
                const response = await authSignIn({
                    username,
                    password,
                });
                if (
                    response.nextStep.signInStep ===
                    'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED'
                ) {
                    throw new NewPasswordRequiredChallenge(username, password);
                }
                if (response.isSignedIn) {
                    console.log('User signed in');
                    const user = await getUserAuth();
                    console.log('User:', user);
                    setUserAuth(user ?? null);
                }
                setIsValidating(false);
            } catch (error) {
                console.error(error);
            }
        },
        [getUserAuth],
    );

    const signOut = useCallback(async () => {
        try {
            await authSignOut({
                global: true,
            });
        } catch (error) {
            console.error(error);
            await authSignOut();
        }
    }, []);

    const confirmNewPassword = async (newPassword: string) => {
        try {
            await confirmSignIn({ challengeResponse: newPassword });
        } catch (error) {
            console.error(error);
        }
    };

    const getSession = async () => {
        try {
            return await fetchAuthSession({
                forceRefresh: true,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const context = useMemo<IAuthContext>(
        () => ({
            userAuth,
            isValidating,
            isAuthenticated,
            signIn,
            signOut,
            confirmNewPassword,
        }),
        [userAuth, isValidating, isAuthenticated, signIn, signOut],
    );

    if (isValidating) {
        return (
            <div className='w-full h-full flex justify-center'>
                <LoadingIndicator className='m-auto w-24 h-24' />
            </div>
        );
    }

    return (
        <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
