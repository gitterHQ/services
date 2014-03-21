var assert = require('assert');
var parse = require('../../lib/jenkins').parse;

describe('Jenkins', function() {

  it('should generate a failure message', function() {
    var body = require('./failure');
    var hook = {
      settings: {
        events: ['failure']
      }
    };
    assert.equal(parse({}, body, hook), 'Job webhooks-handler finished with status: failure');
  });

  it('should generate a success message', function() {
    var body = require('./success');
    var hook = {
      settings: {
        events: ['success']
      }
    };
    assert.equal(parse({}, body, hook), 'Job webhooks-handler finished with status: success');
  });

  it('should generate a start message', function() {
    var body = require('./started');
    var hook = {
      settings: {
        events: ['started']
      }
    };
    assert.equal(parse({}, body, hook), 'Job webhooks-handler started');
  });

  it('shouldnt generate a start message if im not listening to that event', function() {
    var body = require('./started');
    var hook = {
      settings: {
        events: ['success']
      }
    };
    assert.equal(parse({}, body, hook) || '', '');
  });

  it('shouldnt generate a message for completed jobs', function() {
    var body = require('./completed');
    var hook = {
      settings: {
        events: ['started', 'success', 'failure']
      }
    };
    assert.equal(parse({}, body, hook) || '', '');
  });

});
