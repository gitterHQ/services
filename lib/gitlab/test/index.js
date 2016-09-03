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

  it('should generate for comment on merge request', function () {
    var payload = examples['merge_request_comment'];

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, '[Vishnu Bharathi](https://gitlab.com/u/scriptnull) ' +
      'commented on merge request [#1 adds new feature](https://gitlab.com/scriptnull/gitlab-for-gitter/merge_requests/1#note_14921076) ' +
      'in [gitlab-for-gitter](https://gitlab.com/scriptnull/gitlab-for-gitter)');
  });
});

describe('GitLab issues', function() {
  it('should generate for opening issue', function() {
    var payload = examples['issue_opened'];

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, '[Vishnu Bharathi](https://gitlab.com/u/scriptnull) ' +
      'opened issue [#2 Issue to get payload](https://gitlab.com/scriptnull/gitlab-for-gitter/issues/2) ' +
      'in [gitlab-for-gitter](https://gitlab.com/scriptnull/gitlab-for-gitter)'
    );
    assert.equal(response.icon, 'logo');
    assert.equal(response.errorLevel, 'normal');
  });

  it('should generate for closing issue', function() {
    var payload = examples['issue_closed'];

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, '[Vishnu Bharathi](https://gitlab.com/u/scriptnull) ' +
      'closed issue [#2 Issue to get payload](https://gitlab.com/scriptnull/gitlab-for-gitter/issues/2) ' +
      'in [gitlab-for-gitter](https://gitlab.com/scriptnull/gitlab-for-gitter)'
    );
    assert.equal(response.icon, 'logo');
    assert.equal(response.errorLevel, 'normal');
  });

  it('should generate for reopening issue', function() {
    var payload = examples['issue_reopened'];

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, '[Vishnu Bharathi](https://gitlab.com/u/scriptnull) ' +
      'reopened issue [#2 Issue to get payload](https://gitlab.com/scriptnull/gitlab-for-gitter/issues/2) ' +
      'in [gitlab-for-gitter](https://gitlab.com/scriptnull/gitlab-for-gitter)'
    );
    assert.equal(response.icon, 'logo');
    assert.equal(response.errorLevel, 'normal');
  });

  it('should generate an updated issue', function() {
    var payload = examples['issue_updated'];

    var response = parse(payload.headers, payload.body);

    // Disabed notifications for 'update' action, as it does not
    // provide useful information right now.
    assert.equal(response, undefined);
  });

  it('should generate for comment on issue', function () {
    var payload = examples['issue_comment'];

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, '[Vishnu Bharathi](https://gitlab.com/u/scriptnull) ' +
      'commented on issue [#1 Testing issue](https://gitlab.com/scriptnull/gitlab-for-gitter/issues/1#note_14921029) ' +
      'in [gitlab-for-gitter](https://gitlab.com/scriptnull/gitlab-for-gitter)'
    );
  });
});
