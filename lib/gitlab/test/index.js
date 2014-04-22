var assert = require('assert');
var gitlab = require('../..').gitlab;
var parse = gitlab.parse;
var examples = gitlab.examples;

describe('GitLab pushes', function() {
  it('should generate a push event', function() {
    var payload = examples['push'];

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, 'GitLab | John Smith pushed 4 commits to Diaspora');
    assert.equal(response.icon, 'logo');
    assert.equal(response.errorLevel, 'normal');
  });

  it('should parse a tag push event', function() {
    var payload = examples['push_tag'];

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, 'GitLab | Andy Trevorah pushed to test-repo');
    assert.equal(response.icon, 'logo');
    assert.equal(response.errorLevel, 'normal');
  });
});

describe('GitLab merge requests', function() {
  it('should generate an opened merge request', function() {
    var payload = examples['merge_request_opened'];

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, 'GitLab | Merge request [\\#1 MS-Viewport] created');
    assert.equal(response.icon, 'logo');
    assert.equal(response.errorLevel, 'normal');
  });

  it('should generate an updated merge request', function() {
    var payload = examples['merge_request_updated'];

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, 'GitLab | Merge request [\\#1 MS-Viewport] updated');
  });
});

describe('GitLab issues', function() {
  it('should generate an opened issue', function() {
    var payload = examples['issue_opened'];

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, 'GitLab | Issue [\\#23 Issue title] opened.');
    assert.equal(response.icon, 'logo');
    assert.equal(response.errorLevel, 'normal');
  });

  it('should generate an updated issue', function() {
    var payload = examples['issue_updated'];

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, 'GitLab | Issue [\\#23 Issue title] updated.');
  });
});
