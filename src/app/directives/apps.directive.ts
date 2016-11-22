import { Directive, ElementRef, Renderer, OnInit, DoCheck } from '@angular/core';
@Directive({
    selector: 'select[class=form-control]'
})
export class SelectDirective implements OnInit, DoCheck {

    constructor(private element: ElementRef, private rander: Renderer) { }

    ngOnInit() { this.changeClass(this.element.nativeElement); }

    ngDoCheck() { this.changeClass(this.element.nativeElement); }

    changeClass(element) {
        let select = <HTMLSelectElement>element;
        this.rander.setElementClass(element, 'has-value', select.value != '');
    }
}