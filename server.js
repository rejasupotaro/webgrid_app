var webgrid = require('webgrid'),
	env = process.env.NODE_ENV || 'development',
	config = require('./app/config/' + env),
	app = webgrid.createApp(__dirname, config),
	port = config.port || 3000;

app.configure(function() {
  app.use(webgrid.static(__dirname + '/app/public'))
})

app.configure('development', function() {
  app.use(webgrid.errorHandler({ dumpExceptions: true, showStack: true }))
})

app.configure('production', function() {
  app.use(webgrid.errorHandler())
})

app.all('/admin', webgrid.basicAuth(function (user, pass) {
  return user === config.user && pass === config.pass
}))

routes = require('./app/routes')
app.get('/', routes.index)
app.get('/admin', routes.admin)

app.listen(port)
console.log('webgrid running on port ' + port)

//app.readTaskFile(require(__dirname + '/app/task/'));
//app.setProject('test', require(__dirname + '/app/task/'));
var project = require('./app/task/index')
project()

app.redisClient.get("test", function(err, data){
	if (err) {
		console.log('err: ' + err);
	} else {
		func = data;
	}
});

var io = webgrid.listen(app)
io.sockets.on('connection', function(socket) {
	console.log('connected')

	socket.on('message', function(message) {
		console.log('on message: ' + message)
		if (message.hasOwnProperty('page')) {
  		var contents = webgrid.getPageContents(__dirname, message.page);
			if (contents) { 
				socket.emit('message', contents);
				app.getTask(function(task) {
					console.log(':::' + task);
					socket.emit('task', task);
				});
			}
    }
	})

	socket.on('result', function(result) {
		app.setResult(result)
	})

	socket.on('disconnect', function() {
		console.log('disconnected')
	})
})

function showProperties(obj) {
	for (p in obj) {
		console.log(p);
	}
}

/*
process.on('uncaughtException', function(err) {
	console.log('uncaughtException => ' + err)
})
*/

