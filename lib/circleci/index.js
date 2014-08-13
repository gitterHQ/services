/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";

// check: https://circleci.com/docs/api
var parse = function(headers, body) {

  // check if body contains payload
  if (typeof body.payload === "undefined") {
    return;
  }

  // parse the payload
  var payload = JSON.parse(body.payload);

  // extract the data for the message from the payload
  var repo = payload.username+'/'+payload.reponame;
  var repoUrl = payload.vcs_url;
  var branch = payload.branch;
  var buildUrl = payload.build_url;
  var number = payload.build_num;

  var statusMessage = payload.status.toLowerCase();
  
  var message = 'CircleCI ['+repo+']('+repoUrl+') ('+branch+') ['+statusMessage+']('+buildUrl+') ('+number+')';

  // Decide which error level and icon to show depending on the build status
  // possible circleci status:
  //   'failed', 'success', 'queued', 'canceled', 'not running'
  var icon = 'smile';
  // possible errorLevels: 'normal', 'error'
  var errorLevel = 'normal';

  switch (statusMessage) {
    case 'failed':
    case 'canceled':
      icon = 'frown';
      errorLevel = 'error';
      break;
    case 'queued':
    case 'not_running':
    case 'canceled':
      icon = 'meh';
      break;
  }
  
  return {
    message: message,
    icon: icon,
    errorLevel: errorLevel
  };

};

module.exports = {
  apiVersion: 1,
  name: 'CircleCI',
  parse: parse
};
