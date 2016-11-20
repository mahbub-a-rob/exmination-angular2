import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/Observable';
import { ResponseFactory } from '../factories/response.factory';
import { AuthorizationFactory } from '../factories/authorization.factory';
import { SessionFactory } from '../factories/session.factory';
declare var $;
@Injectable()
export class AuthenticationService {
    constructor(private http: HttpService) { }
    url = 'Api/Authentication';

    public onSignin(model: SigninModel): Observable<ResponseFactory> {
        return this.http.requestPut(this.url, model).do((res: ResponseFactory) => {
            if (res.Code == 200) this.onPushStorage(res);
        });
    }

    public onSignup(model: SignupModel): Observable<ResponseFactory> {
        return this.http.requestPost(this.url, model).do((res: ResponseFactory) => {
            if (res.Code == 200) this.onPushStorage(res);
        });
    }

    public onSignout(): void {
        this.http.requestDelete(this.url).subscribe();
    }

    protected onPushStorage(response: ResponseFactory): void {
        AuthorizationFactory.setAuthorization(response.Token);
        AuthorizationFactory.setMember(response.Data);
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