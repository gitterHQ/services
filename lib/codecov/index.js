/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";

var parse = function(headers, body) {
  var payload = body;
  var negative = (parseFloat(payload.coverage_change) < 0);
  var plus = negative ? '' : '+';
  var message;
  if (payload.pr === null) {
    message = '[Coverage](' + payload.codecov_url + ') (' + payload.branch + ') `' + plus + payload.coverage_change + '%`';
  } else {
    message = '[Coverage](' + payload.codecov_url + ') (#' + payload.pr + ') `' + plus + payload.coverage_change + '%`';
  }
  var icon = (negative) ? 'frown' : 'smile';
  var errorLevel = (negative) ? 'error' : 'normal';

  return { message: message, icon: icon, errorLevel: errorLevel };

};

module.exports = {
  apiVersion: 1,
  name: 'Codecov',
  parse: parse
};
