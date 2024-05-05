import { zodResolver } from '@hookform/resolvers/zod';
import type { DefaultValues, FieldValues, UseFormProps } from 'react-hook-form';
import { z } from 'zod';

export const defaultFormConfig = <TFormValues extends FieldValues>(
    schema: z.ZodType<TFormValues, z.ZodTypeDef, TFormValues>,
    defaultValues?: DefaultValues<TFormValues> | undefined,
): UseFormProps<TFormValues> => ({
    defaultValues,
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(schema),
});
