import { Component } from '@angular/core';
import { Url } from '../factories/url.factory';
@Component({
	selector: 'examination-signup',
	templateUrl: '../views/signup.html',
	styleUrls: ['../styles/signup.scss']
})
export class SignupComponent {
	Url = Url;
}