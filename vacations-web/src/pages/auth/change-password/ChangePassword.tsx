import ChangePasswordForm, {
    ChangePasswordFormValues,
} from '@/components/auth/change-password/ChangePasswordForm';
import AuthContext from '@/context/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const convertToRequest = ({ newPassword }: ChangePasswordFormValues) => {
    return {
        newPassword,
    };
};

const ChangePassword = () => {
    const { changePassword } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = async (formValues: ChangePasswordFormValues) => {
        try {
            const request = convertToRequest(formValues);
            await changePassword(request);
            navigate('/');
        } catch (error: unknown) {
            console.error(error);
            throw error;
        }
    };

    return (
        <div>
            <ChangePasswordForm onSubmit={onSubmit} />
        </div>
    );
};

export default ChangePassword;
