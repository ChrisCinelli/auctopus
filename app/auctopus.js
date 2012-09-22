
var util = require('./util');

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
  getCategoriesByNames(data.categories, function(categories) {
    getCategoriesIds(categories, function(ids) {
      var auction = new Auction({
          bids: []
        , categories: ids
        , title: data.title
        , description: data.description
        , condition: getCondition(data.condition)
        , expiration: data.expiration
        , images: data.images
        , minimum: data.minimum
      });

      auction.save(function(err) {
        util.map(categories, function(category, result) {
          category.auctions.push(auction.id);
          category.save();
          result(category);
        },
        function() {
          callback('200 OK');
        });
      });
    });
  });
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

  util.map(io.sockets.clients(room),
      function(client, result) {
        result({
            'id': client.id
          , 'sign': '+'
        });
      }
    , function(users) {
        Category.findOne({ name: data.category })
            .populate('auctions')
            .exec(function(err, category) {
              callback({
                  auctions: category.auctions
                , users: users
              });
            });
      }
  );
};


var getCategoriesByNames = function(names, res) {
  util.map(names, function(name, result) {
    Category.findOne({ name: name })
        .exec(function(err, category) {
          if (err) {
            throw err;
          }

          result(category);
        });
  }, res);
};


var getCategoriesIds = function(categories, res) {
  util.map(categories, function(category, result) {
    result(category.id);
  }, res);
};


var getCondition = function(condition) {
  switch (condition) {
    case 'new':
      return 5;
    case 'like-new':
      return 4;
    case 'good':
      return 3;
    case 'fair':
      return 2;
    case 'catch':
      return 1;
    default:
      return -1;
  }
};
