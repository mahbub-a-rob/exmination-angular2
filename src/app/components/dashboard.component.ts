import { Component } from '@angular/core';
import { Url } from '../factories/url.factory';

interface IBox {
    path: string;
    text: string;
    detail: string;
    icon: string;
    color: string;
    class: string;
}

@Component({
    selector: 'examination-dashboard',
    templateUrl: '../views/dashboard.html',
    styleUrls: ['../styles/dashboard.scss']
})
export class DashboardComponent {
    constructor() { }

    boxs: Array<IBox> = [
        {
            path: Url.Dashboard,
            text: 'ข้อมูลของฉัน',
            detail: 'my profile',
            icon: 'fa-user',
            color: 'darkkhaki',
            class: null
        },
        {
            path: Url.Subject,
            text: 'รายวิชาของฉัน',
            detail: 'my subjects',
            icon: 'fa-book',
            color: 'cornflowerblue',
            class: null
        },
        {
            path: Url.Examination,
            text: 'ข้อสอบของฉัน',
            detail: 'my examination',
            icon: 'fa-file-text',
            color: 'darkseagreen',
            class: null
        },
        {
            path: Url.Signout,
            text: 'ออกจากระบบ',
            detail: 'log out',
            icon: 'fa-sign-out',
            color: "sandybrown",
            class: null
        }
    ];
}