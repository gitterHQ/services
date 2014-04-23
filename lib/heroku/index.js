/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";

var parse = function(headers, body) {

  var service = body.app;
  var head = body.head;
  var icon = 'logo';

  var message = 'Heroku ['+service+'] deployed ' + head;


  return {
    message: message,
    icon: icon,
    errorLevel: 'normal'
  };
};

module.exports = {
  apiVersion: 1,
  name: 'Heroku',
  parse: parse
};
