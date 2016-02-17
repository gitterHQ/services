/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";

var parsers = {
  push: function(body) {
    var repoName = body.repository.owner.name + '/' + body.repository.name;
    var branchName = body.ref.replace('refs/heads/', '');

    var message = '@' + body.pusher.name + ' on ' + branchName + '\n';
    message += body.commits.reduce(function(prev, commit) {
      return prev + repoName + '@' + commit.id.substr(0, 7) + ' ';
    }, '');
    message += '[(compare)](' + body.compare + ')';

    return { message: message, icon: 'repo-push', errorLevel: 'normal' };
  }
};

module.exports = {
  apiVersion: 1,
  name: 'GitHub',
  parse: function(headers, body) {
    var parser = parsers[headers['x-github-event']];
    if (parser) {
      return parser(body);
    }
  }
};

