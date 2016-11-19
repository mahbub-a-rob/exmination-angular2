import { Component } from '@angular/core';
import { Url } from './factories/url.factory';
@Component({
	selector: 'examination-app',
	template: `
		<section class="container">
			<router-outlet></router-outlet>
		</section>
	`
})
export class AppComponent {
	Url = Url;
}
