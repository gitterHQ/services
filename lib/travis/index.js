/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";

var parse = function(headers, body) {
  var payload = JSON.parse(body.payload);

  if(payload.type !== 'push') return;

  var repo = payload.repository.owner_name+'/'+payload.repository.name;
  var repoUrl = payload.compare_url;
  var branch = payload.branch;
  var buildUrl = payload.build_url;
  var number = payload.number;

  var statusMessage = payload.status_message.toLowerCase();

  var message = 'Travis ['+repo+']('+repoUrl+') ('+branch+') ['+statusMessage+']('+buildUrl+') ('+number+')';

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
  apiVersion: 1,
  name: 'Travis',
  parse: parse
};
