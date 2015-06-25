var _           = require('lodash'),
    prom        = require('promise/lib/es6-extensions'),
    parser      = require('./sql-parser');

function sqliteParser(source) {
  return new prom(function(resolve) {
    resolve(parser.parse(source));
  });
}
sqliteParser['NAME'] = "sqlite-parser";
sqliteParser['VERSION'] = "0.3.0";

/**!
 * sqlite-parser
 * @description PEG.js implementation of SQLite 3 query parser
 * @author Nick Wronski <nick@javascript.com>
 */
module.exports = sqliteParser;
