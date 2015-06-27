/*!
 * sqlite-parser
 * @copyright Code School 2015 {@link http://codeschool.com}
 * @author Nick Wronski <nick@javascript.com>
 */
 ;(function (root) {
  var _           = require('lodash'),
      Promise     = require('promise/lib/es6-extensions'),
      parser      = require('./lib/parser');

  function sqliteParser(source) {
    var lastEvent;
    return new Promise(function(resolve, reject) {
      resolve(parser.parse(source));
    });
  }
  sqliteParser['NAME'] = "sqlite-parser";
  sqliteParser['VERSION'] = "0.4.0";

  module.exports = root.sqliteParser = sqliteParser;
})(typeof self === 'object' ? self : global);
