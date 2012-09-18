#!/usr/bin/env node

var fs = require('fs')
  , mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/auctopus');
var modelPath = __dirname + '/app/models';
fs.readdirSync(modelPath).forEach(function(file) {
  require(modelPath + '/' + file);
});

var Auction = mongoose.model('Auction')
  , Bid = mongoose.model('Bid')
  , Category = mongoose.model('Category')
    User = mongoose.model('User');

var categories = [
    {
        'name': 'antiques-and-collectibles',
        'icon': 'icon-gift',
        'label': 'Antiques & Collectibles'
    },
    {
        'name': 'arts-and-crafts',
        'icon': 'icon-pencil',
        'label': 'Arts & Crafts'
    },
    {
        'name': 'baby',
        'icon': 'icon-bold',
        'label': 'Baby'
    },
    {
        'name': 'books',
        'icon': 'icon-book',
        'label': 'Books'
    },
    {
        'name': 'cameras-and-photography',
        'icon': 'icon-camera',
        'label': 'Cameras & Photography'
    },
    {
        'name': 'cell-phones-and-tablets',
        'icon': 'icon-signal',
        'label': 'Cell Phones & Tablets'
    },
    {
        'name': 'clothing-shoes-and-accessories',
        'icon': 'icon-tags',
        'label': 'Clothing, Shoes, & Accessories'
    },
    {
        'name': 'computers-and-networking',
        'icon': 'icon-hdd',
        'label': 'Computers & Networking'
    },
    {
        'name': 'dvds-and-movies',
        'icon': 'icon-film',
        'label': 'DVDs & Movies'
    },
    {
        'name': 'entertainment-memorabilia',
        'icon': 'icon-picture',
        'label': 'Entertainment Memorabilia'
    },
    {
        'name': 'gift-cards-and-coupons',
        'icon': 'icon-barcode',
        'label': 'Gift Cards & Coupons'
    },
    {
        'name': 'health-and-beauty',
        'icon': 'icon-heart',
        'label': 'Health & Beauty'
    },
    {
        'name': 'home-and-garden',
        'icon': 'icon-leaf',
        'label': 'Home & Garden',
    },
    {
        'name': 'jewelry-and-watches',
        'icon': 'icon-time',
        'label': 'Jewelry & Watches'
    },
    {
        'name': 'music',
        'icon': 'icon-headphones',
        'label': 'Music'
    },
    {
        'name': 'musical-instruments-and-gear',
        'icon': 'icon-music',
        'label': 'Musical Instruments & Gear'
    },
    {
        'name': 'pets',
        'icon': 'icon-bell',
        'label': 'Pets'
    },
    {
        'name': 'real-estate',
        'icon': 'icon-home',
        'label': 'Real Estate'
    },
    {
        'name': 'sporting-goods-and-memorabilia',
        'icon': 'icon-star',
        'label': 'Sporting Goods & Memorabilia'
    },
    {
        'name': 'tickets',
        'icon': 'icon-bookmark',
        'label': 'Tickets'
    },
    {
        'name': 'toys-and-hobbies',
        'icon': 'icon-qrcode',
        'label': 'Toys & Hobbies'
    },
    {
        'name': 'travel',
        'icon': 'icon-plane',
        'label': 'Travel'
    },
    {
        'name': 'video-games-and-consoles',
        'icon': 'icon-fire',
        'label': 'Video Games & Consoles'
    },
    {
        'name': 'random',
        'icon': 'icon-random',
        'label': 'Random'
    }
];

var count = categories.length;
categories.forEach(function(category) {
  Category.findOne({ name: category.name }, function(err, entry) {
    if (!entry) {
      entry = new Category({
          name: category.name,
          icon: category.icon,
          label: category.label
      });
    }

    entry.save(function(err) {
      count--;
      if (count == 0) {
        mongoose.disconnect(function() {
          console.log('Done.')
        });
      }
    });
  });
});
