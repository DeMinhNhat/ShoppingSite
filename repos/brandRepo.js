var db = require('./database');

exports.loadAll = () => {
	var sql = `select * from brands`;
	return db.load(sql);
}

exports.single = id => {
	var sql = `select * from brands where BraID = ${id}`;
	return db.load(sql);
}

exports.delete = id => {
	var sql = `delete from brands where BraID = ${id}`;
	return db.save(sql);
}

exports.count = () => {
	var sql = `select count(BraID) as total from brands`;
	return db.load(sql);
}