
var express = require('express')
  , fs = require('fs')
  , partials = require('express-partials')
  , http = require('http')
  , mongoose = require('mongoose')
  , path = require('path')
  , sio = require('socket.io');

var MONGO_USERNAME = 'heroku_app7740932'
  , MONGO_PASSWORD = 'dhu39atc7vghogpe11c5okoseh'
  , MONGO_HOST = 'ds037907-a.mongolab.com'
  , MONGO_PORT = 37907
  , MONGO_DB = 'heroku_app7740932';

// mongoose.connect('mongodb://localhost/auctopus');
mongoose.connect('mongodb://' + MONGO_USERNAME + ':' + MONGO_PASSWORD +
                 '@' + MONGO_HOST + ':' + MONGO_PORT + '/' + MONGO_DB);
var modelPath = __dirname + '/app/models';
fs.readdirSync(modelPath).forEach(function(file) {
  require(modelPath + '/' + file);
});

var app = express();
app.use(partials());

app.configure(function() {
  app.set('port', process.env.PORT || 5000);
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
  io.configure(function() {
    io.set('transports', ['xhr-polling']); 
    io.set('polling duration', 20);
  });
  io.sockets.on('connection', function(socket) {
    console.log('Client ' + socket.id + ' connected!');

    // WebSocket routes
    socket.on('disconnect', function() {
      auctopus.disconnect(io, socket);
    });
    socket.on('createAuction', function(data, callback) {
      auctopus.createAuction(io, socket, data, callback);
    });
    socket.on('deleteAuction', function(data, callback) {
      auctopus.deleteAuction(io, socket, data, callback);
    });
    socket.on('editAuction', function(data, callback) {
      auctopus.editAuction(io, socket, data, callback);
    });
    socket.on('joinRoom', function(data, callback) {
      auctopus.joinRoom(io, socket, data, callback);
    });
  });
});
