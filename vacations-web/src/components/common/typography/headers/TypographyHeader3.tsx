import { TypographyProps } from '../Typography';

const TypographyHeader3 = ({
    className,
    children,
    ...props
}: Omit<TypographyProps, 'variant'>) => {
    return (
        <h3
            className={`${className} scroll-m-20 text-2xl font-semibold tracking-tight`}
            {...props}
        >
            {children}
        </h3>
    );
};

export default TypographyHeader3;
