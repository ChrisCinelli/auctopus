
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;


var CategorySchema = new Schema({
    auctions: [{ type: Schema.Types.ObjectId, ref: 'Auction' }]
  , icon: String
  , label: String
  , name: String
});
mongoose.model('Category', CategorySchema);
