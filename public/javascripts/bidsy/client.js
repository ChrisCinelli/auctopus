
goog.provide('bidsy.Client');



/**
 * @constructor
 */
bidsy.Client = function() {
};
goog.addSingletonGetter(bidsy.Client);


/**
 * Establishes a connection to the socket.io server.
 * @private
 */
bidsy.Client.prototype.init = function() {
  /**
   * @type {io.SocketNamespace}
   * @private
   */
  this.socket_ = io.connect('http://localhost', {
      'sync disconnect on unload': true
  });
};


/**
 * Writes a new auction to the database.
 * @param {Object} data is the new auction.
 * @param {Function} callback is a function to call once we get a response.
 */
bidsy.Client.prototype.createAuction = function(data, callback) {
  this.socket_.emit('createAuction', data, callback);
};


/**
 * Deletes an existing auction from the database.
 * @param {Object} data identifies the auction to be deleted.
 * @param {Function} callback is a function to call once we get a response.
 */
bidsy.Client.prototype.deleteAuction = function(data, callback) {
  // TODO(gareth)
  // this.socket_.emit('deleteAuction', data, callback);
};


/**
 * Edits an existing auction in the database.
 * @param {Object} data is a delta to apply to the auction.
 * @param {Function} callback is a function to call once we get a response.
 */
bidsy.Client.prototype.editAuction = function(data, callback) {
  // TODO(gareth)
  // this.socket_.emit('editAuction', data, callback);
};


/**
 * Tell the server that we're joining a room.
 * @param {Object} data identifies the room we're joining.
 * @param {Function} callback is a function to call once we get a response.
 */
bidsy.Client.prototype.joinRoom = function(data, callback) {
  this.socket_.emit('joinRoom', data, callback);
};
