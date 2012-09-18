
goog.provide('bidsy.ui.Toolbar');

goog.require('goog.ui.Component');
goog.require('bidsy.ui.toolbar');



/**
 * @constructor
 * @extends {goog.ui.Component}
 */
bidsy.ui.Toolbar = function() {
  goog.base(this);

  /**
   * Unique interval ID for the countdown ticker.
   * @type {?number}
   * @private
   */
  this.ticker_ = null;

  /**
   * Time at which the currently shown auction expires.
   * @type {?number}
   * @private
   */
  this.expiration_ = null;
};
goog.inherits(bidsy.ui.Toolbar, goog.ui.Component);
