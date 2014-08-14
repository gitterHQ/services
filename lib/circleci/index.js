/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";

var os = require('os');

// check: https://circleci.com/docs/api
var parse = function(headers, body) {

  // check if body contains payload
  if (typeof body.payload === "undefined") {
    return;
  }

  // parse the payload
  var payload = body.payload;

  // extract the data for the message from the payload
  var repo = payload.reponame;
  var username = payload.username;
  var subject = payload.subject;
  var repoUrl = payload.vcs_url;
  var branch = payload.branch;
  var buildUrl = payload.build_url;
  var number = payload.build_num;

  var statusMessage = payload.status.toLowerCase();
  
  var message = '';
  message += 'CircleCI **'+statusMessage+'**: '+username+' build ([#'+number+']('+buildUrl+')) in ['+repoUrl+']('+repo+'/'+branch+')'+os.EOL;
  message += '- '+subject+os.EOL;
  message += '('+payload.vcs_revision+' by ['+payload.committer_name+']('+payload.committer_email+'))';

  // Decide which error level and icon to show depending on the build status
  // possible circleci status:
  //   'failed', 'success', 'queued', 'canceled', 'not_running', 'no_tests'...
  var icon = 'meh';
  // possible errorLevels: 'normal', 'error'
  var errorLevel = 'normal';

  if (statusMessage === 'failed') {
    icon = 'frown';
    errorLevel = 'error';
  } else if (statusMessage === 'success') {
    icon = 'smile';
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
