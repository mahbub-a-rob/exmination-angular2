import { Component } from '@angular/core';
import { Url } from '../factories/url.factory';
import { SubjectService, SubjectModel } from '../services/subject.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertFactory } from '../factories/alert.factory';

@Component({
    selector: 'examination-subject',
    templateUrl: '../views/subject.html',
    styleUrls: ['../styles/subject.scss'],
    providers: [SubjectService]
})
export class SubjectComponent {
    constructor(private service: SubjectService, build: FormBuilder) {
        // create form validate
        this.form = build.group({
            name: ['', [Validators.required, Validators.maxLength(60)]],
            detail: ['', Validators.maxLength(255)]
        });
        // get subject data
        this.service.details().subscribe(subjects => this.subjects = subjects);
    }

    Url = Url;
    model: SubjectModel;
    form: FormGroup;
    disabled: boolean = false;
    subjects: SubjectModel[] = [];

    onSubmit() {
        if (this.form.valid) {
            this.model = this.form.value;
            this.disabled = true;
            this.service.create(this.model)
                .finally(() => this.disabled = false)
                .subscribe(res => {
                    if (res.Code == 200) {
                        this.subjects.push(res.Data);
                        this.form.reset();
                    }
                    else AlertFactory.alert('การแจ้งเตือนการเพิ่มรายวิชา', res.Message);
                });
        }
        this.form.controls['name'].markAsTouched();
        this.form.controls['detail'].markAsTouched();
    }

    onDelete(item: SubjectModel) {
        this.disabled = true;
        this.service.delete(item.id)
            .finally(() => this.disabled = false)
            .subscribe(res => {
                if (res.Code == 200) {
                    // remove array
                    let index = this.subjects.findIndex(value => value.id == item.id);
                    if (index !== -1) this.subjects.splice(index, 1);
                }
                else AlertFactory.alert('การแจ้งเตือนการลบรายวิชา', res.Message);
            });
    }
}