import LoginForm, { LoginFormValues } from '@/components/auth/login/LoginForm';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AlertContext from '@/context/AlertContext';
import AuthContext from '@/context/AuthContext';
import NewPasswordRequiredChallenge from '@/features/auth/challenges/NewPasswordRequiredChallenge';
import RoutePath from '@/types/enums/RoutePath';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { signIn } = useContext(AuthContext);
    const { showAlert } = useContext(AlertContext);
    const navigateTo = useNavigate();

    const onSubmit = async (formValues: LoginFormValues) => {
        try {
            await signIn(formValues.username, formValues.password);
            navigateTo(RoutePath.ROOT);
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof NewPasswordRequiredChallenge) {
                console.info('User must change password. Redirecting...');
                navigateTo(RoutePath.CONFIRM_NEW_PASSWORD, {
                    state: {
                        loginRequest: formValues,
                    },
                });
                return;
            }
            if (error instanceof Error) {
                showAlert(
                    'Error occurred while logging in',
                    error.message,
                    'error',
                );
                return;
            }
            throw error;
        }
    };

    return (
        <div className='flex flex-col h-full w-full'>
            <Card className='m-auto w-1/2'>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                        Please enter your username and password.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm onSubmit={onSubmit} />
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
