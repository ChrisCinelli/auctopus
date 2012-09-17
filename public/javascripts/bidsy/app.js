
goog.provide('bidsy.App');

goog.require('bidsy.Client');



/**
 * @constructor
 * @export
 */
bidsy.App = function() {
};
goog.addSingletonGetter(bidsy.App);


/**
 * Connect to the socket.io server.
 * @export
 */
bidsy.App.prototype.init = function() {
  var client = bidsy.Client.getInstance();
  client.init();
};


goog.exportSymbol('bidsy.App.getInstance', bidsy.App.getInstance);
