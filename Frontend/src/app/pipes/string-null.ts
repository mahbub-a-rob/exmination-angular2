import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'string_null' })
export class StringNullPipe implements PipeTransform {

    transform(value: string, textReplace: string = 'ไม่มีข้อมูล !') {
        let text = value;
        if (value == null) { text = textReplace; }
        else if (value.toString().trim() == '') { text = textReplace; }
        return text;
    }

}