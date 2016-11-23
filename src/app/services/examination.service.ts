import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/Observable';
import { ResponseFactory } from '../factories/response.factory';
import { SubjectModel } from './subject.service';

@Injectable()
export class ExaminationService {
    constructor(private http: HttpService) { }

    url: string = 'Api/Examination';

    details(): Observable<Array<ExaminationModel>> {
        return this.http.requestGet(this.url);
    }

    detail(id: number): Observable<ExaminationModel> {
        return this.http.requestGet(this.url + '/' + id);
    }

    detailSubject(id: number): Observable<ExaminationSubjectModel> {
        return this.http.requestGet(this.url + `/${id}?subject`);
    }

    create(model: ExaminationModel): Observable<ResponseFactory> {
        return this.http.requestPost(this.url, model);
    }

    update(id: number, model: ExaminationModel): Observable<ResponseFactory> {
        return this.http.requestPut(this.url + '/' + id, model);
    }

    delete(id: number, ): Observable<ResponseFactory> {
        return this.http.requestDelete(this.url + '/' + id);
    }
}

export class ExaminationModel {
    id: number;
    number: string;
    name: string;
    detail: string;
    status: number;
    created: string;
    updated: string;
    subject_id: number;
    member_id: number;
}

export class ExaminationSubjectModel {
    examination: ExaminationModel;
    subject: SubjectModel;
}