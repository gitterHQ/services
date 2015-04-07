var assert = require('assert');
var coveralls = require('../..').coveralls;
var parse = coveralls.parse;
var examples = coveralls.examples;

describe('Coveralls', function() {

  it('should generate a negative message', function() {
    var payload = examples.down;

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, 'Coveralls [alexfu/SQLiteQueryBuilder](https://coveralls.io/builds/2214355) (develop) `-1.2%`');
    assert.equal(response.icon, 'down');
    assert.equal(response.errorLevel, 'normal');
  });

  it('should generate a positive message', function() {
    var payload = examples.up;

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, 'Coveralls [alexfu/SQLiteQueryBuilder](https://coveralls.io/builds/2214355) (develop) `+1.2%`');
    assert.equal(response.icon, 'up');
    assert.equal(response.errorLevel, 'normal');
  });

  it('should generate a neutral message', function() {
    var payload = examples.neutral;

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, 'Coveralls [alexfu/SQLiteQueryBuilder](https://coveralls.io/builds/2214355) (develop) `-0.0%`');
    assert.equal(response.icon, 'neutral');
    assert.equal(response.errorLevel, 'normal');
  });

});
