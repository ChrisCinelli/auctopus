
var mongoose = require('mongoose')
  , Auction = mongoose.model('Auction')
  , Bid = mongoose.model('Bid')
  , Category = mongoose.model('Category')
    User = mongoose.model('User');


/**
 * Gets called on GET / and renders the homepage.
 */
exports.index = function(req, res) {
  Category
      .find({})
      .sort({ 'label': 1 })
      .exec(function(err, categories) {
        if (err) {
          throw err;
        }

        res.render('index', {
          categories: categories
        });
      });
};


exports.disconnect = function(io, socket) {
  for (var room in io.sockets.manager.roomClients[socket.id]) {
    if (/^\s*$/.test(room)) {
      continue;
    }

    room = room.substr(1, room.length);
  }

  io.sockets.in(room).emit('userDeltas', [
      {
          'id': socket.id
        , 'sign': '-'
      }
  ]);
};


exports.createAuction = function(io, socket, data, callback) {
  // TODO(gareth)
  console.log(data);
  callback(data);
};


exports.deleteAuction = function(io, socket, data, callback) {
  // TODO(gareth)
};


exports.editAuction = function(io, socket, data, callback) {
  // TODO(gareth)
};


exports.joinRoom = function(io, socket, data, callback) {
  var room = data.category;

  // Join and tell everyone in the room.
  socket.join(room);
  io.sockets.in(room).emit('userDeltas', [
      {
          'id': socket.id
        , 'sign': '+',
      }
  ]);

  // TODO(gareth): Make sure we've populated users before we write back...
  var users = [];
  io.sockets.clients(room).forEach(function(client) {
    users.push({
        'id': client.id
      , 'sign': '+'
    });
  }, this);

  Category.findOne({ name: data.category })
      .populate('auctions')
      .exec(function(err, category) {
        callback({
            auctions: category.auctions
          , users: users
        });
      });
}
