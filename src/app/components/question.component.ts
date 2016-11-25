import { Component } from '@angular/core';
import { Url } from '../factories/url.factory';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionService, QuestionModel } from '../services/question.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { SubjectService, SubjectModel } from '../services/subject.service';
import { ExaminationModel, ExaminationService } from '../services/examination.service';
import { ValidationFactory } from '../factories/validation.factory';
import { choicies } from '../factories/apps.factory';
import { AnswerModel, AnswerRequestModel, AnswerService } from '../services/answer.service';
import { AlertFactory } from '../factories/alert.factory';
@Component({
	selector: 'examination-question',
	templateUrl: '../views/question.html',
	styleUrls: ['../styles/question.scss'],
	providers: [
		QuestionService,
		ExaminationService,
		AnswerService
	]
})
export class QuestionComponent {
	constructor(private route: ActivatedRoute,
		private build: FormBuilder,
		private router: Router,
		private service: QuestionService,
		private examinationService: ExaminationService,
		private answerService: AnswerService) {
		// create validator form
		this.processForm();
		// request param and server
		this.processRequest();
	}

	Url = Url;
	form: FormGroup;
	examinationID: any;
	questions: Array<QuestionModel> = [];
	examination: ExaminationModel = new ExaminationModel();
	subject: SubjectModel = new SubjectModel();
	model: QuestionModel;
	answer_model: AnswerRequestModel = new AnswerRequestModel();
	disabled: boolean;
	displayForm: boolean = false;

	onSubmit() {
		if (this.form.valid) {
			// start loading
			this.disabled = true;
			// question model	
			this.model = this.form.value;
			// answer model
			this.answer_model.answers = (<any>this.model).answers;
			// remove variable
			delete (<any>this.model).answers;
			// request to question server 
			this.service.create(this.model)
				.finally(() => this.disabled = false)
				.subscribe(questionResponse => {
					if (questionResponse.Code == 200) {
						// set quetion data to variable
						let question = <QuestionModel>questionResponse.Data;
						// set default question_id
						this.answer_model.question_id = question.id;

						// start loading
						this.disabled = true;
						// request to answer server
						this.answerService.create(this.answer_model)
							.finally(() => this.disabled = false)
							.subscribe(answerResponse => {
								if (answerResponse.Code == 200) this.onReset();
								else AlertFactory.alert('แจ้งเตือนการเพิ่มคำตอบ', answerResponse.Message);
							})
					}
					else AlertFactory.alert('แจ้งเตือนการเพิ่มโจทย์', questionResponse.Message);
				});
		}
		this.form.controls['name'].markAsTouched();
		this.form.controls['sequence'].markAsTouched();
		(<any>this.form.controls['answers']).controls.forEach((group: FormGroup) => group.controls['name'].markAsTouched());
	}

	onReset() {
		this.processForm();
		this.processRequest();
		this.displayForm = false;
	}

	onGoBack() {
		if (this.displayForm) {
			this.displayForm = false;
			return;
		}
		history.back();
	}

	resetAnswers(groupItem: FormGroup) {
		// reset value of checkbox set default value is 0
		(<any>this.form.controls['answers']).controls.forEach((group: FormGroup) => {
			if (groupItem != group) group.controls['answer'].setValue(0);
		});
	}

	private processForm() {
		this.form = this.build.group({
			sequence: ['', [Validators.required, ValidationFactory.number]],
			name: [null, Validators.required],
			detail: [null],
			examination_id: ['', [Validators.required, ValidationFactory.number]],
			answers: this.build.array([])
		});
	}

	private processRequest() {
		// get subject id 
		this.route.params.forEach(param => {
			if (isNaN(param['id'])) { this.router.navigate([Url.Examination]); return; }
			this.examinationID = param['id'];

			// get question
			this.requestQuetions();

			// get subjects
			this.requestSubjects();
		});
	}

	private requestQuetions() {
		// get questions
		this.service.detailExamination(this.examinationID).subscribe(res => {
			this.questions = res;
			this.form.controls['sequence'].setValue(this.questions.length + 1);
			this.form.controls['examination_id'].setValue(this.examinationID);
		});
	}

	private requestSubjects() {
		// get subjects
		this.examinationService.detailSubject(this.examinationID).subscribe(res => {
			if (res == null) return;
			this.examination = res.examination;
			this.subject = res.subject;
			let answers = (<FormArray>this.form.controls['answers']);
			// get choice name array
			let answerArray = choicies[this.examination.choice_type];
			// apply validator form (answer)
			answerArray.forEach((ans, index) => {
				answers.push(this.build.group({
					choice: [index, [Validators.required, ValidationFactory.number]],
					name: ['', Validators.required],
					answer: [(index == 0 ? 1 : 0), [Validators.required, ValidationFactory.number]],
					choice_name: [ans]
				}));
			});
		});
	}
}