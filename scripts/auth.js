//Watch auth
auth.onAuthStateChanged((s) => {
	if (s) {
		console.log('Logged in!');
		const got = db.collection('articles').onSnapshot((snapshot) => {
			loadArticle(snapshot.docs);
			getUser(s);
		});
	} else {
		console.log('Logged out!');
		//getUser(auth.currentUser.uid);
		loadArticle(null);
		getUser();
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

			return db
				.collection('users')
				.doc(result.user.uid)
				.set({
					bio: signUpForm['signup-info'].value,
				})
				.then(() => {
					const modal = document.querySelector('#modal-signup');
					M.Modal.getInstance(modal).close();
					signUpForm.reset();
				});
		})
		.catch((error) => {
			alert(error.message);
			//console.log(error.message);
		});
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
		.catch((error) => alert(error.message));
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
		.catch((error) => alert(error.message));
});

//Save article
const newArticleForm = document.querySelector('#create-form');
newArticleForm.addEventListener('submit', (e) => {
	e.preventDefault();
	db.collection('articles')
		.add({
			title: newArticleForm['article-title'].value,
			content: newArticleForm['article-content'].value,
		})
		.then(() => {
			const modal = document.querySelector('#modal-create');
			M.Modal.getInstance(modal).close();
			newArticleForm.reset();
		})
		.catch((err) => console.log(err.message));
});
