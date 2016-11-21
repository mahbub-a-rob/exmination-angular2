import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/Observable';
import { ResponseFactory } from '../factories/response.factory';
@Injectable()
export class SubjectService {
    constructor(private http: HttpService) { }


    public url: string = 'Api/Subject';

    details(): Observable<Array<SubjectModel>> {
        return this.http.requestGet(this.url);
    }

    detail(id: number): Observable<SubjectModel> {
        return this.http.requestGet(this.url + '/' + id);
    }

    create(model: SubjectModel): Observable<ResponseFactory> {
        return this.http.requestPost(this.url, model);
    }

    update(id: number, model: SubjectModel): Observable<ResponseFactory> {
        return this.http.requestPut(this.url + '/' + id, model);
    }

    delete(id: number): Observable<ResponseFactory> {
        return this.http.requestDelete(this.url + '/' + id);
    }
}

export class SubjectModel {
    id: number;
    name: string;
    detail: string;
    created: string;
    updated: string;
    member_id: string;
}    