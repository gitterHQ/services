/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";

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
  name: 'Travis',
  parse: parse
};
