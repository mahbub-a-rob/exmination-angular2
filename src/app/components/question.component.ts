import { Component } from '@angular/core';
import { Url } from '../factories/url.factory';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionService, QuestionModel } from '../services/question.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SubjectService, SubjectModel } from '../services/subject.service';
import { ExaminationModel, ExaminationService } from '../services/examination.service';
@Component({
	selector: 'examination-question',
	templateUrl: '../views/question.html',
	styleUrls: ['../styles/question.scss'],
	providers: [
		QuestionService,
		ExaminationService
	]
})
export class QuestionComponent {
	constructor(route: ActivatedRoute, build: FormBuilder,
		private router: Router,
		private service: QuestionService,
		private examinationService: ExaminationService) {
		// create validator form
		this.form = build.group({

		});
		// get subject id 
		route.params.forEach(param => {
			if (isNaN(param['id'])) { this.router.navigate([Url.Examination]); return; }
			this.subjectID = param['id'];
			// get questions
			this.service.details().subscribe(res => this.questions = res);
			// get subjects
			this.examinationService.detail(this.subjectID).subscribe(res => this.examination = res);
		});
	}

	Url = Url;
	form: FormGroup;
	subjectID: number;
	questions: Array<QuestionModel> = [];
	examination: ExaminationModel;
	model: QuestionModel;
}