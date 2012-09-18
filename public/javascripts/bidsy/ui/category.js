
goog.provide('bidsy.ui.Category');

goog.require('goog.ui.Component');



/**
 * @constructor
 * @extends {goog.ui.Component}
 */
bidsy.ui.Category = function() {
  goog.base(this);
};
goog.inherits(bidsy.ui.Category, goog.ui.Component);


/** @inheritDoc */
bidsy.ui.Category.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  this.getHandler().listen(
      this.getElement(), goog.events.EventType.CLICK, this.setSelected_);
};


/** @inheritDoc */
bidsy.ui.Category.prototype.exitDocument = function() {
  goog.base(this, 'exitDocument');
  this.getHandler().unlisten(
      this.getElement(), goog.events.EventType.CLICK, this.setSelected_);
};


/**
 * Gets called when a category is clicked. Then sets this category as the
 * selected one in the DOM and dispatches an event to indicate that we're
 * selecting this element.
 * @param {goog.events.Event} e is the CLICK event.
 * @private
 */
bidsy.ui.Category.prototype.setSelected_ = function(e) {
  goog.dom.classes.add(this.getElement(), 'selected');
  // TODO(gareth): Don't do this unless we have to
  window.scrollTo(0, 0);
  this.dispatchEvent({ type: bidsy.ui.EventType.CATEGORY });
};
