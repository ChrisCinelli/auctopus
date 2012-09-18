
goog.provide('bidsy.ui.Topbar');

goog.require('bidsy.ui.EventType');
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


/** @inheritDoc */
bidsy.ui.Topbar.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  this.logo_.decorate(goog.dom.getElementByClass('logo'));
  goog.events.listen(this.logo_.getElement(),
                     goog.events.EventType.CLICK,
                     this.onLogoClick_, false, this);
};


/** @inheritDoc */
bidsy.ui.Topbar.prototype.exitDocument = function() {
  goog.base(this, 'exitDocument');
  goog.events.unlisten(this.logo_, goog.events.EventType.CLICK,
                       this.onLogoClick_);
};


/**
 * @param {goog.events.Event} e is the CLICK event.
 * @private
 */
bidsy.ui.Topbar.prototype.onLogoClick_ = function(e) {
  this.dispatchEvent({ type: bidsy.ui.EventType.LOGO });
};
