var assert = require('assert');
var dockerhub = require ('../..').dockerhub;
var parse = dockerhub.parse;
var examples = dockerhub.examples;

describe('Docker Hub pushes', function () {
  it('with more than one image should generate a summary notification', function () {
    var payload = examples['push_some'];

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, '2 images pushed to [svendowideit/testhook](https://registry.hub.docker.com/u/svendowideit/testhook/) by trustedbuilder');
    assert.equal(response.icon, 'logo');
    assert.equal(response.errorLevel, 'normal');
  });

  it('with one image should generate a notification that includes the short id', function () {
    var payload = examples['push_one'];

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, 'Image 27d47432a69b pushed to [svendowideit/testhook](https://registry.hub.docker.com/u/svendowideit/testhook/) by trustedbuilder');
    assert.equal(response.icon, 'logo');
    assert.equal(response.errorLevel, 'normal');
  });

  it('with no images should not generate a notification', function () {
    var payload = examples['push_none'];

    var response = parse(payload.headers, payload.body);

    assert(!response);
  });
});
