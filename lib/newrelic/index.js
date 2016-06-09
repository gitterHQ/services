/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";

var parse = function(headers, body) {
  var data = JSON.parse(body.alert || "{}");
  if(data.severity != 'critical') return;

  return {
    message: "" + data.long_description + ". For details [click here!]("+ data.alert_url + ")",
    icon: 'error',
    errorLevel: 'error'
  };
}

module.exports = {
  apiVersion: 1,
  name: 'New Relic',
  parse: parse
};
