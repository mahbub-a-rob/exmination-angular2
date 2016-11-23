import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { ResponseFactory } from '../factories/response.factory';
import { AlertFactory } from '../factories/alert.factory';
import { Url } from '../factories/url.factory';
import { AuthorizationFactory } from '../factories/authorization.factory';
declare let $;
@Injectable()
export class HttpService {

    // domain: string = 'http://localhost:9000/';
    domain: string = 'http://ttvone-cloud.eastasia.cloudapp.azure.com/';
    // domain: string = 'http://examination.ttvone.com/';
    // domain: string = 'http://localhost/';

    constructor(protected http: Http) { }

    public requestGet(url: string): Observable<any> {
        let headers = this.onHeaders();
        return this.http.get(this.domain + url, { headers })
            .map(this.onMapping)
            .catch(this.onError);
    }

    public requestPost(url: string, data: any): Observable<any> {
        let headers = this.onHeaders();
        return this.http.post(this.domain + url, JSON.stringify(data), { headers })
            .map(this.onMapping)
            .catch(this.onError);
    }

    public requestPut(url: string, data: any): Observable<any> {
        let headers = this.onHeaders();
        return this.http.put(this.domain + url, JSON.stringify(data), { headers })
            .map(this.onMapping)
            .catch(this.onError);
    }

    public requestDelete(url: string): Observable<any> {
        let headers = this.onHeaders();
        return this.http.delete(this.domain + url, { headers })
            .map(this.onMapping)
            .catch(this.onError);
    }

    protected onMapping(response: Response) {
        try {
            let responseObject: ResponseFactory = response.json();
            // apply token
            if (responseObject.Token)
                AuthorizationFactory.setAuthorization(responseObject.Token);
            return responseObject;
        }
        catch (e) {
            let responseError = new ResponseFactory();
            responseError.Code = 700;
            responseError.Message = response.text();
            responseError.Data = e;
            return responseError;
        }
    }

    protected onError(response: Response): Observable<Response> {
        let errorMessage: any;
        switch (response.status) {
            case 401: // authorization error
                let pathname = decodeURIComponent(location.pathname);
                // check signout path url
                if (pathname.indexOf(Url.Signout) == -1) {
                    errorMessage = response.json();
                    AlertFactory.alert('แจ้งเตือนไม่มีสิทธิ์เข้าถึงระบบ', errorMessage.Message);
                }
                break;
            case 405:
                AlertFactory.alert('แจ้งเตือนการเข้าถึงข้อมูลไม่ถูกต้อง', response.statusText);
                break;
            case 500:
                AlertFactory.alert('แจ้งเตือนเซิร์ฟเวอร์มีปัญหา', response.statusText);
                break;
            case 0:
                AlertFactory.alert('แจ้งเตือนจากการเชื่อมต่อ', 'ไม่สามารถเชื่อมต่อกับ Server ได้อาจจะมาจาก Server ได้ทำการปิดปรับปรุงระบบใหม่ให้ทำงานดีขึ้น');
                break;
        }
        return Observable.throw(response);
    }

    protected onHeaders() {
        let headers = new Headers();
        let authorization = AuthorizationFactory.getAuthorization;
        if (authorization) headers.append('Authorization', authorization);
        headers.append('Content-Type', 'application/json');
        return headers;
    }
}