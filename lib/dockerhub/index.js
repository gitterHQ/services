/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";

function parseDockerHubWebhook(headers, body, settings) {
  var repository = body.repository.repo_name;
  var url = body.repository.repo_url;
  var pusher = body.push_data.pusher;

  var images = body.push_data.images;
  if (!images || images.length === 0) return;

  var message;
  if (images.length === 1) {
    message = 'Image ' + images[0].substring(0,12);
  } else {
    message = images.length + ' images';
  }
  message += ' pushed to [' + repository + '](' + url + ') by ' + pusher;

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
