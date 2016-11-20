import { FormControl } from '@angular/forms';

export const ValidationPatterns = {
    email: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
    password: /^[a-zA-Z0-9]{6,20}$/
};

export const ValidationMessages = {
    required: 'กรุณากรอกข้อมูล',
    pattern: 'กรุณากรอกข้อมูลให้ถูกต้อง',
    minlength: 'กรุณากรอกข้อมูลอย่างน้อย {0} ตัว',
    maxlength: 'กรุณากรอกข้อมูลห้ามเกิน {0} ตัว',
    email: 'กรุณากรอกข้อมูลอยู่ในรูปแบบอีเมล์',
    password: 'กรุณากรอกข้อมูลตัวภาษาอังกฤษหรือตัวเลข 6-20 ตัว'
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
                case 'message':
                    message = errors[e];
                    break;
                default:
                    message = ValidationMessages[e];
                    break;
            }
            break;
        }
        return message;
    }

    // validators
    public static email(control: FormControl) {
        if (control.invalid) return;
        if (!control.value.match(ValidationPatterns.email))
            return { email: '' };
        return;
    }

    public static password(control: FormControl) {
        if (control.invalid) return;
        if (!control.value.match(ValidationPatterns.password))
            return { password: '' };
        return;
    }
}