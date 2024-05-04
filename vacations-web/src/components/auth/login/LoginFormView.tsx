import { Button } from '@/components/ui/button';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import FormErrorMessage from '@/helpers/forms/form-views/FormErrorMessage';
import type FormViewProps from '@/helpers/forms/form-views/FormViewProps';
import defaultActionWrapper from '@/helpers/forms/form-views/defaultActionWrapper';
import { type ControllerRenderProps } from '@/helpers/react-hook-form';
import { type LoginFormValues } from './LoginForm';

const LoginFormView = ({
    className = '',
    form,
    actionWrapper: withWrapper = defaultActionWrapper,
}: FormViewProps<LoginFormValues>) => {
    const { formState, control } = form;
    const { errors, isDirty, isValid, isLoading, isSubmitting } = formState;

    return (
        <div className={`space-y-2 ${className}`}>
            <FormField
                control={control}
                name='username'
                render={({
                    field,
                }: ControllerRenderProps<LoginFormValues, 'username'>) => {
                    return (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Username'
                                    required
                                    {...field}
                                />
                            </FormControl>
                            <FormErrorMessage error={errors.username} />
                        </FormItem>
                    );
                }}
            />
            <FormField
                name='password'
                control={control}
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
                            <FormErrorMessage error={errors.password} />
                        </FormItem>
                    );
                }}
            />
            {withWrapper(
                <Button
                    type='submit'
                    disabled={!isDirty || !isValid || isLoading || isSubmitting}
                >
                    Login
                </Button>,
            )}
        </div>
    );
};

export default LoginFormView;
