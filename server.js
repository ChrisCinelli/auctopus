
var express = require('express')
  , fs = require('fs')
  , partials = require('express-partials')
  , http = require('http')
  , mongoose = require('mongoose')
  , path = require('path')
  , sio = require('socket.io');

mongoose.connect('mongodb://localhost/auctopus');
var modelPath = __dirname + '/app/models';
fs.readdirSync(modelPath).forEach(function(file) {
  require(modelPath + '/' + file);
});

var app = express();
app.use(partials());

app.configure(function() {
  app.set('port', process.env.PORT || 8080);
  app.set('views', __dirname + '/app/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon(__dirname + '/public/favicon.ico'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var auctopus = require('./app/auctopus');

// HTTP routes
app.get('/', auctopus.index);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));

  var io = sio.listen(this);
  io.sockets.on('connection', function(socket) {
    console.log('Client ' + socket.id + ' connected!');

    // WebSocket routes
    socket.on('createAuction', auctopus.createAuction);
    socket.on('deleteAuction', auctopus.deleteAuction);
    socket.on('editAuction', auctopus.editAuction);
    socket.on('getRoom', auctopus.getRoom);
  });
});
