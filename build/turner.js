var Turner;

Turner = (function() {
  function Turner() {
    this;
  }

  Turner.prototype.coffee = require('coffee-script');

  Turner.prototype.browserify = require('browserify-string');

  Turner.prototype.markdown = require('marked');

  Turner.prototype.promise = require('q').Promise;

  Turner.prototype.toJs = function(litCoffee, next) {
    var js, self;
    self = this;
    js = this.coffee.compile(litCoffee, {
      literate: true
    });
    return self.browserify(js).bundle(function(err, bundle) {
      if (next) {
        if (err) {
          next(new Error(err));
        }
        next(null, bundle.toString());
      }
      return self.promise(function(resolve, reject) {
        if (err) {
          return reject(new Error(err));
        } else {
          return resolve(bundle.toString());
        }
      });
    });
  };

  Turner.prototype.toHtml = function(litCoffee, next) {
    var self;
    self = this;
    return this.markdown(litCoffee, function(err, html) {
      if (next) {
        if (err) {
          next(new Error(err));
        }
        next(null, html);
      }
      return self.promise(function(resolve, reject) {
        if (err) {
          return reject(new Error(err));
        } else {
          return resolve(html);
        }
      });
    });
  };

  return Turner;

})();

module.exports = new Turner();
