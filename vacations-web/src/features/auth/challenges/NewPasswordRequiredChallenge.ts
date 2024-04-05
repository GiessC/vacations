import { LoginRequest } from '../../../providers/AuthProvider';

export default class NewPasswordRequiredChallenge {
    private readonly _loginRequest: LoginRequest;

    constructor(loginRequest: LoginRequest) {
        this._loginRequest = loginRequest;
    }

    public get loginRequest(): LoginRequest {
        return this._loginRequest;
    }
}
