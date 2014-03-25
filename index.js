var fs = require("fs");

var services = {};

fs.readdirSync(__dirname+"/lib").forEach(function(file) {
  if(fs.statSync(__dirname+"/lib/"+file).isDirectory()) {
    services[file] = require("./lib/" + file);
  }
});

module.exports = services;
