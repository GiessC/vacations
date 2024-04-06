import AuthContext, { IAuthContext } from '@/context/AuthContext';
import {
    AuthenticationDetails,
    CognitoUser,
    CognitoUserPool,
    CognitoUserSession,
    type IAuthenticationDetailsData,
    type ICognitoUserData,
} from 'amazon-cognito-identity-js';
import {
    PropsWithChildren,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config/config';
import NewPasswordRequiredChallenge from '../features/auth/challenges/NewPasswordRequiredChallenge';

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    user: CognitoUser;
    newPasswordRequired: boolean;
    session?: CognitoUserSession;
    userAttributes?: Record<string, string>;
}

const login = (
    userPool: CognitoUserPool,
    request: LoginRequest,
): Promise<LoginResponse> => {
    const { username, password } = request;
    return new Promise((resolve, reject) => {
        const userConfig: ICognitoUserData = {
            Pool: userPool,
            Username: username,
        };
        const user = new CognitoUser(userConfig);
        const authenticationData: IAuthenticationDetailsData = {
            Username: username,
            Password: password,
        };
        const authenticationDetails = new AuthenticationDetails(
            authenticationData,
        );
        user.authenticateUser(authenticationDetails, {
            onSuccess: (session: CognitoUserSession) => {
                resolve({ user, session, newPasswordRequired: false });
            },
            onFailure: (error: unknown) => {
                reject(error);
            },
            newPasswordRequired: () => {
                resolve({ user, newPasswordRequired: true });
            },
        });
    });
};

export interface ChangePasswordRequest {
    newPassword: string;
}

const changePassword = (
    { newPassword }: ChangePasswordRequest,
    user: CognitoUser | null,
    userAttributes?: Record<string, string>,
): Promise<void> => {
    return new Promise((resolve, reject) => {
        user?.completeNewPasswordChallenge(newPassword, userAttributes, {
            onSuccess: () => {
                resolve();
            },
            onFailure: (error: unknown) => {
                reject(error);
            },
        });
    });
};

const logout = (userPool: CognitoUserPool): Promise<void> => {
    return new Promise((resolve) => {
        const user = userPool.getCurrentUser();
        if (user) {
            user.globalSignOut({
                onSuccess: () => {
                    user.signOut();
                    resolve();
                },
                onFailure: () => {
                    user.signOut();
                    resolve();
                },
            });
        }
        resolve();
    });
};

const AuthProvider = ({ children }: PropsWithChildren) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<CognitoUser | null>(null);
    const [isValidating, setIsValidating] = useState<boolean>(true);

    const userPool = useMemo<CognitoUserPool>(() => {
        if (config.userPoolId || config.clientId) {
            return new CognitoUserPool({
                UserPoolId: config.userPoolId,
                ClientId: config.clientId,
            });
        }
        throw new Error('User pool ID and client ID are required.');
    }, []);

    const contextValue = useMemo<IAuthContext>(() => {
        return {
            user,
            isValidating,
            login: async (request: LoginRequest) => {
                const response = await login(userPool, request);
                setUser(response.user);
                if (response.newPasswordRequired) {
                    throw new NewPasswordRequiredChallenge(request);
                }
            },
            changePassword: (request: ChangePasswordRequest) =>
                changePassword(request, user),
            logout: async () => {
                await logout(userPool);
                setUser(null);
            },
        };
    }, [isValidating, user, userPool]);

    const isValidSession = useCallback(
        (user: CognitoUser): Promise<boolean> => {
            if (!user) return Promise.resolve(false);
            return new Promise((resolve, reject) => {
                user.getSession(
                    (
                        error: Error | null,
                        session: CognitoUserSession | null,
                    ) => {
                        if (error) {
                            reject(error);
                            return;
                        }
                        if (!session) {
                            resolve(false);
                            return;
                        }
                        resolve(session.isValid());
                    },
                );
            });
        },
        [],
    );

    const tryGetUser = useCallback(() => {
        const user = userPool.getCurrentUser();
        if (user) {
            return user;
        }
        return null;
    }, [userPool]);

    const onUnauthenticated = useCallback(() => {
        navigate('/auth/login');
    }, [navigate]);

    const onAuthenticated = useCallback(() => {
        navigate('/');
    }, [navigate]);

    useEffect(() => {
        setIsValidating(true);

        const validateSession = async () => {
            const currentUser = user ?? tryGetUser();
            if (!currentUser) {
                onUnauthenticated();
                return;
            }
            const isValid = await isValidSession(currentUser);
            setUser(currentUser);
            if (!isValid) {
                onUnauthenticated();
                return;
            }
            onAuthenticated();
        };

        validateSession().finally(() => {
            setIsValidating(false);
        });
    }, [isValidSession, onAuthenticated, onUnauthenticated, tryGetUser, user]);

    return (
        <AuthContext.Provider value={contextValue}>
            {isValidating ? <div>Validating session...</div> : children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
