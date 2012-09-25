
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;


var BidSchema = new Schema({
    auction: { type: Schema.Types.ObjectId, ref: 'Auction' }
  , bidder: { type: Schema.Types.ObjectId, ref: 'User' }
  , amount: Number
  , createdAt: {type: Date, default: Date.now}
});
mongoose.model('Bid', BidSchema);
