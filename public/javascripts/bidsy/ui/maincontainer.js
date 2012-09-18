
goog.provide('bidsy.ui.MainContainer');

goog.require('goog.ui.Component');
goog.require('bidsy.ui.Pit');
goog.require('bidsy.ui.Stage');



/**
 * @constructor
 * @extends {goog.ui.Component}
 */
bidsy.ui.MainContainer = function() {
  goog.base(this);

  /**
   * @type {bidsy.ui.Stage}
   * @private
   */
  this.stage_ = new bidsy.ui.Stage();

  /**
   * @type {bidsy.ui.Pit}
   * @private
   */
  this.pit_ = new bidsy.ui.Pit();
};
goog.inherits(bidsy.ui.MainContainer, goog.ui.Component);
