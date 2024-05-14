import { Amplify } from 'aws-amplify';

export const configureAmplify = () => {
    Amplify.configure({
        Auth: {
            Cognito: {
                userPoolId: import.meta.env.VITE_COGNITO_POOL_ID ?? '',
                userPoolClientId: import.meta.env.VITE_COGNITO_CLIENT_ID ?? '',
                userPoolEndpoint: import.meta.env.VITE_COGNITO_ENDPOINT ?? '',
                loginWith: {
                    oauth: {
                        domain: import.meta.env.VITE_COGNITO_ENDPOINT ?? '',
                        responseType: 'code',
                        scopes: ['openid'],
                        redirectSignIn: [
                            import.meta.env.VITE_COGNITO_REDIRECT_SIGN_IN ?? '',
                        ],
                        redirectSignOut: [
                            import.meta.env.VITE_COGNITO_REDIRECT_SIGN_OUT ??
                                '',
                        ],
                    },
                },
            },
        },
    });
};
