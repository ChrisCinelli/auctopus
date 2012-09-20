
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;


var AuctionSchema = new Schema({
    seller: { type: Schema.Types.ObjectId, ref: 'User' }
  , bids: [{ type: Schema.Types.ObjectId, ref: 'Bid' }]
  , categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }]
  , title: String
  , description: String
  , condition: Number
  , expiration: Number
  , images: [String]
  , minimum: Number
  , createdAt: {type: Date, default: Date.now}
  , updatedAt: {type: Date, default: Date.now}
});
mongoose.model('Auction', AuctionSchema);
