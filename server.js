var webgrid = require('webgrid')
  , env = process.env.NODE_ENV || 'development'
  , config = require('./app/config/' + env)
  , app = webgrid.createApp(__dirname, config, {})
  , port = config.port || 3000

app.configure(function() {
  app.set('views', __dirname + '/app/views')
  app.set('view engine', 'jade')

  app.use(webgrid.bodyParser())
  app.use(webgrid.methodOverride());

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

app.listen(port)
console.log('webgrid running on port ' + port)
