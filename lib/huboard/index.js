/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";
var fs = require('fs');

var examples = {};

fs.readdirSync(__dirname+"/examples").forEach(function(file) {
  var example = file.split('.')[0];
  examples[example] = require("./examples/" + example);
});

var friendlyEventVerbs = {
  issue_opened: 'opened',
  issue_closed: 'closed',
  issue_reopened: 'reopened',
  issue_status_changed: 'changed status of',
  milestone_changed: 'changed milestone of',
};

var openCloseEvents = [
  "issue_opened",
  "issue_closed",
  "issue_reopened"
];

function isHookSubscribedToEvent(hook, event) {
  var events = hook.settings ? hook.settings.events : [];
  return events.indexOf(event) >= 0 ||
    (events.indexOf('issue_opened_or_closed') >= 0 &&
      openCloseEvents.indexOf(event) >= 0);
}

var parse = function(headers, body, hook) {
  var event = body.meta.action;
  if(!isHookSubscribedToEvent(hook, event)) return;

  var repo = body.meta.repo_full_name;
  var number = body.payload.issue.number;
  var action = friendlyEventVerbs[event] || event;
  var status = body.payload.action;
  var milestone = body.payload.milestone && body.payload.milestone.title;
  var previousColumn = body.payload.previous && body.payload.previous.text;
  var column = body.payload.column && body.payload.column.text;
  var user = body.meta.user.login;
  var assignee = body.payload.assignee && body.payload.assignee.login;

  var message = '@'+user+' '+action+' '+repo+'#'+number;

  if(assignee) {
    message = message+' to '+assignee;
  } else if(milestone) {
    message = message+' to '+milestone;
  } else if(status) {
    message = message+' to '+status;
  } else if(column) {
    if(previousColumn) {
      message = message + ' from '+previousColumn+' to '+column;
    } else {
      message = message + ' in '+column;
    }
  }

  return {
    message: message,
    icon: 'logo',
    errorLevel: 'normal'
  };
};

var options = [
  { id: "moved", name: "Moved", description: "When an issue or pull request is moved", selected: true },
  { id: "reordered", name: "Reordered", description: "When an issue or pull request is reordered in a column", selected: true },
  { id: "issue_status_changed", name: "Status Change", description: "When an issue or pull request is marked as blocked/ready", selected: true },
  { id: "milestone_changed", name: "Milestone Change", description: "When an issue or pull request has its milestone changed", selected: true },
  { id: "issue_opened_or_closed", name: "Opened Or Closed", description: "When an issue or pull request is opened or closed via HuBoard", selected: false },
  { id: "assigned", name: "Assigned", description: "When an issue or pull request is assigned to someone", selected: false }
];

var instructions = '1. At Huboard, click the settings cog for your board and select "Integrations".\n'+
                   '2. Under "Add an integration" select "Gitter".\n'+
                   '3. Paste the following into "Gitter webhook url":\n';


module.exports = {
  apiVersion: 0,
  friendlyName: 'HuBoard',
  parse: parse,
  options: options,
  instructions: instructions,
  examples: examples,
  icons: require('../iconMapper')(__dirname+'/icons')
};
