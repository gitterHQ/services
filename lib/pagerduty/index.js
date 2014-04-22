/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";

var util = require('util');

function describeUsers(incident, field) {
  if(!field) return;

  var user = incident[field];
  if(!user) return;

  return user.name;
}

function standardHandler(verb, userDescription, userField) {
  return function(message) {
    var data = message.data;
    if(!data) return;

    var incident = data.incident;
    if(!incident) return;

    var number = incident.incident_number;
    if(!number) return;

    var incidentUrl = incident.html_url;
    if(!incidentUrl) return;

    var service = incident.service;
    if(!service) return;

    var serviceName = service.name;
    var serviceUrl = service.html_url;

    if(!serviceName || !serviceUrl) return;


    var suffix;

    var user = describeUsers(incident, userField);
    if(user) {
      suffix = util.format('%s %s', userDescription, user);
    } else {
      suffix = verb;
    }

    var text = util.format('Incident [%s](%s) on [%s](%s) %s.', number, incidentUrl, serviceName, serviceUrl, suffix);

    return {
      message: text,
      icon: 'logo',
      errorLevel: 'normal'
    };
  };
}

var handlers = {
  "trigger": standardHandler('triggered.', 'triggered. Assigned to', 'assigned_to_user'),
  "acknowledge": standardHandler('acknowledged'),
  "unacknowledge": standardHandler('unacknowledge'),
  "resolve": standardHandler('resolved ', 'resolved by', 'resolved_by_user'),
  "assign": standardHandler('reassigned.', 'reassigned to', 'assigned_to_user'),
  "escalate": standardHandler('escalated', 'escalated to', 'assigned_to_user'),
  "delegate": standardHandler('delegated', 'delegated to', 'assigned_to_user'),
};

var parse = function(headers, body, settings) {
  if(!body.messages) return;

  var e = body.messages.map(function(message) {
    // strip off "incident." from "incident.eventname"
    var event = message.type.substring(9);
    return settings.events[event] && handlers[event](message);
  }).filter(function(f) {
    return !!f;
  });

  return e;
};

module.exports = {
  apiVersion: 1,
  name: 'Pagerduty',
  parse: parse
};
