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
    var events = [], indentation = 0;

    // function log(event) {
    //   function repeat(string, n) {
    //      var result = "", i;
    //
    //      for (i = 0; i < n; i++) {
    //        result += string;
    //      }
    //
    //      return result;
    //   }
    //
    //   function pad(string, length) {
    //     return string + repeat(" ", length - string.length);
    //   }
    //
    //   console.log(
    //     event.indentation + '@' + event.location.start.line + ':' + event.location.start.column +
    //     '_' + repeat("_", event.indentation) + (event.description || event.rule)
    //   );
    // }

    return new Promise(function(resolve, reject) {
      resolve(parser.parse(source, {
        tracer: {
          trace: function(event) {
            event.indentation = indentation;
            switch (event.type) {
              case "rule.enter":
                events.push(event);
                indentation += 1;
                break;

              case "rule.match":
                indentation -= 1;
                break;

              case "rule.fail":
                events.splice(_.findLastIndex(events, {rule: event.rule}), 1);
                indentation -= 1;
                break;

              default:
                throw new Error("Invalid event type: " + event.type + ".");
            }
          }
        }

      }));
    }).catch(function (err) {
      var rules, lastIndent = 10000,
          maxIndent = _.result(_.max(events, 'indentation'), 'indentation'),
          firstMax = false,
          named = _(events)
          .filter(function (e) {
            return e.description !== '' && !/whitespace/i.test(e.rule);
          })
          // .uniq(false, 'description')
          .reverse()
          .filter(function (e) {
            if (e.indentation < lastIndent) {
              // console.log(e.rule + ' has ' + e.indentation + ' which is less than ' + lastIndent)
              lastIndent = e.indentation;
              return true;
            } else {
              // console.log(e.rule + ' has ' + e.indentation + ' which is gte than ' + lastIndent)
              return false;
            }
          })
          .reverse()
          .value(),
          descs = _(named).pluck('description').value(),
          chain = [_.first(descs)].concat(_.takeRight(descs, 2));
          // _.forEach(_.takeRight(named, 12), log);
      if (chain.length) {
        rules = _.first(chain) + ' [' + _.rest(chain).join('/') + ']';
        err['message'] = "There is a syntax error near " + rules + "";
        err['location'] = _.findLast(events, {description: _.last(chain)}).location;
      }
      throw err;
    });
  }
  sqliteParser['NAME'] = "sqlite-parser";
  sqliteParser['VERSION'] = "0.4.1";

  module.exports = root.sqliteParser = sqliteParser;
})(typeof self === 'object' ? self : global);
