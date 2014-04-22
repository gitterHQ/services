var assert = require('assert');
var gitlab = require('../..').gitlab;
var parse = gitlab.parse;
var examples = gitlab.examples;

describe('GitLab pushes', function() {
  it('should generate a push event', function() {
    var payload = examples['push'];
    var settings = {
      events: {
        'push': true
      }
    };

    var response = parse(payload.headers, payload.body, settings);
    assert.equal(response.message, 'GitLab | John Smith pushed 4 commits to Diaspora');
    assert.equal(response.icon, 'logo');
    assert.equal(response.errorLevel, 'normal');
  });

  it('shouldnt generate a push message if not listening to that event', function() {
    var payload = examples['push'];
    var settings = {
      events: {
        'push': false
      }
    };

    var response = parse(payload.headers, payload.body, settings);
    assert.equal(response, undefined);
  });
});

describe('GitLab merge requests', function() {
  it('should generate an opened merge request', function() {
    var payload = examples['merge_request_opened'];
    var settings = {
      events: {
        'mergerequest': true
      }
    };

    var response = parse(payload.headers, payload.body, settings);
    assert.equal(response.message, 'GitLab | Merge request [\\#1 MS-Viewport] created');
    assert.equal(response.icon, 'logo');
    assert.equal(response.errorLevel, 'normal');
  });

  it('shouldnt generate a merge request message if not listening to that event', function() {
    var payload = examples['merge_request_opened'];
    var settings = {
      events: {
        'mergerequest': false
      }
    };

    var response = parse(payload.headers, payload.body, settings);
    assert.equal(response, undefined);
  });

  it('should generate an updated merge request', function() {
    var payload = examples['merge_request_updated'];
    var settings = {
      events: {
        'mergerequest': true
      }
    };

    var response = parse(payload.headers, payload.body, settings);
    assert.equal(response.message, 'GitLab | Merge request [\\#1 MS-Viewport] updated');
  });
});

describe('GitLab issues', function() {
  it('should generate an opened issue', function() {
    var payload = examples['issue_opened'];
    var settings = {
      events: {
        'issue': true
      }
    };

    var response = parse(payload.headers, payload.body, settings);
    assert.equal(response.message, 'GitLab | Issue [\\#23 Issue title] opened.');
    assert.equal(response.icon, 'logo');
    assert.equal(response.errorLevel, 'normal');
  });

  it('shouldnt generate an issue message if not listening to that event', function() {
    var payload = examples['issue_opened'];
    var settings = {
      events: {
        'issue': false
      }
    };

    var response = parse(payload.headers, payload.body, settings);
    assert.equal(response, undefined);
  });

  it('should generate an updated issue', function() {
    var payload = examples['issue_updated'];
    var settings = {
      events: {
        'issue': true
      }
    };

    var response = parse(payload.headers, payload.body, settings);
    assert.equal(response.message, 'GitLab | Issue [\\#23 Issue title] updated.');
  })
});
