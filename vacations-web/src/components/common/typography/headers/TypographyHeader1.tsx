import { TypographyProps } from '../Typography';

const TypographyHeader1 = ({
    className,
    children,
    ...props
}: Omit<TypographyProps, 'variant'>) => {
    return (
        <h1
            className={`${className} scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl`}
            {...props}
        >
            {children}
        </h1>
    );
};

export default TypographyHeader1;
