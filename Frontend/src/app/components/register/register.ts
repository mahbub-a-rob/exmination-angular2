import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationFactory } from '../../validations/validation.factory';
import { MemberService, MemberModel } from '../../services/member.service';
import { AuthenticatedFactory } from '../../factories/authenticated.factory';
import { Router } from '@angular/router';
import { URL } from '../../factories/URL.factory';
import { IResponse } from '../../interfaces/response.interface';
import { AlertFactory } from '../../factories/alert.factory';

@Component({
    selector: 'app-register',
    templateUrl: 'register.html',
    styleUrls: ['register.less'],
    providers: [MemberService]
})
export class RegisterComponent {
    URL = URL;
    registerForm: FormGroup;
    buttonLoading: boolean = null;

    constructor(formBuilder: FormBuilder, private service: MemberService, private router: Router) {
        this.registerForm = formBuilder.group({
            'mem_email': ['', [
                Validators.required,
                ValidationFactory.EmailAddress
            ]],
            'mem_password': ['', [
                Validators.required,
                ValidationFactory.Password
            ]],
            'mem_confirm_password': ['', [
                Validators.required,
                ValidationFactory.Password
            ]]
        });
    }

    onSubmit() {
        if (this.registerForm.valid) {
            this.buttonLoading = true;
            let model: MemberModel = this.registerForm.value;
            this.service.create(model).subscribe((res: IResponse) => {
                if (res.code === 200) {
                    AuthenticatedFactory.setAuthenticated(res.response);
                    this.router.navigate([this.URL.dashboard]);
                }
                else { AlertFactory.alert('เกิดข้อผิดพลาดไม่สามารถทำรายการได้'); }
                this.buttonLoading = false;
            });
        }
        else {
            this.registerForm.controls[''].markAsTouched();
        }
    }
}