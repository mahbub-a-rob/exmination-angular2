import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SessionFactory } from '../factories/session.factory';
import { AuthorizationFactory } from '../factories/authorization.factory';
import { Url } from '../factories/url.factory';

@Injectable()
export class AuthorizationService implements CanActivate {
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (AuthorizationFactory.getAuthorization) return true;
        this.router.navigate([Url.Signin, { returnUrl: state.url }]);
        return false;
    }
}

@Injectable()
export class UnAuthorizationService implements CanActivate {
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!AuthorizationFactory.getAuthorization) return true;
        this.router.navigate([Url.Dashbard]);
        return false;
    }

}