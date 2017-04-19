var assert = require('assert');
var thebuggenie = require('../..').thebuggenie;
var parse = thebuggenie.parse;
var examples = thebuggenie.examples;

describe('The Bug Genie', function() {
  describe('issues', function() {
    it('should generate message for creating an issue', function() {
      var payload = examples['issue_create'];

      var response = parse(payload.headers, payload.body);

      assert.equal(response.message, '@zegenie created ' +
          '[Example issue](http://issues.thebuggenie.com/thebuggenie/issues/123) in project ' +
          '[The Bug Genie](http://issues.thebuggenie.com/thebuggenie)'
      );
      assert.equal(response.icon, 'file-text-o');
      assert.equal(response.errorLevel, 'normal');
    });

    it('should generate message for commenting on an issue', function () {
      var payload = examples['issue_comment'];

      var response = parse(payload.headers, payload.body);

      assert.equal(response.message, '@zegenie commented on ' +
          '[Example issue](http://issues.thebuggenie.com/thebuggenie/issues/123#comment_1) in project ' +
          '[The Bug Genie](http://issues.thebuggenie.com/thebuggenie)'
      );
      assert.equal(response.icon, 'comment-o');
      assert.equal(response.errorLevel, 'normal');
    });
  });
});
