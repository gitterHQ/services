var assert = require('assert');
var circleci = require('../..').circleci;
var parse = circleci.parse;
var examples = circleci.examples;

describe('CircleCi', function() {

  it('should generate a success message', function() {
    var payload = examples.success;
    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, "CircleCI **success**: circleci build ([#26](https://circleci.com/gh/circleci/mongofinil/26)) in [https://github.com/circleci/mongofinil](mongofinil/master)\n- Merge pull request #6 from dlowe/master\n(59c9c5ea3e289f2f3b0c94e128267cc0ce2d65c6 by [Allen Rohner](arohner@gmail.com))");
    assert.equal(response.icon, 'smile');
    assert.equal(response.errorLevel, 'normal');
  });

  it('should generate a failed message', function() {
    var payload = examples.failed;
    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, "CircleCI **failed**: circleci build ([#22](https://circleci.com/gh/circleci/mongofinil/22)) in [https://github.com/circleci/mongofinil](mongofinil/master)\n- Don't explode when the system clock shifts backwards\n(1d231626ba1d2838e599c5c598d28e2306ad4e48 by [Allen Rohner](arohner@gmail.com))");
    assert.equal(response.icon, 'frown');
    assert.equal(response.errorLevel, 'error');
  });

  it('should generate a canceled message', function() {
    var payload = examples.canceled;
    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, "CircleCI **canceled**: circleci build ([#26](https://circleci.com/gh/circleci/mongofinil/26)) in [https://github.com/circleci/mongofinil](mongofinil/master)\n- Merge pull request #6 from dlowe/master\n(59c9c5ea3e289f2f3b0c94e128267cc0ce2d65c6 by [Allen Rohner](arohner@gmail.com))");
    assert.equal(response.icon, 'meh');
    assert.equal(response.errorLevel, 'normal');
  });

  it('should generate a no tests message', function() {
    var payload = examples['no-tests'];
    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, "CircleCI **no_tests**: trevorah build ([#3](https://circleci.com/gh/trevorah/test-repo/3)) in [https://github.com/trevorah/test-repo](test-repo/master)\n- added circleci config\n(c68527c3e919af70cbd93d86e87093bffeb88212 by [Andy Trevorah](xxx@xxx.xxx))");
    assert.equal(response.icon, 'meh');
    assert.equal(response.errorLevel, 'normal');
  });

});