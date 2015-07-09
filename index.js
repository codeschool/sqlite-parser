/*!
 * sqlite-parser
 * @copyright Code School 2015 {@link http://codeschool.com}
 * @author Nick Wronski <nick@javascript.com>
 */
 ;(function (root) {
  var parser      = require('./lib/parser');

  function sqliteParser(source, callback) {
    try {
      callback(null, parser.parse(source));
    } catch (e) {
      callback(e);
    }
  }
  sqliteParser['NAME'] = 'sqlite-parser';
  sqliteParser['VERSION'] = '0.10.1';

  module.exports = root.sqliteParser = sqliteParser;
})(typeof self === 'object' ? self : global);
