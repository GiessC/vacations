import { Button } from '@/components/ui/button';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ControllerRenderProps } from '@/helpers/react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

export interface ChangePasswordFormValues {
    newPassword: string;
    confirmPassword: string;
}

const schema: z.Schema<ChangePasswordFormValues> = z
    .object({
        newPassword: z.string({
            required_error: 'New password is required.',
        }),
        confirmPassword: z.string({
            required_error: 'Confirm password is required.',
        }),
    })
    .refine(
        (data: ChangePasswordFormValues) => {
            return data.newPassword === data.confirmPassword;
        },
        {
            message: 'Passwords do not match.',
            path: ['confirmPassword'],
        },
    );

const defaultValues: ChangePasswordFormValues = {
    newPassword: '',
    confirmPassword: '',
};

export interface ChangePasswordFormProps {
    onSubmit: (_formValues: ChangePasswordFormValues) => void;
}

const ChangePasswordForm = ({ onSubmit }: ChangePasswordFormProps) => {
    const form = useForm<ChangePasswordFormValues>({
        defaultValues,
        mode: 'onBlur',
        resolver: zodResolver(schema),
    });
    const { isLoading, isDirty, isValid, isSubmitting } = form.formState;

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    name='newPassword'
                    defaultValue={defaultValues.newPassword}
                    render={({
                        field,
                    }: ControllerRenderProps<
                        ChangePasswordFormValues,
                        'newPassword'
                    >) => {
                        return (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type='password'
                                        placeholder='Password'
                                        {...field}
                                        required
                                    />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    name='confirmPassword'
                    defaultValue={defaultValues.confirmPassword}
                    render={({
                        field,
                    }: ControllerRenderProps<
                        ChangePasswordFormValues,
                        'confirmPassword'
                    >) => {
                        return (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type='password'
                                        placeholder='Confirm Password'
                                        {...field}
                                        required
                                    />
                                </FormControl>
                                <FormDescription />
                                <FormMessage>
                                    {
                                        form.formState.errors.confirmPassword
                                            ?.message
                                    }
                                </FormMessage>
                            </FormItem>
                        );
                    }}
                />
                <Button
                    type='submit'
                    disabled={!isDirty || !isValid || isLoading || isSubmitting}
                >
                    Login
                </Button>
            </form>
        </FormProvider>
    );
};

export default ChangePasswordForm;
