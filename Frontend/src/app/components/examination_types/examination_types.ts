import { Component, OnInit, EventEmitter } from '@angular/core';
import { URL } from '../../factories/URL.factory';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { examination_types, ExaminationTypeService } from '../../services/examination_types.service';
import { AlertFactory } from '../../factories/alert.factory';
import { IResponse } from '../../interfaces/response.interface';
import { ButtonLoadingDirective } from '../../directives/button.loading';

@Component({
    selector: 'app-exmination-types',
    templateUrl: 'examination_types.html',
    styleUrls: ['examination_types.less'],
    providers: [ExaminationTypeService]
})
export class ExaminationTypeComponent implements OnInit {

    constructor(private router: Router, private route: ActivatedRoute, private builder: FormBuilder, private service: ExaminationTypeService) { }
    URL = URL;
    manageTypes: string;
    form: FormGroup;
    buttonLoading: boolean = false;
    Collection: Array<examination_types> = [];
    private types_id: number;

    ngOnInit() {
        // authen page
        this.route.data.subscribe(value => this.manageTypes = value['type'] || null);
        // check type
        switch (this.manageTypes) {
            case 'list':
                this.service.all.subscribe(res => this.Collection = res);
                break;
            case 'create':
                this.form = this.builder.group({
                    types_name: ['', Validators.required],
                    types_detail: ''
                });
                break;
            case 'update':
                this.form = this.builder.group({
                    types_name: ['', Validators.required],
                    types_detail: ''
                });
                this.route.params.subscribe(param => {
                    // request to server get type sigle
                    this.service.single(param['id']).subscribe((res: examination_types) => {
                        this.form.setValue({
                            types_name: res.types_name,
                            types_detail: res.types_detail
                        });
                        this.types_id = res['types_id'];
                    });
                });;
                break;
        }
    }

    onSubmit() {
        if (this.form.valid) {
            this.buttonLoading = true;
            let model: examination_types = this.form.value;
            // request to server by update data
            if (this.manageTypes == 'update') {
                this.service.update(this.types_id, model).subscribe(res => this.onResponse(res));
            }
            // request to server by insert data
            else { this.service.create(model).subscribe(res => this.onResponse(res)); }
        }
        this.form.controls['types_name'].markAsTouched();
        this.form.controls['types_detail'].markAsTouched();
    }

    onDelete(item: examination_types) {
        let msg = `คุณต้องการลบชนิดข้อสอบ <span class="text-warning">"${item.types_name}"</span> จริงหรือ?`;
        AlertFactory.confirm(msg, null, false).then((confirm) => {
            if (!confirm.status) return;
            let loading = AlertFactory.loading(confirm.alert);
            // request to server for delete data
            this.service.delete(item.types_id).subscribe((res: IResponse) => {
                if (res.code === 200) {
                    this.service.all.subscribe(res => this.Collection = res);
                }
                else { AlertFactory.alert('ลบข้อมูลไม่ได้กรุณาลองอีกครั้ง !'); }
                // close alert
                loading.close();
            });
        });
    }

    // response from server
    private onResponse(res: IResponse) {
        if (res.code == 200) { this.router.navigate([this.URL.examination, this.URL.examination_types]); }
        else if (res.code == 700) { AlertFactory.alert(res.message); }
        else { AlertFactory.alert('เกิดข้อผิดพลาดไม่สามารถทำรายการได้ !'); }
        this.buttonLoading = false;
    }
}