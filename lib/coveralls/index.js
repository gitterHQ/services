/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";

var parse = function(headers, body) {
  var payload = body;

  var repo = payload.repo_name;
  var url = payload.url;
  var branch = payload.branch;

  var link = '['+repo+']('+url+') ('+branch+')';

  var message = 'Coveralls ' + link + ' `' + payload.coverage_change + '%`';
  var coverageChange = parseFloat(payload.coverage_change);

  var icon = 'neutral';
  var errorLevel = 'normal';
  if (coverageChange < 0) {
    icon = 'down';
  } else if (coverageChange > 0) {
    icon = 'up';
  }

  return { message: message, icon: icon, errorLevel: errorLevel };

};

module.exports = {
  apiVersion: 1,
  name: 'Coveralls',
  parse: parse
};
