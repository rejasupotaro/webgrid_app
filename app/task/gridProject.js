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
	this.taskIndex = 0;

	this.db.open(function(err, db) {
		db.dropCollection("test", function(err, result) {
			db.collection("test", function(err, collection) {
					callback(collection)
			})
		})
	})
  return this;
}

GridProject.prototype.commit = function() {
  this.db.close()
  console.log("project db is ready")
}

GridProject.prototype.addTask = function(collection, func, args) {
	var task = {
		taskId: ++this.taskIndex,
		func: func.toString(),
		args: args,
		state: "wait"
	}
	
	collection.insert(task)
}
