var assert = require('assert');
var snapciParse = require('../index').parse;
var failedJson = require('../examples/failed.json');
var passedJson = require('../examples/passed.json');
var erroredJson = require('../examples/errored.json');

describe('Snap CI', function () {

    it('should generate a build passed message', function () {
        var parsedResponse = snapciParse(passedJson.headers, passedJson.body);
        assert.equal(parsedResponse.icon, "smile");
        assert.equal(parsedResponse.message, "Test Stage for project ExampleProject/example-client [Passed](https://snap-ci.com/ExampleProject/example-client/branch/branchname)");
        assert.equal(parsedResponse.errorLevel, "normal");
    });

    it('should generate a build failed message', function () {
        var parsedResponse = snapciParse(failedJson.headers, failedJson.body);
        assert.equal(parsedResponse.icon, "frown");
        assert.equal(parsedResponse.message, "Test Stage for project ExampleProject/example-client [Failed](https://snap-ci.com/ExampleProject/example-client/branch/branchname)");
        assert.equal(parsedResponse.errorLevel, "error");
    });

    it('should generate a build errored message', function () {
        var parsedResponse = snapciParse(erroredJson.headers, erroredJson.body);
        assert.equal(parsedResponse.icon, "frown");
        assert.equal(parsedResponse.message, "Test Stage for project ExampleProject/example-client [Errored](https://snap-ci.com/ExampleProject/example-client/branch/branchname)");
        assert.equal(parsedResponse.errorLevel, "error");
    });

    it('should be undefined for an build unknown hook call', function () {
        erroredJson.body.build_result = "anfasnknd";
        var parsedResponse = snapciParse(erroredJson.headers, erroredJson.body);
        assert.equal(parsedResponse, undefined);
    });
});
