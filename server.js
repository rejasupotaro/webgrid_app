var webgrid = require('webgrid')
var	app = webgrid.createApp(__dirname)

// server setting
app.configure(function() {
  app.use(webgrid.static(__dirname + '/app/public'))
  app.use(webgrid.errorHandler({ dumpExceptions: true, showStack: true }))
})

// routing
routes = require('./app/routes')
app.get('/', routes.index)
app.get('/admin', routes.admin)


// socket event handling
var io = webgrid.listen(app)
io.sockets.on('connection', function(socket) {
	console.log('connected')

	socket.on('message', function(message) {
		if (message.hasOwnProperty('page')) {
  		var contents = webgrid.compileView(__dirname, message.page);
			if (contents) { 
				socket.emit('message', contents);
			}
    }
  })

  socket.on('task', function() {
    app.getTask(function(task) {
			socket.emit('task', task)
		});
  })

	socket.on('result', function(result) {
		app.setResult(result)
	})

	socket.on('disconnect', function() {
		console.log('disconnected')
	})
})

process.on('uncaughtException', function(err) {
	console.log('uncaughtException => ' + err)
})
