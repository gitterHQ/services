/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";
var fs = require('fs');
var requireAll = require('require-all');

var examples = {};

fs.readdirSync(__dirname+"/examples").forEach(function(file) {
  var example = file.split('.')[0];
  examples[example] = require("./examples/" + example);
});

var parse = function(headers, body) {
  if (body.model == 'Block') return;

  var user = body.attributes.created_by.first_name;
  var item = body.attributes.type;
  var title = body.attributes.title;
  var status = body.attributes.status;

  var message = user + ' just created a new ' + item + ': ' + title + ' (' + status + ')';

  return {
    message: message,
    icon: 'logo'
  };
};

module.exports = {
  apiVersion: 0,
  friendlyName: 'Sprint.ly',
  parse: parse,
  options: [],
  instructions: fs.readFileSync(__dirname+'/instructions.md', 'utf8'),
  examples: requireAll(__dirname+'/examples'),
  icons: require('../iconMapper')(__dirname+'/icons')
};
