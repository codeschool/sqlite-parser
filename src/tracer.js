/*!
 * sqlite-parser
 * @copyright Code School 2015 {@link http://codeschool.com}
 * @author Nick Wronski <nick@javascript.com>
 */
var parserUtils = require('./parser-util');

module.exports = (function (util) {
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
        this.events.splice(util.findLastIndex(this.events, {rule: event.rule}), 1);
        this.indentation -= 1;
        break;
    }
  };

  Tracer.prototype.smartError = function smartError(err) {
    var message, location, chain, chainDetail,
        lastIndent = 10000,
        bestDescriptor = false,
        multiStatement = false;

    chain = this.events
    .reverse()
    .filter(function (e) {
      // Only use nodes with a set description
      if (multiStatement) {
        return false;
      } else if (/Statement$/i.test(e.description)) {
        multiStatement = true;
        return true;
      }
      return e.description !== null && !/whitespace|(semi$)|(^[oe]$)/i.test(e.rule);
    });

    if (chain.length) {
      // Get best location data
      location = util.first(chain).location;
      // Collect descriptions
      chain = util.uniq(util.takeWhile(util.pluck(chain, 'description'), function (d) {
        if (!bestDescriptor && /(Statement|Clause)$/i.test(d)) {
          bestDescriptor = true;
          return true;
        }
        return !bestDescriptor;
      }))
      .reverse();
      // Don't accidentally repeat the first description in the output
      chainDetail = util.takeRight(util.rest(chain), 2);
      message = 'Syntax error found near ' + util.first(chain) +
                (chainDetail.length > 0 ? ' (' + chainDetail.join(', ') + ')' : '');
      //location = this.events.findLast({description: chain.last()}).location;
      util.extend(err, {
        'message': message,
        'location': location
      });
    }
    throw err;
  }

  return Tracer;
})(parserUtils);
