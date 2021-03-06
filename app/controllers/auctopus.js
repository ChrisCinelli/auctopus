
var util = require('./util');

var mongoose = require('mongoose')
  , Auction = mongoose.model('Auction')
  , Bid = mongoose.model('Bid')
  , Category = mongoose.model('Category')
    User = mongoose.model('User');



/**
 * @constructor
 */
function Auctopus() {
  /**
   * @type {Object}
   * Map from socket ids to user data.
   */
  this.socketIdToUser_ = {};
};
module.exports = Auctopus;


Auctopus.prototype.setEnv = function(env) {
  this.env_ = env;
  return this;
};


Auctopus.prototype.setIO = function(io) {
  this.io_ = io;
  return this;
};


/**
 * GET /
 */
Auctopus.prototype.index = function(req, res) {
  // TODO(gareth): Can we pass context to exec
  var auctopus = this;
  Category
      .find({})
      .sort({ label: 1 })
      .exec(function(err, categories) {
        if (err) {
          throw err;
        }

        res.render('index', {
            bidsy: auctopus.env_
          , categories: categories
          , user: req.user
        });
      });
};


Auctopus.prototype.bid = function(user, socket, data, callback) {
  // TODO(gareth): Handle the cases where multiple people bid at the same time
  // Especially when they make the same bid at the same time
  var sockets = this.io_.sockets;
  Auction.findOne({ _id: data.auction })
      .populate('categories')
      .exec(function(err, auction) {
        if (err) {
          throw err;
        }

        var bid = new Bid({
            auction: data.auction
          , bidder: user.id
          , amount: data.amount
        });
        bid.save(function(err) {
          if (err) {
            throw err;
          }

          auction.bids.push(bid);
          auction.save(function(err) {
            // Tell all of the people who care about this auction
            // about the new bid
            util.map(
                auction.categories
              , function(category, result) {
                  var room = category.name;
                  sockets.in(room).emit('bid', bid);
                  result();
                }
              , function(results) {
                  // TODO(gareth): Tell the client what happened
                  callback('OK');
                }
              , this);
          });
        });
      });
};


Auctopus.prototype.disconnect = function(user, socket) {
  this.leave_(user, socket);
};


Auctopus.prototype.createAuction = function(user, socket, data, callback) {
  this.getCategoriesByNames_(data.categories, function(categories) {
    this.getCategoriesIds_(categories, function(ids) {
      var auction = new Auction({
          id: auction.id
        , seller: user.id
        , bids: []
        , categories: ids
        , title: data.title
        , description: data.description
        , condition: this.getCondition_(data.condition)
        , expiration: data.expiration
        , images: data.images
        , minimum: data.minimum
      });

      auction.save(function(err) {
        util.map(
            categories
          , function(category, result) {
              category.auctions.push(auction.id);
              category.save(function(err) {
                result(category);
              });
            }
          , function() {
              // TODO(gareth): Tell the client what happened
              callback('OK');
            });
      });
    });
  });
};


Auctopus.prototype.findOrCreateUser = function(accessToken, refreshToken,
                                               profile, callback) {
  var fbuid = profile.id;
  User.findOne({ fbuid: fbuid }, function(err, user) {
    if (!user) {
      user = new User({
          auctions: []
        , bids: []
        , fbuid: fbuid
      });
    }

    // Update attributes
    user.fbme = profile._json;
    user.firstName = profile.name.givenName;
    user.lastName = profile.name.familyName;
    user.emails = profile.emails;
    user.birthday = profile._json.birthday;
    user.gender = profile.gender;
    user.location = profile._json.location;
    user.fbtoken = accessToken;

    user.save(function(err) {
      callback(err, user);
    });
  });
};


Auctopus.prototype.joinRoom = function(user, socket, data, callback) {
  var room = data.category;

  // Leave any and all rooms we're already in.
  this.leave_(user, socket);

  // Join and tell everyone in the room.
  this.io_.sockets.in(room).emit('userDeltas', [{
      id: socket.id
    , sign: '+'
    , user: user
  }]);
  socket.join(room);
  this.socketIdToUser_[socket.id] = user;

  function filterAndSortAuctions(auctions, ret) {
    util.map(
        auctions
      , function(auction, result) {
          if (!auction.bids || auction.bids.length == 0) {
            result(auction);
            return;
          }

          util.map(
              auction.bids
            , function(bidId, result) {
                Bid
                    .findOne({ _id: bidId })
                    .populate('bidder')
                    .exec(function(err, bid) {
                      if (err) {
                        throw err;
                      }

                      result(bid);
                    });
              }
            , function(bids) {
                // TODO(gareth): Should just be able to set bids on auction...
                result({
                    _id: auction._id
                  , seller: auction.seller
                  , bids: bids
                  , categories: auction.categories
                  , title: auction.title
                  , description: auction.description
                  , condition: auction.condition
                  , expiration: auction.expiration
                  , images: auction.images
                  , minimum: auction.minimum
                  , createdAt: auction.createdAt
                  , updatedAt: auction.updatedAt
                });
              });
        }
      , function(results) {
          ret(results
                  .filter(function(result) {
                    return (result.expiration >
                            Math.round(new Date().getTime() / 1000));
                  })
                  .sort(function(a, b) {
                    return a.expiration > b.expiration;
                  }));
      });
  }

  util.map(
      this.io_.sockets.clients(room)
    , function(client, result) {
        result({
            id: client.id
          , sign: '+'
          , user: this.socketIdToUser_[client.id]
        });
      }
    , function(users) {
        Category.findOne({ name: data.category })
            .populate('auctions')
            .exec(function(err, category) {
              filterAndSortAuctions(category.auctions, function(auctions) {
                callback({
                    auctions: auctions
                  , userDeltas: users
                });
              });
            });
      }
    , this);
};


/**
 * @private
 */
Auctopus.prototype.leave_ = function(user, socket) {
  var rooms = this.io_.sockets.manager.roomClients[socket.id];
  for (room in rooms) {
    if (/^\s*$/.test(room)) {
      continue;
    }

    room = room.substr(1, room.length);   // Remove the /
    socket.leave(room);
    this.io_.sockets.in(room).emit('userDeltas', [{
        id: socket.id
      , sign: '-'
      , user: user
    }]);
  }
};

/**
 * @private
 */
Auctopus.prototype.getCategoriesByNames_ = function(names, res) {
  util.map(
      names
    , function(name, result) {
        Category.findOne({ name: name })
            .exec(function(err, category) {
              if (err) {
                throw err;
              }

              result(category);
            });
      }, res, this);
};


/**
 * @private
 */
Auctopus.prototype.getCategoriesIds_ = function(categories, res) {
  util.map(categories, function(category, result) {
    result(category.id);
  }, res, this);
};


/**
 * @private
 */
Auctopus.prototype.getCondition_ = function(condition) {
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
