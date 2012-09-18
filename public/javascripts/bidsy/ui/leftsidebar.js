
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


/** @inheritDoc */
bidsy.ui.LeftSidebar.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var elements = goog.dom.getElementsByClass('category');
  goog.array.forEach(elements, function(element) {
    var category = new bidsy.ui.Category();
    category.decorate(element);
    goog.events.listen(category, bidsy.ui.EventType.CATEGORY,
                       this.onCategory_, false, this);
    this.categories_.push(category);
  }, this);
};


/** @inheritDoc */
bidsy.ui.LeftSidebar.prototype.exitDocument = function() {
  goog.base(this, 'exitDocument');
  goog.array.forEach(this.categories_, function(category) {
    goog.events.unlisten(category, bidsy.ui.EventType.CATEGORY,
                         this.onCategory_);
  }, this);
};


/**
 * @param {goog.events.Event} e is the CATEGORY event.
 * @private
 */
bidsy.ui.LeftSidebar.prototype.onCategory_ = function(e) {
  if (this.category_) {
    if (this.category_ == e.target) {
      return;
    }

    goog.dom.classes.remove(this.category_.getElement(), 'selected');
  }

  this.category_ = /** @type {bidsy.ui.Category} */ (e.target);
  e['category'] = this.category_.getElement().id;
  this.dispatchEvent(e);
};
