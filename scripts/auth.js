//Watch auth
auth.onAuthStateChanged((s) => {
	if (s) {
		const logout = document.querySelectorAll('.logged-out');
		logout.forEach((e) => {
			e.classList.add('hide');
		});
		const login = document.querySelectorAll('.logged-in');
		login.forEach((e) => {
			e.classList.remove('hide');
		});
		console.log('Logged in succesfully!');
	} else {
		const login = document.querySelectorAll('.logged-in');
		login.forEach((e) => {
			e.classList.add('hide');
		});
		const logout = document.querySelectorAll('.logged-out');
		logout.forEach((e) => {
			e.classList.remove('hide');
		});
		console.log('Logged out successfully!');
	}
});

//Create account

const signUpForm = document.querySelector('#signup-form');

signUpForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const email = signUpForm['signup-email'].value;
	const pass = signUpForm['signup-password'].value;

	auth.createUserWithEmailAndPassword(email, pass).then((result) => {
		//console.log(result.user);

		const modal = document.querySelector('#modal-signup');
		M.Modal.getInstance(modal).close();
		signUpForm.reset();
	});
});

//Log out
const logout = document.querySelector('#logout');

logout.addEventListener('click', (e) => {
	e.preventDefault();

	auth.signOut().then(() => {
		//console.log('Logged out succesfully!');
	});
});

//Log in
const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const email = loginForm['login-email'].value;
	const pass = loginForm['login-password'].value;

	auth.signInWithEmailAndPassword(email, pass).then((result) => {
		//console.log(result.user);

		const modal = document.querySelector('#modal-login');
		M.Modal.getInstance(modal).close();
		loginForm.reset();
	});
});
