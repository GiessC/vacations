import { ReactNode } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

export default interface FormViewProps<TFormValues extends FieldValues> {
    className?: string;
    form: UseFormReturn<TFormValues>;
    actionWrapper?: (_children: ReactNode) => ReactNode;
}
