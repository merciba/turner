var Turner = require('../index.js'),
	fs = require('fs'),
	path = require('path'),
	assert = require('assert'),
	should = require('should');

describe('Turner', function() {

	it('should compile litcoffee string to uglified js', function(done) {
		var readStream = fs.createReadStream(path.join(__dirname, '../src/turner.litcoffee'));
		var writeStream = fs.createWriteStream(__dirname + '/output.js');
		
		writeStream.on('finish', done)
		readStream.pipe(Turner.coffeescript()).pipe(Turner.minify()).pipe(writeStream)
	});

	it('should compile litcoffee string to html', function(done) {
		var readStream = fs.createReadStream(path.join(__dirname, '../src/turner.litcoffee'));
		var writeStream = fs.createWriteStream(__dirname + '/output.html');
		
		writeStream.on('finish', done)
		readStream.pipe(Turner.markdown()).pipe(writeStream)
	});
	
});
