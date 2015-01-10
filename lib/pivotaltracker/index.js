/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";

var parse = function(headers, body) {
  if(body.message) {

    var resource = extractPrimaryResource( body ); 
    var message = specifyThis(body.message, resource);

    return {
      message: message,
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

/**
 * By default the pivotal tracker messages use the string "this" to
 * refer to the current story which is useless if you would show that message
 * to a user that doesn't have the full context of the story.
 * Therefor we'll replace the first occurrence of the "this" string with the name of the story.
 * 
 * @param  {string} message  
 * @param  {object} resource 
 * @return {string}          
 */
function messageSpecifyThis( message, resource )
{
  return message.replace('this', highlight(resource.name));
}

/**
 * Highlight a text part using markdown
 * @param  {string} text 
 * @return {string} 
 */
function highlight( text )
{
  return '\`' + text + '\`'
}

module.exports = {
  apiVersion: 1,
  name: 'Pivotal Tracker',
  parse: parse
};
