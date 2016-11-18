import { Component } from '@angular/core';
import { AuthenticationService as service } from '../services/authentication.service';
@Component({
	selector: 'examination-signin',
	templateUrl: 'app/views/signin.html',
	providers: [service]
})
export class SigninComponent {
	title: string = "Sign in page";

	constructor(private service: service) {

		this.service.onSignin().subscribe();

	}

}