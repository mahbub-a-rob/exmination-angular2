import { Component, EventEmitter } from '@angular/core';
import { URL } from '../../factories/URL.factory';
import { Router } from '@angular/router';
import { AuthenticatedFactory } from '../../factories/authenticated.factory';
import { MemberService } from '../../services/member.service';
declare let $: any;
@Component({
    selector: 'app-navbar',
    styleUrls: ['navbar.less'],
    templateUrl: 'navbar.html',
    inputs: [
        'routeURL',
        'tokenLogin'
    ],
    outputs: ['sidebarOut'],
    providers: [MemberService]
})
export class NavbarComponent {
    URL = URL;
    routeURL: string;
    tokenLogin: string;
    sidebarBars: boolean = false;
    sidebarOut = new EventEmitter()

    constructor(private router: Router, private member: MemberService) { }

    // Logout
    onLogout(): void {
        AuthenticatedFactory.clearAuthenticated();
        this.router.navigate(['/', this.URL.login]);
    }

    // get routerURL process
    get routerPage(): string {
        if (!this.routeURL) return null;
        return this.routeURL.replace('/', '');
    }

    // get member data
    get personal() {
        if (this.member.instans == null) return {};
        return this.member.instans;
    }

    // sidebar toggle
    sidebarToggle(toggle) {
        this.sidebarBars = toggle;
        // out event
        this.sidebarOut.emit(toggle);
    }
}