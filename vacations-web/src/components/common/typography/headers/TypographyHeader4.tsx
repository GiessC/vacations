import { TypographyProps } from '../Typography';

const TypographyHeader4 = ({
    className,
    children,
    ...props
}: Omit<TypographyProps, 'variant'>) => {
    return (
        <h4
            className={`${className} scroll-m-20 text-xl font-semibold tracking-tight`}
            {...props}
        >
            {children}
        </h4>
    );
};

export default TypographyHeader4;
