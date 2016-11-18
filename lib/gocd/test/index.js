var assert = require('assert');
var gocdParse = require('../index').parse;
var failedJson = require('../examples/failed.json');
var passedJson = require('../examples/passed.json');
var erroredJson = require('../examples/errored.json');
var triggerJson = require('../examples/triggered.json');
var settingsJson = require('../settings.json');
var settings = {};
settings.events = {};
settingsJson.events.map(function (option) {
   settings.events[option.id] = option.selected;
});

describe('GoCD', function () {

    it('should generate a build passed message', function () {
        var parsedResponse = gocdParse(passedJson.headers, passedJson.body, settings);
        assert.equal(parsedResponse.icon, "smile");
        assert.equal(parsedResponse.message, "Your message goes here");
        assert.equal(parsedResponse.errorLevel, "normal");

    });

    it('should generate a build failed message', function () {
        var parsedResponse = gocdParse(failedJson.headers, failedJson.body, settings);
        assert.equal(parsedResponse.icon, "frown");
        assert.equal(parsedResponse.message, "Your message goes here");
        assert.equal(parsedResponse.errorLevel, "error");
    });

    it('should generate a build errored message', function () {
        var parsedResponse = gocdParse(erroredJson.headers, erroredJson.body, settings);
        assert.equal(parsedResponse.icon, "frown");
        assert.equal(parsedResponse.message, "Your message goes here");
        assert.equal(parsedResponse.errorLevel, "error");
    });

    it('should generate a build triggered message', function () {
        var parsedResponse = gocdParse(triggerJson.headers, triggerJson.body, settings);
        assert.equal(parsedResponse.icon, "smile");
        assert.equal(parsedResponse.message, "Your message goes here");
        assert.equal(parsedResponse.errorLevel, "normal");
    });

    it('should be undefined for an build unknown hook call', function () {
        erroredJson.body.status = "anfasnknd";
        var parsedResponse = gocdParse(erroredJson.headers, erroredJson.body, settings);
        assert.equal(parsedResponse, undefined);
    });
});
