import { Component } from '@angular/core';
import { AuthenticationService as service } from '../services/authentication.service';
import { Url } from '../factories/url.factory';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
	selector: 'examination-signin',
	templateUrl: '../views/signin.html',
	styleUrls: ['../styles/signin.scss'],
	providers: [service]
})
export class SigninComponent {
	Url = Url;
	form: FormGroup;
	constructor(builder: FormBuilder) {
		this.form = builder.group({
			email: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(5)]],
			password: ['', [Validators.required]]
		});
	}
}