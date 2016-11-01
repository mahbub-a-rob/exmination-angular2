declare let $: any;

export interface IAlert {
    status: boolean;
    alert: any;
}

export class AlertFactory {

    static loading(jconform?: any) {
        return $.dialog({
            closeIcon: false,
            columnClass: "col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1 text-center",
            title: 'กำลังโหลดข้อมูล',
            content: '<i class="fa fa-spin fa-circle-o-notch"></i> กรุณารอซักครู่...',
            theme: 'black',
            onClose: () => { if (jconform) jconform.close(); }
        });
    }

    static alert(text: string, title: string = "ระบบมีการแจ้งเตือน!") {
        return new Promise((resolve, reject) => {
            $.alert({
                title: title,
                content: text,
                animation: 'rotateY',
                closeAnimation: 'rotateYR',
                confirm: function () {
                    resolve(true);
                },
                closeIcon: true,
                confirmButton: 'ตกลง',
                theme: 'black'
            });
        });
    }

    static confirm(text: string, title: string = null, close: boolean = true) {
        title = title || "คุณต้องการจะทำรายการต่อหรือไม่?";
        return new Promise((resolve: (value?: IAlert) => void, reject) => {
            let confirm = $.confirm({
                title: title,
                content: text,
                animation: 'rotateX',
                closeAnimation: 'rotateXR',
                confirm: function () {
                    resolve({ status: true, alert: confirm });
                    return close;
                },
                cancel: function () {
                    resolve({ status: false, alert: confirm });
                },
                closeIcon: true,
                confirmButton: 'ตกลง',
                cancelButton: 'ยกเลิก',
                theme: 'black',
                cancelButtonClass: "btn-default btn-cancel",
                confirmButtonClass: "btn-default btn-confirm"
            });
        });
    }

    static error(content: string, title: string = 'ระบบทำงานล้มเหลว !') {
        return new Promise((resolve, reject) => {
            $.confirm({
                title: `<span class="text-danger"><i class="fa fa-times-circle"></i> ${title}</span>`,
                content: content,
                animation: 'rotateY',
                closeAnimation: 'rotateYR',
                confirm: function () {
                    resolve(true);
                    location.reload();
                },
                cancel: function () {
                    resolve(false);
                },
                closeIcon: true,
                confirmButton: '<span class="text-danger">รีเฟรชใหม่</span>',
                cancelButton: 'ปิดหน้านี้',
                theme: 'black',
                autoClose: 'confirm|6000'
            });
        });
    }

    static warning(text: string, title: string = "ระบบเกิดข้อผิดพลาด !") {
        return new Promise((resolve, reject) => {
            $.alert({
                title: `<span class="text-warning"><i class="fa fa-warning"></i> ${title}</span>`,
                content: text,
                animation: 'rotateY',
                closeAnimation: 'rotateYR',
                confirm: function () {
                    resolve(true);
                },
                closeIcon: true,
                confirmButton: `<span class="text-warning">ตกลง</span>`,
                theme: 'black'
            });
        });
    }

    static success(text: string, title: string = "ระบบทำรายการสำเร็จ") {
        return new Promise((resolve, reject) => {
            $.alert({
                title: `<span class="text-success"><i class="fa fa-check-o"></i> ${title}</span>`,
                content: text,
                animation: 'rotateY',
                closeAnimation: 'rotateYR',
                confirm: function () {
                    resolve(true);
                },
                closeIcon: true,
                confirmButton: `<span class="text-success">ตกลง</span>`,
                theme: 'black'
            });
        });
    }
}