import { Directive, ElementRef, Renderer, OnInit } from '@angular/core';
@Directive({
    selector: 'select[class=form-control]',
    host: {
        '(change)': 'onChange($event)'
    }
})
export class SelectDirective implements OnInit {

    constructor(private element: ElementRef, private rander: Renderer) { }

    ngOnInit() { this.changeClass(this.element.nativeElement); }

    onChange(event: Event) { this.changeClass(event.currentTarget); }

    changeClass(element) {
        let select = <HTMLSelectElement>element;
        this.rander.setElementClass(element, 'has-value', select.value != '');
    }
}