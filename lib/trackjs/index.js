/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";

module.exports = {
  apiVersion: 1,
  name: 'TrackJS',
  parse: function(headers, body) {
    if(body.data && body.data.errors && body.data.errors.length > 0) {
      var ret = {
        message: 'TrackJS | ' + body.data.errors[0].message,
        icon: 'logo',
        errorLevel: body.data.errors[0].count > 1 ? 'error' : 'normal'
      };
      return ret;
    }
  }
};
