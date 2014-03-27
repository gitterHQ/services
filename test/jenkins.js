var assert = require('assert');
var jenkins = require('../lib/jenkins');
var parse = jenkins.parse;
var examples = jenkins.examples;

describe('Jenkins', function() {

  it('should generate a failure message', function() {
    var body = examples['failure'].body;
    var hook = {
      settings: {
        events: ['failure']
      }
    };
    assert.equal(parse({}, body, hook).message, 'Job webhooks-handler finished with status: failure');
  });

  it('should generate a success message', function() {
    var body = examples['success'].body;
    var hook = {
      settings: {
        events: ['success']
      }
    };
    assert.equal(parse({}, body, hook).message, 'Job webhooks-handler finished with status: success');
  });

  it('should generate a start message', function() {
    var body = examples['started'].body;
    var hook = {
      settings: {
        events: ['started']
      }
    };
    assert.equal(parse({}, body, hook).message, 'Job webhooks-handler started');
  });

  it('shouldnt generate a start message if im not listening to that event', function() {
    var body = examples['started'].body;
    var hook = {
      settings: {
        events: ['success']
      }
    };
    assert.equal(parse({}, body, hook), undefined);
  });

  it('shouldnt generate a message for completed jobs', function() {
    var body = examples['completed'].body;
    var hook = {
      settings: {
        events: ['started', 'success', 'failure']
      }
    };
    assert.equal(parse({}, body, hook), undefined);
  });

});
