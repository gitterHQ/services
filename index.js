var parsers = {};

require("fs").readdirSync(__dirname+"/lib").forEach(function(file) {
  var parserName = file.split('.')[0];
  parsers[parserName] = require("./lib/" + parserName);
});

module.exports = parsers;
