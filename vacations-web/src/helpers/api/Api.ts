import config from '@/config/config';
import { IAuthContext } from '@/context/AuthContext';
import axios, { AxiosResponse } from 'axios';
import { ApiResponse } from '../../api/models/ApiResponse';

export default class Api {
    private static readonly URL = config.apiUrl;

    public static async Get<TEntity = unknown, TData = unknown>(
        { userAuth }: IAuthContext,
        endpoint: string,
        data?: TData,
    ): Promise<AxiosResponse<ApiResponse<TEntity> | undefined> | undefined> {
        const tokenString = userAuth?.tokens?.idToken?.toString();
        return await axios.get<ApiResponse<TEntity> | undefined>(
            `${Api.URL}${endpoint}`,
            {
                headers: Api.GetDefaultHeaders(tokenString),
                params: data,
            },
        );
    }

    public static async Put<TEntity = unknown, TBody = unknown>(
        { userAuth }: IAuthContext,
        endpoint: string,
        body: TBody,
    ): Promise<AxiosResponse<ApiResponse<TEntity> | undefined> | undefined> {
        const tokenString = userAuth?.tokens?.idToken?.toString();
        return await axios.put<ApiResponse<TEntity> | undefined>(
            `${Api.URL}${endpoint}`,
            body,
            {
                headers: Api.GetDefaultHeaders(tokenString),
            },
        );
    }

    public static async Post<TEntity = unknown, TBody = unknown>(
        { userAuth }: IAuthContext,
        endpoint: string,
        body: TBody,
    ): Promise<AxiosResponse<ApiResponse<TEntity> | undefined> | undefined> {
        const tokenString = userAuth?.tokens?.idToken?.toString();
        return await axios.post<ApiResponse<TEntity> | undefined>(
            `${Api.URL}${endpoint}`,
            body,
            {
                headers: Api.GetDefaultHeaders(tokenString),
            },
        );
    }

    public static async Delete<TEntity = unknown>(
        { userAuth }: IAuthContext,
        endpoint: string,
    ): Promise<AxiosResponse<ApiResponse<TEntity> | undefined> | undefined> {
        const tokenString = userAuth?.tokens?.idToken?.toString();
        return await axios.delete<ApiResponse<TEntity> | undefined>(
            `${Api.URL}${endpoint}`,
            {
                headers: Api.GetDefaultHeaders(tokenString),
            },
        );
    }

    public static GetDefaultHeaders(token?: string): Record<string, string> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        return headers;
    }
}
