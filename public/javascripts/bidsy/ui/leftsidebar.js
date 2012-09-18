
goog.provide('bidsy.ui.LeftSidebar');

goog.require('goog.ui.Component');
goog.require('bidsy.ui.Category');



/**
 * @constructor
 * @extends {goog.ui.Component}
 */
bidsy.ui.LeftSidebar = function() {
  goog.base(this);

  /**
   * A list of component component categories in the left sidebar.
   * @type {Array}
   * @private
   */
  this.categories_ = [];

  /**
   * The currently selected category.
   * @type {bidsy.ui.Category}
   * @private
   */
  this.category_ = null;
};
goog.inherits(bidsy.ui.LeftSidebar, goog.ui.Component);
