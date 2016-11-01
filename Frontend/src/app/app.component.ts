import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatedFactory } from './factories/authenticated.factory';

@Component({
    selector: 'app',
    template: `
        <app-navbar 
            [routeURL]="routeURL" 
            [tokenLogin]="tokenLogin" 
            (sidebarOut)="sidebarOut($event)"></app-navbar>
        <div [ngClass]="{'sidebar':sidebarToggle, 'container-fluid authentication':tokenLogin}">
            <router-outlet></router-outlet>
        </div>
    `,
    styleUrls: ['./app.less']
})
export class AppComponent implements OnInit {
    routeURL: string;
    tokenLogin: string;
    sidebarToggle: boolean = false;

    constructor(private router: Router) { }

    ngOnInit() {
        this.router.events.subscribe(r => this.activeRouter(decodeURIComponent(r.url)));
    }

    sidebarOut(toggle) {
        this.sidebarToggle = toggle;
    }

    private activeRouter(url) {
        this.routeURL = url;
        this.tokenLogin = AuthenticatedFactory.getAuthenticated;
        this.processAuthenticated();
    }

    private processAuthenticated() {
        document.body.className = 'authenticated';
    }
}
