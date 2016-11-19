import { Component } from '@angular/core';
import { AuthenticationService as service } from '../services/authentication.service';
@Component({
	selector: 'examination-signin',
	templateUrl: '../views/signin.html',
	styleUrls: ['../styles/signin.scss'],
	providers: [service]
})
export class SigninComponent {
	constructor(private service: service) { }
}