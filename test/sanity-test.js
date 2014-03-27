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

      describe('icons', function() {
        it('has a logo', function() {
          assert(service.icons.logo, serviceName+'.icons.logo doesnt exist');
        });

        Object.keys(service.icons).forEach(function(iconName) {
          describe(iconName, function() {
            var iconSet = service.icons[iconName];

            it('has a legacy icon', function() {
              assert(iconSet.legacy, serviceName+'.icons.'+iconName+'.legacy doesnt exist');
            });

            it('has a retina icon', function() {
              assert(iconSet.retina, serviceName+'.icons.'+iconName+'.retina doesnt exist');
            });
          });
        });
      });

    });
  });
});
