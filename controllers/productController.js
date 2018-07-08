var express = require('express');

var router = express.Router();

router.get('/', (req, res) => {
	res.render('product/index');
});

router.get('/detail', (req, res) => {
	res.render('product/detail');
});

module.exports = router;