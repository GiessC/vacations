import { z } from 'zod';

export interface IConfig {
    userPoolId: string;
    clientId: string;
}

const config: IConfig = {
    userPoolId: import.meta.env.VITE_COGNITO_POOL_ID ?? '',
    clientId: import.meta.env.VITE_COGNITO_CLIENT_ID ?? '',
};

const validate = (config: IConfig): IConfig => {
    const schema = z.object({
        userPoolId: z.string({
            required_error: 'Username is required.',
        }),
        clientId: z.string({
            required_error: 'Password is required.',
        }),
    });
    return schema.parse(config);
};

export default validate(config);
