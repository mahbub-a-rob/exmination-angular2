import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';
import { ResponseFactory } from '../factories/response.factory';

@Injectable()
export class QuestionService {
	constructor(private http: HttpService) { }

	url: string = 'Api/Question';

	details(): Observable<Array<QuestionModel>> {
		return this.http.requestGet(this.url);
	}

	detail(id: number): Observable<QuestionModel> {
		return this.http.requestGet(this.url + '/' + id);
	}

	create(model: QuestionModel): Observable<ResponseFactory> {
		return this.http.requestPost(this.url, model);
	}

	update(id: number, model: QuestionModel): Observable<ResponseFactory> {
		return this.http.requestPut(this.url + '/' + id, model);
	}

	delete(id: number): Observable<ResponseFactory> {
		return this.http.requestDelete(this.url + '/' + id);
	}
}

export class QuestionModel {
	id: number;
	sequence: number;
	name: string;
	detail: string;
	created: string;
	updated: string;
	examination_id: number;
	member_id: number;
}