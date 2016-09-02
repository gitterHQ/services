/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";

var parse = function (headers, body) {
    var projectName = body.project_name.split(" ")[0];
    var branch = body.project_name.split(" ")[1].replace(/\(([\-a-zA-Z0-9]+)\)/g, "\$1");
    var buildURL = "https://snap-ci.com/{0}/branch/{1}"
        .replace("{0}", projectName)
        .replace("{1}", branch);
    var message = "{0} Stage for project {1} [{3}]({2})"
        .replace("{0}", body.stage_name)
        .replace("{1}", projectName)
        .replace("{2}", buildURL);
    return {
        "passed": {
            icon: "smile",
            errorLevel: "normal",
            message: message.replace("{3}", "Passed")
        },
        "failed": {
            icon: "frown",
            errorLevel: "error",
            message: message.replace("{3}", "Failed")
        },
        "errored": {
            icon: "frown",
            errorLevel: "error",
            message: message.replace("{3}", "Errored")
        }
    }[body.build_result.toLocaleLowerCase()];

};

module.exports = {
    apiVersion: 1,
    name: 'SnapCI',
    parse: parse
};
