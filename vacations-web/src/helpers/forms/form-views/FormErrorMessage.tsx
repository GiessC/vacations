import { FormMessage } from '@/components/ui/form';
import { Merge, type FieldError } from 'react-hook-form';

export interface FormErrorMessageProps {
    error?: FieldError | Merge<FieldError, (FieldError | undefined)[]>;
}

const FormErrorMessage = ({ error }: FormErrorMessageProps) => {
    return <>{error && <FormMessage>{error.message}</FormMessage>}</>;
};

export default FormErrorMessage;
