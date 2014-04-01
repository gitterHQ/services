var assert = require('assert');
var sprintly = require('../..').sprintly;
var parse = sprintly.parse;
var examples = sprintly.examples;

describe('Sprint.ly', function() {

  it('should generate a standard message', function() {
    var payload = examples['update'];

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, 'Joe Stump created  \n[As a user, I want outbound service hooks so that I will see new items announced in Campfire or HipChat.](http://sprint.ly/i/1/116550/)');
    assert.equal(response.icon, 'columns');
    assert.equal(response.errorLevel, 'normal');
  });

});
