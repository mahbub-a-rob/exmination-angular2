import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExaminationQeustionService, IExamination_questions, examination_questions } from '../../services/examination_questions.service';
import { AlertFactory } from '../../factories/alert.factory';
import { URL } from '../../factories/URL.factory';
import { examinations } from '../../services/exminations.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IChoice } from '../../interfaces/choice.interface';
@Component({
    selector: 'app-examination-question',
    templateUrl: 'examination_questions.html',
    styleUrls: ['examination_questions.less'],
    providers: [ExaminationQeustionService]
})
export class ExaminationQeustionComponent {
    URL = URL;
    constructor(private route: ActivatedRoute,
        private service: ExaminationQeustionService,
        private router: Router,
        private builder: FormBuilder) {
        this.processComponent();
    }

    page: string = null;
    exam_id: number;
    form: FormGroup;
    collections: IExamination_questions = new IExamination_questions();
    examination: examinations = new examinations();
    choicies: Array<string>;

    createForm() {
        let router: Array<any> = [this.URL.examination, this.URL.examination_questions];
        if (this.exam_id != 0) router.push(this.exam_id);
        // router location
        this.router.navigate(router);
    }

    onSubmit() {
        if (this.form.valid) {
            let model: examination_questions = this.form.value;
            console.log(model);
        }
        else {
            this.form.controls['question_topic'].markAsTouched();
            this.form.controls['question_detail'].markAsTouched();
        }
    }

    private processComponent() {
        // set default value
        this.collections.examinations = [];
        this.collections.questions = [];
        // check params
        this.route.params.forEach(param => {
            // get exam_id
            this.exam_id = param['exam_id'] || 0;
            // get data type
            this.service.get.subscribe(res => {
                this.collections = res;
                let examinations = this.collections.examinations.filter(val => val.exam_id == this.exam_id);
                if (examinations.length > 0) {
                    this.examination = examinations[0];
                    this.choicies = new Array<string>();
                    for (let i = 0; i < this.examination.exam_choice; i++) {
                        this.choicies.push(IChoice['th'][i]);
                    }
                }
            });
            // form builder
            this.form = this.builder.group({
                question_topic: ['', Validators.required],
                question_detail: [''],
                exam_id: this.exam_id,
                answer: [null]
            });
        });
    }
}