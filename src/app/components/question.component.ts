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
	subject: SubjectModel = new SubjectModel();
	examination: ExaminationModel = new ExaminationModel();
	questions: Array<QuestionModel> = [];
	answers: Array<AnswerModel> = [];
	examinationID: any;
	model: QuestionModel;
	answer_model: AnswerRequestModel = new AnswerRequestModel();
	sequence: number = 1;
	form: FormGroup;
	disabled: boolean;
	displayForm: boolean = false;
	deleteDisabled: boolean;

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
			// update data
			if (this.model.id) this.updateData();
			// create data
			else this.createData();
		}
		this.form.controls['name'].markAsTouched();
		this.form.controls['sequence'].markAsTouched();
		(<any>this.form.controls['answers']).controls.forEach((group: FormGroup) => group.controls['name'].markAsTouched());
	}

	onUpdate(item: QuestionModel) {
		// apply question
		this.form.controls['id'].setValue(item.id);
		this.form.controls['sequence'].setValue(item.sequence);
		this.form.controls['name'].setValue(item.name);
		this.form.controls['detail'].setValue(item.detail);
		this.form.controls['examination_id'].setValue(item.examination_id);
		// apply answers
		this.form.controls['answers'] = this.build.array([]);
		this.answers.filter(m => m.question_id == item.id).forEach(answer => {
			(<FormArray>this.form.controls['answers']).push(this.build.group({
				id: [answer.id],
				choice: [answer.choice, [Validators.required, ValidationFactory.number]],
				name: [answer.name, Validators.required],
				answer: [answer.answer, [Validators.required, ValidationFactory.number]],
				choice_name: [choicies[this.examination.choice_type][answer.choice]]
			}));
		});
		// return to form page
		this.displayForm = true;
	}

	onDelete(item: QuestionModel) {
		let messageAlert = 'แจ้งเตือนการลบโจทย์ข้อสอบ';
		AlertFactory.confirm(messageAlert, `คุณต้องการจะลบโจทย์ข้อสอบลำดับที่ ${item.sequence} จริงหรือ?`).then(s => {
			if (!s) return;
			// request to answer server
			this.deleteDisabled = true;
			this.answerService.delete(item.id)
				.finally(() => this.deleteDisabled = false)
				.subscribe(res => {
					if (res.Code == 200) {
						// request to question server
						this.deleteDisabled = true;
						this.service.delete(item.id)
							.finally(() => this.deleteDisabled = false)
							.subscribe(res => {
								if (res.Code == 200) {
									// remove data from array question
									let questionIndex = this.questions.findIndex(val => val.id == item.id);
									this.questions.splice(questionIndex, 1);
									this.processSequence();
								}
								else AlertFactory.alert(messageAlert, res.Message)
							});
					}
					else AlertFactory.alert('แจ้งเตือนการลบคำตอบ', res.Message)
				})

		});
	}

	onReset() {
		this.processForm();
		this.processRequest();
		this.displayForm = false;
	}

	onGoBack() {
		if (this.displayForm) {
			this.onReset();
			return;
		}
		history.back();
	}

	// in checkbox from view page
	resetAnswers(groupItem: FormGroup) {
		// reset value of checkbox set default value is 0
		(<any>this.form.controls['answers']).controls.forEach((group: FormGroup) => {
			if (groupItem != group) group.controls['answer'].setValue(0);
		});
	}

	private processForm() {
		this.form = this.build.group({
			id: [null],
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
			this.examinationService.detailsFull(this.examinationID).subscribe(res => {
				this.subject = res.subject;
				this.examination = res.examination;
				this.questions = res.questions;
				this.answers = res.answers;

				// set form control value
				this.form.controls['examination_id'].setValue(this.examinationID);
				// run sequence number of question
				this.processSequence();
				// apply validator form (answer)
				choicies[this.examination.choice_type].forEach((ans, index) => {
					// set value of answers form control
					(<FormArray>this.form.controls['answers']).push(this.build.group({
						choice: [index, [Validators.required, ValidationFactory.number]],
						name: ['', Validators.required],
						answer: [(index == 0 ? 1 : 0), [Validators.required, ValidationFactory.number]],
						choice_name: [ans]
					}));
				});
			});
		});
	}

	private processSequence() {
		this.sequence = 1;
		(function process(this_) {
			this_.questions.forEach(val => {
				if (val.sequence == this_.sequence) {
					this_.sequence++;
					process(this_);
				}
				else this_.form.controls['sequence'].setValue(this_.sequence);
			})
		})(this);
	}

	private createData() {
		// request to question server 
		this.service.create(this.model)
			.finally(() => this.disabled = false)
			.subscribe(questionResponse => {
				if (questionResponse.Code == 200) {
					// set default question_id
					let question = <QuestionModel>questionResponse.Data;
					this.answer_model.question_id = question.id;

					// request to answer server
					this.disabled = true;
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

	private updateData() {
		this.answer_model.question_id = this.model.id;
		console.log(this.model, this.answer_model);
	}
}