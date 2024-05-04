import React, { PropsWithoutRef } from 'react';
import TypographyHeader1 from './headers/TypographyHeader1';
import TypographyHeader2 from './headers/TypographyHeader2';
import TypographyHeader3 from './headers/TypographyHeader3';
import TypographyHeader4 from './headers/TypographyHeader4';
import TypographyParagraph from './headers/TypographyParagraph';

export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'p';

export interface TypographyProps
    extends PropsWithoutRef<React.HTMLProps<HTMLHeadingElement>> {
    variant?: TypographyVariant;
    children?: string;
}

const componentMap = ({ variant, children, ...props }: TypographyProps) => {
    switch (variant) {
        case 'h1':
            return <TypographyHeader1 {...props}>{children}</TypographyHeader1>;
        case 'h2':
            return <TypographyHeader2 {...props}>{children}</TypographyHeader2>;
        case 'h3':
            return <TypographyHeader3 {...props}>{children}</TypographyHeader3>;
        case 'h4':
            return <TypographyHeader4 {...props}>{children}</TypographyHeader4>;
        default:
            return (
                <TypographyParagraph {...props}>{children}</TypographyParagraph>
            );
    }
};

const defaultProps: TypographyProps = {
    variant: 'p',
    children: '',
};

const Typography = (props: TypographyProps = defaultProps) => {
    return componentMap(props);
};

export default Typography;
