import {
    Button as BaseButton,
    ButtonProps as BaseButtonProps,
} from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends BaseButtonProps {
    isLoading?: boolean;
}

const Button = ({ children, isLoading = false, ...props }: ButtonProps) => {
    return (
        <BaseButton
            {...props}
            disabled={isLoading}
        >
            {isLoading && <Loader2 className='mr-2 w-4 h-4 animate-spin' />}
            {children}
        </BaseButton>
    );
};

export default Button;
