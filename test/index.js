var turner = require('../index.js'),
	fs = require('fs'),
	path = require('path'),
	assert = require('assert'),
	should = require('should'),
	litCoffee = fs.readFileSync(path.join(__dirname, '../src/turner.litcoffee')).toString();

describe('Turner', function() {

	it('should compile litcoffee string to browserified js', function(done) {
		turner.toJs(litCoffee, function(err, js) {
			if (err) throw err
			js.should.be.instanceOf(String);
			done();
		});
	});

	it('should compile litcoffee string to html', function(done) {
		turner.toHtml(litCoffee, function(err, html) {
			if (err) throw err
			html.should.be.instanceOf(String);
			done();
		});
	});
	
});
