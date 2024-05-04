import { type PropsWithChildren } from 'react';
import AlertProvider from './AlertProvider';
import AuthProvider from './AuthProvider';

const Providers = ({ children }: PropsWithChildren) => {
    return (
        <AuthProvider>
            <AlertProvider>{children}</AlertProvider>
        </AuthProvider>
    );
};

export default Providers;
