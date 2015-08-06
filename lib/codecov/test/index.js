var assert = require('assert');
var codecov = require('../..').codecov;
var parse = codecov.parse;
var examples = codecov.examples;

describe('Codecov', function() {

  it('should generate a negative message', function() {
    var payload = examples.down;

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, '[Coverage](https://codecov.io/github/owner/repo/commit/b955f16919680d33521da9b25213bb7b3ad20a5a) (master) `-1.2%`');
    assert.equal(response.icon, 'frown');
    assert.equal(response.errorLevel, 'error');
  });

  it('should generate a positive message', function() {
    var payload = examples.up;

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, '[Coverage](https://codecov.io/github/owner/repo/commit/b955f16919680d33521da9b25213bb7b3ad20a5a) (master) `+1.2%`');
    assert.equal(response.icon, 'smile');
    assert.equal(response.errorLevel, 'normal');
  });

  it('should generate a neutral message', function() {
    var payload = examples.neutral;

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, '[Coverage](https://codecov.io/github/owner/repo/commit/b955f16919680d33521da9b25213bb7b3ad20a5a) (master) `+0.0%`');
    assert.equal(response.icon, 'smile');
    assert.equal(response.errorLevel, 'normal');
  });

  it('should generate a pr message', function() {
    var payload = examples.pr;

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, '[Coverage](https://codecov.io/github/owner/repo/commit/b955f16919680d33521da9b25213bb7b3ad20a5a) (#1) `+0.0%`');
    assert.equal(response.icon, 'smile');
    assert.equal(response.errorLevel, 'normal');
  });

});
