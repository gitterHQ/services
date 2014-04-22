var assert = require('assert');
var logentries = require('../..').logentries;
var parse = logentries.parse;
var examples = logentries.examples;

describe('Logentries', function() {

  it('should generate an alert', function() {
    var payload = examples['alert'];
    var settings = {
      events: {
        'alert': true
      }
    };

    var response = parse(payload.headers, payload.body, settings);

    assert.equal(response.message, '[[alert-name] hostname/name of log](https://logentries.com/app/1a2345678#id=8b061664&r=d&s=log)');
    assert.equal(response.icon, 'logo');
    assert.equal(response.errorLevel, 'error');
  });

});
