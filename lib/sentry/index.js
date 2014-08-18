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

function isEncodedIncorrectly(body) {
  var firstKey = Object.keys(body)[0] || '';

  return firstKey[0] === '{';
}

function decode(incorrectlyEncodedBody) {
  var firstKey = Object.keys(incorrectlyEncodedBody)[0] || '';
  var notQuiteJSON = firstKey + incorrectlyEncodedBody[firstKey];

  // correcting url decoded json encoded stack trace data in `event` is hard.
  // so lets just say that `event` is empty and that there is nothing else in the body.
  var whenThingsGetBad = notQuiteJSON.indexOf('event');
  var originalJSON = notQuiteJSON.substring(0, whenThingsGetBad) + 'event": {}}';

  return JSON.parse(originalJSON);
}

var parse = function(headers, body, settings) {
  // sentry is sending json data but with a form-encoded content-type.
  // fix: https://github.com/getsentry/sentry-webhooks/pull/10
  // original issue: https://github.com/gitterHQ/services/issues/21
  if(isEncodedIncorrectly(body)) {
    body = decode(body);
  }

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
