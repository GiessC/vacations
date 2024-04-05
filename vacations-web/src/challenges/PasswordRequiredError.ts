import { LoginRequest } from '../../../providers/AuthProvider';

export default class NewPasswordRequiredError extends Error {
    private readonly _loginRequest: LoginRequest;

    constructor(loginRequest: LoginRequest) {
        super('A new password is required.');
        this._loginRequest = loginRequest;
    }

    public get loginRequest(): LoginRequest {
        return this._loginRequest;
    }
}
