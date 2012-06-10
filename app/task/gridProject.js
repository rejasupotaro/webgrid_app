module.exports = GridProject

function GridProject() {
	var mongo = require('mongodb')
	var server = new mongo.Server("127.0.0.1", 27017, {})
	this._db = new mongo.Db(this._projectName, server, {})
	this._collection

	db.open(function(err, _db) {
		db.collection('project_name', function(err, collection) {
			this._collection = collection
		})
	})

	this_collections.find({}, function(err, cursor) {
		cursor.each(function(err, doc) {
			if (doc) sys.log(doc._id)
		})
	})
}


GridProject.prototype.addTask = function(func, args) {
}
