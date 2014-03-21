var assert = require('assert');
var services = require('..');

describe('sanity tests:', function() {
  Object.keys(services).forEach(function(serviceName) {
    describe(serviceName, function() {
      var service = services[serviceName];

      it('has an apiVersion', function() {
        assert.equal(typeof service.apiVersion, 'number');
      });

      it('has a friendlyName', function() {
        assert.equal(typeof service.friendlyName, 'string');
        assert(service.friendlyName.length > 0);
      });

      it('has a parse function', function() {
        assert.equal(typeof service.parse, 'function');
      });

      it('has options', function() {
        assert(service.options instanceof Array, serviceName+'.options is not an Array');
      });

      it('has instructions', function() {
        assert.equal(typeof service.instructions, 'string');
        assert(service.instructions.length > 0);
      });
    });
  });
});
