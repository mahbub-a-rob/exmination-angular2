import { Component, ViewChild } from '@angular/core';
import { Url } from '../factories/url.factory';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionService, QuestionModel } from '../services/question.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { SubjectService, SubjectModel } from '../services/subject.service';
import { ExaminationModel, ExaminationService } from '../services/examination.service';
import { ValidationFactory } from '../factories/validation.factory';
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
		this.processForm(build);
		// request param and server
		this.processRequest(route);
	}

	Url = Url;
	@ViewChild('sequence') sequence: HTMLInputElement;
	form: FormGroup;
	examinationID: any;
	questions: Array<QuestionModel> = [];
	examination: ExaminationModel = new ExaminationModel();
	subject: SubjectModel = new SubjectModel();
	model: QuestionModel;

	onSubmit() {
		console.log(this.form);
		if (this.form.valid) {
			this.model = this.form.value;
			console.log(this.model);
		}
	}

	private processForm(build: FormBuilder) {
		this.form = build.group({
			sequence: ['', [Validators.required, ValidationFactory.number]],
			name: ['', Validators.required],
			detail: [''],
			examination_id: ['', [Validators.required, ValidationFactory.number]],
			answers: build.array([])
		});

		const answerArray = ['ก', 'ข', 'ค', 'ง'];

		answerArray.forEach(ans => {
			(<FormArray>this.form.controls['answers']).push(build.group({
				choice: [ans],
				name: ['', Validators.required],
				answer: ['', Validators.required],
				detail: ['']
			}));
		});
	}

	private processRequest(route: ActivatedRoute) {
		// get subject id 
		route.params.forEach(param => {
			if (isNaN(param['id'])) { this.router.navigate([Url.Examination]); return; }
			this.examinationID = param['id'];

			// get questions
			this.service.detailExamination(this.examinationID).subscribe(res => {
				this.questions = res;
				this.form.controls['sequence'].setValue(this.questions.length + 1);
			});

			// get subjects
			this.examinationService.detailSubject(this.examinationID).subscribe(res => {
				if (res == null) return;
				this.examination = res.examination;
				this.subject = res.subject;
				this.form.controls['examination_id'].setValue(this.examination.id);
			});
		});
	}
}