var express = require('express');
var config = require('../config/config');
var productRepo = require('../repos/productRepo');

var router = express.Router();

router.get('/', (req, res) => {

	var page = req.query.page;
	if (!page) page = 1;
	if (page < 1) page = 1;

	var offset = (page - 1) * config.PRODUCTS_PER_PAGE;

	var p1 = productRepo.loadProducts(config.PRODUCTS_PER_PAGE, offset);
	var p2 = productRepo.count();

	Promise.all([p1, p2]).then(([rows, count_rows]) => {
		var total = count_rows[0].total;
		var nPages = total / config.PRODUCTS_PER_PAGE;
		if (total % config.PRODUCTS_PER_PAGE > 0)
			nPages++;

		var numbers = [];
		for (i = 1; i <= nPages; i++) {
			numbers.push({
				value: i,
				isCurrentPage: i === +page
			});
		}

		var vm = {
			products: rows,
			noProducts: rows.length === 0,
			page_numbers: numbers
		};
		res.render('product/index', vm);
	});
});

router.get('/detail/:proId', (req, res) => {
	var proId = req.params.proId;
	if (proId < 1) {
		res.render('error/index');
		return;
	}

	productRepo.loadSingle(proId).then(rows => {
		if (rows.length > 0) {
			var p1 = productRepo.loadSameCat(rows[0].CatID);
			var p2 = productRepo.loadSameBra(rows[0].BraID);

			Promise.all([p1, p2]).then(([same_cats, same_bras]) => {
				vm = {
					same_cats: same_cats,
					same_bras: same_bras,
					product: rows[0]
				};
				res.render('product/detail', vm);
			});

		} else {
			res.render('error/index');
		}
	});
});

module.exports = router;