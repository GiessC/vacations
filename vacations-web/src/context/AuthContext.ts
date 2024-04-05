import type {
    ChangePasswordRequest,
    LoginRequest,
} from '@/providers/AuthProvider';
import { createContext } from 'react';

export interface IAuthContext {
    login: (_request: LoginRequest) => Promise<void>;
    changePassword: (_request: ChangePasswordRequest) => Promise<void>;
    logout: () => Promise<void>;
}

const DEFAULT_AUTH_CONTEXT: IAuthContext = {
    login: (_request: LoginRequest) => Promise.resolve(),
    changePassword: (_request: ChangePasswordRequest) => Promise.resolve(),
    logout: () => Promise.resolve(),
};

const AuthContext = createContext<IAuthContext>(DEFAULT_AUTH_CONTEXT);

export default AuthContext;
