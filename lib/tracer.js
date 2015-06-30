/*!
 * sqlite-parser
 * @copyright Code School 2015 {@link http://codeschool.com}
 * @author Nick Wronski <nick@javascript.com>
 */
var lodash = require('lodash');

module.exports = (function (_) {
  Tracer = function Tracer() {
    if (!(this instanceof Tracer)) {
      return new Tracer();
    }
    this.events = [];
    this.indentation = 0;
  };

  Tracer.prototype.trace = function trace(event) {
    event.indentation = this.indentation;
    switch (event.type) {
      case 'rule.enter':
        this.events.push(event);
        this.indentation += 1;
        break;
      case 'rule.match':
        this.indentation -= 1;
        break;
      case 'rule.fail':
        this.events.splice(_.findLastIndex(this.events, {rule: event.rule}), 1);
        this.indentation -= 1;
        break;
    }
  };

  Tracer.prototype.smartError = function smartError(err) {
    var message, location,
        lastIndent = 10000,
        bestDescriptor = false,
        chain = _(this.events)
        // Only use nodes with a set description
        .filter(function (e) {
          return e.description !== '' && !/whitespace/i.test(e.rule);
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
      message = 'There is a syntax error near ' + _.first(chain) +
                ' [' + _.takeRight(chain, 2).join(', ') + ']' + '';
      location = _.findLast(this.events, {description: _.last(chain)}).location;
      throw {
        'name': 'SyntaxError',
        'message': message,
        'location': location
      };
    }
    throw err;
  }

  return Tracer;
})(lodash);
