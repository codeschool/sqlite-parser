/*!
 * sqlite-parser
 * @copyright Code School 2015 {@link http://codeschool.com}
 * @author Nick Wronski <nick@javascript.com>
 */
 ;(function (root) {
  var Promise     = require('promise/lib/es6-extensions'),
      parser      = require('./lib/parser'),
      Tracer      = require('./lib/tracer');

  function sqliteParser(source) {
    var t = Tracer();
    return new Promise(function(resolve, reject) {
      resolve(parser.parse(source, {
        'tracer': t
      }));
    })
    .catch(function (err) {
      t.smartError(err);
    });
  }
  sqliteParser['NAME'] = 'sqlite-parser';
  sqliteParser['VERSION'] = '0.5.1';

  module.exports = root.sqliteParser = sqliteParser;
})(typeof self === 'object' ? self : global);
