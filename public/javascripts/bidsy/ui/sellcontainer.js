
goog.provide('bidsy.ui.SellContainer');
goog.provide('bidsy.ui.SellContainer.Mode');

goog.require('goog.ui.Component');



/**
 * @constructor
 * @extends {goog.ui.Component}
 */
bidsy.ui.SellContainer = function() {
  goog.base(this);

  /**
   * @type {goog.ui.Component}
   * @private
   */
  this.itemTab_ = new goog.ui.Component();

  /**
   * @type {goog.ui.Component}
   * @private
   */
  this.itemView_ = new goog.ui.Component();

  /**
   * @type {goog.ui.Component}
   * @private
   */
  this.itemNext_ = new goog.ui.Component();

  /**
   * @type {goog.ui.Component}
   * @private
   */
  this.categories_ = new goog.ui.Component();

  /**
   * @type {goog.ui.Component}
   * @private
   */
  this.title_ = new goog.ui.Component();

  /**
   * @type {goog.ui.Component}
   * @private
   */
  this.description_ = new goog.ui.Component();

  /**
   * @type {goog.ui.Component}
   * @private
   */
  this.pictures_ = new goog.ui.Component();

  /**
   * @type {goog.ui.Component}
   * @private
   */
  this.auctionTab_ = new goog.ui.Component();

  /**
   * @type {goog.ui.Component}
   * @private
   */
  this.auctionView_ = new goog.ui.Component();

  /**
   * @type {goog.ui.Component}
   * @private
   */
  this.auctionNext_ = new goog.ui.Component();

  /**
   * @type {goog.ui.Component}
   * @private
   */
  this.datepicker_ = new goog.ui.Component();

  /**
   * @type {goog.ui.Component}
   * @private
   */
  this.timepicker_ = new goog.ui.Component();

  /**
   * @type {goog.ui.Component}
   * @private
   */
  this.minimum_ = new goog.ui.Component();

  /**
   * @type {goog.ui.Component}
   * @private
   */
  this.paymentTab_ = new goog.ui.Component();

  /**
   * @type {goog.ui.Component}
   * @private
   */
  this.paymentView_ = new goog.ui.Component();

  /**
   * @type {goog.ui.Component}
   * @private
   */
  this.sellSubmit_ = new goog.ui.Component();

  /**
   * @type {goog.ui.Component}
   * @private
   */
  this.shareTab_ = new goog.ui.Component();

  /**
   * @type {goog.ui.Component}
   * @private
   */
  this.shareView_ = new goog.ui.Component();

  /**
   * @type {Array}
   * @private
   */
  this.tabs_ = [
      {'label': this.itemTab_, 'view': this.itemView_},
      {'label': this.auctionTab_, 'view': this.auctionView_},
      {'label': this.paymentTab_, 'view': this.paymentView_},
      {'label': this.shareTab_, 'view': this.shareView_}
  ];

  /**
   * @type {bidsy.ui.SellContainer.Mode}
   * @private
   */
  this.mode_ = bidsy.ui.SellContainer.Mode.ITEM;
}
goog.inherits(bidsy.ui.SellContainer, goog.ui.Component);


/** @inheritDoc */
bidsy.ui.SellContainer.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  this.itemTab_.decorate(goog.dom.getElementByClass('sell-item'));
  goog.events.listen(this.itemTab_.getElement(), goog.events.EventType.CLICK,
                     this.onItemTabClick_, false, this);

  this.itemView_.decorate(goog.dom.getElementByClass('item-view'));
  goog.dom.classes.add(this.itemTab_.getElement(), 'active');
  goog.style.showElement(this.itemView_.getElement(), true);

  this.itemNext_.decorate(goog.dom.getElementByClass('item-next'));
  goog.events.listen(this.itemNext_.getElement(), goog.events.EventType.CLICK,
                     this.onItemNext_, false, this);

  this.categories_.decorate(goog.dom.getElement('item-categories'));
  goog.array.forEach(goog.dom.getElementsByClass('category-checkbox'),
      function(category) {
        goog.events.listen(category, goog.events.EventType.CLICK,
                           this.onCategoryChange_, false, this);
      }, this);

  this.title_.decorate(goog.dom.getElement('item-title'));
  goog.events.listen(this.title_.getElement(), goog.events.EventType.CHANGE,
                     this.onTitleChange_, false, this);

  this.description_.decorate(goog.dom.getElement('item-description'));
  goog.events.listen(this.description_.getElement(),
                     goog.events.EventType.CHANGE,
                     this.onDescriptionChange_, false, this);

  goog.array.forEach(
      goog.dom.getElementsByTagNameAndClass('input', 'condition'),
      function(label) {
        goog.events.listen(label, goog.events.EventType.CLICK,
                           this.onConditionChange_, false, this);
      }, this);

  this.pictures_.decorate(goog.dom.getElement('item-pictures'));
  goog.events.listen(this.pictures_.getElement(),
                     goog.events.EventType.CHANGE,
                     this.onPicturesChange_, false, this);

  this.auctionTab_.decorate(goog.dom.getElementByClass('sell-auction'));
  goog.events.listen(this.auctionTab_.getElement(),
                     goog.events.EventType.CLICK,
                     this.onAuctionTabClick_, false, this);

  this.auctionView_.decorate(goog.dom.getElementByClass('auction-view'));
  goog.style.showElement(this.auctionView_.getElement(), false);

  this.auctionNext_.decorate(goog.dom.getElementByClass('auction-next'));
  goog.events.listen(this.auctionNext_.getElement(),
                     goog.events.EventType.CLICK,
                     this.onAuctionNext_, false, this);

  this.datepicker_.decorate(goog.dom.getElement('datepicker'));
  goog.events.listen(this.datepicker_.getElement(),
                     goog.events.EventType.CHANGE,
                     this.onDatepickerChange_, false, this);

  this.timepicker_.decorate(goog.dom.getElement('timepicker'));
  goog.events.listen(this.timepicker_.getElement(),
                     goog.events.EventType.CHANGE,
                     this.onTimepickerChange_, false, this);

  this.minimum_.decorate(goog.dom.getElement('minimum'));
  goog.events.listen(this.minimum_.getElement(),
                     goog.events.EventType.CHANGE,
                     this.onMinimumChange_, false, this);

  this.paymentTab_.decorate(goog.dom.getElementByClass('sell-payment'));
  goog.events.listen(this.paymentTab_.getElement(),
                     goog.events.EventType.CLICK,
                     this.onPaymentTabClick_, false, this);

  this.paymentView_.decorate(goog.dom.getElementByClass('payment-view'));
  goog.style.showElement(this.paymentView_.getElement(), false);

  this.sellSubmit_.decorate(goog.dom.getElementByClass('sell-submit'));
  goog.events.listen(this.sellSubmit_.getElement(),
                     goog.events.EventType.CLICK,
                     this.onSellSubmit_, false, this);

  this.shareTab_.decorate(goog.dom.getElementByClass('sell-share'));
  goog.events.listen(this.shareTab_.getElement(), goog.events.EventType.CLICK,
                     this.onShareTabClick_, false, this);

  this.shareView_.decorate(goog.dom.getElementByClass('share-view'));
  goog.style.showElement(this.shareView_.getElement(), false);
};


/** @inheritDoc */
bidsy.ui.SellContainer.prototype.exitDocument = function() {
  goog.base(this, 'exitDocument');
  goog.events.unlisten(this.itemTab_.getElement(),
                       goog.events.EventType.CLICK,
                       this.onItemTabClick_);
  goog.events.unlisten(this.itemNext_.getElement(),
                       goog.events.EventType.CLICK,
                       this.onItemNext_);
  goog.array.forEach(goog.dom.getElementsByClass('category-checkbox'),
                     function(category) {
                       goog.events.unlisten(category,
                           goog.events.EventType.CLICK,
                           this.onCategoryChange_);
                     }, this);
  goog.events.unlisten(this.title_.getElement(), goog.events.EventType.CHANGE,
                       this.onTitleChange_);
  goog.events.unlisten(this.description_.getElement(),
                       goog.events.EventType.CHANGE,
                       this.onDescriptionChange_);
  goog.array.forEach(
      goog.dom.getElementsByTagNameAndClass('input', 'condition'),
      function(label) {
        goog.events.unlisten(label, goog.events.EventType.CLICK,
                             this.onConditionChange_);
      }, this);

  goog.events.unlisten(this.auctionTab_.getElement(),
                       goog.events.EventType.CLICK,
                       this.onAuctionTabClick_);
  goog.events.unlisten(this.auctionNext_.getElement(),
                       goog.events.EventType.CLICK,
                       this.onAuctionNext_);

  goog.events.unlisten(this.paymentTab_.getElement(),
                       goog.events.EventType.CLICK,
                       this.onPaymentTabClick_);
  goog.events.unlisten(this.sellSubmit_.getElement(),
                       goog.events.EventType.CLICK,
                       this.onSellSubmit_);
};


/**
 * @param {goog.events.Event} e is the CLICK event.
 * @private
 */
bidsy.ui.SellContainer.prototype.onItemTabClick_ = function(e) {
  this.setMode_(bidsy.ui.SellContainer.Mode.ITEM);
};


/**
 * @param {goog.events.Event} e is the CLICK event.
 * @private
 */
bidsy.ui.SellContainer.prototype.onAuctionTabClick_ = function(e) {
  this.setMode_(bidsy.ui.SellContainer.Mode.AUCTION);
};


/**
 * @param {goog.events.Event} e is the CLICK event.
 * @private
 */
bidsy.ui.SellContainer.prototype.onPaymentTabClick_ = function(e) {
  this.setMode_(bidsy.ui.SellContainer.Mode.PAYMENT);
};


/**
 * @param {goog.events.Event} e is the CLICK event.
 * @private
 */
bidsy.ui.SellContainer.prototype.onShareTabClick_ = function(e) {
  this.setMode_(bidsy.ui.SellContainer.Mode.SHARE);
};


/**
 * @param {goog.events.Event} e is the CLICK event.
 * @private
 */
bidsy.ui.SellContainer.prototype.onItemNext_ = function(e) {
  // TODO(gareth): Send the partially complete form to the server
  var error = false;

  var categoriesError = this.getCategoriesError_();
  if (categoriesError) {
    var parent = this.categories_.getElement().parentNode;
    var grandparent = parent.parentNode;
    goog.dom.getLastElementChild(parent).innerHTML = categoriesError;
    goog.dom.classes.add(grandparent, 'error');
    error = true;
  }

  var titleError = this.getTitleError_();
  if (titleError) {
    var parent = this.title_.getElement().parentNode;
    var grandparent = parent.parentNode;
    goog.dom.getLastElementChild(parent).innerHTML = titleError;
    goog.dom.classes.add(grandparent, 'error');
    error = true;
  }

  var descriptionError = this.getDescriptionError_();
  if (descriptionError) {
    var parent = this.description_.getElement().parentNode;
    var grandparent = parent.parentNode;
    goog.dom.getLastElementChild(parent).innerHTML = descriptionError;
    goog.dom.classes.add(grandparent, 'error');
    error = true;
  }

  var picturesError = this.getPicturesError_();
  if (picturesError) {
    var parent = this.pictures_.getElement().parentNode;
    var grandparent = parent.parentNode;
    goog.dom.getLastElementChild(parent).innerHTML = picturesError;
    goog.dom.classes.add(grandparent, 'error');
    error = true;
  }

  if (error) {
    // TODO(gareth): Change this based on where we're having problems
    window.scrollTo(0, 0);
  } else {
    this.setMode_(bidsy.ui.SellContainer.Mode.AUCTION);
  }
};


/**
 * @param {goog.events.Event} e is the CLICK event.
 * @private
 */
bidsy.ui.SellContainer.prototype.onAuctionNext_ = function(e) {
  // TODO(gareth): Send the partially complete form to the server
  var error = false;

  var datepickerError = this.getDatepickerError_();
  if (datepickerError) {
    var parent = this.datepicker_.getElement().parentNode;
    var grandparent = parent.parentNode;
    goog.dom.getLastElementChild(parent).innerHTML = datepickerError;
    goog.dom.classes.add(grandparent, 'error');
    error = true;
  }

  var timepickerError = this.getTimepickerError_();
  if (timepickerError) {
    var parent = this.timepicker_.getElement().parentNode;
    var grandparent = parent.parentNode;
    goog.dom.getLastElementChild(parent).innerHTML = timepickerError;
    goog.dom.classes.add(grandparent, 'error');
    error = true;
  }

  var minimumError = this.getMinimumError_();
  if (minimumError) {
    var parent = this.minimum_.getElement().parentNode.parentNode;
    var grandparent = parent.parentNode;
    goog.dom.getLastElementChild(parent).innerHTML = minimumError;
    goog.dom.classes.add(grandparent, 'error');
    error = true;
  }

  if (error) {
    // TODO(gareth): Change this based on where we're having problems
    window.scrollTo(0, 0);
  } else {
    this.setMode_(bidsy.ui.SellContainer.Mode.PAYMENT);
  }
};


/**
 * @param {goog.events.Event} e is the CLICK event.
 * @private
 */
bidsy.ui.SellContainer.prototype.onSellSubmit_ = function(e) {
  var categories = this.getCheckedCategories_();
  var title = this.title_.getElement().value;
  var description = this.description_.getElement().value;

  var condition = null;
  goog.array.forEach(
      goog.dom.getElementsByTagNameAndClass('input', 'condition'),
      function(label) {
        if (label.checked) {
          condition = label.value;
        }
      });

  var pictures = goog.dom.getElement('item-pictures').value;
  var date = goog.dom.getElement('datepicker').value;
  var time = goog.dom.getElement('timepicker').value;
  var minimum = goog.dom.getElement('minimum').value;

  bidsy.Client.getInstance().createAuction({
      'categories': categories
    , 'title': title
    , 'description': description
    , 'condition': condition
    , 'pictures': pictures
    , 'date': date
    , 'time': time
    , 'minimum': minimum
  }, function(response) {
    // TODO(gareth)
    console.log(response);
  });

  this.setMode_(bidsy.ui.SellContainer.Mode.SHARE);
};


/**
 * @param {goog.events.Event} e is the CHANGE event.
 * @private
 */
bidsy.ui.SellContainer.prototype.onCategoryChange_ = function(e) {
  var parent = this.categories_.getElement().parentNode;
  var grandparent = parent.parentNode;

  goog.dom.getLastElementChild(parent).innerHTML = '';
  goog.dom.classes.remove(grandparent, 'success');
  goog.dom.classes.remove(grandparent, 'error');

  var categoriesError = this.getCategoriesError_();
  if (categoriesError) {
    goog.dom.getLastElementChild(parent).innerHTML = categoriesError;
    goog.dom.classes.add(grandparent, 'error');
  } else {
    goog.dom.getLastElementChild(parent).innerHTML = 'OK';
    goog.dom.classes.add(grandparent, 'success');
  }
}


/**
 * @param {goog.events.Event} e is the CHANGE event.
 * @private
 */
bidsy.ui.SellContainer.prototype.onTitleChange_ = function(e) {
  var parent = this.title_.getElement().parentNode;
  var grandparent = parent.parentNode;

  goog.dom.getLastElementChild(parent).innerHTML = '';
  goog.dom.classes.remove(grandparent, 'success');
  goog.dom.classes.remove(grandparent, 'error');

  var titleError = this.getTitleError_();
  if (titleError) {
    goog.dom.getLastElementChild(parent).innerHTML = titleError;
    goog.dom.classes.add(grandparent, 'error');
    goog.dom.getLastElementChild(parent).innerHTML = 'OK';
    goog.dom.classes.add(grandparent, 'success');
  } else {
    goog.dom.getLastElementChild(parent).innerHTML = 'OK';
    goog.dom.classes.add(grandparent, 'success');
  }
};


/**
 * @param {goog.events.Event} e is the CHANGE event.
 * @private
 */
bidsy.ui.SellContainer.prototype.onDescriptionChange_ = function(e) {
  var parent = this.description_.getElement().parentNode;
  var grandparent = parent.parentNode;

  goog.dom.getLastElementChild(parent).innerHTML = '';
  goog.dom.classes.remove(grandparent, 'success');
  goog.dom.classes.remove(grandparent, 'error');

  var descriptionError = this.getDescriptionError_();
  if (descriptionError) {
    goog.dom.getLastElementChild(parent).innerHTML = descriptionError;
    goog.dom.classes.add(grandparent, 'error');
  } else {
    goog.dom.getLastElementChild(parent).innerHTML = 'OK';
    goog.dom.classes.add(grandparent, 'success');
  }
};


/**
 * @param {goog.events.Event} e is the CHANGE event.
 * @private
 */
bidsy.ui.SellContainer.prototype.onConditionChange_ = function(e) {
  // TODO(gareth)
};


/**
 * @param {goog.events.Event} e is the CHANGE event.
 * @private
 */
bidsy.ui.SellContainer.prototype.onPicturesChange_ = function(e) {
  // TODO(gareth): Update this once we do picture uploads.
  var parent = this.pictures_.getElement().parentNode;
  var grandparent = parent.parentNode;

  goog.dom.getLastElementChild(parent).innerHTML = '';
  goog.dom.classes.remove(grandparent, 'success');
  goog.dom.classes.remove(grandparent, 'error');

  var picturesError = this.getPicturesError_();
  if (picturesError) {
    goog.dom.getLastElementChild(parent).innerHTML = picturesError;
    goog.dom.classes.add(grandparent, 'error');
  } else {
    goog.dom.getLastElementChild(parent).innerHTML = 'OK';
    goog.dom.classes.add(grandparent, 'success');
  }
};


/**
 * @param {goog.events.Event} e is the CHANGE event.
 * @private
 */
bidsy.ui.SellContainer.prototype.onDatepickerChange_ = function(e) {
  // TODO(gareth): This isn't triggered since JQuery sucks...
  var parent = this.datepicker_.getElement().parentNode;
  var grandparent = parent.parentNode;

  goog.dom.getLastElementChild(parent).innerHTML = '';
  goog.dom.classes.remove(grandparent, 'success');
  goog.dom.classes.remove(grandparent, 'error');

  var datepickerError = this.getDatepickerError_();
  if (datepickerError) {
    goog.dom.getLastElementChild(parent).innerHTML = datepickerError;
    goog.dom.classes.add(grandparent, 'error');
  } else {
    goog.dom.getLastElementChild(parent).innerHTML = 'OK';
    goog.dom.classes.add(grandparent, 'success');
  }
};


/**
 * @param {goog.events.Event} e is the CHANGE event.
 * @private
 */
bidsy.ui.SellContainer.prototype.onTimepickerChange_ = function(e) {
  // TODO(gareth): This isn't triggered since JQuery sucks...
  var parent = this.timepicker_.getElement().parentNode;
  var grandparent = parent.parentNode;

  goog.dom.getLastElementChild(parent).innerHTML = '';
  goog.dom.classes.remove(grandparent, 'success');
  goog.dom.classes.remove(grandparent, 'error');

  var timepickerError = this.getTimepickerError_();
  if (timepickerError) {
    goog.dom.getLastElementChild(parent).innerHTML = timepickerError;
    goog.dom.classes.add(grandparent, 'error');
  } else {
    goog.dom.getLastElementChild(parent).innerHTML = 'OK';
    goog.dom.classes.add(grandparent, 'success');
  }
};


/**
 * @param {goog.events.Event} e is the CHANGE event.
 * @private
 */
bidsy.ui.SellContainer.prototype.onMinimumChange_ = function(e) {
  var parent = this.minimum_.getElement().parentNode.parentNode;
  var grandparent = parent.parentNode;

  goog.dom.getLastElementChild(parent).innerHTML = '';
  goog.dom.classes.remove(grandparent, 'success');
  goog.dom.classes.remove(grandparent, 'error');

  var minimumError = this.getMinimumError_();
  if (minimumError) {
    goog.dom.getLastElementChild(parent).innerHTML = minimumError;
    goog.dom.classes.add(grandparent, 'error');
  } else {
    goog.dom.getLastElementChild(parent).innerHTML = 'OK';
    goog.dom.classes.add(grandparent, 'success');
  }
};


bidsy.ui.SellContainer.prototype.getCheckedCategories_ = function() {
  var categories = [];
  goog.array.forEach(goog.dom.getElementsByClass('category-checkbox'),
      function(category) {
        if (category.checked) {
          categories.push(category.id.replace('-checkbox', ''));
        }
      });

  return categories;
};


bidsy.ui.SellContainer.prototype.getCategoriesError_ = function() {
  var categories = this.getCheckedCategories_();
  if (categories.length < 1 || categories.length > 3) {
    return 'Auctions need at least one and at most three categories.';
  }
};


bidsy.ui.SellContainer.prototype.getTitleError_ = function() {
  var value = this.title_.getElement().value;
  if (value.length < 5 || value.length > 80) {
    return 'Titles must be between 5 and 80 characters.';
  } else if (/^\s*$/.test(value)) {
    return 'Titles need non-whitespace characters!';
  }

  return null;
};


bidsy.ui.SellContainer.prototype.getDescriptionError_ = function() {
  var value = this.description_.getElement().value;
  if (value.length < 10 || value.length > 200) {
    return 'Descriptions must be between 10 and 200 characters.';
  } else if (/^\s*$/.test(value)) {
    return 'Descriptions need non-whitespace characters!';
  }

  return null;
};


bidsy.ui.SellContainer.prototype.getConditionError_ = function() {
  // TODO(gareth)
};


bidsy.ui.SellContainer.prototype.getPicturesError_ = function() {
  var value = this.pictures_.getElement().value;
  if (/^\s*$/.test(value)) {
    return 'You need to add at least one picture of the item!';
  }

  var errors = [];
  var pictures = value.split(',');
  goog.array.forEach(pictures, function(picture) {
    // TODO(gareth): Check to make sure we can get these images.
  });

  return errors.length == 0 ? null : errors.join(', ');
};


bidsy.ui.SellContainer.prototype.getDatepickerError_ = function() {
  // TODO(gareth): Make sure that this day is today or after
  var value = this.datepicker_.getElement().value;
  // TODO(gareth): Check regex mm/dd/yy
  if (/^\s*$/.test(value)) {
    return 'You need to specify a start date.';
  }

  return null;
};


bidsy.ui.SellContainer.prototype.getTimepickerError_ = function() {
  // TODO(gareth): Make sure that this time is now or after
  var value = this.timepicker_.getElement().value;
  // TODO(gareth): Use a regex to check this time
  if (/^\s*$/.test(value)) {
    return 'You need to specify a start time.';
  }

  return null;
};


bidsy.ui.SellContainer.prototype.getMinimumError_ = function() {
  var value = this.minimum_.getElement().value;
  // TODO(gareth): Use an all-whitespace regex here
  if (/^\s*$/.test(value)) {
    return 'You need to set a minimum bid.';
  }
  if (isNaN(value)) {
    return 'That doesn\'t look much like a number!';
  }

  return null;
};


/**
 * @param {bidsy.ui.SellContainer.Mode} mode is the sell mode to switch to.
 * @private
 */
bidsy.ui.SellContainer.prototype.setMode_ = function(mode) {
  if (mode == this.mode_) {
    return;
  }

  console.log('Going into ' + mode.toString() + ' mode.');

  goog.array.forEach(this.tabs_, function(tab) {
    goog.dom.classes.remove(tab['label'].getElement(), 'active');
    goog.style.showElement(tab['view'].getElement(), false);
  }, this);

  switch (mode) {
    case bidsy.ui.SellContainer.Mode.AUCTION:
      goog.dom.classes.add(this.auctionTab_.getElement(), 'active');
      goog.style.showElement(this.auctionView_.getElement(), true);
      break;
    case bidsy.ui.SellContainer.Mode.ITEM:
      goog.dom.classes.add(this.itemTab_.getElement(), 'active');
      goog.style.showElement(this.itemView_.getElement(), true);
      break;
    case bidsy.ui.SellContainer.Mode.PAYMENT:
      goog.dom.classes.add(this.paymentTab_.getElement(), 'active');
      goog.style.showElement(this.paymentView_.getElement(), true);
      break;
    case bidsy.ui.SellContainer.Mode.SHARE:
      goog.dom.classes.add(this.shareTab_.getElement(), 'active');
      goog.style.showElement(this.shareView_.getElement(), true);
      break;
    default:
      break;
  }

  this.mode_ = mode;
};


/** @enum {string} */
bidsy.ui.SellContainer.Mode = {
    AUCTION: 'auction'
  , ITEM: 'item'
  , PAYMENT: 'payment'
  , SHARE: 'share'
};
