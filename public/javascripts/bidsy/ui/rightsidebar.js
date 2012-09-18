
goog.provide('bidsy.ui.RightSidebar');

goog.require('goog.ui.Component');
goog.require('bidsy.ui.Upcoming');



/**
 * @constructor
 * @extends {goog.ui.Component}
 */
bidsy.ui.RightSidebar = function() {
  goog.base(this);

  /**
   * @type {bidsy.ui.Upcoming}
   * @private
   */
   this.upcoming_ = new bidsy.ui.Upcoming();
};
goog.inherits(bidsy.ui.RightSidebar, goog.ui.Component);
