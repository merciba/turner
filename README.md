Turner
========

A small utility to get the most out of your Literate Coffeescript. Let's dig in!

The constructor just returns itself. Nothing special here.

```CoffeeScript
	class Turner

		constructor: () ->
			@
```

Here, we include the modules we'll need to parse Literate Coffeescript.			

```CoffeeScript			
coffee: require 'coffee-script'

browserify: require 'browserify-string'

markdown: require 'marked'

promise: require('q').Promise
```

Turner.toJs
-----------

Accepts: (string) litCoffee, (function) next
Returns: ([promise](http://strongloop.com/strongblog/promises-in-node-js-with-q-an-alternative-to-callbacks/))

This function takes a string of Literate Coffeescript and gives you a string of valid, isomorphic vanilla JS for use on both the client and a Node server.

```CoffeeScript
toJs: (litCoffee, next) ->
	self = @
	js = @coffee.compile litCoffee, { literate: true }

	return self.browserify(js).bundle (err, bundle) ->
		if next
			next new Error err if err
			next null, bundle.toString()
		return self.promise (resolve, reject) ->
			if err
				reject new Error err
			else resolve bundle.toString()
```

Turner.toHtml
-----------

Accepts: (string) litCoffee, (function) next
Returns: ([promise](http://strongloop.com/strongblog/promises-in-node-js-with-q-an-alternative-to-callbacks/))

This function takes a string of Literate Coffeescript and gives you a string of valid HTML to serve up in a browser. 

```CoffeeScript
toHtml: (litCoffee, next) ->
	self = @
	return @markdown litCoffee, (err, html) ->
		if next
			next new Error err if err
			next null, html
		return self.promise (resolve, reject) ->
			if err
				reject new Error err
			else resolve html
```

That's it! More to come soon. Export the module.

```CoffeeScript
	module.exports = new Turner()
```

Disclaimer
----------
More documentation coming soon. Not yet ready for production, Please remember that use of this software means providing access to your provider's APIs, which use services that may cost you money. Always be careful with your API keys! Merciba is not responsible for any loss or damage caused by use of this software.  