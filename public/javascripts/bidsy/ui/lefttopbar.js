
goog.provide('bidsy.ui.LeftTopbar');

goog.require('goog.ui.Component');



/**
 * @constructor
 * @extends {goog.ui.Component}
 */
bidsy.ui.LeftTopbar = function() {
  goog.base(this);

  /**
   * @type {goog.ui.Component}
   * @private
   */
  this.homeButton_ = new goog.ui.Component();

  /**
   * @type {goog.ui.Component}
   * @private
   */
  this.sellButton_ = new goog.ui.Component();
};
goog.inherits(bidsy.ui.LeftTopbar, goog.ui.Component);
