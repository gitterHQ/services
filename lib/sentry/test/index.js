var assert = require('assert');
var gitlab = require('../..').sentry;
var parse = gitlab.parse;
var examples = gitlab.examples;

describe('Sentry events', function() {
  var settings;

  beforeEach(function() {
    settings = { events: {
      fatal: true,
      error: true,
      warning: true,
      info: true,
      debug: true
    }};
  });

  it('should generate a fatal event', function() {
    var payload = examples['sentry_fatal_event'];

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, 'Sentry reported [a fatal event in badges](https://app.getsentry.com/xxxxx/badges/group/23897129387/): `This is an example Python exception`');
    assert.equal(response.icon, 'error');
    assert.equal(response.errorLevel, 'error');
  });

  it('should generate an error event', function() {
    var payload = examples['sentry_error_event'];

    var response = parse(payload.headers, payload.body, settings);

    assert.equal(response.message, 'Sentry reported [an error in badges](https://app.getsentry.com/xxxxx/badges/group/23897129387/): `This is an example Python exception`');
    assert.equal(response.icon, 'error');
    assert.equal(response.errorLevel, 'error');
  });

  it('should generate a warning event', function() {
    var payload = examples['sentry_warning_event'];

    var response = parse(payload.headers, payload.body, settings);

    assert.equal(response.message, 'Sentry reported [a warning event in badges](https://app.getsentry.com/xxxxx/badges/group/23897129387/): `This is an example Python exception`');
    assert.equal(response.icon, 'logo');
    assert.equal(response.errorLevel, 'normal');
  });

  it('should generate a sentry info event', function() {
    var payload = examples['sentry_info_event'];

    var response = parse(payload.headers, payload.body, settings);

    assert.equal(response.message, 'Sentry reported [an event in badges](https://app.getsentry.com/xxxxx/badges/group/23897129387/): `This is an example Python exception`');
    assert.equal(response.icon, 'logo');
    assert.equal(response.errorLevel, 'normal');
  });

  it('should generate a sentry debug event', function() {
    var payload = examples['sentry_debug_event'];

    var response = parse(payload.headers, payload.body, settings);

    assert.equal(response.message, 'Sentry reported [a debug event in badges](https://app.getsentry.com/xxxxx/badges/group/23897129387/): `This is an example Python exception`');
    assert.equal(response.icon, 'logo');
    assert.equal(response.errorLevel, 'normal');
  });

  it('should not generate a sentry debug event when debug is off', function() {
    var payload = examples['sentry_debug_event'];
    settings.events.debug = false;
    var response = parse(payload.headers, payload.body, settings);

    assert(!response);
  });

  it('should handle a json payload with a form encoded content-type', function() {
    var payload = examples['sentry_wrong_encoding'];

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, 'Sentry reported [an error in something](https://app.getsentry.com/x/y/group/XXXXXXX/): `This is an example Python exception`');
    assert.equal(response.icon, 'error');
    assert.equal(response.errorLevel, 'error');
  });

  it('should handle a different json payload with a form encoded content-type', function() {
    var payload = examples['sentry_wrong_encoding_2'];

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, 'Sentry reported [an error in something](https://app.getsentry.com/gitter/XXXXXXX/group/27390381/): `This is an example Python exception`');
    assert.equal(response.icon, 'error');
    assert.equal(response.errorLevel, 'error');
  });


});
