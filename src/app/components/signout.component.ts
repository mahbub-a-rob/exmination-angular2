import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Url } from '../factories/url.factory';
@Component({
    selector: 'examination-signout',
    template: '',
    providers: [AuthenticationService]
})
export class SignoutComponent {
    constructor(router: Router, service: AuthenticationService) {
        service.onSignout();
        sessionStorage.clear();
        router.navigate([Url.Signin]);
    }
}