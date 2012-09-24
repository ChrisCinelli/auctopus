
var express = require('express')
  , connect = require('connect')
  , cookie = require('express/node_modules/cookie')
  , fs = require('fs')
  , partials = require('express-partials')
  , passport = require('passport')
  , http = require('http')
  , mongoose = require('mongoose')
  , path = require('path')
  , sio = require('socket.io');


var env = process.env.NODE_ENV || 'dev';
var MONGO_USERNAME = 'heroku_app7740932'
  , MONGO_PASSWORD = 'dhu39atc7vghogpe11c5okoseh'
  , MONGO_HOST = 'ds037907-a.mongolab.com'
  , MONGO_PORT = 37907
  , MONGO_DB = 'heroku_app7740932'
  , SECRET = '41150ng4r37hh4rv3y4nd11nu5';
var MONGO_URL = 'mongodb://' + MONGO_USERNAME + ':' + MONGO_PASSWORD +
                '@' + MONGO_HOST + ':' + MONGO_PORT + '/' + MONGO_DB;
var FB_CALLBACK_URL =
    'http://' + (env == 'prod' ? 'staging.auctet.com' : 'localhost:5000') +
    '/auth/facebook/callback';


// Establish a database connection and load db models and controller.
mongoose.connect(MONGO_URL);
var modelPath = __dirname + '/app/models';
fs.readdirSync(modelPath).forEach(function(file) {
  require(modelPath + '/' + file);
});
var auctopus = new (require('./app/controllers/auctopus'))().setEnv(env);


// Initialize PassportJS for Facebook Connect.
var FacebookStrategy = require('passport-facebook').Strategy;
passport.use(
    new FacebookStrategy({
        clientID: '424576460933355'
      , clientSecret: '7deb6bb54bd005f636b2afcfbd0c2e68'
      , callbackURL: FB_CALLBACK_URL
    } , auctopus.findOrCreateUser
));
passport.serializeUser(function(user, callback) {
  callback(null, user.id);
});
passport.deserializeUser(function(id, callback) {
  User.findById(id, function(err, user) {
    callback(err, user);
  });
});


// Get the session store.
var sessions = new (require('connect-mongo')(express))({ url: MONGO_URL });


var app = express();
app.use(partials());
app.configure(function() {
  app.set('port', process.env.PORT || 5000);
  app.set('views', __dirname + '/app/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: SECRET, store: sessions }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(require('less-middleware')({ 
      src: __dirname + '/public'
    , compress: true
    , optimization: 2
  }));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.favicon(__dirname + '/public/favicon.ico'));
});
app.configure('production', function() {
  app.use(express.static(path.join(__dirname, 'public'), {
      maxAge: 1000 * 60 * 60 * 24 * 365
  }));
});
app.configure('development', function() {
  app.use(express.errorHandler());
});


// HTTP routes
app.get('/', function(req, res) {
  auctopus.index(req, res);
});
app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: [ 'email', 'user_birthday', 'user_location']
}));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/' , failureRedirect: '/'
}));


http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));

  var io = sio.listen(this);
  io.configure(function() {
    io.set('polling duration', 20);
    io.set('transports', ['xhr-polling']); 
  });
  io.set('authorization', function(data, accept) {
    if (!data.headers.cookie) {
      return accept('No cookie transmitted.', false);
    }

    data.cookie = cookie.parse(data.headers.cookie);
    data.sessionID = connect.utils.parseSignedCookie(
        data.cookie['connect.sid'], SECRET);
    accept(null, true);
  });
  auctopus.setIO(io);

  io.sockets.on('connection', function(socket) {
    console.log('Client with socket id ' + socket.id + ' and session id ' +
                socket.handshake.sessionID + ' connected!');

    var user = null;
    sessions.get(socket.handshake.sessionID, function(err, session) {
      if (err) {
        // TODO(gareth): This is causing problems on startup...
        // Error: no open connections
        //  at Db._executeQueryCommand (/Users/django/Documents/auctet/auctopus/node_modules/connect-mongo/node_modules/mongodb/lib/mongodb/db.js:1554:14)
        //  at Cursor.nextObject (/Users/django/Documents/auctet/auctopus/node_modules/connect-mongo/node_modules/mongodb/lib/mongodb/cursor.js:459:13)
        //  at Cursor.each (/Users/django/Documents/auctet/auctopus/node_modules/connect-mongo/node_modules/mongodb/lib/mongodb/cursor.js:165:12)
        //  at process.startup.processNextTick.process._tickCallback (node.js:244:9)
        console.warn(err);
      }

      if (session && session.passport && session.passport.user) {
        User.findOne({ _id: session.passport.user })
            .exec(function(err, entry) {
              user = entry;
            });
      }
    });

    // WebSocket routes
    socket.on('disconnect', function() {
      auctopus.disconnect(user, socket);
    });
    socket.on('createAuction', function(data, callback) {
      auctopus.createAuction(user, socket, data, callback);
    });
    socket.on('deleteAuction', function(data, callback) {
      auctopus.deleteAuction(user, socket, data, callback);
    });
    socket.on('editAuction', function(data, callback) {
      auctopus.editAuction(user, socket, data, callback);
    });
    socket.on('joinRoom', function(data, callback) {
      auctopus.joinRoom(user, socket, data, callback);
    });
  });
});
