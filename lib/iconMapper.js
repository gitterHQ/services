/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";
var fs = require('fs');

function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

module.exports = function(dir) {
  var icons = {};
  fs.readdirSync(dir).forEach(function(file) {
    var name = file.split('.')[0];
    var ext = file.split('.')[1];
    if(ext === 'png') {
      if(endsWith(name, '@2x')) {
        var shortname = name.substring(0, name.length - 3);
        if(!icons[shortname]) icons[shortname] = {};
        icons[shortname].retina = dir+'/'+file;
      } else {
        if(!icons[name]) icons[name] = {};
        icons[name].legacy = dir+'/'+file;
      }
    }
  });

  return icons;
};
