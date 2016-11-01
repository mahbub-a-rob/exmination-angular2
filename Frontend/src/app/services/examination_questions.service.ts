import { Injectable } from "@angular/core";
import { HttpFactory } from '../factories/http.factory';
import { examinations } from './exminations.service';
import { Observable } from 'rxjs/Observable';

export class examination_questions {

    question_id: number;
    question_topic: string;
    question_detail: string;
    question_file: string;
    question_created: string;
    question_updated: string;
    exam_id: number;

}

export class IExamination_questions {
    questions: Array<examination_questions>;
    examinations: Array<examinations>;
}

@Injectable()
export class ExaminationQeustionService {
    constructor(private http: HttpFactory) { }

    domain: string = 'examination_questions';

    get get(): Observable<IExamination_questions> {
        return this.http.requestGet(this.domain);
    }
}