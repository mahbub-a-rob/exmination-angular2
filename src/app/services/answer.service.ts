import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/Observable';
import { ResponseFactory } from '../factories/response.factory';
@Injectable()
export class AnswerService {
	constructor(private http: HttpService) { }
	url: string = 'Api/Answer';

	details(question_id: number): Observable<AnswerModel[]> {
		return this.http.requestGet(`${this.url}?question_id=${question_id}`);
	}

	create(model: AnswerRequestModel): Observable<ResponseFactory> {
		return this.http.requestPost(this.url, model);
	}

	update(model: AnswerRequestModel): Observable<ResponseFactory> {
		return this.http.requestPut(this.url, model);
	}

	delete(question_id: number): Observable<ResponseFactory> {
		return this.http.requestDelete(`${this.url}?question_id=${question_id}`);
	}
}

export class AnswerModel {
	id: number;
	choice: number;
	name: string;
	answer: number;
	detail: string;
	created: string;
	updated: string;
	question_id: number;
	member_id: number;
}

export class AnswerRequestModel {
	question_id: number;
	answers: Array<AnswerModel>;
}