/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";

module.exports = {
  apiVersion: 1,
  name: 'Custom',
  parse: function(headers, body) {
    if(body.message) {
      return {
        message: body.message,
        icon: body.level === 'error' ? 'error' : 'logo',
        errorLevel: body.level === 'error' ? 'error' : 'normal'
      };
    }
  }
};
