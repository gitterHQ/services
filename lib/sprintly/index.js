/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";

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
  apiVersion: 1,
  name: 'Sprint.ly',
  parse: parse
};
