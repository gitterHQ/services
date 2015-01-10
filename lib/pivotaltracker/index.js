/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";

var parse = function(headers, body) {
  if(body.message) {

    var resource = extractPrimaryResource( body );

    // Replace this with something understandable
    body.message = body.message.replace('this', '\`' + resource.name + '\`');

    return {
      message: body.message,
      icon: 'logo',
      errorLevel: body.level === 'error' ? 'error' : 'normal'
    };
  }
};

/**
 * This function will extra the primary story/release
 * object from the raw Pivotal Track json body
 * @return {object}
 */
function extractPrimaryResource( body )
{
  if( body.hasOwnProperty('primary_resources') && body.primary_resources.length > 0 )
    return body.primary_resources[0];

  return null;
}

module.exports = {
  apiVersion: 1,
  name: 'Pivotal Tracker',
  parse: parse
};
