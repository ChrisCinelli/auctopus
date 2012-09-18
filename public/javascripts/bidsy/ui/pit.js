
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
