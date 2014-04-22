var fs = require('fs');
var iconMapper = require('./iconMapper');
var examplesMapper = require('./examplesMapper');

var services = {};

fs.readdirSync(__dirname).forEach(function(service) {
  var serviceDir = __dirname+'/'+service;

  if(fs.statSync(serviceDir).isDirectory()) {
    services[service] = require('./' + service);

    services[service].instructions = fs.readFileSync(serviceDir+'/instructions.md', 'utf8');
    services[service].examples = examplesMapper(serviceDir+'/examples');
    services[service].icons = iconMapper(serviceDir+'/icons');
    services[service].settings = require(serviceDir+'/settings');
  }
});

module.exports = services;
