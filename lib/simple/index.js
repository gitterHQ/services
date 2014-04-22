/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";

module.exports = {
  apiVersion: 1,
  name: 'Simple',
  parse: function(headers, body) {
    if(body.message) {
      return {
        message: body.message,
        icon: body.errorLevel === 'error' ? 'error' : 'logo',
        errorLevel: body.errorLevel === 'error' ? 'error' : 'normal'
      };
    }
  }
};
