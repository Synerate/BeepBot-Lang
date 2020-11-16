import * as fs from 'fs';
import * as util from 'util';

export interface ILangFiles {
    [locale: string]: {
        [key: string]: string;
    };
}

const langFiles: ILangFiles = {};
let listing = fs.readdirSync(`${__dirname}/../lang/`);

for (let i = 0, length = listing.length; i < length; i++) {
    let locale = listing[i].replace('.txt', '');
    langFiles[locale] = {};
    let lines = fs.readFileSync(`${__dirname}/../lang/${listing[i]}`).toString('utf8').split(/\r?\n/);

    for (let j = 0, lenj = lines.length; j < lenj; j++) {
        let line = lines[j].trim();
        if (line.length > 0 && line.charAt(0) !== '#') {
            let chunk = line.split('=');
            langFiles[locale][chunk[0]] = chunk.slice(1).join('=');
        }
    }
}

/**
 * Get the translation for the key given and the locale.
 * If the locale given does not have the key the default of en_US is used.
 */
function get(locale: string, key: string): string {
    if (langFiles[locale] == null || langFiles[locale][key] == null) {
        return langFiles['en_US'][key];
    }

    return langFiles[locale][key];
}

/**
 * Translate a string using the locale & key along with the arguments.
 */
function translate(locale: string, key: string, ...optArgs: any[]): string {
    let localised = get(locale, key);
    if (/(%s|%d)/gi.test(localised)) {
        return util.format(localised, ...optArgs);
    }

    return localised;
}

/**
 * Format a string message replacing the util args with the ones supplied in the arguments.
 */
function format(str: string, ...optArgs: any[]): string {
    if (/(%s|%d)/gi.test(str)) {
        return util.format(str, ...optArgs);
    }

    return str;
}

export const Locale = {
    get,
    translate,
    format,
    langFiles
};
