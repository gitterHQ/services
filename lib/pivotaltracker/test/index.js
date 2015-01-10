var assert = require('assert');
var pivotaltracker = require('../..').pivotaltracker;
var parse = pivotaltracker.parse;
var examples = pivotaltracker.examples;

describe('Pivotal Tracker', function() {

  it('Should extract primary resource', function() {
    var payload = examples['add_bug'];
    var resource = pivotaltracker._extractPrimaryResource( payload.body );
    assert.ok(resource.hasOwnProperty('kind'));
    assert.equal(resource.kind, 'story');
  });

  it('Should extract project', function() {
    var payload = examples['add_bug'];
    var resource = pivotaltracker._extractProject( payload.body );
    assert.ok(resource.hasOwnProperty('kind'));
    assert.equal(resource.kind, 'project');
  });

  it('Should extract performer', function() {
    var payload = examples['add_bug'];
    var resource = pivotaltracker._extractPerformer( payload.body );
    assert.ok(resource.hasOwnProperty('kind'));
    assert.equal(resource.kind, 'person');
  });

  it('Should replace this string', function() {
    var result = pivotaltracker._messageReplaceThis('Hello this', { name: 'world' });
    assert.equal(result, 'Hello `world`');
  });

  it('Should append project name', function() {
    var result = pivotaltracker._messageAppendProject('finished "foo"', { name: 'my project' });
    assert.equal(result, 'finished "foo" in `my project`');
  });

  it('Should append view link', function() {
      var result = pivotaltracker._messageAppendViewLink('finished "foo"', { url: 'http://foo.bar' });
      assert.equal(result, 'finished "foo" - [view »](http://foo.bar)');
  });

  it('Should highlight link in markdown', function() {
    var text = 'Hello world';
    var result = pivotaltracker._highlight(text);
    assert.equal(result, '`' + text + '`');
  });

});
