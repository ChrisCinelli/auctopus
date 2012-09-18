
goog.provide('bidsy.ui.Stage');

goog.require('bidsy.ui.stage');
goog.require('goog.ui.Component');
goog.require('soy');



/**
 * @constructor
 * @extends {goog.ui.Component}
 */
bidsy.ui.Stage = function() {
  goog.base(this);
};
goog.inherits(bidsy.ui.Stage, goog.ui.Component);


/**
 * Displays the new auction.
 * @param {Object} auction is a map representation of the auction to show.
 */
bidsy.ui.Stage.prototype.show = function(auction) {
  soy.renderElement(
      this.getElement(),
      bidsy.ui.stage.auction,
      {
          'description': auction['description']
        , 'images': auction['images']
        , 'title': auction['title']
      });
};


/**
 * Wipes the stage.
 */
bidsy.ui.Stage.prototype.wipe = function() {
  this.getElement().innerHTML = '';
};
