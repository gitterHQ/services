/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";
var fs = require('fs');

var examples = {};

fs.readdirSync(__dirname+"/examples").forEach(function(file) {
  var example = file.split('.')[0];
  examples[example] = require("./examples/" + example);
});

var parse = function(headers, body, hook) {
  var events = hook.settings ? hook.settings.events : ['success', 'failure'];
  // phases can be [STARTED, COMPLETED, FINISHED]
  var phase = body.build.phase.toLowerCase();

  // status only available for [COMPLETED, FINISHED]
  var hasStatus = !!body.build.status;

  // status can be [SUCCESS, FAILURE, ...]
  var status = hasStatus && body.build.status.toLowerCase();

  if(events.indexOf(phase) === -1 && !(phase === 'finished' && events.indexOf(status) > -1)) return;

  var meta = {
    type:     'webhook',
    service:  'jenkins',
    job:      body.name,
    phase:    phase,
    url:      body.build.full_url
  };

  if (hasStatus) meta.status = status;

  var message = 'Job ' + meta.job + ' ' + meta.phase;
  var icon = 'meh-o';

  if(hasStatus) {
    message = message + ' with status: ' + status;
    if(status === 'success') {
      icon = 'smile-o';
    } else if(status === 'failure') {
      icon = 'frown-o';
    }
  }

  return {
    message: message,
    icon: icon
  };
};

module.exports = {
  apiVersion: 0,
  friendlyName: 'Jenkins',
  parse: parse,
  options: [
    { id: "started", name: "Started", description: "When a build is started.", selected: false },
    { id: "success", name: "Success", description: "When a build finishes successfully.", selected: false },
    { id: "failure", name: "Failure", description: "When a build fails. Sad face.", selected: true },
  ],
  instructions: '1. Select your job in Jenkins\n' +
                '2. Click the "Configure" link\n' +
                '3. Scroll down to Job notifications\n' +
                '4. Click the "Add Endpoint" button\n' +
                '5. Make sure Format is "JSON"\n' +
                '6. Make sure protocol is "HTTP"\n' +
                '7. Paste the webhook url into "URL":\n' +
                '8. Click "Apply"\n',
  examples: examples,
  icons: require('../iconMapper')(__dirname+'/icons')
};
