var assert = require('assert');
var heroku = require('../..').heroku;
var parse = heroku.parse;
var examples = heroku.examples;

describe('Heroku', function() {

  it('should generate a completed', function() {
    var payload = examples['completed'];

    var response = parse(payload.headers, payload.body);

    assert.equal(response.message, 'Heroku [quiet-bayou-7278] deployed 1fa8326');
    assert.equal(response.icon, 'logo');
    assert.equal(response.errorLevel, 'normal');
  });

});
