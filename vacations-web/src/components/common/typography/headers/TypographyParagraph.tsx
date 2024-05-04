import { TypographyProps } from '../Typography';

const TypographyParagraph = ({
    className,
    children,
    ...props
}: Omit<TypographyProps, 'variant'>) => {
    return (
        <p
            className={`${className} leading-7 [&:not(:first-child)]:mt-6`}
            {...props}
        >
            {children}
        </p>
    );
};

export default TypographyParagraph;
