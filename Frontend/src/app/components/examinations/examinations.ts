import { Component } from '@angular/core';
import { ExaminationService as Service, IExaminations, examinations } from '../../services/exminations.service';
import { ActivatedRoute, Router } from '@angular/router';
import { examination_types, ExaminationTypeService as TypeService } from '../../services/examination_types.service';
import { URL } from '../../factories/URL.factory';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IResponse } from '../../interfaces/response.interface';
import { AlertFactory } from '../../factories/alert.factory';

@Component({
    selector: 'app-examinations',
    templateUrl: 'examinations.html',
    styleUrls: ['examinations.less'],
    providers: [Service, TypeService]
})
export class ExaminationsComponent {
    URL = URL;

    constructor(private service: Service, route: ActivatedRoute, private router: Router, private typeService: TypeService, build: FormBuilder) {
        route.params.forEach(param => {
            if (param['types_id']) this.types_id = param['types_id'];
            if (param['exam_id']) this.exam_id = param['exam_id'];
        });
        this.processComponent(route, build);
    }

    collection: IExaminations = new IExaminations();
    exmination_types: examination_types;
    types_id: any = '';
    exam_id: any = '';
    page: string = null;
    form: FormGroup;
    buttonLoading: boolean = null;

    onSubmit() {
        let exam_name = this.form.controls['exam_name'];
        let exam_choice = this.form.controls['exam_choice'];
        if (this.form.valid) {
            let model: examinations = this.form.value;
            this.buttonLoading = true;
            // update
            if (this.page == 'update') { this.service.update(this.exam_id, model).subscribe(res => this.processResponse(res)); }
            // create
            else { this.service.create(model).subscribe(res => this.processResponse(res)); }
        }
        else {
            exam_name.markAsTouched();
            exam_choice.markAsTouched();
        }
    }

    onTypesChange() {
        let router = [];
        switch (this.page) {
            case 'create':
                router = [this.URL.examination, this.URL.examinations, this.types_id, this.URL.create];
                break;
            case 'update':
                router = [this.URL.examination, this.URL.examinations, this.types_id, this.URL.update, this.exam_id];
                break;
            default:
                router = [this.URL.examination, this.URL.examinations, this.types_id];
                break;
        }
        if (this.types_id == '') { router = [this.URL.examination, this.URL.examinations]; }
        this.router.navigate(router);
    }

    onDelete(item: examinations) {
        let confirm = `คุณต้องการลบข้อสอบ <span class="text-warning">"${item.exam_name}"</span> หรือไม่?`;
        AlertFactory.confirm(confirm, null, false).then(s => {
            if (!s.status) return;
            // loading
            let loading = AlertFactory.loading(s.alert);
            // request to server
            this.service.remove(item.exam_id).subscribe((deleted: IResponse) => {
                if (deleted.code == 200) {
                    this.service.allTypes(this.types_id).subscribe(res => {
                        this.collection = res;
                        let examination_type = this.collection.types.filter(type => type.types_id == this.types_id);
                        if (examination_type.length) this.exmination_types = examination_type[0];
                        // close loading
                        loading.close();
                    });
                }
                else { AlertFactory.error('เกิดข้อผิดพลาดไม่สามารถทำรายการได้'); }
            });
        });
    }

    private processComponent(route: ActivatedRoute, build: FormBuilder) {
        this.collection.examinations = [];
        this.collection.types = [];
        this.exmination_types = new examination_types();

        route.data.subscribe(data => {
            this.page = data['type'];
            switch (this.page) {
                
                case 'list':
                    this.service.all.subscribe(res => this.collection = res);
                    break;

                case 'single':
                    this.service.allTypes(this.types_id).subscribe(res => {
                        this.collection = res;
                        let examination_type = this.collection.types.filter(type => type.types_id == this.types_id);
                        if (examination_type.length) this.exmination_types = examination_type[0];
                    });
                    break;

                case 'create':
                    this.form = build.group({
                        exam_name: ['', Validators.required],
                        exam_detail: [''],
                        exam_choice: ['', Validators.required],
                        types_id: [this.types_id, Validators.required]
                    });
                    this.typeService.all.subscribe(res => {
                        this.collection.types = res;
                        let examination_type = this.collection.types.filter(type => type.types_id == this.types_id);
                        if (examination_type.length) this.exmination_types = examination_type[0];
                    });
                    break;

                case 'update':
                    this.form = build.group({
                        exam_name: ['', Validators.required],
                        exam_detail: [''],
                        exam_choice: ['', Validators.required],
                        types_id: [this.types_id, Validators.required]
                    });
                    this.service.allTypes(this.types_id).subscribe(res => {
                        this.collection = res;
                        // examination types
                        let examination_type = this.collection.types.filter(type => type.types_id == this.types_id);
                        if (examination_type.length) this.exmination_types = examination_type[0];
                        // examinations
                        let examinations = this.collection.examinations.filter(exam => exam.exam_id == this.exam_id);
                        if (examinations.length) {
                            let examination = examinations[0];
                            this.form.controls['exam_name'].setValue(examination.exam_name);
                            this.form.controls['exam_detail'].setValue(examination.exam_detail);
                            this.form.controls['exam_choice'].setValue(examination.exam_choice);
                        }
                    });
                    break;
            }
        });
    }

    private processResponse(response: IResponse) {
        if (response.code == 200) {
            this.router.navigate([URL.examination, URL.examinations, this.types_id]);
        }
        else { AlertFactory.warning('เกิดข้อผิดพลาดไม่สามารถทำรายการได้'); }
        this.buttonLoading = true;
    }
}