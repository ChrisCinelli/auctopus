
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;


var UserSchema = new Schema({
    auctions: [{ type: Schema.Types.ObjectId, ref: 'Auction' }]
  , bids: [{ type: Schema.Types.ObjectId, ref: 'Bid' }]
  , fbme: Schema.Types.Mixed
  , fbuid: Number
  , firstName: String
  , lastName: String
  , emails: Schema.Types.Mixed
  , birthday: String
  , gender: String
  , location: Schema.Types.Mixed
  , fbtoken: String
  , createdAt: {type: Date, default: Date.now}
  , updatedAt: {type: Date, default: Date.now}
});
mongoose.model('User', UserSchema);
