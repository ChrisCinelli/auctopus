
/**
 * Applies fxn to each item in the collection and calls
 * the callback function with the results.
 */
exports.map = function(collection, fxn, callback) {
  var count = collection.length;
  if (count == 0) {
    callback([]);
  }

  var results = [];
  collection.forEach(function(item) {
    fxn(item, function(result) {
      results.push(result);

      count--;
      if (count == 0) {
        callback(results);
      }
    });
  });
};
