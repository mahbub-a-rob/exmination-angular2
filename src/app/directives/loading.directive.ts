import { Directive, ElementRef, AfterViewInit, DoCheck } from '@angular/core';
declare let $: any;
@Directive({
    selector: '[loading]',
    inputs: [
        'loading',
        'text'
    ]
})
export class LoadingDirective implements DoCheck, AfterViewInit {
    constructor(elm: ElementRef) {
        this.element = elm.nativeElement;
    }

    element: any;
    oldHtml: string;
    text: string;
    loadingHtml: string;
    loading: boolean;
    nodeName: string;

    ngAfterViewInit() {
        this.processElement();
    }

    ngDoCheck() {
        this.processLoading();
    }

    private processElement() {
        let loadingHtml = this.text || 'กำลังโหลดข้อมูล..';
        this.loadingHtml = '<i class="fa fa-spin fa-circle-o-notch"></i> ' + loadingHtml;
        this.nodeName = this.element.nodeName;
        this.oldHtml = $.trim(this.element.innerHTML);
    }

    private processLoading() {
        if (!this.nodeName || typeof this.loading != 'boolean') return;
        switch (this.nodeName.toLowerCase()) {
            case 'button':
                if (this.loading) this.element.innerHTML = this.loadingHtml;
                else this.element.innerHTML = this.oldHtml;
                this.element.disabled = this.loading;
                break;
        }
    }
}