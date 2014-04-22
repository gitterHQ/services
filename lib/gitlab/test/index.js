var assert = require('assert');
var gitlab = require('../..').gitlab;
var parse = gitlab.parse;
var examples = gitlab.examples;

describe('Gitlab pushes', function() {
  it('should generate a push event', function() {
    var payload = examples['push'];
    var settings = {
      'push': true
    }
    var response = parse(payload.headers, payload.body, settings);
    assert.equal(response.message, 'GitLab | John Smith pushed 4 commits to Diaspora');
    assert.equal(response.icon, 'logo');
    assert.equal(response.errorLevel, 'normal');
  });
});

describe('Gitlab merge requests', function() {
  it('should generate an opened merge request', function() {
    var payload = examples['merge_request_opened'];
    var settings = {
      'mergerequest': true
    }

    var response = parse(payload.headers, payload.body, settings);
    assert.equal(response.message, 'GitLab | Merge request [#1 MS-Viewport] created');
    assert.equal(response.icon, 'logo');
    assert.equal(response.errorLevel, 'normal');
  });

  it('should generate an updated merge request', function() {
    var payload = examples['merge_request_updated'];
    var settings = {
      'mergerequest': true
    }

    var response = parse(payload.headers, payload.body, settings);
    assert.equal(response.message, 'GitLab | Merge request [#1 MS-Viewport] updated');
  });
});

describe('Gitlab issues', function() {
  it('should generate an opened issue', function() {
    var payload = examples['issue_opened'];
    var settings = {
      events: {
        'issue': true
      }
    };

    var response = parse(payload.headers, payload.body, settings);
    assert.equal(response.message, 'GitLab | Issue [#23 Issue title] opened.');
    assert.equal(response.icon, 'logo');
    assert.equal(response.errorLevel, 'normal');
  });

  it('should generate an updated issue', function() {
    var payload = examples['issue_updated'];
    var settings = {
      events: {
        'issue': true
      }
    };

    var response = parse(payload.headers, payload.body, settings);
    assert.equal(response.message, 'GitLab | Issue [#23 Issue title] updated.');
  })
});
