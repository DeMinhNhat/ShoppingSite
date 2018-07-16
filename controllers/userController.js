var express = require('express');
var userRepo = require('../repos/userRepo');
var sha256 = require('crypto-js/sha256');

var router = express.Router();

router.get('/', (req, res) => {
	res.render('user/index');
});

router.get('/register', (req, res) => {
	res.render('user/register');
});

router.post('/register', (req, res) => {
	res.render('user/register');
});

router.post('/login', (req, res) => {

	if (req.session.isLogged === true) {
		res.redirect('back');
		return;
	}

	var user = {
		email: req.body.email,
		password: sha256(req.body.password).toString()
	};

	userRepo.login(user).then(rows => {
		if (rows.length > 0) {
			req.session.isLogged = true;
			req.session.curUser = rows[0];
			if (req.session.prevUser === null || req.session.curUser.f_ID !== req.session.prevUser.f_ID) {
				// req.session.cart = [];
			}
			// req.session.prevUser = rows[0];

			res.redirect('back');
		} else {
			res.redirect('back');
		}
	});
});

router.post('/logout', (req, res) => {
	if (req.session.isLogged === false) {
		res.redirect('back');
		return;
	}

	req.session.isLogged = false;
	req.session.curUser = null;

	var url = req.originalUrl;
	if (url.indexOf('cart') > -1 || url.indexOf('order') > -1)
		res.redirect('/');
	else
		res.redirect('back');
});

module.exports = router;