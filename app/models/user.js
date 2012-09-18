
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;


var UserSchema = new Schema({
    auctions: [{ type: Schema.Types.ObjectId, ref: 'Auction' }]
  , bids: [{ type: Schema.Types.ObjectId, ref: 'Bid' }]
  , fbme: String
  , fbuid: Number
  , firstName: String
  , lastName: String
  , email: String
  , location: String
  , image: String
  , birthday: String
  , fbtoken: String
  , fbexpire: Number
  , createdAt: {type: Date, default: Date.now}
  , updatedAt: {type: Date, default: Date.now}
});
mongoose.model('User', UserSchema);
