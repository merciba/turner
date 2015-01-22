Turner
========

A small utility to get the most out of your Literate CoffeeScript. Let's dig in!

Getting Started
---------------

```
npm install turner
```

Creating a minified JS file from (Literate) CoffeeScript:

```JavaScript
	var readStream = fs.createReadStream(path.join(__dirname, '../src/turner.litcoffee'));
	var writeStream = fs.createWriteStream(__dirname + '/output.js');

	writeStream.on('finish', done)
	readStream.pipe(Turner.coffeescript()).pipe(Turner.minify()).pipe(writeStream)
```

Creating an HTML file from (Literate) CoffeeScript:

```JavaScript
	var readStream = fs.createReadStream(path.join(__dirname, '../src/turner.litcoffee'));
	var writeStream = fs.createWriteStream(__dirname + '/output.html');
		
	writeStream.on('finish', done)
	readStream.pipe(Turner.markdown()).pipe(writeStream)
```

Source
------

**note: The following is a copy of the actual Literate CoffeeScript source code, located [here](https://github.com/merciba/turner/blob/master/src/turner.litcoffee). Check it out, to see LCS in action, acting as both a Markdown file and Coffeescript source code. Legit.**

Here, we include the modules we'll need.

```CoffeeScript
	coffee = require 'coffee-script'
	markdown = require 'marked'
	uglify = require 'uglify-stream'
	es = require 'event-stream'
```

A call to `require('turner')` will return these three methods: `coffeescript`, `minify`, and `markdown`. 

`es`, defined above, is an instance of [event-stream](https://www.npmjs.com/package/event-stream), an extremely useful and easy syntax for creating [transforms](http://codewinds.com/blog/2013-08-20-nodejs-transform-streams.html) to stick in your "pipes". 

```CoffeeScript
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
```

That's it! Export the module.

```CoffeeScript
	module.exports = Turner
```