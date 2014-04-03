/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";

var parse = function(headers, body, settings) {

  var service = body.name;
  var head = body.head;
  var icon = 'heroku';

  var message = 'Heroku ['+service+'] deployed ' + head;


  return {
    message: message,
    icon: icon,
    errorLevel: 'normal'
  };
};

module.exports = {
  apiVersion: 0,
  friendlyName: 'Heroku',
  parse: parse
};
