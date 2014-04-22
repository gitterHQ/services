/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";

var parse = function(headers, body, settings) {
  if(body.object_kind == 'issue') {
    if(settings.events.issue) return parse_issue(body);
  } else if(body.object_kind == 'merge_request') {
    if(settings.events.mergerequest) return parse_merge_request(body);
  } else {
    if(settings.events.push) return parse_push(body);
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

module.exports = {
  apiVersion: 1,
  name: 'GitLab',
  parse: parse
};
