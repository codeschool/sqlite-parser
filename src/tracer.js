/*!
 * sqlite-parser
 * @copyright Code School 2015 {@link http://codeschool.com}
 * @author Nick Wronski <nick@javascript.com>
 */

function findLastIndex(arr, func) {
  for (let i = arr.length - 1; i >= 0; i -= 1) {
    if (func(arr[i])) {
     return i;
    }
  }
  return -1;
}

function takeWhile(arr, func) {
  const len = arr.length;
  let i = 0;
  for (; i < len; i += 1) {
    if (!func(arr[i])) {
      return arr.slice(0, i);
    }
  }
  return arr;
}

export const Tracer = (function () {
  function Tracer() {
    if (!(this instanceof Tracer)) {
      return new Tracer();
    }
    this.events = [];
    this.indentation = 0;
    this.whitespaceRule = /(^whitespace)|(char$)|(^[oe]$)|(^sym\_)/i;
    this.statementRule = /Statement$/i;
    this.firstNodeRule = /(Statement|Clause)$/i;
  };

  Tracer.prototype.trace = function trace(event) {
    var that = this, lastIndex, lastWsIndex;
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
        // remove failed leaf
        lastIndex = findLastIndex(this.events, function ({ rule }) {
          return rule === event.rule;
        });
        lastWsIndex = findLastIndex(this.events, function (e) {
          return !that.whitespaceRule.test(e.rule);
        });
        if (that.whitespaceRule.test(event.rule) || lastIndex === lastWsIndex) {
          this.events.splice(lastIndex, 1);
        }
        this.indentation -= 1;
        break;
    }
  };

  /**
   * @note
   *  There is way too much magic/nonsense in this method now. Need to
   *  come up with an alternative approach to getting the right
   *  information for syntax errors.
   */
  Tracer.prototype.smartError = function smartError(err) {
    var that = this, message, location, chain, chainDetail, firstNode,
        bestNode = {indentation: -1}, deep = false, stmts = 0,
        namedEvents = this.events
        .filter(function (e) {
          return e.description != null &&
                  !that.whitespaceRule.test(e.rule);
        })
        .reverse();
    chain = takeWhile(namedEvents, function (elem) {
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
        deep = true;
        return true;
      }
      return true;
    });

    if (chain.length) {
      location = bestNode.location;
      firstNode = chain.find(function (elem) {
        return that.firstNodeRule.test(elem.description)  &&
                elem.description !== bestNode.description &&
                elem.indentation !== bestNode.indentation;
      });
      if (firstNode != null) {
        if (this.statementRule.test(bestNode.description) &&
            this.statementRule.test(firstNode.description)) {
          chainDetail = firstNode.description;
        } else {
          chainDetail = bestNode.description + ' (' + firstNode.description + ')';
        }
      } else {
        chainDetail = bestNode.description;
      }
      message = 'Syntax error found near ' + chainDetail;
      Object.assign(err, {
        'message': message,
        'location': location
      });
    }
    return err;
  };

  return Tracer;
})();
