import { Component } from '@angular/core';
import { AuthenticationService as service } from '../services/authentication.service';
import { Url } from '../factories/url.factory';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
	selector: 'examination-signin',
	templateUrl: '../views/signin.html',
	styleUrls: ['../styles/signin.scss'],
	providers: [service]
})
export class SigninComponent {
	constructor(builder: FormBuilder, route: ActivatedRoute) {
		// form validation
		this.form = builder.group({
			email: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(5)]],
			password: ['', [Validators.required]]
		});
		// route param
		route.params.forEach(param => this.returnUrl = param['returnUrl'] || Url.Dashbard);
	}

	Url = Url;
	form: FormGroup;
	returnUrl: string;
}