import LoginForm, { LoginFormValues } from '@/components/auth/login/LoginForm';
import AlertContext from '@/context/AlertContext';
import AuthContext from '@/context/AuthContext';
import NewPasswordRequiredChallenge from '@/features/auth/challenges/NewPasswordRequiredChallenge';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login } = useContext(AuthContext);
    const { showAlert } = useContext(AlertContext);
    const navigate = useNavigate();

    useEffect(() => {
        showAlert('Test', 'testing', 'error');
    }, [showAlert]);

    const onSubmit = async (formValues: LoginFormValues) => {
        try {
            await login(formValues);
            navigate('/');
        } catch (error: unknown) {
            if (error instanceof NewPasswordRequiredChallenge) {
                console.info('User must change password. Redirecting...');
                navigate('/auth/change-password', {
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
            console.error(error);
            throw error;
        }
    };

    return (
        <div className='h-full w-full'>
            <LoginForm onSubmit={onSubmit} />
        </div>
    );
};

export default Login;
