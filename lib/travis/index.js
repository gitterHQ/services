/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";
var fs = require('fs');
var requireAll = require('require-all');

var parse = function(headers, body) {

  var repo = body.repository.owner_name+'/'+body.repository.name;
  var repoUrl = body.compare_url;
  var branch = body.branch;
  var buildUrl = body.build_url;

  var statusMessage = body.status_message.toLowerCase();

  var message = 'Travis ['+repo+']('+repoUrl+') ('+branch+') ['+statusMessage+']('+buildUrl+')';

  var icon = 'smile';
  var errorLevel = 'normal';

  if(statusMessage === 'broken' || statusMessage === 'still failing' ) {
    icon = 'frown';
    errorLevel = 'error'; 
  } else if(statusMessage === 'pending') {
    icon = 'meh';
  }

  return { message: message, icon: icon, errorLevel: errorLevel };

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
