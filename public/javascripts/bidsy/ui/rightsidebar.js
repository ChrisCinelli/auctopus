
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


/** @inheritDoc */
bidsy.ui.RightSidebar.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  this.upcoming_.decorate(goog.dom.getElementByClass('upcoming'));
};


/**
 * Displays the queue of upcoming auctions.
 * @param {Array} auctions are map representations of the auctions to show.
 */
bidsy.ui.RightSidebar.prototype.show = function(auctions) {
  this.upcoming_.show(auctions);
};


/**
 * Wipes the right sidebar.
 */
bidsy.ui.RightSidebar.prototype.wipe = function() {
  this.upcoming_.wipe();
};
