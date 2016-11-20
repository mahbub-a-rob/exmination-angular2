import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { ResponseFactory } from '../factories/response.factory';
import { AlertFactory } from '../factories/alert.factory';
declare let $;
@Injectable()
export class HttpService {

    domain: string = 'http://localhost:9000/';
    // domain: string = 'http://ttvone.eastasia.cloudapp.azure.com/';

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
            return response.json();
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
                errorMessage = response.json();
                AlertFactory.alert(response.statusText, errorMessage.Message);
                break;
            case 405:
                errorMessage = response.json();
                AlertFactory.alert(response.statusText, errorMessage.Message);
                break;
            case 500:
                break;
            default:
                AlertFactory.alert('การเชื่อมต่อขัดข้อง', 'ไม่สามารถเชื่อมต่อกับ Server ได้อาจจะมาจาก Server ได้ทำการปิดปรับปรุงระบบใหม่ให้ทำงานดีขึ้น');
                break;
        }
        return Observable.throw(response);
    }

    protected onHeaders() {
        let headers = new Headers();
        headers.append('content-type', 'application/json');
        return headers;
    }
}