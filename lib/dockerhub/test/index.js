var assert = require('assert');
var dockerhub = require ('../..').dockerhub;
var parse = dockerhub.parse;
var examples = dockerhub.examples;

describe('Docker Hub pushes', function () {
  it('should generate a push notification', function () {
    var payload = examples['push'];

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, 'Image pushed to [svendowideit/testhook](https://registry.hub.docker.com/u/svendowideit/testhook/) by trustedbuilder');
    assert.equal(response.icon, 'logo');
    assert.equal(response.errorLevel, 'normal');
  });
});
