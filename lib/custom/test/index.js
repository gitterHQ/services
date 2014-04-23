var assert = require('assert');
var custom = require('../..').custom;
var parse = custom.parse;
var examples = custom.examples;

describe('Custom', function() {

  it('should show a full object message', function() {
    var payload = examples['object'];

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, 'Hello full world');
    assert.equal(response.icon, 'logo');
    assert.equal(response.errorLevel, 'normal');
  });

  it('should show an error message', function() {
    var payload = examples['error_object'];

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, 'I AM ERROR');
    assert.equal(response.icon, 'error');
    assert.equal(response.errorLevel, 'error');
  });

  it('should show a full message if errorLevel is missing', function() {
    var payload = examples['partial_object'];

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, 'Just a message, no level');
    assert.equal(response.icon, 'logo');
    assert.equal(response.errorLevel, 'normal');
  });

  it('should not show a message with no body content', function() {
    var payload = examples['empty'];

    var response = parse(payload.headers, payload.body);

    assert.equal(response, undefined);
  });
});
