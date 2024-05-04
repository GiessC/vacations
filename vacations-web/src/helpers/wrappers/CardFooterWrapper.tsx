import { CardFooter } from '@/components/ui/card';
import { type ReactNode } from 'react';

const CardFooterWrapper = (children: ReactNode) => (
    <CardFooter>{children}</CardFooter>
);

export default CardFooterWrapper;
