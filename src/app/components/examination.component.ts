import { Component } from '@angular/core';
import { Url } from '../factories/url.factory';
import { ExaminationService, ExaminationModel } from '../services/examination.service';
import { SubjectService, SubjectModel } from '../services/subject.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationFactory } from '../factories/validation.factory';
import { AlertFactory } from '../factories/alert.factory';

@Component({
    selector: 'examination-examination',
    templateUrl: '../views/examination.html',
    styleUrls: ['../styles/examination.scss'],
    providers: [
        ExaminationService,
        SubjectService
    ]
})
export class ExaminationComponent {
    constructor(private service: ExaminationService, private subjectService: SubjectService, build: FormBuilder) {
        // create form validators
        this.form = build.group({
            id: [],
            name: ['', Validators.required],
            detail: ['', Validators.maxLength(255)],
            status: [0, [Validators.required, ValidationFactory.number]],
            subject_id: ['', [Validators.required, ValidationFactory.number]]
        });
        // get subject data 
        this.subjectService.details().subscribe(subjects => this.subjects = subjects);
        // get examination data
        this.service.details().subscribe(examinations => this.examinations = examinations);
    }

    Url = Url;
    disabled: boolean;
    form: FormGroup;
    model: ExaminationModel;
    subjects: Array<SubjectModel> = [];
    examinations: Array<ExaminationModel> = [];

    onSubmit() {
        if (this.form.valid) {
            this.model = this.form.value;
            this.disabled = true;
            // update
            if (this.model.id) {
                this.service.update(this.model.id, this.model)
                    .finally(() => this.disabled = false)
                    .subscribe(res => {
                        if (res.Code == 200) {
                            this.examinations = this.examinations.map(val => {
                                if (val.id == this.model.id)
                                    val = res.Data;
                                return val;
                            });
                            this.onReset();
                        }
                        else AlertFactory.alert('แจ้งเตือนการแก้ไขข้อสอบ', res.Message);
                    });
            }
            // create
            else {
                this.service.create(this.model)
                    .finally(() => this.disabled = false)
                    .subscribe(res => {
                        if (res.Code == 200) {
                            this.examinations.push(res.Data);
                            this.onReset();
                        }
                        else AlertFactory.alert('แจ้งเตือนการเพิ่มข้อสอบ', res.Message);
                    });
            }
        }
        this.form.controls['name'].markAsTouched();
        this.form.controls['detail'].markAsTouched();
        this.form.controls['status'].markAsTouched();
        this.form.controls['subject_id'].markAsTouched();
    }

    onDelete(item: ExaminationModel) {
        AlertFactory.confirm('แจ้งเตือนการลบข้อสอบ', `คุณต้องการลบชุดข้อสอบรหัส '${item.number}' จริงหรือ?`).then(s => {
            if (!s) return;
            this.service.delete(item.id).subscribe(res => {
                if (res.Code == 200) {
                    let index = this.examinations.findIndex(v => v.id == item.id);
                    if (index == -1) return;
                    this.examinations.splice(index, 1);
                }
                else AlertFactory.alert('แจ้งเตือนการลบข้อสอบ', res.Message);
            });
        });
    }

    onUpdate(item: ExaminationModel) {
        this.form.controls['id'].setValue(item.id);
        this.form.controls['name'].setValue(item.name);
        this.form.controls['detail'].setValue(item.detail);
        this.form.controls['status'].setValue(item.status);
        this.form.controls['subject_id'].setValue(item.subject_id);
    }

    onReset() {
        this.form.reset();
        this.form.controls['status'].setValue(0);
        this.form.controls['subject_id'].setValue('');
    }

    subjectName(item: ExaminationModel): string {
        let subject = this.subjects.find(value => value.id == item.subject_id);
        if (!subject) return 'ไม่มีข้อมูล !';
        return subject.name;
    }
}