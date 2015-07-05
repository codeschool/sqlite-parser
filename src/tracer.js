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
         this.indentation -= 1;
        break;
      case 'rule.fail':
      /**
        * @note
        *   This is removing CREATE TABLE node when there is a failure in
        *   the statement, even though that information should be part of
        *   the error message.
        */
        // remove failed leaf
        this.events.splice(util.findLastIndex(this.events, {rule: event.rule}), 1);
        this.indentation -= 1;
        break;
    }
  };

  Tracer.prototype.smartError = function smartError(err) {
    var message, location, chain, chainDetail, firstNode,
        bestNode = {indentation: -1},
        deep = false,
        stmts = 0,
        namedEvents = this.events
        .filter(function (e) {
          return e.description !== null &&
                  !/whitespace|(new\sline)|(char$)|(^[oe]$)/i.test(e.description);
        })
        .reverse();

    chain = util.takeWhile(namedEvents, function (elem) {
      if (/^(sym\_semi)$/i.test(elem.rule)) {
        stmts += 1;
      }
      if (stmts > 1) {
        return false;
      }
      if (!deep) {
        if (elem.indentation > bestNode.indentation) {
          bestNode = elem;
        } else {
          deep = true;
        }
      } else if (/^(stmt)$/i.test(elem.rule)) {
        return false;
      }
      return true;
    });

    if (chain.length) {
      location = bestNode.location;
      firstNode = util.findLast(chain.reverse(), function (elem) {
        return /(Statement|Clause)$/i.test(elem.description);
      });
      chainDetail = firstNode != null ? ' (' + firstNode.description + ')' : '';
      message = 'Syntax error found near ' + bestNode.description + chainDetail;
      util.extend(err, {
        'message': message,
        'location': location
      });
    }
    return err;
  };

  return Tracer;
})(parserUtils);
