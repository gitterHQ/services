var assert = require('assert');
var drone = require('../..').drone;
var parse = drone.parse;
var examples = drone.examples;

describe('Drone CI', function() {
  
describe('Github Enterprise remote', function() {

    it('commit should generate a passed message', function() {
      var payload = examples['enterprise_github_commit_success'];

      var response = parse(payload.headers, payload.body);

      assert.equal(response.message, 'Drone [foo/bar](https://enterprise.github.com/foo/bar/commit/9f2849d5adf2aa47745e1b7b9f76f1fcca1ebdb3) (master) [passed](http://drone.foo.com/enterprise.github.com/foo/bar/master/9f2849d5adf2aa47745e1b7b9f76f1fcca1ebdb3) (9f2849d)');
      assert.equal(response.icon, 'smile');
      assert.equal(response.errorLevel, 'normal');
    });

    it('commit should generate a failed message', function() {
      var payload = examples['enterprise_github_commit_failure'];

      var response = parse(payload.headers, payload.body);

      assert.equal(response.message, 'Drone [foo/bar](https://enterprise.github.com/foo/bar/commit/9f2849d5adf2aa47745e1b7b9f76f1fcca1ebdb3) (master) [failed](http://drone.foo.com/enterprise.github.com/foo/bar/master/9f2849d5adf2aa47745e1b7b9f76f1fcca1ebdb3) (9f2849d)');
      assert.equal(response.icon, 'frown');
      assert.equal(response.errorLevel, 'error');
    });

    it('pull request should generate a passed message', function() {
      var payload = examples['enterprise_github_pull_success'];

      var response = parse(payload.headers, payload.body);

      assert.equal(response.message, 'Drone [foo/bar](https://enterprise.github.com/foo/bar/pull/800) (pull request \\#800) [passed](http://drone.foo.com/enterprise.github.com/foo/bar/master/9f2849d5adf2aa47745e1b7b9f76f1fcca1ebdb3)');
      assert.equal(response.icon, 'smile');
      assert.equal(response.errorLevel, 'normal');
    });

    it('pull request should generate a failed message', function() {
      var payload = examples['enterprise_github_pull_failure'];

      var response = parse(payload.headers, payload.body);

      assert.equal(response.message, 'Drone [foo/bar](https://enterprise.github.com/foo/bar/pull/800) (pull request \\#800) [failed](http://drone.foo.com/enterprise.github.com/foo/bar/master/9f2849d5adf2aa47745e1b7b9f76f1fcca1ebdb3)');
      assert.equal(response.icon, 'frown');
      assert.equal(response.errorLevel, 'error');
    });
  });
  
  describe('Github remote', function() {

    it('commit should generate a passed message', function() {
      var payload = examples['github_commit_success'];

      var response = parse(payload.headers, payload.body);

      assert.equal(response.message, 'Drone [foo/bar](https://github.com/foo/bar/commit/9f2849d5adf2aa47745e1b7b9f76f1fcca1ebdb3) (master) [passed](http://drone.foo.com/github.com/foo/bar/master/9f2849d5adf2aa47745e1b7b9f76f1fcca1ebdb3) (9f2849d)');
      assert.equal(response.icon, 'smile');
      assert.equal(response.errorLevel, 'normal');
    });

    it('commit should generate a failed message', function() {
      var payload = examples['github_commit_failure'];

      var response = parse(payload.headers, payload.body);

      assert.equal(response.message, 'Drone [foo/bar](https://github.com/foo/bar/commit/9f2849d5adf2aa47745e1b7b9f76f1fcca1ebdb3) (master) [failed](http://drone.foo.com/github.com/foo/bar/master/9f2849d5adf2aa47745e1b7b9f76f1fcca1ebdb3) (9f2849d)');
      assert.equal(response.icon, 'frown');
      assert.equal(response.errorLevel, 'error');
    });

    it('pull request should generate a passed message', function() {
      var payload = examples['github_pull_success'];

      var response = parse(payload.headers, payload.body);

      assert.equal(response.message, 'Drone [foo/bar](https://github.com/foo/bar/pull/800) (pull request \\#800) [passed](http://drone.foo.com/github.com/foo/bar/master/9f2849d5adf2aa47745e1b7b9f76f1fcca1ebdb3)');
      assert.equal(response.icon, 'smile');
      assert.equal(response.errorLevel, 'normal');
    });

    it('pull request should generate a failed message', function() {
      var payload = examples['github_pull_failure'];

      var response = parse(payload.headers, payload.body);

      assert.equal(response.message, 'Drone [foo/bar](https://github.com/foo/bar/pull/800) (pull request \\#800) [failed](http://drone.foo.com/github.com/foo/bar/master/9f2849d5adf2aa47745e1b7b9f76f1fcca1ebdb3)');
      assert.equal(response.icon, 'frown');
      assert.equal(response.errorLevel, 'error');
    });
  });
  
  describe('Gitlab remote', function() {

    it('commit should generate a passed message', function() {
      var payload = examples['gitlab_commit_success'];

      var response = parse(payload.headers, payload.body);

      assert.equal(response.message, 'Drone [foo/bar](https://gitlab.com/foo/bar/commit/9f2849d5adf2aa47745e1b7b9f76f1fcca1ebdb3) (master) [passed](http://drone.foo.com/gitlab.com/foo/bar/master/9f2849d5adf2aa47745e1b7b9f76f1fcca1ebdb3) (9f2849d)');
      assert.equal(response.icon, 'smile');
      assert.equal(response.errorLevel, 'normal');
    });

    it('commit should generate a failed message', function() {
      var payload = examples['gitlab_commit_failure'];

      var response = parse(payload.headers, payload.body);

      assert.equal(response.message, 'Drone [foo/bar](https://gitlab.com/foo/bar/commit/9f2849d5adf2aa47745e1b7b9f76f1fcca1ebdb3) (master) [failed](http://drone.foo.com/gitlab.com/foo/bar/master/9f2849d5adf2aa47745e1b7b9f76f1fcca1ebdb3) (9f2849d)');
      assert.equal(response.icon, 'frown');
      assert.equal(response.errorLevel, 'error');
    });

    it('pull request should generate a passed message', function() {
      var payload = examples['gitlab_pull_success'];

      var response = parse(payload.headers, payload.body);

      assert.equal(response.message, 'Drone [foo/bar](https://gitlab.com/foo/bar/merge_requests/800) (merge request \\#800) [passed](http://drone.foo.com/gitlab.com/foo/bar/master/9f2849d5adf2aa47745e1b7b9f76f1fcca1ebdb3)');
      assert.equal(response.icon, 'smile');
      assert.equal(response.errorLevel, 'normal');
    });

    it('pull request should generate a failed message', function() {
      var payload = examples['gitlab_pull_failure'];

      var response = parse(payload.headers, payload.body);

      assert.equal(response.message, 'Drone [foo/bar](https://gitlab.com/foo/bar/merge_requests/800) (merge request \\#800) [failed](http://drone.foo.com/gitlab.com/foo/bar/master/9f2849d5adf2aa47745e1b7b9f76f1fcca1ebdb3)');
      assert.equal(response.icon, 'frown');
      assert.equal(response.errorLevel, 'error');
    });
  });
  
  describe('Unknown remote', function() {

    it('commit should generate a passed message', function() {
      var payload = examples['unknown_commit_success'];

      var response = parse(payload.headers, payload.body);

      assert.equal(response.message, 'Drone [foo/bar] (master) [passed](http://drone.foo.com/some.host.com/foo/bar/master/9f2849d5adf2aa47745e1b7b9f76f1fcca1ebdb3) (9f2849d)');
      assert.equal(response.icon, 'smile');
      assert.equal(response.errorLevel, 'normal');
    });

    it('commit should generate a failed message', function() {
      var payload = examples['unknown_commit_failure'];

      var response = parse(payload.headers, payload.body);

      assert.equal(response.message, 'Drone [foo/bar] (master) [failed](http://drone.foo.com/some.host.com/foo/bar/master/9f2849d5adf2aa47745e1b7b9f76f1fcca1ebdb3) (9f2849d)');
      assert.equal(response.icon, 'frown');
      assert.equal(response.errorLevel, 'error');
    });

    it('pull request should generate a passed message', function() {
      var payload = examples['unknown_pull_success'];

      var response = parse(payload.headers, payload.body);

      assert.equal(response.message, 'Drone [foo/bar] (pull request \\#800) [passed](http://drone.foo.com/some.host.com/foo/bar/master/9f2849d5adf2aa47745e1b7b9f76f1fcca1ebdb3)');
      assert.equal(response.icon, 'smile');
      assert.equal(response.errorLevel, 'normal');
    });

    it('pull request should generate a failed message', function() {
      var payload = examples['unknown_pull_failure'];

      var response = parse(payload.headers, payload.body);

      assert.equal(response.message, 'Drone [foo/bar] (pull request \\#800) [failed](http://drone.foo.com/some.host.com/foo/bar/master/9f2849d5adf2aa47745e1b7b9f76f1fcca1ebdb3)');
      assert.equal(response.icon, 'frown');
      assert.equal(response.errorLevel, 'error');
    });
  });
});
