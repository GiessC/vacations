import { UserAuth } from '@/providers/AuthProvider';
import { createContext } from 'react';

export interface IAuthContext {
    userAuth: UserAuth | null;
    isValidating: boolean;
    isAuthenticated: boolean;
    signIn: (_password: string, _newPassword: string) => Promise<void>;
    signOut: () => Promise<void>;
    confirmNewPassword: (_newPassword: string) => Promise<void>;
}

const DEFAULT_AUTH_CONTEXT: IAuthContext = {
    userAuth: null,
    isValidating: true,
    isAuthenticated: false,
    signIn: (_password: string, _newPassword: string) => {
        throw new Error('AuthProvider not initialized.');
    },
    signOut: () => {
        throw new Error('AuthProvider not initialized.');
    },
    confirmNewPassword: (_newPassword: string) => {
        throw new Error('AuthProvider not initialized.');
    },
};

const AuthContext = createContext<IAuthContext>(DEFAULT_AUTH_CONTEXT);

export default AuthContext;
