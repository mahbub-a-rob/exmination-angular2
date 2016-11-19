import { Component } from '@angular/core';
import { Url } from '../factories/url.factory';
@Component({
	selector: 'examination-navbar',
	templateUrl: '../views/navbar.html',
	styleUrls: ['../styles/navbar.scss']
})
export class NavbarComponent {
	Url = Url;
}