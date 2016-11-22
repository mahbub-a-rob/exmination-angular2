export const Url = {
	Home: set(''),
	Signin: set('เข้าสู่ระบบ'),
	Signup: set('ลงทะเบียน'),
	Signout: set('ออกจากระบบ'),
	Dashboard: set('แดชบอร์ด'),
	Subject: set('รายวิชา'),
	Examination: set('ชุดข้อสอบ'),
	Question: set('โจทย์ข้อสอบ')
};

function set(url) {
	let exe = '';
	return url == '' ? '' : url + exe;
}