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

router.get('/detail', (req, res) => {
	res.render('product/detail');
});

module.exports = router;