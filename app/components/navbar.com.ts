import { Component } from '@angular/core';
import { Url } from '../factories/url.fac';
@Component({
	selector: 'examination-navbar',
	templateUrl: 'app/views/navbar.html',
	styleUrls: ['app/styles/navbar.css']
})
export class NavbarComponent {
	Url = Url;
}