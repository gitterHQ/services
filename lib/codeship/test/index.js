var assert = require('assert');
var codeship = require('../..').codeship;
var parse = codeship.parse;
var examples = codeship.examples;

describe('Codeship', function() {

  var msg = ': [codeship/docs/973711](https://www.codeship.com/projects/10213/builds/973711) \n- Merge pull request #34 from codeship/feature/shallow-clone (master) [96943dc5269634c211b6fbb18896ecdcbd40a047](https://github.com/codeship/docs/commit/96943dc5269634c211b6fbb18896ecdcbd40a047) by beanieboi';

  it('should generate an error message', function() {
    var payload = examples.error;

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, 'Codeship **Error**' + msg);
    assert.equal(response.errorLevel, 'error');
    assert.equal(response.icon, 'frown');
  });

  it('should generate a stopped message', function() {
    var payload = examples.stopped;

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, 'Codeship **Stopped**' + msg);
    assert.equal(response.errorLevel, 'normal');
    assert.equal(response.icon, 'logo');
  });

  it('should generate a success message', function() {
    var payload = examples.success;

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, 'Codeship **Success**' + msg);
    assert.equal(response.errorLevel, 'normal');
    assert.equal(response.icon, 'logo');
  });

  it('should generate a testing message', function() {
    var payload = examples.testing;

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, 'Codeship **Testing**' + msg);
    assert.equal(response.errorLevel, 'normal');
    assert.equal(response.icon, 'logo');
  });

  it('should generate a waiting message', function() {
    var payload = examples.waiting;

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, 'Codeship **Waiting**' + msg);
    assert.equal(response.errorLevel, 'normal');
    assert.equal(response.icon, 'logo');
  });

});
