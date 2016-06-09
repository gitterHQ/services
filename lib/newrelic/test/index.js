var assert = require('assert');
var newrelic = require('../..').newrelic;
var parse = newrelic.parse;
var examples = newrelic.examples;

describe('New Relic', function() {

  it('should show a full object message', function() {
    var payload = examples['error_object'];

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, "Alert opened on [application name]: Apdex score fell below critical level of 0.90. For details [click here!](https://rpm.newrelic.com/accounts/[account_id]/applications/[application_id]/incidents/[incident_id])");
    assert.equal(response.icon, 'error');
    assert.equal(response.errorLevel, 'error');
  });

  it('should not show a message with no body content', function() {
    var payload = examples['empty'];

    var response = parse(payload.headers, payload.body);

    assert.equal(response, undefined);
  });
});
