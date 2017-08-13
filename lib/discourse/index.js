/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";

var parse = function(headers, body, settings){
	var message = body.message;
	var icon = 'logo';

	return {
		message: message,
		icon: icon,
		errorLevel: 'normal'
	};
}

module.exports = {
	apiVersion: 1,
	name: 'Discourse',
	parse: parse
}