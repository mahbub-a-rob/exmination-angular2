import { Component } from '@angular/core';
import { Url } from './factories/url.fac';
@Component({
	selector: 'my-app',
	template: `
		<examination-navbar></examination-navbar>
		<section class="container">
			<router-outlet></router-outlet>
		</section>
	`
})
export class AppComponent {
	Url = Url;
}
