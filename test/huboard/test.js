var assert = require('assert');
var parse = require('../../lib/huboard').parse;

describe('HuBoard', function() {
  it('should parse an issue opened event', function() {
    var body = require('./issue_opened');
    var hook = {
      settings: {
        events: ['issue_opened_or_closed']
      }
    };
    assert.equal(parse({}, body, hook), '@trevorah opened trevorah/test-repo#8');
  });

  it('should parse an issue blocked event', function() {
    var body = require('./issue_status_changed_blocked');
    var hook = {
      settings: {
        events: ['issue_status_changed']
      }
    };
    assert.equal(parse({}, body, hook), '@trevorah changed status of trevorah/test-repo#8 to blocked');
  });

  it('should parse an issue ready event', function() {
    var body = require('./issue_status_changed_ready');
    var hook = {
      settings: {
        events: ['issue_status_changed']
      }
    };
    assert.equal(parse({}, body, hook), '@trevorah changed status of trevorah/test-repo#8 to ready');
  });

  it('should parse an issue unready event', function() {
    var body = require('./issue_status_changed_unready');
    var hook = {
      settings: {
        events: ['issue_status_changed']
      }
    };
    assert.equal(parse({}, body, hook), '@trevorah changed status of trevorah/test-repo#8 to unready');
  });

  it('should parse a milestone changed event', function() {
    var body = require('./milestone_changed');
    var hook = {
      settings: {
        events: ['milestone_changed']
      }
    };
    assert.equal(parse({}, body, hook), '@trevorah changed milestone of trevorah/test-repo#6 to miley stoney');
  });

  it('should parse a moved event', function() {
    var body = require('./moved');
    var hook = {
      settings: {
        events: ['moved']
      }
    };
    assert.equal(parse({}, body, hook), '@trevorah moved trevorah/test-repo#1 from Backlog to Ready');
  });
});
