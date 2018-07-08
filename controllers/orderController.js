var express = require('express');

var router = express.Router();

router.get('/', (req, res) => {
	res.render('order/index');
});

router.get('/detail', (req, res) => {
	res.render('order/detail');
});

module.exports = router;