var assert = require('assert');
var gitbook = require('../..').gitbook;
var parse = gitbook.parse;
var examples = gitbook.examples;

describe('GitBook publish', function() {
  it('should generate a publish event', function() {
    var payload = examples['publish'];

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, 'GitBook | [Samy Pessé](https://www.gitbook.com/@samypesse) published a new update of [gitbookio/documentation](https://www.gitbook.com/book/gitbookio/documentation)');
    assert.equal(response.icon, 'logo');
    assert.equal(response.errorLevel, 'normal');
  });
});
