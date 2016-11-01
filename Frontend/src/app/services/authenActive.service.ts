import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { URL } from '../factories/URL.factory';
import { AuthenticatedFactory } from '../factories/authenticated.factory';

@Injectable()
export class AuthenticatedActive implements CanActivate {
    private URL = URL;
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (AuthenticatedFactory.getAuthenticated == null) {
            this.router.navigate([this.URL.login, { return: decodeURIComponent(state.url) }]);
            return false;
        }
        return true;
    }

}