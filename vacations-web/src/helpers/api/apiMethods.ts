import config from '@/config/config';
import { IAuthContext } from '@/context/AuthContext';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import axios, { AxiosResponse } from 'axios';
import { ApiResponse } from '../../api/models/ApiResponse';

const API_URL = config.apiUrl;

export const getDefaultHeaders = (token?: string) => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    return headers;
};

export const getApi = async <TEntity = unknown, TData = unknown>(
    { user }: IAuthContext,
    endpoint: string,
    data?: TData,
): Promise<AxiosResponse<ApiResponse<TEntity> | undefined> | undefined> => {
    return new Promise((resolve) => {
        if (!user) {
            resolve(undefined);
            return;
        }
        user.getSession(
            async (_: Error | null, session: CognitoUserSession) => {
                const token = session?.getIdToken().getJwtToken();
                resolve(
                    await axios.get<ApiResponse<TEntity> | undefined>(
                        `${API_URL}${endpoint}`,
                        {
                            headers: getDefaultHeaders(token),
                            params: data,
                        },
                    ),
                );
            },
        );
    });
};

export const putApi = async <TResponse = unknown, TBody = unknown>(
    { user }: IAuthContext,
    endpoint: string,
    body: TBody,
): Promise<AxiosResponse<ApiResponse<TResponse> | undefined> | undefined> => {
    return new Promise((resolve) => {
        if (!user) {
            resolve(undefined);
            return;
        }
        user.getSession(
            async (_: Error | null, session: CognitoUserSession) => {
                const token = session?.getIdToken().getJwtToken();
                resolve(
                    await axios.put<ApiResponse<TResponse> | undefined>(
                        `${API_URL}${endpoint}`,
                        body,
                        {
                            headers: getDefaultHeaders(token),
                        },
                    ),
                );
            },
        );
    });
};

export const postApi = async <TResponse = unknown, TBody = unknown>(
    { user }: IAuthContext,
    endpoint: string,
    body: TBody,
): Promise<AxiosResponse<ApiResponse<TResponse> | undefined> | undefined> => {
    return new Promise((resolve) => {
        if (!user) {
            resolve(undefined);
            return;
        }
        user.getSession(
            async (_: Error | null, session: CognitoUserSession) => {
                const token = session?.getIdToken().getJwtToken();
                resolve(
                    await axios.post<ApiResponse<TResponse> | undefined>(
                        `${API_URL}${endpoint}`,
                        body,
                        {
                            headers: getDefaultHeaders(token),
                        },
                    ),
                );
            },
        );
    });
};
