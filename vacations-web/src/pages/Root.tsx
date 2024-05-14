import Providers from '@/providers/Providers';
import { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
    return <Providers>{children}</Providers>;
};

export default Layout;
