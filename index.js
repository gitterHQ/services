var services = {};

require("fs").readdirSync(__dirname+"/lib").forEach(function(file) {
  var serviceName = file.split('.')[0];
  services[serviceName] = require("./lib/" + serviceName);
});

module.exports = services;
