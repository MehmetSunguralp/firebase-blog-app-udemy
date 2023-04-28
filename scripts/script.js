//Show articles
const articles = document.querySelector('.article-list');
const loadArticle = (data) => {
	if (data) {
		let html = '';
		data.forEach((doc) => {
			const article = doc.data();
			//console.log(article);
			const li = `<li>
							<div class="collapsible-header blue lighten-5">${article.title}</div>
							<div class="collapsible-body white"><span>${article.content}</span></div>
						</li>`;
			html += li;
		});
		articles.innerHTML = html;
	} else {
		articles.innerHTML = `<h5 class="center-align">Please log in to see the content!</h5>`;
	}
};

//Modals
document.addEventListener('DOMContentLoaded', () => {
	var modals = document.querySelectorAll('.modal');
	M.Modal.init(modals);

	var articles = document.querySelectorAll('.collapsible');
	M.Collapsible.init(articles);
});

//Show menu links according to auth status
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

const accDetails = document.querySelector('.account-details');

const getUser = (user) => {
	if (user) {
		db.collection('users')
			.doc(user.uid)
			.get()
			.then((doc) => {
				let html = `<div><b>Your email address:</b> ${user.email}</div>
							<div><b>Personal Information:</b> ${doc.data().bio}</div>
							`;
				accDetails.innerHTML = html;
			});
		//Acc. detail
		//Show articles
		loggedInLinks.forEach((item) => (item.style.display = 'block'));
		loggedOutLinks.forEach((item) => (item.style.display = 'none'));
	} else {
		accDetails.innerHTML = null;
		loggedInLinks.forEach((item) => (item.style.display = 'none'));
		loggedOutLinks.forEach((item) => (item.style.display = 'block'));
	}
};
