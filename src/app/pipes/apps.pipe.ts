import { Pipe, PipeTransform } from '@angular/core';
const month = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน',
    'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม',
    'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
];

declare let $: any;

@Pipe({
    name: 'examDate'
})
export class DatePipe implements PipeTransform {

    transform(value) {
        let datetime = new Date(value);
        return datetime.getDate() + ' ' + month[datetime.getMonth()] + ' ' + (datetime.getFullYear() + 543);
    }

}


@Pipe({
    name: 'examNullText'
})
export class NullTextPipe implements PipeTransform {

    transform(value) {
        if ($.trim(value) === '')
            return 'ไม่มีข้อมูล !';
        return value;
    }

}