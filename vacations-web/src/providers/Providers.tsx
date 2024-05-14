import AlertProvider from './AlertProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { PropsWithChildren } from 'react';
import AuthProvider from './AuthProvider';

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
        <QueryClientProvider client={getQueryClient()}>
            <AlertProvider>
                <AuthProvider>{children}</AuthProvider>
            </AlertProvider>
        </QueryClientProvider>
    );
};

export default Providers;
