var assert = require('assert');
var huboard = require('../..').huboard;
var parse = huboard.parse;
var examples = huboard.examples;

describe('HuBoard', function() {
  it('should parse an issue opened event', function() {
    var body = examples['issue_opened'].body;
    var hook = {
      settings: {
        events: ['issue_opened_or_closed']
      }
    };
    assert.equal(parse({}, body, hook).message, '@trevorah opened trevorah/test-repo#8');
  });

  it('should parse an issue blocked event', function() {
    var body = examples['issue_status_changed_blocked'].body;
    var hook = {
      settings: {
        events: ['issue_status_changed']
      }
    };
    assert.equal(parse({}, body, hook).message, '@trevorah changed status of trevorah/test-repo#8 to blocked');
  });

  it('should parse an issue ready event', function() {
    var body = examples['issue_status_changed_ready'].body;
    var hook = {
      settings: {
        events: ['issue_status_changed']
      }
    };
    assert.equal(parse({}, body, hook).message, '@trevorah changed status of trevorah/test-repo#8 to ready');
  });

  it('should parse an issue unready event', function() {
    var body = examples['issue_status_changed_unready'].body;
    var hook = {
      settings: {
        events: ['issue_status_changed']
      }
    };
    assert.equal(parse({}, body, hook).message, '@trevorah changed status of trevorah/test-repo#8 to unready');
  });

  it('should parse a milestone changed event', function() {
    var body = examples['milestone_changed'].body;
    var hook = {
      settings: {
        events: ['milestone_changed']
      }
    };
    assert.equal(parse({}, body, hook).message, '@trevorah changed milestone of trevorah/test-repo#6 to miley stoney');
  });

  it('should parse a moved event', function() {
    var body = examples['moved'].body;
    var hook = {
      settings: {
        events: ['moved']
      }
    };
    assert.equal(parse({}, body, hook).message, '@trevorah moved trevorah/test-repo#1 from Backlog to Ready');
  });
});
