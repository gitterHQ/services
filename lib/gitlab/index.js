/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";
var util = require('util');

var parse = function(headers, body) {
  if(body.object_kind == 'issue') {
    return parse_issue(body);
  } else if(body.object_kind == 'merge_request') {
    return parse_merge_request(body);
  } else if (body.object_kind == 'note' ) {
    return parse_note(body);
  } else {
    return parse_push(body);
  }
};

var parse_push = function(body) {
  var message = 'GitLab | '+ body.user_name +' pushed ';

  if(body.total_commits_count) {
    message = message + body.total_commits_count +' commits ';
  }

  message = message + 'to '+ body.repository.name;

  return {
    message: message,
    icon: 'logo',
    errorLevel: 'normal'
  }
};

var parse_merge_request = function(body) {
  var attributes = body.object_attributes;
  if(attributes.created_at != attributes.updated_at) {
    var message = 'GitLab | Merge request [\\#'+ attributes.iid +' '+ attributes.title +'] updated';
  } else {
    var message = 'GitLab | Merge request [\\#'+ attributes.iid +' '+ attributes.title +'] created';
  }

  return {
    message: message,
    icon: 'logo',
    errorLevel: 'normal'
  }
};

var parse_issue = function(body) {
  var attributes = body.object_attributes;

  if(attributes.created_at != attributes.updated_at) {
    var message = 'GitLab | Issue [\\#'+ attributes.iid +' '+ attributes.title +'] updated.';
  } else {
    var message = 'GitLab | Issue [\\#'+ attributes.iid +' '+ attributes.title +'] opened.';
  }
  return {
    message: message,
    icon: "logo",
    errorLevel: 'normal'
  }
};

var parse_note = function(body) {
  var attributes = body.object_attributes;

  if (attributes.noteable_type == 'Issue') {
    return parse_issue_comment(body);
  } else if (attributes.noteable_type == 'MergeRequest') {
    return parse_merge_request_comment(body);
  }
};

var parse_issue_comment = function (body) {
  var attributes = body.object_attributes;
  var user = body.user;
  var project = body.project;
  var issue = body.issue;
  var userUrl = util.format('https://gitlab.com/u/%s', user.username);

  return {
    message: util.format('[%s](%s) commented on issue [#%s %s](%s) in [%s](%s)',
      user.name, userUrl, issue.iid, issue.title,
      attributes.url, project.name, project.homepage),
    icon: 'logo',
    errorLevel: 'normal'
  };
};

var parse_merge_request_comment = function (body) {
  var attributes = body.object_attributes;
  var user = body.user;
  var project = body.project;
  var mergeRequest = body.merge_request;
  var userUrl = util.format('https://gitlab.com/u/%s', user.username);

  return {
    message: util.format('[%s](%s) commented on merge request [#%s %s](%s) in [%s](%s)',
      user.name, userUrl, mergeRequest.iid, mergeRequest.title,
      attributes.url, project.name, project.homepage),
    icon: 'logo',
    errorLevel: 'normal'
  };
};

module.exports = {
  apiVersion: 1,
  name: 'GitLab',
  parse: parse
};
