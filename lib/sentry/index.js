/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";

var util = require('util');

function getEventName(level) {
  switch(level) {

    case "error":
      return "an error";

    case "fatal":
    case "warning":
    case "debug":
      return "a " + level + " event";

    // case "info":
    default:
      return "an event";
  }

}

var parse = function(headers, body, settings) {
  var url = body.url;
  var message = body.message;
  var project = body.project;
  var level = body.level;

  if(settings && settings.events && !settings.events[level]) return;

  var eventName = getEventName(level);
  if(!url || !message || !project) return;

  var errorLevel = level === 'error' || level === 'fatal' ? 'error' : 'normal';
  var text = util.format('Sentry reported [%s in %s](%s): `%s`', eventName, project, url, message);

  return {
    message: text,
    icon: (errorLevel === 'error') ? 'error' : 'logo',
    errorLevel: errorLevel
  };
};

module.exports = {
  apiVersion: 1,
  name: 'Sentry',
  parse: parse
};
