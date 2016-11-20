export const Url = {
	Home: set(''),
	Signin: set('เข้าสู่ระบบ'),
	Signup: set('ลงทะเบียน'),
	Dashbard: set('แดชบอร์ด')
};

function set(url) {
	let exe = '';
	return url == '' ? '' : url + exe;
}