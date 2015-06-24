/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";

module.exports = {
  apiVersion: 1,
  name: 'Doorbell',
  parse: function(headers, body) {
    if(body.message) {
      return {
        message: body.message,
        icon: 'logo',
        errorLevel: body.level === 'error' ? 'error' : 'normal'
      };
    }
  }
};
