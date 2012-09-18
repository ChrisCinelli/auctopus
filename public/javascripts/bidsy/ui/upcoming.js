
goog.provide('bidsy.ui.Upcoming');

goog.require('goog.ui.Component');
goog.require('bidsy.ui.upcoming');



/**
 * @constructor
 * @extends {goog.ui.Component}
 */
bidsy.ui.Upcoming = function() {
  goog.base(this);

  /**
   * @type {Element}
   * @private
   */
  this.current_ = null;

  /**
   * Map from elements in this room onto auction attributes.
   * @type {Object}
   * @private
   */
  this.queuedToAuction_ = {};
};
goog.inherits(bidsy.ui.Upcoming, goog.ui.Component);


/**
 * Displays the queue of upcoming auctions.
 * @param {Array} auctions are map representations of the auctions to show.
 */
bidsy.ui.Upcoming.prototype.show = function(auctions) {
  goog.dom.classes.add(this.getElement(), 'shown');
  goog.array.forEach(auctions, function(auction) {
    var title = auction['title'];
    if (title.length > 20) {
      title = title.substr(0, 20) + '...';
    }

    var queued = soy.renderAsElement(
        bidsy.ui.upcoming.main,
        {
            'images': auction['images'],
            'title': title
        });

    var id = 'queued-' + auction['id'];
    queued.id = id;
    goog.dom.classes.add(queued, 'queued');
    goog.events.listen(queued, goog.events.EventType.CLICK,
                       this.onQueuedClick_, false, this);

    goog.dom.appendChild(this.getElement(), queued);
    this.queuedToAuction_[id] = auction;
  }, this);

  // Set the first as selected
  var queued = goog.dom.getElementByClass('queued');
  goog.dom.classes.add(queued, 'selected');
  this.current_ = queued;
};


/**
 * Updates the current selected auction to the parameter one.
 * @param {goog.events.Event} e is the queued click event.
 * @private
 */
bidsy.ui.Upcoming.prototype.onQueuedClick_ = function(e) {
  // TODO(gareth): Is there a better way to do this?
  var target = e.target;
  while (true) {
    var classes = goog.dom.classes.get(target);
    if (classes.indexOf('queued') != -1) {
      break;
    }

    target = target.parentNode;
  }

  if (this.current_ == target) {
    return;
  }

  if (this.current_) {
    goog.dom.classes.remove(this.current_, 'selected');
  }

  goog.dom.classes.add(target, 'selected');

  this.dispatchEvent({
      type: bidsy.ui.EventType.UPCOMING
    , auction: this.queuedToAuction_[target.id]
  });

  this.current_ = target;
};


/**
 * Wipes the pit.
 */
bidsy.ui.Upcoming.prototype.wipe = function() {
  goog.dom.classes.remove(this.getElement(), 'shown');
  this.getElement().innerHTML = '';
  this.current_ = null;
  this.queuedToAuction_ = {};
};
