import ChangePasswordForm, {
    ChangePasswordFormValues,
} from '@/components/auth/change-password/ChangePasswordForm';
import AuthContext from '@/context/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const ConfirmNewPassword = () => {
    const { confirmNewPassword } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = async (formValues: ChangePasswordFormValues) => {
        try {
            await confirmNewPassword(formValues.newPassword);
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

export default ConfirmNewPassword;
