/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";

var parse = function(headers, body) {
  
  var data = {};

  // Parse data
  data.remote = body.repository.remote;
  data.repo = body.repository.owner+'/'+body.repository.name;
  data.repoUrl = body.repository.url;
  data.branch = body.commit.branch;
  data.buildUrl = buildDroneUrl(body);
  data.sha = body.commit.sha;
  data.shortSha = data.sha.substring(0, 7);
  data.pullRequest = body.commit.pull_request;
  data.status = body.commit.status.toLowerCase() === 'success' ? 'passed' : 'failed';

  // commit else pull request
  var message = '';
  if(data.pullRequest.length === 0) {
    message = buildCommitMessage(data);
  } else {
    message = buildPullrequestMessage(data);
  }

  var icon = data.status === 'passed' ? 'smile' : 'frown';
  var errorLevel = data.status === 'passed' ? 'normal' : 'error';

  return { 
            message: message,
            icon: icon,
            errorLevel: errorLevel
  };
};

var buildCommitMessage = function(data) {
  var message = 'Drone ';
  if(data.remote === 'github.com' || data.remote === 'enterprise.github.com' || data.remote === 'gitlab.com') {
    message += '[' + data.repo + '](' + data.repoUrl + '/commit/' + data.sha + ') ';
  } else {
    message += '[' + data.repo + '] ';
  }
  message += '(' + data.branch + ') [' + data.status + '](' + data.buildUrl + ') (' + data.shortSha + ')';
  return message;
}

var buildPullrequestMessage = function(data) {
  var message = 'Drone ';
  if(data.remote === 'github.com' || data.remote === 'enterprise.github.com') {
    message += '[' + data.repo + '](' + data.repoUrl+ '/pull/' + data.pullRequest + ') (pull request ';
  } else if(data.remote === 'gitlab.com') {
    message += '[' + data.repo + '](' + data.repoUrl + '/merge_requests/' + data.pullRequest + ') (merge request ';
  } else {
    message += '[' + data.repo + '] (pull request ';
  }
  message += '\\#' + data.pullRequest + ') [' + data.status+'](' + data.buildUrl + ')';
  return message;
}

var buildDroneUrl = function(body) {
	return [ body.from_url,
			 body.repository.host,
			 body.repository.owner,
			 body.repository.name,
			 body.commit.branch,
			 body.commit.sha
		   ].join('/');
};

module.exports = {
  apiVersion: 1,
  name: 'Drone',
  parse: parse
};
