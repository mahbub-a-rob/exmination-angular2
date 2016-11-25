import { Component } from '@angular/core';
import { SigninModel, AuthenticationService } from '../services/authentication.service';
import { Url } from '../factories/url.factory';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertFactory } from '../factories/alert.factory';
@Component({
	selector: 'examination-signin',
	templateUrl: '../views/signin.html',
	styleUrls: ['../styles/signin.scss'],
	providers: [AuthenticationService]
})
export class SigninComponent {
	constructor(builder: FormBuilder, route: ActivatedRoute, private router: Router, private service: AuthenticationService) {
		// form validation
		this.form = builder.group({
			email: ['', Validators.required],
			password: ['', Validators.required]
		});
		// route param
		route.params.forEach(param => {
			let returnUrl = decodeURIComponent(param['returnUrl']);
			this.returnUrl = returnUrl == 'undefined' ? Url.Dashboard : returnUrl;
		});
	}

	Url = Url;
	form: FormGroup;
	model: SigninModel;
	disabled: boolean = false;
	returnUrl: string;

	onSubmit() {
		this.model = this.form.value;
		if (this.form.valid) {
			this.disabled = true;
			this.service.onSignin(this.model).finally(() => this.disabled = false).subscribe(res => {
				if (res.Code == 200) { this.router.navigate([this.returnUrl]); }
				else AlertFactory.alert('แจ้งเตือนการเข้าสู่ระบบ', res.Message);
			});
		}
		this.form.controls['email'].markAsTouched()
		this.form.controls['password'].markAsTouched()
	}
}