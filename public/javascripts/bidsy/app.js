
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
  this.leftTopbar_.decorate(goog.dom.getElementByClass('left-topbar'));
  goog.events.listen(this.leftTopbar_, bidsy.ui.EventType.HOME,
                     this.onHome_, false, this);
  goog.events.listen(this.leftTopbar_, bidsy.ui.EventType.SELL,
                     this.onSell_, false, this);

  /**
   * @type {bidsy.ui.RightTopbar}
   * @private
   */
  this.rightTopbar_ = new bidsy.ui.RightTopbar();
  this.rightTopbar_.decorate(goog.dom.getElementByClass('right-topbar'));
  // TODO(gareth): Fill this up with user account and login goodness

  /**
   * @type {bidsy.ui.Topbar}
   * @private
   */
  this.topbar_ = new bidsy.ui.Topbar();
  this.topbar_.decorate(goog.dom.getElementByClass('topbar'));
  goog.events.listen(this.topbar_, bidsy.ui.EventType.LOGO,
                     this.onLogo_, false, this);

  /**
   * @type {bidsy.ui.LeftSidebar}
   * @private
   */
  this.leftSidebar_ = new bidsy.ui.LeftSidebar();
  this.leftSidebar_.decorate(goog.dom.getElementByClass('left-sidebar'));
  goog.events.listen(this.leftSidebar_, bidsy.ui.EventType.CATEGORY,
                     this.onCategory_, false, this);

  /**
   * @type {bidsy.ui.RightSidebar}
   * @private
   */
  this.rightSidebar_ = new bidsy.ui.RightSidebar();
  this.rightSidebar_.decorate(goog.dom.getElementByClass('right-sidebar'));
  goog.events.listen(this.rightSidebar_, bidsy.ui.EventType.UPCOMING,
                     this.onUpcoming_, false, this);

  /**
   * @type {bidsy.ui.MainContainer}
   * @private
   */
  this.mainContainer_ = new bidsy.ui.MainContainer();
  this.mainContainer_.decorate(goog.dom.getElementByClass('main-container'));

  /**
   * @type {bidsy.ui.SellContainer}
   * @private
   */
  this.sellContainer_ = new bidsy.ui.SellContainer();
  this.sellContainer_.decorate(goog.dom.getElementByClass('sell-container'));
  goog.style.showElement(this.sellContainer_.getElement(), false);

  /**
   * @type {Array}
   * @private
   */
  this.browseComponents_ = [
      this.mainContainer_
    , this.leftSidebar_
    , this.rightSidebar_
  ];

  /**
   * @type {Array}
   * @private
   */
  this.sellComponents_ = [
      this.sellContainer_
  ];

  bidsy.Client.getInstance().init();
};
goog.addSingletonGetter(bidsy.App);


/**
 * @param {goog.events.Event} e is the CATEGORY event.
 * @private
 */
bidsy.App.prototype.onCategory_ = function(e) {
  this.mainContainer_.wipe();
  this.rightSidebar_.wipe();
  bidsy.Client.getInstance().joinRoom({ 'category': e['category'] },
      function(response) {
        console.log(response);
        if (response['auctions'].length > 0) {
          bidsy.App.getInstance().mainContainer_.show(response['auctions'][0]);
          bidsy.App.getInstance().rightSidebar_.show(response['auctions']);
        }
      });
};


/**
 * @param {goog.events.Event} e is the HOME event.
 * @private
 */
bidsy.App.prototype.onHome_ = function(e) {
  this.setMode_(bidsy.App.Mode.BROWSE);
};


/**
 * @param {goog.events.Event} e is the LOGO event.
 * @private
 */
bidsy.App.prototype.onLogo_ = function(e) {
  this.setMode_(bidsy.App.Mode.BROWSE);
};


/**
 * @param {goog.events.Event} e is the SELL event.
 * @private
 */
bidsy.App.prototype.onSell_ = function(e) {
  this.setMode_(bidsy.App.Mode.SELL);
};


/**
 * @param {goog.events.Event} e is the UPCOMING event.
 * @private
 */
bidsy.App.prototype.onUpcoming_ = function(e) {
  // TODO(gareth)
  console.log('onUpcoming_');
};


/**
 * @param {bidsy.App.Mode} mode is the mode we're going into.
 * @private
 */
bidsy.App.prototype.setMode_ = function(mode) {
  if (mode == this.mode_) {
    return;
  }

  console.log('Going into ' + mode.toString() + ' mode.');

  switch (mode) {
    case bidsy.App.Mode.BROWSE:
      goog.array.forEach(this.sellComponents_, function(component) {
        goog.style.showElement(component.getElement(), false);
      });
      goog.array.forEach(this.browseComponents_, function(component) {
        goog.style.showElement(component.getElement(), true);
      });

      break;
    case bidsy.App.Mode.SELL:
      goog.array.forEach(this.browseComponents_, function(component) {
        goog.style.showElement(component.getElement(), false);
      });
      goog.array.forEach(this.sellComponents_, function(component) {
        goog.style.showElement(component.getElement(), true);
      });

      break;
    default:
      break;
  }

  this.mode_ = mode;
}


/** @enum {string} */
bidsy.App.Mode = {
    BROWSE: 'browse'
  , SELL: 'sell'
};


goog.exportSymbol('bidsy.App.getInstance', bidsy.App.getInstance);
