import { Directive, ElementRef, OnInit, DoCheck } from '@angular/core';
declare let $: any;
@Directive({ selector: '[loading]', inputs: ['loading'] })
export class ButtonLoadingDirective implements OnInit, DoCheck {
    element: any;
    oldHtml: string;
    newHtml: string;
    loading: boolean = false;
    private static loadingText = '<i class="fa fa-spin fa-circle-o-notch"></i> กำลังโหลด..';

    constructor(elm: ElementRef) { this.element = $(elm.nativeElement); }

    ngOnInit() {
        this.backupHTML();
    }

    ngDoCheck() {
        this.processLoading();
    }

    private backupHTML(): void {
        this.oldHtml = $.trim(this.element.html());
        this.newHtml = ButtonLoadingDirective.loadingText;
    }

    private processLoading(): void {
        if (this.loading === null) return;
        this.element.prop('disabled', this.loading);
        this.element.html(this.loading ? this.newHtml : this.oldHtml);
    }

    static setLoading(jelem: any, status: boolean = true) {
        jelem.prop('disabled', status);
        let attr = 'loading-html';
        if (status) {
            jelem.attr(attr, jelem.html());
            jelem.html(ButtonLoadingDirective.loadingText);
        }
        else { jelem.html(jelem.attr(attr)); }
    }
}