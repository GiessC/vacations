import { Form } from '@/components/ui/form';
import { defaultFormConfig } from '@/helpers/forms/defaultFormConfig';
import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import LoginFormView from './LoginFormView';

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
    username: z.string().min(1),
    password: z.string().min(1),
});

const LoginForm = ({ onSubmit }: LoginFormProps) => {
    const form = useForm<LoginFormValues>(
        defaultFormConfig(schema, defaultValues),
    );
    const { handleSubmit } = form;

    return (
        <Form {...form}>
            <form
                className='space-y-8'
                onSubmit={handleSubmit(onSubmit)}
            >
                <LoginFormView form={form} />
            </form>
        </Form>
    );
};

export default LoginForm;
