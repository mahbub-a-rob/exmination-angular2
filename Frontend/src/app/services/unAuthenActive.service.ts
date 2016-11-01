import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticatedFactory } from '../factories/authenticated.factory';
import { URL } from '../factories/URL.factory';

@Injectable()
export class UnAuthenticatedActive implements CanActivate {
    private URL = URL;
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (AuthenticatedFactory.getAuthenticated != null) {
            this.router.navigate([this.URL.dashboard]);
            return false;
        }
        return true;
    }

}