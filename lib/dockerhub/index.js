/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";

function parseDockerHubWebhook(headers, body, settings) {
  var repository = body.repository.repo_name;
  var url = body.repository.repo_url;
  var pusher = body.push_data.pusher;

  var message = 'Image pushed to [' + repository + '](' + url + ') by ' + pusher;

  return {
    message: message,
    icon: 'logo',
    errorLevel: 'normal'
  };
}

module.exports = {
  name: 'Docker Hub',
  apiVersion: 1,
  parse: parseDockerHubWebhook
};
