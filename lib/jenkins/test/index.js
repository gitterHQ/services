var assert = require('assert');
var jenkins = require('../..').jenkins;
var parse = jenkins.parse;
var examples = jenkins.examples;

describe('Jenkins', function() {

  it('should generate a failure message', function() {
    var payload = examples['failure'];
    var hook = {
      settings: {
        events: ['failure']
      }
    };

    var response = parse(payload.headers, payload.body, hook);

    assert.equal(response.message, 'Jenkins [webhooks-handler](http://beta-internal:8080/job/webhooks-handler/6/) failure');
    assert.equal(response.icon, 'frown');
    assert.equal(response.errorLevel, 'error');
  });

  it('should generate a success message', function() {
    var payload = examples['success'];
    var hook = {
      settings: {
        events: ['success']
      }
    };

    var response = parse(payload.headers, payload.body, hook);

    assert.equal(response.message, 'Jenkins [webhooks-handler](http://beta-internal:8080/job/webhooks-handler/6/) success');
    assert.equal(response.icon, 'smile');
    assert.equal(response.errorLevel, 'normal');
  });

  it('should generate a start message', function() {
    var payload = examples['started'];
    var hook = {
      settings: {
        events: ['started']
      }
    };

    var response = parse(payload.headers, payload.body, hook);

    assert.equal(response.message, 'Jenkins [webhooks-handler](http://beta-internal:8080/job/webhooks-handler/6/) started');
    assert.equal(response.icon, 'meh');
    assert.equal(response.errorLevel, 'normal');
  });

  it('shouldnt generate a start message if im not listening to that event', function() {
    var payload = examples['started'];
    var hook = {
      settings: {
        events: ['success']
      }
    };

    var response = parse(payload.headers, payload.body, hook);

    assert.equal(response, undefined);
  });

  it('shouldnt generate a message for completed jobs', function() {
    var payload = examples['completed'];
    var hook = {
      settings: {
        events: ['started', 'success', 'failure']
      }
    };

    var response = parse(payload.headers, payload.body, hook);

    assert.equal(response, undefined);
  });

});
