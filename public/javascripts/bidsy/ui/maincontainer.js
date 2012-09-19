
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


/** @inheritDoc */
bidsy.ui.MainContainer.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  this.stage_.decorate(goog.dom.getElementByClass('stage'));
  this.pit_.decorate(goog.dom.getElementByClass('pit'));
};


/**
 * Displays the new auction.
 * @param {Object} auction is a map representation of the auction to show.
 */
bidsy.ui.MainContainer.prototype.show = function(auction) {
  this.stage_.show(auction);
  this.pit_.show(auction);
};


/**
 * Wipes the main container.
 */
bidsy.ui.MainContainer.prototype.wipe = function() {
  this.stage_.wipe();
  this.pit_.wipe();
};


/**
 * Wipes the main container of all elements related to the current auction.
 */
bidsy.ui.MainContainer.prototype.wipeAuction = function() {
  this.stage_.wipe();
  this.pit_.wipeAuction();
};
