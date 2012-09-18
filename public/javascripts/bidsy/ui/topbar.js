
goog.provide('bidsy.ui.Topbar');

goog.require('goog.ui.Component');



/**
 * @constructor
 * @extends {goog.ui.Component}
 */
bidsy.ui.Topbar = function() {
  goog.base(this);

  /**
   * @type {goog.ui.Component}
   * @private
   */
  this.logo_ = new goog.ui.Component();
};
goog.inherits(bidsy.ui.Topbar, goog.ui.Component);
