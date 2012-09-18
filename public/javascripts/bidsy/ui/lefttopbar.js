
goog.provide('bidsy.ui.LeftTopbar');

goog.require('bidsy.ui.EventType')
goog.require('goog.events');
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


/** @inheritDoc */
bidsy.ui.LeftTopbar.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  this.homeButton_.decorate(goog.dom.getElementByClass('btn-home'));
  goog.events.listen(this.homeButton_.getElement(),
                     goog.events.EventType.CLICK,
                     this.onHomeButtonClick_, false, this);

  this.sellButton_.decorate(goog.dom.getElementByClass('btn-sell'));
  goog.events.listen(this.sellButton_.getElement(),
                     goog.events.EventType.CLICK,
                     this.onSellButtonClick_, false, this);
};


/** @inheritDoc */
bidsy.ui.LeftTopbar.prototype.exitDocument = function() {
  goog.base(this, 'exitDocument');
  goog.events.unlisten(this.homeButton_, goog.events.EventType.CLICK,
                       this.onHomeButtonClick_);
  goog.events.unlisten(this.sellButton_, goog.events.EventType.CLICK,
                       this.onSellButtonClick_);
};


/**
 * Gets called when someone clicks the big 'home' button.
 * @param {goog.events.Event} e is the CLICK event.
 * @private
 */
bidsy.ui.LeftTopbar.prototype.onHomeButtonClick_ = function(e) {
  this.dispatchEvent({ type: bidsy.ui.EventType.HOME });
};


/**
 * Gets called when someone clicks the big 'sell something' button.
 * @param {goog.events.Event} e is the CLICK event.
 * @private
 */
bidsy.ui.LeftTopbar.prototype.onSellButtonClick_ = function(e) {
  this.dispatchEvent({ type: bidsy.ui.EventType.SELL });
};
