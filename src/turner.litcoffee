Turner
========

A small utility to get the most out of your Literate Coffeescript. Let's dig in!

Here, we include the modules we'll need.

	coffee = require 'coffee-script'
	markdown = require 'marked'
	uglify = require 'uglify-stream'
	es = require 'event-stream'

A call to `require('turner')` will return these three methods: `coffeescript`, `minify`, and `markdown`. 

`es`, defined above, is an instance of [event-stream](https://www.npmjs.com/package/event-stream), an extremely useful and easy syntax for creating [transforms](http://codewinds.com/blog/2013-08-20-nodejs-transform-streams.html) to stick in your "pipes". 

	Turner = {

		coffeescript: () ->
			return es.through (data) ->
				@queue coffee.compile data.toString(), { literate: true }

		minify: () ->
			return uglify() # note here that uglify-stream already returns a transform. Badass!

		markdown: () ->
			return es.through (data) ->
				@queue markdown data.toString()

	}

That's it! Export the module.

	module.exports = Turner