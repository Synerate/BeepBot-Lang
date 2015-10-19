// Get the required modules.
var fs = require("fs"), os = require("os"), _ = require('lodash');

// Variable to contain all the loaded locales.
var langFiles = [];

// Read the lang directory to get all the lang files.
var list = fs.readdirSync(__dirname + '/lang/');

// Loop through all the lang files to process them so they can be used.
for (var i = 0; i < list.length; i++) {
  var locale = list[i].replace('.txt', '');
  langFiles[locale] = {};
  fs.readFileSync(__dirname + '/lang/' + list[i]).toString('utf8').split(os.EOL).forEach(function (line) {
    line = line.trim();
    if (line.length > 0 && line.charAt(0) !== '#') {
      var chunk = line.split('=');
      langFiles[locale][chunk[0]] = chunk.slice(1).join('=');
    }
  });
}

module.exports = langFiles;