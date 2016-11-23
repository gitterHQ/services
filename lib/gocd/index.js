/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";

var parse = function (headers, body, settings ) {
    
    var events = settings.events;
    var message = body.message;
    var status = body.status.toLocaleLowerCase();

    if(!events[status])
        return;

    return {
        "passed": {
            icon: "smile",
            errorLevel: "normal",
            message: message
        },
        "failed": {
            icon: "frown",
            errorLevel: "error",
            message: message
        },
        "errored": {
            icon: "frown",
            errorLevel: "error",
            message: message
        },
        "triggered": {
            icon: "smile",
            errorLevel: "normal",
            message: message
        }
    }[status];

};

module.exports = {
    apiVersion: 1,
    name: 'GoCD',
    parse: parse
};
