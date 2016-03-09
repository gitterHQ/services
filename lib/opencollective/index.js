/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";

module.exports = {
  apiVersion: 1,
  name: 'Open Collective',
  parse: function(headers, body) {
    if (!body.message) {
      return;
    }
    
    return {
      message: body.message,
      icon: 'logo',
      errorLevel: 'normal'
    };
  }
};
