import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/Observable';
import { ResponseFactory } from '../factories/response.factory';
import { AuthorizationFactory } from '../factories/authorization.factory';
declare var $;
@Injectable()
export class AuthenticationService {
    constructor(private http: HttpService) { }

    public onSignin(): Observable<ResponseFactory> {
        return this.http.requestGet('Api/Authentication').do((res: ResponseFactory) => {
            if (res.Code == 200) AuthorizationFactory.setAuthorization(res.Token);
        });
    }

    public onSignup(model: SignupModel): Observable<ResponseFactory> {
        return this.http.requestPost('Api/Authentication', model).do((res: ResponseFactory) => {
            if (res.Code == 200) AuthorizationFactory.setAuthorization(res.Token);
        });
    }
}

export class SigninModel {
    email: string;
    password: string;
}

export class SignupModel {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
}