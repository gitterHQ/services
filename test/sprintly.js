var assert = require('assert');
var sprintly = require('../lib/sprintly');
var parse = sprintly.parse;
var examples = sprintly.examples;

describe('Sprint.ly', function() {

  it('should generate a success message', function() {
    var body = examples['update'].body;
    assert.equal(parse({}, body).message, 'Joe just created a new story: As a user, I want outbound service hooks so that I will see new items announced in Campfire or HipChat. (backlog)');
  });

});
