import { Component, ElementRef, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationFactory } from './validation.factory';
declare let $: any;
@Component({
    selector: 'validation-message',
    template: `<span class="fa fa-exclamation-triangle"></span> {{getMessages}}`,
    styles: ['.fa{ font-size: 11px; }']
})
export class ValidationComponent {
    element: any;
    parent: any;
    valid: boolean = null;
    successIcon: string = 'fa fa-check-circle';
    errorIcon: string = 'fa fa-times-circle';
    @Input() control: FormControl;

    constructor(elementref: ElementRef) {
        this.element = $(elementref.nativeElement);
        this.element.hide();
        this.parent = this.element.parent();
        this.parent.find('label').addClass('control-label');
        this.element.addClass('control-label');
        this.parent.addClass('has-feedback');
    }

    get getMessages(): string {
        let errors = this.control.errors;
        let message = null;
        for (let propertyName in errors) {
            if (errors.hasOwnProperty(propertyName)) {
                message = ValidationFactory.getMessages(propertyName);
                break;
            }
        }
        // touched
        if (this.control.touched && this.valid !== this.control.valid) {
            // clear class
            this.parent.removeClass('has-success has-error');
            this.parent.find('.form-control-feedback').remove();
            // valid
            if (this.control.valid) {
                this.element.slideUp();
                this.parent.addClass('has-success');
                if (this.parent.find('.form-control').prop('nodeName') === 'INPUT')
                    this.element.before(`<span class="form-control-feedback ${this.successIcon}"></span>`);
            }
            // invalid
            else {
                this.element.slideDown();
                this.parent.addClass('has-error');
                if (this.parent.find('.form-control').prop('nodeName') === 'INPUT')
                    this.element.before(`<span class="form-control-feedback ${this.errorIcon}"></span>`);
            }
            // set new value
            this.valid = this.control.valid;
        }
        return message;
    }
}