
goog.provide('bidsy.ui.Bidder');

goog.require('bidsy.ui.bidder');


/**
 * @constructor
 * @extends {goog.ui.Component}
 * @param {Object} userinfo is a map of user attrs.
 */
bidsy.ui.Bidder = function(userinfo) {
  goog.base(this);

  /**
   * @type {Object} map of user attrs.
   * @private
   */
  this.userinfo_ = userinfo;
};
goog.inherits(bidsy.ui.Bidder, goog.ui.Component);
