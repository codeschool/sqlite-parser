/**
 * sqlite-parser
 */
var parser = require('./lib/parser');
function sqliteParser(source, callback) {
  try {
    callback(null, parser.parse(source));
  } catch (e) {
    callback(e);
  }
}

sqliteParser['NAME'] = 'sqlite-parser';
sqliteParser['VERSION'] = '@@VERSION';

module.exports = sqliteParser;
