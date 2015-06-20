// Get the required modules.
var fs = require("fs");

var langFiles = [];
var list = fs.readdirSync('./lang/');

for (var i = 0; i < list.length; i++) {
  langFiles[list[i].replace('.json', '')] = require('./lang/' + list[i]);
}

module.exports = langFiles;