//Watch auth
auth.onAuthStateChanged((s) => {
	if (s) {
		console.log('Logged in!');
		const got = db
			.collection('articles')
			.get()
			.then((snapshot) => {
				loadArticle(snapshot.docs);
			});
	} else {
		console.log('Logged out!');
		loadArticle(null);
	}
});

//Create account

const signUpForm = document.querySelector('#signup-form');

signUpForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const email = signUpForm['signup-email'].value;
	const pass = signUpForm['signup-password'].value;

	auth
		.createUserWithEmailAndPassword(email, pass)
		.then((result) => {
			//console.log(result.user);

			const modal = document.querySelector('#modal-signup');
			M.Modal.getInstance(modal).close();
			signUpForm.reset();
		})
		.catch((error) => console.log(error.message));
});

//Log out
const logout = document.querySelector('#logout');

logout.addEventListener('click', (e) => {
	e.preventDefault();

	auth
		.signOut()
		.then(() => {
			//console.log('Logged out succesfully!');
		})
		.catch((error) => console.log(error.message));
});

//Log in
const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const email = loginForm['login-email'].value;
	const pass = loginForm['login-password'].value;

	auth
		.signInWithEmailAndPassword(email, pass)
		.then((result) => {
			//console.log(result.user);

			const modal = document.querySelector('#modal-login');
			M.Modal.getInstance(modal).close();
			loginForm.reset();
		})
		.catch((error) => console.log(error.message));
});

//Acconut Details
/* const account = document.querySelector('#account');
const accDetails = document.querySelector('.account-details');

account.addEventListener('click', async function () {
	accDetails.innerHTML =
		await `<p>Your email address: ${auth.currentUser.email}</p>`;
});
console.log(auth);
 */
