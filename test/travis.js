var assert = require('assert');
var travis = require('../lib/travis');
var parse = travis.parse;
var examples = travis.examples;

describe('Travis CI', function() {

  it('should generate a success message', function() {
    var body = examples['passed'].body;
    assert.equal(parse({}, body).message, 'Tests for malditogeek/hook passed');
  });

  it('should generate a build pending message', function() {
    var body = examples['pending'].body;
    assert.equal(parse({}, body).message, 'Tests for malditogeek/hook pending');
  });

  it('should generate a build fixed message', function() {
    var body = examples['fixed'].body;
    assert.equal(parse({}, body).message, 'Tests for malditogeek/hook fixed');
  });

  it('should generate a build still failing message', function() {
    var body = examples['still_failing'].body;
    assert.equal(parse({}, body).message, 'Tests for malditogeek/hook still failing');
  });

  it('should generate a build broken message', function() {
    var body = examples['broken'].body;
    assert.equal(parse({}, body).message, 'Tests for malditogeek/hook broken');
  });

});
