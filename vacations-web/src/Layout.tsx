import { PropsWithChildren } from 'react';
import Navbar from './components/common/Navbar';
import AlertProvider from './providers/AlertProvider';
import AuthProvider from './providers/AuthProvider';

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <AuthProvider>
            <AlertProvider>
                <Navbar />
                {children}
            </AlertProvider>
        </AuthProvider>
    );
};

export default Layout;
