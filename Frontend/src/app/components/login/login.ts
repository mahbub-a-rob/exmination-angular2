import { Component } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ValidationFactory } from '../../validations/validation.factory';
import { URL } from '../../factories/URL.factory';
import { MemberModel, MemberService } from '../../services/member.service';
import { IResponse } from '../../interfaces/response.interface';
import { AuthenticatedFactory } from '../../factories/authenticated.factory';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertFactory } from '../../factories/alert.factory';

@Component({
    selector: 'app-login',
    templateUrl: 'login.html',
    styleUrls: ['login.less'],
    providers: [MemberService]
})
export class LoginComponent {
    URL = URL;
    LoginForm: FormGroup;
    ButtonLoading: boolean;

    constructor(formBuilder: FormBuilder, private service: MemberService, private router: Router, private route: ActivatedRoute) {
        this.LoginForm = formBuilder.group({
            'mem_email': ['', Validators.required],
            'mem_password': ['', Validators.required]
        });
    }

    // Login submit
    onSubmit() {
        if (this.LoginForm.valid) {
            let param = '/' + this.URL.dashboard;
            this.route.params.forEach(p => { if (p['return']) param = p['return'] });
            let model: MemberModel = this.LoginForm.value;
            this.ButtonLoading = true;
            // request to server 
            this.service.login(model).subscribe((res: IResponse) => {
                if (res.code == 200) {
                    AuthenticatedFactory.setAuthenticated(res.response);
                    this.router.navigate([param]);
                }
                else {
                    AlertFactory.alert('ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง');
                }
                this.ButtonLoading = false;
            });
        }
    }
}