import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
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
export class ExaminationQeustionComponent implements OnInit {
    URL = URL;
    constructor(private route: ActivatedRoute,
        private service: ExaminationQeustionService,
        private router: Router,
        private builder: FormBuilder) { }

    page: string = null;
    exam_id: number;
    form: FormGroup;
    collections: IExamination_questions = new IExamination_questions();
    examination: examinations = new examinations();
    choicies: Array<string>;
    question_number: number;

    @ViewChild("tbody") tbody: ElementRef;

    ngOnInit() { this.processComponent(); }

    createForm() {
        let router: Array<any> = [this.URL.examination, this.URL.examination_questions];
        if (this.exam_id != 0) router.push(this.exam_id);
        // router location
        this.router.navigate(router);
    }

    onSubmit() {
        let question_number = this.form.controls['question_number'];
        let question_topic = this.form.controls['question_topic'];
        let question_detail = this.form.controls['question_detail'];

        if (this.form.valid) {
            let model: examination_questions = this.form.value;
            console.log(model);
        }
        else {
            question_number.markAsTouched();
            question_topic.markAsTouched();
            question_detail.markAsTouched();
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
            // form builder
            this.form = this.builder.group({
                question_number: ['', Validators.required],
                question_topic: ['', Validators.required],
                question_detail: [''],
                exam_id: this.exam_id,
                answer: [null]
            });
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
                let tbody: HTMLTableElement = this.tbody.nativeElement;
                this.question_number = (tbody.getElementsByTagName('tr').length + 1);
                // set value default to question_number;
                this.form.controls['question_number'].setValue(this.question_number);
            });
        });
    }
}