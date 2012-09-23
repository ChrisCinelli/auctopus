
/**
 * Module dependencies.
 */
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


/**
 * Constant declarations.
 */
var MONGO_USERNAME = 'heroku_app7740932'
  , MONGO_PASSWORD = 'dhu39atc7vghogpe11c5okoseh'
  , MONGO_HOST = 'ds037907-a.mongolab.com'
  , MONGO_PORT = 37907
  , MONGO_DB = 'heroku_app7740932'
  , SECRET = '41150ng4r37hh4rv3y4nd11nu5';
var MONGO_URL = 'mongodb://' + MONGO_USERNAME + ':' + MONGO_PASSWORD +
                '@' + MONGO_HOST + ':' + MONGO_PORT + '/' + MONGO_DB;


/**
 * Establish a database connection and load db models.
 */
mongoose.connect(MONGO_URL);
var modelPath = __dirname + '/app/models';
fs.readdirSync(modelPath).forEach(function(file) {
  require(modelPath + '/' + file);
});


/**
 * Load the controller actions after the models have been loaded.
 */
var auctopus = require('./app/auctopus');


/**
 * Set up PassportJS.
 */
var FacebookStrategy = require('passport-facebook').Strategy;
passport.use(
    new FacebookStrategy({
        clientID: '424576460933355'
      , clientSecret: '7deb6bb54bd005f636b2afcfbd0c2e68'
      , callbackURL: 'http://staging.auctet.com/auth/facebook/callback'
      // , callbackURL: 'http://localhost:5000/auth/facebook/callback'
    } 
  , auctopus.findOrCreateFacebookUser
));
passport.serializeUser(function(user, callback) {
  callback(null, user.id);
});
passport.deserializeUser(function(id, callback) {
  User.findById(id, function (err, user) {
    callback(err, user);
  });
});


/**
 * Get the session store.
 */
var sessions = new (require('connect-mongo')(express))({ url: MONGO_URL });


/**
 * Configure express.
 */
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
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.favicon(__dirname + '/public/favicon.ico'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// HTTP routes
app.get('/', auctopus.index);
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
    io.set('transports', ['xhr-polling']); 
    io.set('polling duration', 20);
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

  io.sockets.on('connection', function(socket) {
    console.log('Client with socket id ' + socket.id + ' and session id ' +
                socket.handshake.sessionID + ' connected!');

    var user = null;
    sessions.get(socket.handshake.sessionID, function(err, session) {
      if (err) {
        throw err;
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
      auctopus.disconnect(io, socket, user);
    });
    socket.on('createAuction', function(data, callback) {
      auctopus.createAuction(io, socket, user, data, callback);
    });
    socket.on('deleteAuction', function(data, callback) {
      auctopus.deleteAuction(io, socket, user, data, callback);
    });
    socket.on('editAuction', function(data, callback) {
      auctopus.editAuction(io, socket, user, data, callback);
    });
    socket.on('joinRoom', function(data, callback) {
      auctopus.joinRoom(io, socket, user, data, callback);
    });
  });
});
