var assert = require('assert');
var services = require('..');

describe('sanity tests:', function() {
  Object.keys(services).forEach(function(serviceName) {
    describe(serviceName, function() {
      var service = services[serviceName];

      it('has an apiVersion of 1', function() {
        assert.strictEqual(service.apiVersion, 1);
      });

      it('has a name', function() {
        assert.equal(typeof service.name, 'string');
        assert(service.name.length > 0);
      });

      describe('settings', function() {
        var settings = service.settings;
        it('exists', function() {
          assert.equal(typeof settings, 'object');
        });

        describe('events', function() {
          var events = settings.events;
          it('has is an array', function() {
            assert(events instanceof Array);
          });

          it('is a choice', function() {
            assert(events.length !== 1,
              'If someone chooses not to listen to the only event, then they will get no messages. Use an empty Array instead.');
          });
        });


      });

      describe('parse function', function() {
        it('exists', function() {
          assert.equal(typeof service.parse, 'function');
        });

        Object.keys(service.examples).forEach(function(exampleName) {
          describe('parsing "'+exampleName+'" example', function() {
            var example = service.examples[exampleName];
            var configOptions = service.settings.events.map(function(option) { return option.id;});

            if(configOptions.length) {
              configOptions.forEach(function(option) {
                it('works with "'+option+'" option set', function() {
                  var settings = { events: {} };
                  settings.events[option] = true;
                  var result = service.parse(example.headers, example.body, settings);

                  assertValidParserResponse(result, service.icons);
                });
              });
            } else {
              it('works with no options set', function() {
                var result = service.parse(example.headers, example.body, { events: [] });

                assertValidParserResponse(result, service.icons);
              });
            }
          });
        });
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
  var validErrorLevels = ['normal', 'error'];
  var validIcons = Object.keys(serviceIcons);

  function validateSingle(item) {
    assert(item.message, 'message was "'+item.message+'"');
    assert(validIcons.indexOf(item.icon) >= 0, 'icon was "'+item.icon+'", which was not one of: '+validIcons);
    assert(validErrorLevels.indexOf(item.errorLevel) >= 0, 'errorLevel was "'+item.errorLevel+'", which was not one of: '+validErrorLevels);
  }

  if(res) {
    if(Array.isArray(res)) {
      res.forEach(validateSingle);
    } else {
      validateSingle(res);
    }

  }
}
