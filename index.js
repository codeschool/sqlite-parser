/**
 * sqlite-parser
 * @copyright Code School 2015 {@link http://codeschool.com}
 * @author Nick Wronski <nick@javascript.com>
 */
var parser      = require('./lib/parser'),
    Tracer      = require('./lib/tracer');

function sqliteParser(source, callback) {
  var t = Tracer(), res;
  try {
    res = parser.parse(source, {
      'tracer': t
    });
    callback(null, res);
  } catch (e) {
    callback(e instanceof parser.SyntaxError ? t.smartError(e) : e);
  }
}

sqliteParser['NAME'] = 'sqlite-parser';
sqliteParser['VERSION'] = '@@VERSION';

module.exports = sqliteParser;
