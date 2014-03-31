/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";

var parse = function(headers, body, hook) {
  var events = hook.settings ? hook.settings.events : ['success', 'failure'];
  // phases can be [STARTED, COMPLETED, FINISHED]
  var phase = body.build.phase.toLowerCase();

  // status only available for [COMPLETED, FINISHED]
  var hasStatus = !!body.build.status;

  // status can be [SUCCESS, FAILURE, ...]
  var status = hasStatus && body.build.status.toLowerCase();

  if(events.indexOf(phase) === -1 && !(phase === 'finished' && events.indexOf(status) > -1)) return;

  var statusMessage = (body.build.status || body.build.phase).toLowerCase();

  var message = 'Jenkins ['+body.name+']('+body.build.full_url+') '+statusMessage;

  var icon = 'smile';
  var errorLevel = 'normal';

  if(statusMessage === 'failure') {
    icon = 'frown';
    errorLevel = 'error'; 
  } else if(statusMessage === 'started') {
    icon = 'meh';
  }

  return {
    message: message,
    icon: icon,
    errorLevel: errorLevel
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
  ]
};
