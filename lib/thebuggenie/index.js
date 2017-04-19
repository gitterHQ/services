/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";
var util = require('util');

var parse = function(headers, body, settings) {
  if (settings && settings.events && !settings.events[body.event_key])
    return;

  switch (body.event_key) {
    case 'issue_create':
      return parse_issue_create(body);
    case 'issue_comment':
      return parse_issue_comment(body);
  }

  return false;
};

var parse_issue_create = function(body) {
  var issue = body.issue;
  var username = body.user.username;
  var project = body.project;

  var message = util.format('@%s created [%s](%s) in project [%s](%s)',
    username, issue.title, issue.url, project.name, project.url);

  return {
    message: message,
    icon: 'file-text-o',
    errorLevel: 'normal'
  };
};

var parse_issue_comment = function (body) {
  var issue = body.issue;
  var username = body.user.username;
  var project = body.project;

  var message = util.format(
      '@%s commented on [%s](%s) in project [%s](%s)',
      username, issue.title, issue.url, project.name, project.url
  );

  return {
      message: message,
      icon: 'comment-o',
      errorLevel: 'normal'
  };
};

module.exports = {
  apiVersion: 1,
  name: 'The Bug Genie',
  parse: parse
};
