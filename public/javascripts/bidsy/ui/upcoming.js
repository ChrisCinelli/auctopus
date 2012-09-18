
goog.provide('bidsy.ui.Upcoming');

goog.require('goog.ui.Component');
goog.require('bidsy.ui.upcoming');



/**
 * @constructor
 * @extends {goog.ui.Component}
 */
bidsy.ui.Upcoming = function() {
  goog.base(this);

  /**
   * @type {Element}
   * @private
   */
  this.current_ = null;

  /**
   * Map from elements in this room onto auction attributes.
   * @type {Object}
   * @private
   */
  this.queuedToAuction_ = {};
};
goog.inherits(bidsy.ui.Upcoming, goog.ui.Component);
