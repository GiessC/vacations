import { Button, type ButtonProps } from '@/components/ui/button';

const IconButton = ({ className, children, ...props }: ButtonProps) => {
    return (
        <Button
            {...props}
            className={`p-0 ${className}`}
            size='icon'
        >
            {children}
        </Button>
    );
};

export default IconButton;
