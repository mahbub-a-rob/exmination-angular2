import { Component } from '@angular/core';
import { Url } from '../factories/url.factory';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationFactory } from '../factories/validation.factory';
import { SignupModel, AuthenticationService } from '../services/authentication.service';
import { AlertFactory } from '../factories/alert.factory';
import { Router } from '@angular/router';
import { AuthorizationFactory } from '../factories/authorization.factory';
@Component({
	selector: 'examination-signup',
	templateUrl: '../views/signup.html',
	styleUrls: ['../styles/signup.scss'],
	providers: [AuthenticationService]
})
export class SignupComponent {
	constructor(private service: AuthenticationService, private router: Router, build: FormBuilder) {
		// form validation
		this.form = build.group({
			name: ['', [Validators.required]],
			email: ['', [Validators.required, ValidationFactory.email]],
			password: ['', [Validators.required, ValidationFactory.password]],
			confirm_password: ['', [Validators.required, ValidationFactory.password]]
		});
	}

	form: FormGroup;
	Url = Url;
	model: SignupModel;
	disabled: boolean = false;

	onSubmit() {
		this.model = this.form.value;
		// password not equals confirm_password
		if (this.model.confirm_password !== this.model.password) {
			this.form.controls['confirm_password'].setErrors({ message: 'รหัสผ่านกับยืนยันรหัสผ่านไม่ตรงกัน' });
		}
		// check form valid
		if (this.form.valid) {
			this.disabled = true;
			this.service.onSignup(this.model).subscribe(res => {
				if (res.Code == 200) {
					this.router.navigate([Url.Dashbard]);
					return;
				}
				else AlertFactory.alert('แจ้งเตือนการลงทะเบียน', res.Message);
				this.disabled = false;
			});
		}
		// build validator
		this.form.controls['name'].markAsTouched();
		this.form.controls['email'].markAsTouched();
		this.form.controls['password'].markAsTouched();
		this.form.controls['confirm_password'].markAsTouched();
	}
}