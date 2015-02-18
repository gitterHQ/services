/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";

var parse = function(headers, body) {
  var payload = JSON.parse(body.payload);

  var repo = payload.repository.owner_name+'/'+payload.repository.name;
  var url = payload.compare_url;
  var pr = payload.pull_request_number;
  var branch = payload.branch;

  var link = pr ? repo+'#'+pr : '['+repo+']('+url+') ('+branch+')';

  var buildUrl = payload.build_url;
  var number = payload.number;

  var statusMessage = payload.status_message.toLowerCase();

  var message = 'Travis '+link+' ['+statusMessage+']('+buildUrl+') ('+number+')';

  var icon = 'smile';
  var errorLevel = 'normal';

  if(statusMessage === 'broken' || statusMessage === 'still failing' || statusMessage === 'errored') {
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
