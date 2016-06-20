import * as fs from "fs";

let langFiles: ILangFiles = {};
let listing = fs.readdirSync(__dirname + "/lang/");

for (let i = 0, length = listing.length; i < length; i++) {
  let locale = listing[i].replace(".txt", "");
  langFiles[locale] = {};
  let lines = fs.readFileSync(__dirname + "/lang/" + listing[i]).toString("utf8").split(/\r?\n/);
  for (let j = 0, lenj = lines.length; j < lenj; j++) {
    let line = lines[j].trim();
    if (line.length > 0 && line.charAt(0) !== "#") {
      let chunk = line.split("=");
      langFiles[locale][chunk[0]] = chunk.slice(1).join("=");
    }
  }
}

export interface ILangFiles {
 [locale: string]: {
   [key: string]: string
 }
}

export {langFiles};