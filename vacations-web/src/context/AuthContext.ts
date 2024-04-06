import type {
    ChangePasswordRequest,
    LoginRequest,
} from '@/providers/AuthProvider';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { createContext } from 'react';

export interface IAuthContext {
    user: CognitoUser | null;
    isValidating: boolean;
    login: (_request: LoginRequest) => Promise<void>;
    changePassword: (_request: ChangePasswordRequest) => Promise<void>;
    logout: () => Promise<void>;
}

const DEFAULT_AUTH_CONTEXT: IAuthContext = {
    user: null,
    isValidating: true,
    login: (_request: LoginRequest) => Promise.resolve(),
    changePassword: (_request: ChangePasswordRequest) => Promise.resolve(),
    logout: () => Promise.resolve(),
};

const AuthContext = createContext<IAuthContext>(DEFAULT_AUTH_CONTEXT);

export default AuthContext;
