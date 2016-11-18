import { Component } from '@angular/core';
import { Url } from './factories/url.fac';
@Component({
    selector: 'my-app',
    template: `
		<a href="" [routerLink]="Url.Home">Home</a>
		<a href="" [routerLink]="Url.Signin">Signin</a>
		<a href="" [routerLink]="Url.Signup">Signup</a>
		<div>
			<router-outlet></router-outlet>
		</div>
	`
})
export class AppComponent {
    Url = Url;
}
