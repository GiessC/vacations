import LoginForm, { LoginFormValues } from '@/components/auth/login/LoginForm';
import AuthContext from '@/context/AuthContext';
import NewPasswordRequiredChallenge from '@/features/auth/challenges/NewPasswordRequiredChallenge';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = async (formValues: LoginFormValues) => {
        try {
            await login(formValues);
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
            console.error(error);
            throw error;
        }
    };

    return (
        <div>
            <LoginForm onSubmit={onSubmit} />
        </div>
    );
};

export default Login;
