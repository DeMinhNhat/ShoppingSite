var categoryRepo = require('../repos/categoryRepo');
var brandRepo = require('../repos/brandRepo');
var cartRepo = require('../repos/cartRepo');

module.exports = (req, res, next) => {

	if (req.session.isLogged === undefined) {
		req.session.isLogged = false;
	}

	if (req.session.curUser === undefined) {
		req.session.curUser = null;
	}

	var p1 = categoryRepo.loadAll();
	var p2 = brandRepo.loadAll();

	Promise.all([p1, p2]).then(([cates, bras]) => {
		res.locals.layoutVM = {
			categories: cates,
			brands: bras,
			isLogged: req.session.isLogged,
			curUser: req.session.curUser,
			cartSummary: cartRepo.getNumberOfItems(req.session.cart)
		}

		next();
	});
}