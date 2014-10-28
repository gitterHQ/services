/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";

// headers and body are from jenkins, settings is from gitter
var parse = function(headers, body, settings) {

  // map of events that the user has picked
  // e.g { started: false, success: true, failure: true }
  var events = settings.events;

  // we have to match our events against jenkins' build data
  // started: phase = STARTED
  // success: phase = FINISHED || FINALIZED, status = SUCCESS
  // failure: phase = FINISHED || FINALIZED, status = FAILURE
  var build = body.build;

  // build.phase can be STARTED, COMPLETED, FINISHED or FINALIZED
  var phase = build.phase.toLowerCase();

  // build.status only available for phases COMPLETED, FINISHED or FINALIZED
  var hasStatus = !!build.status;

  // build.status can be SUCCESS, FAILURE and others
  var status = hasStatus && build.status.toLowerCase();

  // if this data is about an event that the user hasnt picked, return nothing
  if(!events[phase] && !((phase === 'finished' || phase === 'finalized' ) && events[status])) return;

  // our statusMessage can be [started, success, failure]
  var statusMessage = status || phase;

  // creating the markdown
  var message = 'Jenkins ['+body.name+']('+build.full_url+') '+statusMessage;

  // this is the name of the file in the "icons" folder
  var icon = 'smile';

  // can be [normal, error]
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
  apiVersion: 1,
  name: 'Jenkins',
  parse: parse
};
