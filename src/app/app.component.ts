import { Component, DoCheck } from '@angular/core';
import { Url } from './factories/url.factory';
import { AuthorizationFactory } from './factories/authorization.factory';
@Component({
	selector: 'examination-app',
	template: `
		<section class="container">
			<header *ngIf="member">
				<h1 class="header-logo">
					<span>e</span>xamination<span>o</span>nline
				</h1>
			</header>
			<router-outlet></router-outlet>
		</section>
	`
})
export class AppComponent implements DoCheck {
	member: any;

	ngDoCheck() { this.member = AuthorizationFactory.getMember; }
}
