import config from '@/config/config';
import { IAuthContext } from '@/context/AuthContext';
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
    { userAuth }: IAuthContext,
    endpoint: string,
    data?: TData,
): Promise<AxiosResponse<ApiResponse<TEntity> | undefined> | undefined> => {
    const tokenString = userAuth?.tokens?.idToken?.toString();
    return await axios.get<ApiResponse<TEntity> | undefined>(
        `${API_URL}${endpoint}`,
        {
            headers: getDefaultHeaders(tokenString),
            params: data,
        },
    );
};

export const putApi = async <TEntity = unknown, TBody = unknown>(
    { userAuth }: IAuthContext,
    endpoint: string,
    body: TBody,
): Promise<AxiosResponse<ApiResponse<TEntity> | undefined> | undefined> => {
    const tokenString = userAuth?.tokens?.idToken?.toString();
    return await axios.put<ApiResponse<TEntity> | undefined>(
        `${API_URL}${endpoint}`,
        body,
        {
            headers: getDefaultHeaders(tokenString),
        },
    );
};

export const postApi = async <TEntity = unknown, TBody = unknown>(
    { userAuth }: IAuthContext,
    endpoint: string,
    body: TBody,
): Promise<AxiosResponse<ApiResponse<TEntity> | undefined> | undefined> => {
    const tokenString = userAuth?.tokens?.idToken?.toString();
    return await axios.post<ApiResponse<TEntity> | undefined>(
        `${API_URL}${endpoint}`,
        body,
        {
            headers: getDefaultHeaders(tokenString),
        },
    );
};
