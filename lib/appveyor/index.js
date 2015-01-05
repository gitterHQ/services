/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";

var parse = function(headers, body, settings) {
	if (settings == undefined
		|| settings.events[body.eventName] != true)
	{
		return;
	}

	var buildNumber = body.eventData.buildNumber;
	var buildUrl = body.eventData.buildUrl;
	var buildLink = "[\\#" + buildNumber + "](" + buildUrl + ")";

	var errorLevel;
	var statusMessage;
	var iconName = "logo";
	if (body.eventName == "build_success") {
		// TODO add warning counts to success message
		// body.eventData.jobs.compilationMessages
		statusMessage = "Build " + buildLink + " passed";		
		errorLevel = "normal";
	}
	else if (body.eventName == "build_failed") {
		// TODO add failure reason to message
		statusMessage = "Build " + buildLink + " failed!";
		iconName = body.eventName;
		errorLevel = "error";
	}
	else {
		// ignore any other events
		return;
	}

	var markdown = statusMessage;

	var response = {
		message: markdown,
		icon: iconName,
		errorLevel: errorLevel
	};

	return response;
};

module.exports = {
  apiVersion: 1,
  name: 'AppVeyor',
  parse: parse
};
