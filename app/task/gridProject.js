var _ = require("underscore")
var Db = require('mongodb').Db
var Connection = require('mongodb').Connection
var Server = require('mongodb').Server
var mongo = require('mongodb')

module.exports = GridProject

function GridProject() {
	this.server = new Server("127.0.0.1", 27017, {})
}

GridProject.prototype.createProject = function(projectName, callback) {
	this.projectName = projectName
	this.db = new Db(this.projectName, this.server, {native_parser:true})

	this.db.open(function(err, db) {
		console.log(">> Drop Collection Before Create")
		db.dropCollection("test", function(err, result) {
			//console.log("dropped: ")
			//console.dir(result)
		})

		console.log(">> Create Project Collection")
		db.collection("test", function(err, collection) {
			//console.log("created: ");
			//console.dir(collection);
		})

		db.collection("test", function(err, collection) {
			callback(collection)
		})
	})

}

GridProject.prototype.addTask = function(collection, func, args) {
	console.log(">> Insert Test Data")
	var objects = {}
	collection.insert(objects)
}
