var assert = require('assert');
var trackjs = require('../..').trackjs;
var parse = trackjs.parse;
var examples = trackjs.examples;

describe('TrackJS test', function() {
  it('should generate a test event', function() {
    var payload = examples['test'];

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, 'TrackJS | This is a test error');
    assert.equal(response.icon, 'logo');
    assert.equal(response.errorLevel, 'normal');
  });
});
