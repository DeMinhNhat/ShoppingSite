var brandRepo = require('../repos/brandRepo');
var cateRepo = require('../repos/cateRepo');
var clientRepo = require('../repos/clientRepo');

module.exports = (req, res, next) => {

	if (req.session.isLogged === undefined) {
		req.session.isLogged = false;
	}

	if (req.session.curUser === undefined) {
		req.session.curUser = null;
	}

	var p1 = brandRepo.loadAll();
	var p2 = cateRepo.loadAll();
	var p3 = clientRepo.loadAll();

	Promise.all([p1, p2, p3]).then(([bras, cates, clients]) => {

		var client_infos = [];

		for (var i = 0; i < clients.length; i++) {

			var cate_infos = [];
			for (var j = 0; j < cates.length; j++) {
				if (cates[j].CliID === clients[i].CliID)
					cate_infos.push(cates[j]);
			}

			var info = {
				client: clients[i],
				cates: cate_infos
			}

			client_infos.push(info);
		}

		res.locals.layoutVM = {
			brands: bras,
			client_infos: client_infos,
			isLogged: req.session.isLogged,
			curUser: req.session.curUser
			// cartSummary: cartRepo.getNumberOfItems(req.session.cart)
		}

		next();
	});
}