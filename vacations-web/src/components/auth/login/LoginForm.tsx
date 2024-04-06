import { Button } from '@/components/ui/button';
import {
    Form,
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
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

export interface LoginFormValues extends FieldValues {
    username: string;
    password: string;
}

const defaultValues: LoginFormValues = {
    username: '',
    password: '',
};

export interface LoginFormProps {
    onSubmit: SubmitHandler<LoginFormValues>;
}

const schema: z.Schema<LoginFormValues> = z.object({
    username: z
        .string({
            required_error: 'Username is required.',
        })
        .min(1, { message: 'Username is required.' }),
    password: z
        .string({
            required_error: 'Password is required.',
        })
        .min(1, { message: 'Password is required.' }),
});

const LoginForm = ({ onSubmit }: LoginFormProps) => {
    const form = useForm<LoginFormValues>({
        defaultValues,
        mode: 'onBlur',
        resolver: zodResolver(schema),
    });
    const { handleSubmit, formState } = form;
    const { isLoading, isDirty, isValid, isSubmitting } = formState;

    console.log(isLoading, isDirty, isValid, isSubmitting);

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormField
                    name='username'
                    defaultValue={defaultValues.username}
                    render={({
                        field,
                    }: ControllerRenderProps<LoginFormValues, 'username'>) => {
                        return (
                            <FormItem>
                                <FormLabel />
                                <FormControl>
                                    <Input
                                        type='text'
                                        placeholder='Username'
                                        required
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    name='password'
                    defaultValue={defaultValues.password}
                    render={({
                        field,
                    }: ControllerRenderProps<LoginFormValues, 'password'>) => {
                        return (
                            <FormItem>
                                <FormLabel />
                                <FormControl>
                                    <Input
                                        type='password'
                                        placeholder='Password'
                                        required
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
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
        </Form>
    );
};

export default LoginForm;
