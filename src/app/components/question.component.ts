import { Component, ViewChild } from '@angular/core';
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
			sequence: [],
			name: [],
			detail: [],
			examination_id: []
		});
		// get subject id 
		route.params.forEach(param => {
			if (isNaN(param['id'])) { this.router.navigate([Url.Examination]); return; }
			this.subjectID = param['id'];
			// get questions
			this.service.details().subscribe(res => {
				this.questions = res;
				this.form.controls['sequence'].setValue((this.questions.length + 1));
			});
			// get subjects
			this.examinationService.detailSubject(this.subjectID).subscribe(res => {
				if (res == null) return;
				this.examination = res.examination;
				this.subject = res.subject;
				this.form.controls['examination_id'].setValue(this.examination.id);
			});
		});
	}

	Url = Url;
	@ViewChild('sequence') sequence: HTMLInputElement;
	form: FormGroup;
	subjectID: any;
	questions: Array<QuestionModel> = [];
	examination: ExaminationModel = new ExaminationModel();
	subject: SubjectModel = new SubjectModel();
	model: QuestionModel;
	answerArray: string[] = ['ก', 'ข', 'ค', 'ง'];

	onSubmit() {
		if (this.form.valid) {
			this.model = this.form.value;
			console.log(this.model, this.sequence);
		}
	}
}