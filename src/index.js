var _           = require('lodash'),
    prom        = require('promise/lib/es6-extensions'),
    parser      = require('./sql-parser'),
    top         = typeof global !== "undefined" && global !== null ? global : self,
    p           = top.Promise;

/** @note Taken from jakearchibald/es6-promise polyfill.js */
if (p && Object.prototype.toString.call(p.resolve()) === '[object Promise]' && !p.cast) {
  // Use existing Promise
  prom = p;
}

function sqliteParser(source) {
  return new prom(function(resolve) {
    resolve(parser.parse(source));
  });
}
sqliteParser['NAME'] = "sqlite-parser";
sqliteParser['VERSION'] = "0.0.9";

/**!
 * sqlite-parser
 * @description PEG.js implementation of SQLite 3 query parser
 * @author Nick Wronski <nick@javascript.com>
 */
module.exports = sqliteParser;
