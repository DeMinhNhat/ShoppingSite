var db = require('./database');

exports.loadAll = () => {
	var sql = `select * from clienteles`;
	return db.load(sql);
}

exports.single = id => {
	var sql = `select * from clienteles where CliID = ${id}`;
	return db.load(sql);
}

exports.delete = id => {
	var sql = `delete from clienteles where CliID = ${id}`;
	return db.save(sql);
}

exports.count = () => {
	var sql = `select count(*) as total from clienteles`;
	return db.load(sql);
}