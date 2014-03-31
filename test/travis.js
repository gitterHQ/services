var assert = require('assert');
var travis = require('../lib/travis');
var parse = travis.parse;
var examples = travis.examples;

describe('Travis CI', function() {

  it('should generate a success message', function() {
    var payload = examples['passed'];

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, 'Travis [malditogeek/hook](https://github.com/malditogeek/hook/compare/55a97f5edcda...e619ef3f44c3) (master) [passed](https://travis-ci.org/malditogeek/hook/builds/17283925)');
    assert.equal(response.icon, 'smile');
    assert.equal(response.errorLevel, 'normal');
  });

  it('should generate a build pending message', function() {
    var payload = examples['pending'];

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, 'Travis [malditogeek/hook](https://github.com/malditogeek/hook/compare/8271139204b9...23293866f562) (master) [pending](https://travis-ci.org/malditogeek/hook/builds/17278860)');
    assert.equal(response.icon, 'meh');
    assert.equal(response.errorLevel, 'normal');
  });

  it('should generate a build fixed message', function() {
    var payload = examples['fixed'];

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, 'Travis [malditogeek/hook](https://github.com/malditogeek/hook/compare/23293866f562...55a97f5edcda) (master) [fixed](https://travis-ci.org/malditogeek/hook/builds/17283626)');
    assert.equal(response.icon, 'smile');
    assert.equal(response.errorLevel, 'normal');
  });

  it('should generate a build still failing message', function() {
    var payload = examples['still_failing'];

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, 'Travis [malditogeek/hook](https://github.com/malditogeek/hook/compare/8271139204b9...23293866f562) (master) [still failing](https://travis-ci.org/malditogeek/hook/builds/17278860)');
    assert.equal(response.icon, 'frown');
    assert.equal(response.errorLevel, 'error');
  });

  it('should generate a build broken message', function() {
    var payload = examples['broken'];

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, 'Travis [malditogeek/hook](https://github.com/malditogeek/hook/compare/bf55a725a9de...6ab55b1b76ea) (master) [broken](https://travis-ci.org/malditogeek/hook/builds/17285034)');
    assert.equal(response.icon, 'frown');
    assert.equal(response.errorLevel, 'error');
  });

});
