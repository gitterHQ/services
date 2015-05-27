var assert = require('assert');
var codecov = require('../..').codecov;
var parse = codecov.parse;
var examples = codecov.examples;

describe('Codecov', function() {

  it('should generate a negative message', function() {
    var payload = examples.down;

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, 'Codecov [codecov/ci-repo](https://codecov.io/codecov/ci-repo?ref=451260c90218735437acd3dc51dff169ada4040d) (develop) `-1.2%`');
    assert.equal(response.icon, 'down');
    assert.equal(response.errorLevel, 'normal');
  });

  it('should generate a positive message', function() {
    var payload = examples.up;

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, 'Codecov [codecov/ci-repo](https://codecov.io/codecov/ci-repo?ref=451260c90218735437acd3dc51dff169ada4040d) (develop) `+1.2%`');
    assert.equal(response.icon, 'up');
    assert.equal(response.errorLevel, 'normal');
  });

  it('should generate a neutral message', function() {
    var payload = examples.neutral;

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, 'Codecov [codecov/ci-repo](https://codecov.io/codecov/ci-repo?ref=451260c90218735437acd3dc51dff169ada4040d) (develop) `-0.0%`');
    assert.equal(response.icon, 'neutral');
    assert.equal(response.errorLevel, 'normal');
  });

});
