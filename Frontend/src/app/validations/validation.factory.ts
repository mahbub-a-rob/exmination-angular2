import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

export const Petterns = {
    EmailAddress: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/,
    Password: /^[A-z0-9]{8,15}$/
};

export class ValidationFactory {

    static getMessages(propertyName, propertyValue?: any) {
        const configs = {
            "required": 'กรุณากรอกข้อมูล',
            'emailaddress': 'กรุณากรอกข้อมูลในรูปแบบอีเมล์',
            'password': 'รหัสผ่านต้องเป็นตัวอักษรหรือตัวเลข 8-15 ตัว',
            'number': 'กรุณากรอกข้อมูลเป็นตัวเลข'
        };
        return configs[propertyName];
    }

    static EmailAddress(control: FormControl) {
        if (!control.value.match(Petterns.EmailAddress)) {
            return { 'emailaddress': true };
        }
        return null;
    }

    static Password(control: FormControl) {
        if (!control.value.match(Petterns.Password)) {
            return { 'password': true };
        }
        return null;
    }

    static Number(control: FormControl) {
        if (isNaN(control.value)) {
            return { 'number': true }
        }
        return null;
    }

}