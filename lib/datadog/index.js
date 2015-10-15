/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";

function getFromField(fields) {
  if (!fields) return;

  var titleField = fields.filter(function(field) {
    return field.title === 'Sent By';
  })[0];

  return titleField && titleField.value;
}

module.exports = {
  apiVersion: 1,
  name: 'Datadog',
  parse: function(headers, body) {
    if (!body.attachments) return;

    var message =  body.attachments.map(function(attachment) {
      if (!attachment.text && !attachment.image_url) return;

      var parts = [];

      var fromName = getFromField(attachment.fields);
      if (fromName) {
        parts.push(fromName + ':');
      }

      var link = attachment.title_link;

      if (link) {
        parts.push('[' + attachment.text + '](' + link + ')');
      } else {
        parts.push(attachment.text);
      }

      if (attachment.image_url) {
        var image = '![' + attachment.title + '](' + attachment.image_url + ')';

        if (link) {
          parts.push('[' + image + '](' + link + ')');
        } else {
          parts.push(image);
        }
      }

      return parts.join(' ');
    }).join('\n\n');

    if (!message) return;

    return {
      message: message,
      icon: 'logo',
      errorLevel: 'normal'
    };
  }
};
