var db = require('./database');

exports.loadAll = () => {
	var sql = `select * from products`;
	return db.load(sql);
}

exports.single = id => {
	var sql = `select * from products where ProID = ${id}`;
	return db.load(sql);
}

exports.loadNewest = (amount, offset) => {
	var sql = `select * from products
	order by ImportDate desc limit ${amount} offset ${offset}`;
	return db.load(sql);
}

exports.loadTopViewed = (amount, offset) => {
	var sql = `select * from products
	order by Clicks desc limit ${amount} offset ${offset}`;
	return db.load(sql);
}

exports.loadTopSold = (amount, offset) => {
	var sql = `select * from products
	order by SoldQuantity desc limit ${amount} offset ${offset}`;
	return db.load(sql);
}

exports.loadProducts = (amount, offset) => {
	var sql = `select * from products 
	limit ${amount} offset ${offset}`;
	return db.load(sql);
}

exports.loadSameCat = (amount, offset, catId) => {
	var sql = `select * from products where CatID = ${catId} 
	order by Clicks asc limit ${amount} offset ${offset}`;
	return db.load(sql);
}

exports.loadSameBra = (amount, offset, braId) => {
	var sql = `select * from products where BraID = ${braId} 
	order by Clicks asc limit ${amount} offset ${offset}`;
	return db.load(sql);
}

exports.count = () => {
	var sql = `select count(ProID) as total from products`;
	return db.load(sql);
}

exports.countByCat = catId => {
	var sql = `select count(ProID) as total from products where CatID = ${catId}`;
	return db.load(sql);
}

exports.countByBra = braId => {
	var sql = `select count(ProID) as total from products where BraID = ${braId}`;
	return db.load(sql);
}

exports.loadPageByWords = (amount, offset, words) => {

	var sql = `select * from products where `;

	for (var i = 0; i < words.length; i += 1) {
		var word = `%` + words[i] + `%`;
		sql = sql + `ProName like '${word}' or `;
	}
	sql += `1!=1  limit ${amount} offset ${offset}`;

	return db.load(sql);
}

exports.countByWords = words => {

	var sql = `select count(ProID) as total from products where `;
	for (var i = 0; i < words.length; i += 1) {
		var word = `%` + words[i] + `%`;
		sql = sql + `ProName like '${word}' or `;
	}
	sql += `1!=1`;

	return db.load(sql);
}

exports.UpdateQuantities = (proID, quantity) => {
	var sql = `update products set Quantity = Quantity - '${quantity}',
	SoldQuantity = SoldQuantity + '${quantity}'
	where ProID = '${proID}'`;
	return db.save(sql);
}

exports.UpdateMultiQuantities = arr_pros => {

	var sql = ``;
	for (var i = 0; i < arr_pros.length; i++) {
		sql += `update products set Quantity = Quantity - ${arr_pros[i].quantity},
		SoldQuantity = SoldQuantity + ${arr_pros[i].quantity} 
		where ProID = ${arr_pros[i].proID}; `;
	}
	console.log(sql);
	return db.saveAll(sql);
}