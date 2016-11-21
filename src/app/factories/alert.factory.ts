declare let $;
export class AlertFactory {

	public static alert(title, content) {
		return new Promise(resolve => {
			$.alert({
				title: title,
				content: content,
				animation: 'rotateX',
				closeAnimation: 'rotateX',
				theme: 'supervan',
				buttons: {
					okButton: {
						text: 'ตกลง',
						action: () => { }
					}
				}
			});
		});
	}

	public static confirm(title: string, content: string) {
		return new Promise(resolve => {
			$.confirm({
				title: title,
				content: content,
				animation: 'rotateX',
				closeAnimation: 'rotateX',
				theme: 'supervan',
				buttons: {
					confirmButton: {
						text: 'ยืนยันการทำรายการ',
						action: () => resolve(true)
					},
					cancelButton: {
						text: 'ไม่ ขอบคุณ',
						action: () => resolve(false)
					}
				}
			});
		});
	}
}