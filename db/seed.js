#!/usr/bin/env node

var fs = require('fs')
  , mongoose = require('mongoose');

// Establish a database connection
mongoose.connect('mongodb://localhost/auctopus');
var modelPath = __dirname + '/../app/models';
fs.readdirSync(modelPath).forEach(function(file) {
  require(modelPath + '/' + file);
});

// Register the models
var Auction = mongoose.model('Auction')
  , Bid = mongoose.model('Bid')
  , Category = mongoose.model('Category')
    User = mongoose.model('User');

// Grab the fixtures
var auctions = require('./fixtures/auctions').auctions
  , categories = require('./fixtures/categories').categories;

var exportCollection = function(collection, findOrCreate, cb) {
  var count = collection.length;
  collection.forEach(function(thing) {
    findOrCreate(thing, function(entry) {
      entry.save(function(err) {
        count--;
        if (count == 0) {
          cb();
        }
      });
    })
  });
};

var exportCategories = function(categories, cb) {
  exportCollection(categories, function(category, res) {
    Category.findOne({ name: category.name }, function(err, entry) {
      if (!entry) {
        entry = new Category({
            name: category.name
          , icon: category.icon
          , label: category.label
        });
      }

      res(entry);
    });
  }, cb);
};

var exportAuctions = function(auctions, cb) {
  exportCollection(auctions, function(auction, res) {
    Auction.findOne({ title: auction.title }, function(err, entry) {
      if (!entry) {
        entry = new Auction({
            condition: auction.condition
          , description: auction.description
          , expiration: auction.expiration
          , images: auction.images
          , minimum: auction.minimum
          , title: auction.title
        });
      }

      res(entry);
    });
  }, cb);
};

exportCategories(categories, function() {
  exportAuctions(auctions, function() {
    mongoose.disconnect(function() {
      console.log('Done.');
    });
  });
});
