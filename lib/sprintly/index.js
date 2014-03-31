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

  var firstName = body.attributes.created_by.first_name;
  var lastName = body.attributes.created_by.last_name;
  var title = body.attributes.title;
  var url = body.attributes.short_url;

  var message = firstName+' '+lastName+' created  \n['+title+']('+url+')';

  return {
    message: message,
    icon: 'columns',
    errorLevel: 'normal'
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
