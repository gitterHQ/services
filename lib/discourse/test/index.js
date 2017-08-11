var assert = require('assert');
var discourse = require('../..').discourse;
var parse = discourse.parse;
var examples = discourse.examples;

describe('Discourse', function(){
	it('should generate a normal message', function(){
		var payload = examples.normal;

		var response = parse(payload.headers, payload.body, {});

		assert.equal(response.message, payload.body.message);
		assert.equal(response.icon, 'logo');
		assert.equal(response.errorLevel, 'normal');
	});
});