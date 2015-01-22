var Turner, coffee, es, markdown, uglify;

coffee = require('coffee-script');

markdown = require('marked');

uglify = require('uglify-stream');

es = require('event-stream');

Turner = {
  coffeescript: function() {
    return es.through(function(data) {
      return this.queue(coffee.compile(data.toString(), {
        literate: true
      }));
    });
  },
  minify: function() {
    return uglify();
  },
  markdown: function() {
    return es.through(function(data) {
      return this.queue(markdown(data.toString()));
    });
  }
};

module.exports = Turner;
