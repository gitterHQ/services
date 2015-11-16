/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";

var parse = function(headers, body) {
  var payload = body.payload;

  if(headers['x-gitbook-event'] == 'publish') {
    return parse_publish(payload);
  }
};

var parse_publish = function(payload) {
  var message = 'GitBook | ['+ payload.build.author.name +'](' + payload.build.author.urls.profile + ') published a new update of ['+ payload.book.id + '](' + payload.book.urls.access +')';

  return {
    message: message,
    icon: 'logo',
    errorLevel: 'normal'
  }
};

module.exports = {
  apiVersion: 1,
  name: 'GitBook',
  parse: parse
};
