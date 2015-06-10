var prom        = require('promise/lib/es6-extensions'),
    parser      = require('./sql-parser'),
    top         = typeof global !== "undefined" && global !== null ? global : self,
    p           = top.Promise;

/** @note Taken from jakearchibald/es6-promise polyfill.js */
if (p && Object.prototype.toString.call(p.resolve()) === '[object Promise]' && !p.cast) {
  // Use existing Promise
  prom = p;
}

function sqlQueryParser(source, blocking) {
  return blocking ? new prom(function(resolve) {
    resolve(parser.parse(source));
  }) : parser.parse(source);
}
sqlQueryParser['NAME'] = "sql-query-parser";
sqlQueryParser['VERSION'] = "0.0.2";

module.exports = sqlQueryParser;
