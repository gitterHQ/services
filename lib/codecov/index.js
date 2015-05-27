/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";

var parse = function(headers, body) {
  var payload = body;

  var coverageChange = parseFloat(payload.coverage_change);

  var icon = 'neutral';
  var errorLevel = 'normal';
  if (coverageChange < 0) {
    icon = 'down';
  } else if (coverageChange > 0) {
    icon = 'up';
  }

  return { message: payload.message, icon: icon, errorLevel: errorLevel };

};

module.exports = {
  apiVersion: 1,
  name: 'Codecov',
  parse: parse
};
