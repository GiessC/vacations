import AuthContext, { IAuthContext } from '@/context/AuthContext';
import {
    AuthenticationDetails,
    CognitoUser,
    CognitoUserPool,
    CognitoUserSession,
    type IAuthenticationDetailsData,
    type ICognitoUserData,
} from 'amazon-cognito-identity-js';
import { PropsWithChildren, useMemo, useState } from 'react';
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
    return new Promise((resolve, reject) => {
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
        reject(new Error('No user to sign out.'));
    });
};

const AuthProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<CognitoUser | null>(null);

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
            login: async (request: LoginRequest) => {
                const response = await login(userPool, request);
                setUser(response.user);
                if (response.newPasswordRequired) {
                    throw new NewPasswordRequiredChallenge(request);
                }
            },
            changePassword: (request: ChangePasswordRequest) =>
                changePassword(request, user),
            logout: () => logout(userPool),
        };
    }, [user, userPool]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
