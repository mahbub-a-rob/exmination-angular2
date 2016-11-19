import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/Observable';
import { ResponseFactory } from '../factories/response.factory';
declare var $;
@Injectable()
export class AuthenticationService {
    constructor(private http: HttpService) { }

    public onSignin(): Observable<ResponseFactory> {
        return this.http.requestGet('/api/authentication');
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
}