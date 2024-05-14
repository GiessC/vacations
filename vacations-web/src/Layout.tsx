import { PropsWithChildren } from 'react';
import Navbar from './components/common/navbar/Navbar';

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
};

export default Layout;
