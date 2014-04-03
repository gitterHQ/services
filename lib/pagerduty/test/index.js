var assert = require('assert');
var pagerduty = require('../..').pagerduty;
var parse = pagerduty.parse;
var examples = pagerduty.examples;

describe('PagerDuty', function() {
  it('should parse an incident event', function() {
    var body = examples['trigger_resolve'].body;
    var settings = {
      events: ['trigger']
    };

    var result = parse({}, body, settings);

    assert.equal(result.message, 'Incident [1](https://acme.pagerduty.com/incidents/PIJ90N7) on [service](https://acme.pagerduty.com/services/PBAZLIU) triggered. Assigned to Alan Kay.');
  });

  it('should parse a resolve event', function() {
    var body = examples['trigger_resolve'].body;
    var settings = {
      events: ['resolve']
    };

    var result = parse({}, body, settings);

    assert.equal(result.message, 'Incident [1](https://acme.pagerduty.com/incidents/PIJ90N7) on [service](https://acme.pagerduty.com/services/PBAZLIU) resolved by Alan Kay.');
  });


  it('should parse a delegation event', function() {
    var body = examples['delegate'].body;
    var settings = {
      events: ['delegate']
    };

    var result = parse({}, body, settings);

    assert.equal(result.message, 'Incident [6404](https://gitter.pagerduty.com/incidents/xxxxx) on [xxxx](https://gitter.pagerduty.com/services/xxxxxx) delegated to Andrew Newdigate.');
  });

});
