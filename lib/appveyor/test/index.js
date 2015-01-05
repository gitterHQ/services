var assert = require('assert');
var appveyor = require('../..').appveyor;
var parse = appveyor.parse;
var examples = appveyor.examples;

describe('AppVeyor', function() {
    it('should generate a success message if build_success event is enabled', function() {
        var payload = examples.success;
        var settings = {
            events: {
                build_success: true
            }
        }

        var response = parse(payload.headers, payload.body, settings);

        assert.notEqual(response, undefined);
        assert.equal(response.message, "Build [\\#26](https://ci.appveyor.com/project/JohnSmith/test-web/build/1.0.26) passed");
        assert.equal(response.icon, 'logo');
        assert.equal(response.errorLevel, 'normal');
    });

    it('should not generate a message if build_success event is disabled', function() {
        var payload = examples.success;
        var settings = {
            events: {
                build_success: false
            }
        }

        var response = parse(payload.headers, payload.body, settings);

        assert.equal(response, undefined);
    });

    it('should generate a failed message if build_failed event is enabled', function() {
        var payload = examples.failed;
        var settings = {
            events: {
                build_failed: true
            }
        }

        var response = parse(payload.headers, payload.body, settings);

        assert.notEqual(response, undefined);
        assert.equal(response.message, "Build [\\#26](https://ci.appveyor.com/project/JohnSmith/test-web/build/1.0.26) failed!");
        assert.equal(response.icon, 'build_failed');
        assert.equal(response.errorLevel, 'error');
    });

    it('should not generate a message if build_failed event is disabled', function() {
        var payload = examples.failed;
        var settings = {
            events: {
                build_failed: false
            }
        }
        
        var response = parse(payload.headers, payload.body, settings);

        assert.equal(response, undefined);
    });

    it('should not generate a message if an unknown event is received', function() {
        var payload = examples.success;
        payload.body.eventName = "syro";

        var response = parse(payload.headers, payload.body);

        assert.strictEqual(response, undefined);
    });
});
