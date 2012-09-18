
goog.provide('bidsy.App');
goog.provide('bidsy.App.Mode');

goog.require('bidsy.Client');
goog.require('bidsy.ui.EventType');
goog.require('bidsy.ui.LeftSidebar');
goog.require('bidsy.ui.LeftTopbar');
goog.require('bidsy.ui.MainContainer');
goog.require('bidsy.ui.RightSidebar');
goog.require('bidsy.ui.RightTopbar');
goog.require('bidsy.ui.SellContainer');
goog.require('bidsy.ui.Topbar');
goog.require('goog.events');



/**
 * @constructor
 * @export
 */
bidsy.App = function() {
  /**
   * @type {bidsy.App.Mode}
   * @private
   */
  this.mode_ = bidsy.App.Mode.BROWSE;

  /**
   * @type {bidsy.ui.LeftTopbar}
   * @private
   */
  this.leftTopbar_ = new bidsy.ui.LeftTopbar();

  /**
   * @type {bidsy.ui.RightTopbar}
   * @private
   */
  this.rightTopbar_ = new bidsy.ui.RightTopbar();

  /**
   * @type {bidsy.ui.Topbar}
   * @private
   */
  this.topbar_ = new bidsy.ui.Topbar();

  /**
   * @type {bidsy.ui.LeftSidebar}
   * @private
   */
  this.leftSidebar_ = new bidsy.ui.LeftSidebar();

  /**
   * @type {bidsy.ui.RightSidebar}
   * @private
   */
  this.rightSidebar_ = new bidsy.ui.RightSidebar();

  /**
   * @type {bidsy.ui.MainContainer}
   * @private
   */
  this.mainContainer_ = new bidsy.ui.MainContainer();

  /**
   * @type {bidsy.ui.SellContainer}
   * @private
   */
  this.sellContainer_ = new bidsy.ui.SellContainer();

  /**
   * @type {Array}
   * @private
   */
  this.browseComponents_ = [
      this.mainContainer_,
      this.leftSidebar_,
      this.rightSidebar_
  ];
};
goog.addSingletonGetter(bidsy.App);


/**
 * Connect to the socket.io server.
 * @export
 */
bidsy.App.prototype.init = function() {
  var client = bidsy.Client.getInstance();
  client.init();

  this.leftTopbar_.decorate(goog.dom.getElementByClass('left-topbar'));
  goog.events.listen(this.leftTopbar_, bidsy.ui.EventType.HOME,
                     this.onHome_, false, this);
  goog.events.listen(this.leftTopbar_, bidsy.ui.EventType.SELL,
                     this.onSell_, false, this);

  this.rightTopbar_.decorate(goog.dom.getElementByClass('right-topbar'));
  // TODO(gareth): Fill this up with user account and login goodness

  this.topbar_.decorate(goog.dom.getElementByClass('topbar'));
  goog.events.listen(this.topbar_, bidsy.ui.EventType.LOGO,
                     this.onLogo_, false, this);

  this.leftSidebar_.decorate(goog.dom.getElementByClass('left-sidebar'));
  goog.events.listen(this.leftSidebar_, bidsy.ui.EventType.CATEGORY,
                     this.onCategory_, false, this);

  this.rightSidebar_.decorate(goog.dom.getElementByClass('right-sidebar'));
  goog.events.listen(this.rightSidebar_, bidsy.ui.EventType.UPCOMING,
                     this.onUpcoming_, false, this);

  this.mainContainer_.decorate(goog.dom.getElementByClass('main-container'));

  this.sellContainer_.decorate(goog.dom.getElementByClass('sell-container'));
  goog.style.showElement(this.sellContainer_.getElement(), false);
};


/**
 * @param {goog.events.Event} e is the CATEGORY event.
 * @private
 */
bidsy.App.prototype.onCategory_ = function(e) {
  // TODO(gareth)
};


/**
 * @param {goog.events.Event} e is the HOME event.
 * @private
 */
bidsy.App.prototype.onHome_ = function(e) {
  // TODO(gareth)
};


/**
 * @param {goog.events.Event} e is the LOGO event.
 * @private
 */
bidsy.App.prototype.onLogo_ = function(e) {
  // TODO(gareth)
};


/**
 * @param {goog.events.Event} e is the SELL event.
 * @private
 */
bidsy.App.prototype.onSell_ = function(e) {
  // TODO(gareth)
};


/**
 * @param {goog.events.Event} e is the UPCOMING event.
 * @private
 */
bidsy.App.prototype.onUpcoming_ = function(e) {
  // TODO(gareth)
};


/** @enum {string} */
bidsy.App.Mode = {
    BROWSE: 'browse',
    SELL: 'sell'
};


goog.exportSymbol('bidsy.App.getInstance', bidsy.App.getInstance);
