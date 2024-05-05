import { z } from 'zod';

export interface IConfig {
    userPoolId: string;
    clientId: string;
    apiUrl: string;
}

const config: IConfig = {
    userPoolId: import.meta.env.VITE_COGNITO_POOL_ID ?? '',
    clientId: import.meta.env.VITE_COGNITO_CLIENT_ID ?? '',
    apiUrl: import.meta.env.VITE_API_URL ?? '',
};

const validate = (config: IConfig): IConfig => {
    const schema = z.object({
        userPoolId: z
            .string({
                required_error: 'Username is required.',
            })
            .min(1, { message: 'Username is required.' }),
        clientId: z
            .string({
                required_error: 'Password is required.',
            })
            .min(1, { message: 'Password is required.' }),
        apiUrl: z
            .string({
                required_error: 'API URL is required.',
            })
            .min(1, { message: 'API URL is required.' }),
    });
    return schema.parse(config);
};

export default validate(config);
