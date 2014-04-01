var fs = require('fs');
var requireAll = require('require-all');
var iconMapper = require('./iconMapper');

var services = {};

fs.readdirSync(__dirname).forEach(function(service) {
  var serviceDir = __dirname+'/'+service;

  if(fs.statSync(serviceDir).isDirectory()) {
    services[service] = require('./' + service);

    services[service].instructions = fs.readFileSync(serviceDir+'/instructions.md', 'utf8');
    services[service].examples = requireAll(serviceDir+'/examples');
    services[service].icons = iconMapper(serviceDir+'/icons');
    services[service].settings = require(serviceDir+'/settings');
  }
});

module.exports = services;
