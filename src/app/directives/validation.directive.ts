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
    errorIcon: string = `<i class="fa fa-remove"></i> <span class="fa fa-warning"></span>`;
    successIcon: string = `<i class="fa fa-check"></i>`;
    jelement: any;
    timeout: any;
    constructor(element: ElementRef) {
        this.jelement = $(element.nativeElement);
        this.jelement.addClass('validation');
    }

    ngDoCheck() {
        if (this.control.untouched) return;
        this.jelement.empty();
        this.jelement.removeClass('text-danger text-success');
        if (this.control.valid) {
            this.jelement.addClass('text-success');
            this.jelement.append(`${this.successIcon}`);
        }
        else {
            this.jelement.addClass('text-danger');
            this.jelement.append(`${this.errorIcon} ${ValidationFactory.getMessage(this.control)}`);
        }
    }

}