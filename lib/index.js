var Promise     = require('promise/lib/es6-extensions'),
    sqlParser   = require('./sql-parser');

function sqlQueryParser(source) {
  return new Promise(function(resolve) {
    resolve(sqlParser.parse(source));
  });
}
sqlQueryParser.NAME = "sql-query-parser";
sqlQueryParser.VERSION = "0.0.2";

module.exports = sqlQueryParser;
