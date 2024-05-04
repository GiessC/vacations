import { TypographyProps } from '../Typography';

const TypographyHeader2 = ({
    className,
    children,
    ...props
}: Omit<TypographyProps, 'variant'>) => {
    return (
        <h2
            className={`${className} scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0`}
            {...props}
        >
            {children}
        </h2>
    );
};

export default TypographyHeader2;
