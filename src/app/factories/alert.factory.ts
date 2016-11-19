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
}