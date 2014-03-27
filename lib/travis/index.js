/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";
var fs = require('fs');
var requireAll = require('require-all');

var parse = function(headers, body) {

  var job     = body.repository.owner_name + '/' + body.repository.name;
  var message = 'Tests for ' + job + ' ' + body.status_message.toLowerCase();

  return { message: message, icon: 'logo' };

};

module.exports = {
  apiVersion: 0,
  friendlyName: 'Travis',
  parse: parse,
  options: [],
  instructions: fs.readFileSync(__dirname+'/instructions.md', 'utf8'),
  examples: requireAll(__dirname+'/examples'),
  icons: require('../iconMapper')(__dirname+'/icons')
};
