/*!
 * sqlite-parser
 * @copyright Code School 2015 {@link http://codeschool.com}
 * @author Nick Wronski <nick@javascript.com>
 */
var lodash = require('lodash');

module.exports = (function (_) {
  function log(event) {
    function repeat(string, n) {
       var result = "", i;

       for (i = 0; i < n; i++) {
         result += string;
       }

       return result;
    }

    function pad(string, length) {
      return string + repeat(" ", length - string.length);
    }

    console.log(
      event.location.start.line + ":" + event.location.start.column + "-"
        + event.location.end.line + ":" + event.location.end.column + " "
        + pad(event.type, 10) + " "
        + repeat("  ", event.indentation) + event.rule
    );
  }
  Tracer = function Tracer() {
    if (!(this instanceof Tracer)) {
      return new Tracer();
    }
    this.events = [];
    this.indentation = 0;
  };

  Tracer.prototype.trace = function trace(event) {
    var that = this;
    event.indentation = this.indentation;
    switch (event.type) {
      case 'rule.enter':
        // add entered leaf
        this.events.push(event);
        this.indentation += 1;
        break;
      case 'rule.match':
        /*
         * TODO: need to remove entire statement from events once fully
         *       matched as right now the last location from the previous
         *       statement is reported when there is an error within a
         *       statement that follows it
         */
        this.indentation -= 1;
        break;
      case 'rule.fail':
        // remove failed leaf
        this.events.splice(_.findLastIndex(this.events, {rule: event.rule}), 1);
        this.indentation -= 1;
        break;
    }
  };

  Tracer.prototype.smartError = function smartError(err) {
    var message, location, chainDetail,
        lastIndent = 10000,
        bestDescriptor = false,
        chain = _(this.events)
        // Only use nodes with a set description
        .filter(function (e) {
          return e.description !== '' && !/whitespace|(semi$)|(^[oe]$)/i.test(e.rule);
        })
        .reverse()
        .filter(function (e) {
          if (e.indentation < lastIndent) {
            // Keep this node and update last indentation
            lastIndent = e.indentation;
            return true;
          } else {
            // Prune this node from a previous match sequence
            return false;
          }
        })
        .pluck('description')
        .takeWhile(function (d) {
          if (!bestDescriptor && /(Statement|Clause)$/i.test(d)) {
            bestDescriptor = true;
            return true;
          }
          return !bestDescriptor;
        })
        .reverse()
        .value();

    if (chain.length) {
      // Don't accidentally repeat the first description in the output
      chainDetail = _(chain).rest().takeRight(2).value();
      message = 'Syntax error found near ' + _.first(chain) +
                (chainDetail.length > 0 ? ' (' + chainDetail.join(', ') + ')' : '');
      location = _.findLast(this.events, {description: _.last(chain)}).location;
      _.extend(err, {
        'message': message,
        'location': location
      });
    }
    throw err;
  }

  return Tracer;
})(lodash);
