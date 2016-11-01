import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { AlertFactory } from './alert.factory';
import { AuthenticatedFactory } from './authenticated.factory';
import { IResponse } from '../interfaces/response.interface';

@Injectable()
export class HttpFactory {

    constructor(private http: Http) { }

    private domain: string = 'http://localhost:3000/';

    public requestGet(url: string): Observable<any> {
        let headers = new Headers();
        let options = new RequestOptions({ headers: this.requestHeader(headers) });
        return this.http.get(this.domain + url, options)
            .map(res => res.json())
            .do(this.requestError)
            .catch(this.handleError);
    }

    public requestCreate(url: string, data: Object): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: this.requestHeader(headers) });
        return this.http.post(this.domain + url, JSON.stringify(data), options)
            .map(res => res.json())
            .do(this.requestError)
            .catch(this.handleError);
    }

    public requestUpdate(url: string, data: Object): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: this.requestHeader(headers) });
        return this.http.put(this.domain + url, JSON.stringify(data), options)
            .map(res => res.json())
            .do(this.requestError)
            .catch(this.handleError);
    }

    public requestDelete(url: string): Observable<any> {
        let headers = new Headers();
        let options = new RequestOptions({ headers: this.requestHeader(headers) });
        return this.http.delete(this.domain + url, options)
            .map(res => res.json())
            .do(this.requestError)
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        let message = error.statusText != '' ? error.statusText : 'ไม่สามารถเชื่อมต่อกับ Server ได้กรุณาตรวจสอบ';
        AlertFactory.error(message || error['message']);
        return Observable.throw(error);
    }

    private requestHeader(headers: Headers) {
        if (AuthenticatedFactory.getAuthenticated != null) headers.append('Accept', AuthenticatedFactory.getAuthenticated);
        return headers;
    }

    private requestError(response: IResponse) {
        switch (response.code) {
            case 700:
                AlertFactory.warning(response.message);
                break;
        }
    }
}