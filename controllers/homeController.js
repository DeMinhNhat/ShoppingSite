var express = require('express');
var config = require('../config/config');
var productRepo = require('../repos/productRepo');

var router = express.Router();

router.get('/', (req, res) => {

	var p1 = productRepo.loadNewest(config.PRODUCTS_TO_EXPOSE, 1);
	var p2 = productRepo.loadTopViewed(config.PRODUCTS_TO_EXPOSE, 1);
	var p3 = productRepo.loadTopSold(config.PRODUCTS_TO_EXPOSE, 1);

	Promise.all([p1, p2, p3]).then(([newest, top_viewed, top_sold]) => {
		vm = {
			newest: newest,
			top_viewed: top_viewed,
			top_sold: top_sold
		};
		res.render('home/index', vm);
	});
});

module.exports = router;