/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";

var parse = function(headers, body) {
  var payload = JSON.parse(body.payload);
  var alertName = payload.alert.name;
  var host = payload.host.name;
  var log = payload.log.name;
  var accountId = headers['X-Le-Account'] || headers['x-le-account'];
  var context = payload.context[0].r;
  var contextFragment = context.substring(0,8);

  var message = '[['+alertName+'] ' + host + '/' + log +'](https://logentries.com/app/' + accountId + '#id=' + contextFragment + '&r=d&s=log)'; 

  return {
    message: message,
    icon: 'error',
    errorLevel: 'error'
  };
};

module.exports = {
  apiVersion: 1,
  name: 'Logentries',
  parse: parse
};
