
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


exports.createAuction = function(data) {
};


exports.deleteAuction = function(data) {
};


exports.editAuction = function(data) {
};


exports.getRoom = function(data) {
}
