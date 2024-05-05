import { type PropsWithChildren } from 'react';
import AlertProvider from './AlertProvider';
import AuthProvider from './AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const ignoreCodes = [400, 403, 404];

const getQueryClient = () => {
    return new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry(failureCount: number, error: Error) {
                    if (failureCount === 5) return false;
                    if (
                        error instanceof AxiosError &&
                        ignoreCodes.includes(error.response?.data?.statusCode)
                    ) {
                        return false;
                    }
                    return true;
                },
            },
        },
    });
};

const Providers = ({ children }: PropsWithChildren) => {
    return (
        <AuthProvider>
            <AlertProvider>
                <QueryClientProvider client={getQueryClient()}>
                    {children}
                </QueryClientProvider>
            </AlertProvider>
        </AuthProvider>
    );
};

export default Providers;
