import { PropsWithChildren } from 'react';
import Navbar from './components/common/navbar/Navbar';
import Providers from './providers/Providers';

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <Providers>
            <Navbar />
            {children}
        </Providers>
    );
};

export default Layout;
