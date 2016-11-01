import { Injectable } from '@angular/core';
import { HttpFactory } from '../factories/http.factory';
import { examination_types } from './examination_types.service';
export class IExaminations {
    types: Array<examination_types>;
    examinations: Array<examinations>;
}

export class examinations {

    exam_id: number;
    exam_name: string;
    exam_detail: string;
    exam_choice: number;
    exam_created: string;
    exam_updated: string;
    types_id: number;
    mem_id: number;

}


@Injectable()
export class ExaminationService {
    constructor(private http: HttpFactory) { }

    domain: string = 'examinations';

    get all() {
        return this.http.requestGet(this.domain);
    }

    allTypes(types_id: number) {
        return this.http.requestGet(this.domain + '?types_id=' + types_id);
    }

    create(model: examinations) {
        return this.http.requestCreate(this.domain, model);
    }

    update(exam_id: number, model: examinations) {
        return this.http.requestUpdate(this.domain + '/' + exam_id, model);
    }

    remove(exam_id: number) {
        return this.http.requestDelete(this.domain + '/' + exam_id);
    }
}