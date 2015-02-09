/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";

var os = require('os');


var parse = function (headers, body, settings) {
  var payload = body.build;
  var status = payload.status.toLowerCase();

  if (settings && settings.events && !settings.events[status]) return;

  var title = 'Codeship **' + status.charAt(0).toUpperCase() + status.slice(1) + '**:';
  var buildLink = '[' + payload.project_full_name + '/' + payload.build_id + '](' + payload.build_url + ')';
  var commitMessage = payload.message;
  var branch = '(' + payload.branch + ')';
  var commitLink = '[' + payload.commit_id + '](' + payload.commit_url + ')';
  var author = 'by ' + payload.committer;

  var message = [
    title,
    buildLink,
    os.EOL + '- ' + commitMessage,
    branch,
    commitLink,
    author
  ].join(' ');

  return {
    message: message,
    icon: status === 'error' ? 'frown' : 'logo',
    errorLevel: status === 'error' ? 'error' : 'normal'
  };
};


module.exports = {
  apiVersion: 1,
  name: 'Codeship',
  parse: parse
};
