import { PropsWithChildren } from 'react';
import AuthProvider from './providers/AuthProvider';

const Providers = ({ children }: PropsWithChildren) => {
    return <AuthProvider>{children}</AuthProvider>;
};

export default Providers;
