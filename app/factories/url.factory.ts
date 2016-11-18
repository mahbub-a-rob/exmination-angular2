export const Url = {
	Home: set(''),
	Signin: set('signin'),
	Signup: set('signup')
};

function set(url) {
	let exe = '';
	return url == '' ? '' : url + exe;
}