var assert = require('assert');
var github = require('../..').github;
var parse = github.parse;
var examples = github.examples;

describe('GitHub', function() {

  describe('push event', function() {
    xit('shows a single commit', function() {});

    it('shows three commits', function() {
      var payload = examples['push'];
      var response = parse(payload.headers, payload.body);

      assert.equal(response.message,
        '@malditogeek on feature/123-foo\n' +
        'malditogeek/hook@65fead6 ' +
        'malditogeek/hook@a8df96e ' +
        'malditogeek/hook@d4ee9a6 ' +
        '[(compare)](https://github.com/malditogeek/hook/compare/71bab075cbd3...d4ee9a638874)');
      assert.equal(response.icon, 'repo-push');
      assert.equal(response.errorLevel, 'normal');
    });

    xit('cuts off more than 3 commits', function() {});

    xit('shows something, anything, for an empty commit push', function() {});

  });
});
