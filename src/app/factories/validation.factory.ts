import { FormControl } from '@angular/forms';

export const ValidationPatterns = {

};

export const ValidationMessages = {
    required: 'กรุณากรอกข้อมูล',
    pattern: 'กรุณากรอกข้อมูลให้ถูกต้อง',
    minlength: 'กรุณากรอกข้อมูลอย่างน้อย {0} ตัว',
    maxlength: 'กรุณากรอกข้อมูลห้ามเกิน {0} ตัว'
};

export class ValidationFactory {

    public static getMessage(control: FormControl): string {
        let errors = control.errors;
        let message = '';
        for (let e in errors) {
            switch (e) {
                case 'maxlength':
                case 'minlength':
                    message = ValidationMessages[e].replace('{0}', errors[e].requiredLength);
                    break;
                default:
                    message = ValidationMessages[e];
                    break;
            }
            break;
        }
        return message;
    }

}