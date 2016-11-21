import { Component } from '@angular/core';
import { Url } from '../factories/url.factory';
import { SubjectService, SubjectModel } from '../services/subject.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertFactory } from '../factories/alert.factory';
declare let $;
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
            id: [],
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
            // update data
            if (this.model.id) {
                this.service.update(this.model.id, this.model)
                    .finally(() => this.disabled = false)
                    .subscribe(res => {
                        if (res.Code == 200) {
                            // update subjects
                            this.subjects = this.subjects.map(subject => {
                                if (subject.id == this.model.id) subject = res.Data;
                                return subject;
                            })
                            this.form.reset();
                        }
                        else AlertFactory.alert('แจ้งเตือนการแก้ไขรายวิชา', res.Message);
                    });
            }
            // create data
            else {
                this.service.create(this.model)
                    .finally(() => this.disabled = false)
                    .subscribe(res => {
                        if (res.Code == 200) {
                            this.subjects.push(res.Data);
                            this.form.reset();
                        }
                        else AlertFactory.alert('แจ้งเตือนการเพิ่มรายวิชา', res.Message);
                    });
            }
        }
        this.form.controls['name'].markAsTouched();
        this.form.controls['detail'].markAsTouched();
    }

    onUpdate(item: SubjectModel) {
        let subject = this.subjects.filter(value => value.id == item.id);
        if (subject.length == 0) return;
        this.form.controls['id'].setValue(item.id);
        this.form.controls['name'].setValue(item.name);
        this.form.controls['detail'].setValue(item.detail);
    }

    onDelete(item: SubjectModel) {
        AlertFactory.confirm("กรุณายืนยันการทำรายการ", `คุณต้องการลบรายวิชา '${item.name}' จริงหรือ ?`).then(status => {
            if (!status) return;
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
        });
    }
}