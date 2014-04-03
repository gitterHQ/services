var fs = require('fs');
var requireAll = require('require-all');
var qs = require('qs');
var extend = require('extend');

module.exports = function(dir) {
  var jsonExamples = requireAll(dir);
  var formExamples = {};
  fs.readdirSync(dir).forEach(function(exampleFile) {
    var name = exampleFile.split('.')[0];
    var ext = exampleFile.split('.')[1];
    if(ext === 'form') {
      var data = fs.readFileSync(dir+'/'+exampleFile, 'utf8');
      var example = {
        headers: {},
        body: qs.parse(data)
      };
      formExamples[name] = example;
    }
  });

  return extend({}, jsonExamples, formExamples);
};
