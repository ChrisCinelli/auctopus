
goog.provide('bidsy.ui.Pit');

goog.require('goog.ui.Component');
goog.require('bidsy.ui.Bidder');
goog.require('bidsy.ui.Toolbar');



/**
 * @constructor
 * @extends {goog.ui.Component}
 */
bidsy.ui.Pit = function() {
  goog.base(this);

  /**
   * @type {bidsy.ui.Toolbar}
   * @private
   */
  this.toolbar_ = new bidsy.ui.Toolbar();

  /**
   * Map from bidders to socket ids in the room.
   * @type {Object}
   * @private
   */
  this.socketIdToBidder_ = {};
};
goog.inherits(bidsy.ui.Pit, goog.ui.Component);


/**
 * Shows the pit.
 * @param {Object} auction is a map representation of the auction to show.
 */
bidsy.ui.Pit.prototype.show = function(auction) {
  this.toolbar_.show(auction);
};

/**
 * Wipes the pit.
 */
bidsy.ui.Pit.prototype.wipe = function() {
  this.toolbar_.wipe();
  this.removeChildren(true);
};


/**
 * Wipes the main container of all elements related to the current auction.
 */
bidsy.ui.Pit.prototype.wipeAuction = function() {
  this.toolbar_.wipe();
};
