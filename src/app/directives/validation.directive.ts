import { Directive, DoCheck, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationFactory } from '../factories/validation.factory';
declare let $;
@Directive({
    selector: 'validation',
    inputs: ['control']
})
export class ValidationDirective implements DoCheck {
    control: FormControl;
    jelement: any;
    jinput: any;
    timeout: any;
    nodeName: any;
    constructor(element: ElementRef) {
        this.jelement = $(element.nativeElement);
        this.jinput = this.jelement.prev('.form-control');
        this.nodeName = this.jinput.prop('nodeName');
        this.jelement.addClass('validation');
    }

    ngDoCheck() {
        if (this.control.untouched) return;
        this.jelement.empty();
        this.jelement.removeClass('text-danger text-success');
        if (this.control.valid) {
            this.jelement.addClass('text-success');
        }
        else {
            this.jelement.addClass('text-danger');
            this.jelement.append(`<span class="fa fa-warning"></span> ${ValidationFactory.getMessage(this.control, this.nodeName)}`);
        }
    }

}