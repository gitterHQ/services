var assert = require('assert');
var huboard = require('../..').huboard;
var parse = huboard.parse;
var examples = huboard.examples;

describe('HuBoard', function() {
  it('should parse an issue opened event', function() {
    var body = examples['issue_opened'].body;
    var settings = {
      events: {
        'issue_opened_or_closed': true
      }
    };
    assert.equal(parse({}, body, settings).message, '@trevorah opened trevorah/test-repo#8');
  });

  it('should parse an issue blocked event', function() {
    var body = examples['issue_status_changed_blocked'].body;
    var settings = {
      events: {
        'issue_status_changed': true
      }
    };
    assert.equal(parse({}, body, settings).message, '@trevorah changed status of trevorah/test-repo#8 to blocked');
  });

  it('should parse an issue ready event', function() {
    var body = examples['issue_status_changed_ready'].body;
    var settings = {
      events: {
        'issue_status_changed': true
      }
    };
    assert.equal(parse({}, body, settings).message, '@trevorah changed status of trevorah/test-repo#8 to ready');
  });

  it('should parse an issue unready event', function() {
    var body = examples['issue_status_changed_unready'].body;
    var settings = {
      events: {
        'issue_status_changed': true
      }
    };
    assert.equal(parse({}, body, settings).message, '@trevorah changed status of trevorah/test-repo#8 to unready');
  });

  it('should parse a milestone changed event', function() {
    var body = examples['milestone_changed'].body;
    var settings = {
      events: {
        'milestone_changed': true
      }
    };
    assert.equal(parse({}, body, settings).message, '@trevorah changed milestone of trevorah/test-repo#6 to miley stoney');
  });

  it('should parse a moved event', function() {
    var body = examples['moved'].body;
    var settings = {
      events: {
        'moved': true
      }
    };
    assert.equal(parse({}, body, settings).message, '@trevorah moved trevorah/test-repo#1 from Backlog to Ready');
  });
});
