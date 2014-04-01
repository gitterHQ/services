var assert = require('assert');
var services = require('..');

describe('sanity tests:', function() {
  Object.keys(services).forEach(function(serviceName) {
    describe(serviceName, function() {
      var service = services[serviceName];

      it('has an apiVersion of zero', function() {
        assert.strictEqual(service.apiVersion, 0);
      });

      it('has a friendlyName', function() {
        assert.equal(typeof service.friendlyName, 'string');
        assert(service.friendlyName.length > 0);
      });

      describe('parse function', function() {
        it('exists', function() {
          assert.equal(typeof service.parse, 'function');
        });

        Object.keys(service.examples).forEach(function(exampleName) {
          describe('parsing "'+exampleName+'" example', function() {
            var example = service.examples[exampleName];
            var configOptions = service.options.map(function(option) { return option.id;});

            if(configOptions.length) {
              configOptions.forEach(function(option) {
                it('works with "'+option+'" option set', function() {
                  var options = { settings: { events: [option] } };
                  var result = service.parse(example.headers, example.body, options);

                  assertValidParserResponse(result, service.icons);
                });
              });
            } else {
              it('works with no options set', function() {
                var options = { settings: { events: [] } };
                var result = service.parse(example.headers, example.body, options);

                assertValidParserResponse(result, service.icons);
              });
            }
          });
        });
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

function assertValidParserResponse(res, serviceIcons) {
  if(res) {
    var validErrorLevels = ['normal', 'error'];
    var validIcons = Object.keys(serviceIcons);
    assert(res.message, 'message was "'+res.message+'"');
    assert(validIcons.indexOf(res.icon) >= 0, 'icon was "'+res.icon+'", which was not one of: '+validIcons);
    assert(validErrorLevels.indexOf(res.errorLevel) >= 0, 'errorLevel was "'+res.errorLevel+'", which was not one of: '+validErrorLevels);
  }
}
