import { Injectable } from '@angular/core';
@Injectable()
export class AnswerService {

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