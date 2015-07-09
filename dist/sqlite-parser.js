(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
/*!
 * sqlite-parser
 * @copyright Code School 2015 {@link http://codeschool.com}
 * @author Nick Wronski <nick@javascript.com>
 */
 ;(function (root) {
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
  sqliteParser['VERSION'] = '0.9.11';

  module.exports = root.sqliteParser = sqliteParser;
})(typeof self === 'object' ? self : global);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./lib/parser":3,"./lib/tracer":4}],2:[function(require,module,exports){
/*!
 * sqlite-parser
 * @copyright Code School 2015 {@link http://codeschool.com}
 * @author Nick Wronski <nick@javascript.com>
 */
var slice = [].slice;

function makeArray(arr) {
  return !isArray(arr) ? (isOkay(arr) ? [arr] : []) : arr;
}

function typed(obj) {
  return Object.prototype.toString.call(obj);
}

function isPlain(obj) {
  return typed(obj) === '[object Object]';
}

function isPattern(obj) {
  return typed(obj) === '[object RegExp]';
}

function isFunc(obj) {
  return typed(obj) === '[object Function]';
}

function isString(obj) {
  return typed(obj) === '[object String]';
}

function isArray(obj) {
  return Array.isArray ? Array.isArray(obj) : (typed(obj) === '[object Array]');
}

function isOkay(obj) {
  return obj != null;
}

function collapse(arr) {
  var i, len, n, obj, ref, v;
  if (isArray(arr) && arr.length) {
    obj = {};
    for (i = 0, len = arr.length; i < len; i++) {
      ref = arr[i], n = ref.name, v = ref.value;
      obj[n] = v;
    }
    return obj;
  } else {
    return {};
  }
}

function compose(args, glue) {
  var conc = isArray(glue), res, start = conc ? [] : '';
  if (!isOkay(glue)) {
    glue = ' ';
  }
  res = args.reduce(function (prev, cur) {
    return conc ? (isOkay(cur) ? prev.concat(cur) : prev) :
                  (prev + (isOkay(cur) ? textNode(cur) + glue : ''));
  }, start);
  return conc ? res : res.trim();
}

function stack(arr) {
  return (isArray(arr) ?
    arr.map(function (elem) {
      return elem[1];
    }) : []);
}

function nodeToString(node) {
  var elem = ((isArray(node) || isString(node)) ? node : []);
  if (isArray(elem)) {
    if (elem.length && isArray(elem[0])) {
      elem = stack(elem);
    }
    elem = elem.join('');
  }
  return elem;
}

function textNode(elem) {
  /*
   * A text node has
   * - no leading or trailing whitespace
   */
  return nodeToString(elem).trim();
}

function textMerge() {
  return compose.call(this, slice.call(arguments, 0), '');
}

function unescape(str, quoteChar) {
  var re;
  if (quoteChar == null) {
    quoteChar = '\'';
  }
  re = new RegExp(quoteChar + '{2}', 'g');
  return nodeToString(str).replace(re, quoteChar);
}

function extend() {
  var first = arguments[0],
      rest = slice.call(arguments, 1);

  rest.forEach(function (next) {
    if (isOkay(next) && isPlain(next)) {
      var key;
      for (key in next) {
        if (next.hasOwnProperty(key)) {
          first[key] = next[key];
        }
      }
    }
  });

  return first;
}

function has(thing, item) {
  var k, v, len;
  if (isArray(thing)) {
    if (isString(item)) {
      // thing is an array, find substring item
      return thing.indexOf(item) !== -1;
    } else {
      // thing is an array, find item in array
      return findWhere(thing, item) !== undefined;
    }
  } else if (isPlain(thing)) {
    if (isFunc(item)) {
      return item(thing);
    } else if (isPlain(item)) {
      // item is an object, find each prop key and value in item within thing
      for (k in item) {
        v = item[k];
        if (!(thing.hasOwnProperty(k) && thing[k] === v)) {
          return false;
        }
      }
      return true;
    } else if (isArray(item)) {
      // item is an array, find each string prop within thing
      for (i = 0, len = item.length; i < len; i++) {
        k = item[i];
        if (!thing.hasOwnProperty(k)) {
          return false;
        }
      }
      return true;
    } else {
      // thing is an object, item is a string, find item string in thing
      return thing.hasOwnProperty(item);
    }
  }
  return false;
}

function findWhere(arr, props) {
  var i, len, val;
  for (i = 0, len = arr.length; i < len; i++) {
    val = arr[i];
    if (has(val, props)) {
      return val;
    }
  }
  return null;
}

function key(elem) {
  return textNode(elem).toLowerCase();
}

function keyify(arr, glue) {
  return key(compose(arr, glue));
}

function listify() {
  return compose.call(this, slice.call(arguments, 0), []);
}

function findLastIndex(arr, props) {
  return findLast(arr, props, true);
}

function findLast(arr, props, index) {
  var elem, i;
  for (i = arr.length - 1; i >= 0; i += -1) {
    elem = arr[i];
    if (has(elem, props)) {
      return index ? i : elem;
    }
  }
  return index ? -1 : null;
}

function takeWhile(arr, func) {
  var elem, i, len;
  for (i = 0, len = arr.length; i < len; i++) {
    elem = arr[i];
    if (!func(elem)) {
      break;
    }
  }
  return arr.slice(0, i);
}

function isArrayOkay(arr) {
  if (isArray(arr)) {
    return arr.length > 0 && isOkay(arr[0]);
  }
  return false;
}

module.exports = {
  // Array methods
  'stack':                stack,
  'collapse':             collapse,
  'compose':              compose,
  'findWhere':            findWhere,
  'has':                  has,
  'findLastIndex':        findLastIndex,
  'findLast':             findLast,
  'takeWhile':            takeWhile,
  'isArrayOkay':          isArrayOkay,
  'listify':              listify,
  // String methods
  'nodeToString':         nodeToString,
  'textNode':             textNode,
  'unescape':             unescape,
  'key':                  key,
  'keyify':               keyify,
  'textMerge':            textMerge,
  // Type detection
  'typed':                typed,
  'isPlain':              isPlain,
  'isPattern':            isPattern,
  'isFunc':               isFunc,
  'isString':             isString,
  'isArray':              isArray,
  'isOkay':								isOkay,
  // Misc methods
  'extend':               extend,
  'makeArray':            makeArray
};

},{}],3:[function(require,module,exports){
module.exports = (function() {
  "use strict";

  /*
   * Generated by PEG.js 0.8.0.
   *
   * http://pegjs.org/
   */

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function peg$SyntaxError(message, expected, found, location) {
    this.message  = message;
    this.expected = expected;
    this.found    = found;
    this.location = location;
    this.name     = "SyntaxError";

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, peg$SyntaxError);
    }
  }

  peg$subclass(peg$SyntaxError, Error);

  function peg$DefaultTracer() {
    this.indentLevel = 0;
  }

  peg$DefaultTracer.prototype.trace = function(event) {
    var that = this;

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
          + repeat("  ", that.indentLevel) + event.rule
      );
    }

    switch (event.type) {
      case "rule.enter":
        log(event);
        this.indentLevel++;
        break;

      case "rule.match":
        this.indentLevel--;
        log(event);
        break;

      case "rule.fail":
        this.indentLevel--;
        log(event);
        break;

      default:
        throw new Error("Invalid event type: " + event.type + ".");
    }
  };

  function peg$parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},
        parser  = this,

        peg$FAILED = {},

        peg$startRuleFunctions = { start: peg$parsestart },
        peg$startRuleFunction  = peg$parsestart,

        peg$c0 = function(s) {
            return {
              'statement': (util.isOkay(s) ? s : [])
            };
          },
        peg$c1 = function(f, b) { return util.listify(f, b); },
        peg$c2 = function(s) { return s; },
        peg$c3 = { type: "other", description: "Expression" },
        peg$c4 = function(t) { return t; },
        peg$c5 = { type: "other", description: "Logical Expression Group" },
        peg$c6 = function(l, o, r) {
            return {
              'type': 'expression',
              'format': 'binary',
              'variant': 'operation',
              'operation': util.key(o),
              'left': l,
              'right': r
            };
          },
        peg$c7 = { type: "other", description: "Wrapped Expression" },
        peg$c8 = function(n) { return n; },
        peg$c9 = { type: "other", description: "Unary Expression" },
        peg$c10 = function(o, e) {
            return {
              'type': 'expression',
              'format': 'unary',
              'variant': 'operation',
              'expression': e,
              'operator': util.key(o)
            };
          },
        peg$c11 = { type: "other", description: "CAST Expression" },
        peg$c12 = function(s, e, a) {
            return {
              'type': 'expression',
              'format': 'unary',
              'variant': util.key(s),
              'expression': e,
              'as': a
            };
          },
        peg$c13 = { type: "other", description: "Type Alias" },
        peg$c14 = function(d) { return d; },
        peg$c15 = { type: "other", description: "EXISTS Expression" },
        peg$c16 = function(n, e) {
            return {
              'type': 'expression',
              'format': 'unary',
              'variant': 'exists',
              'expression': e,
              'operator': util.key(n)
            };
          },
        peg$c17 = { type: "other", description: "EXISTS Keyword" },
        peg$c18 = function(n, x) { return util.compose([n, x]); },
        peg$c19 = { type: "other", description: "CASE Expression" },
        peg$c20 = function(t, e, w, s) {
            return {
              'type': 'expression',
              'format': 'binary',
              'variant': util.key(t),
              'expression': e,
              'condition': util.listify(w, s)
            };
          },
        peg$c21 = { type: "other", description: "WHEN Clause" },
        peg$c22 = function(s, w, t) {
            return {
              'type': 'condition',
              'format': util.key(s),
              'when': w,
              'then': t
            };
          },
        peg$c23 = { type: "other", description: "ELSE Clause" },
        peg$c24 = function(s, e) {
            return {
              'type': 'condition',
              'format': util.key(s),
              'else': e
            };
          },
        peg$c25 = { type: "other", description: "RAISE Expression" },
        peg$c26 = function(s, a) {
            return util.extend({
              'type': 'expression',
              'format': 'unary',
              'variant': util.key(s),
              'expression': a
            }, a);
          },
        peg$c27 = { type: "other", description: "RAISE Expression Arguments" },
        peg$c28 = function(a) {
            return util.extend({
              'type': 'error',
              'action': null,
              'message': null
            }, a);
          },
        peg$c29 = { type: "other", description: "IGNORE Keyword" },
        peg$c30 = function(f) {
            return {
              'action': util.key(f)
            };
          },
        peg$c31 = function(f, m) {
            return {
              'action': util.key(f),
              'message': m
            };
          },
        peg$c32 = { type: "other", description: "COLLATE Expression" },
        peg$c33 = function(v, s, c) {
            return util.extend(v, {
              'collate': c
            });
          },
        peg$c34 = { type: "other", description: "Comparison Expression" },
        peg$c35 = function(v, n, m, e, x) {
            return util.extend({
              'type': 'expression',
              'format': 'binary',
              'variant': 'operation',
              'operation': util.keyify([n, m]),
              'left': v,
              'right': e
            }, x);
          },
        peg$c36 = { type: "other", description: "ESCAPE Expression" },
        peg$c37 = function(s, e) {
            return {
              'escape': e
            };
          },
        peg$c38 = { type: "other", description: "NULL Expression" },
        peg$c39 = function(v, n) {
            return {
              'type': 'expression',
              'format': 'unary',
              'variant': 'operation',
              'expression': v,
              'operation': n
            };
          },
        peg$c40 = { type: "other", description: "NULL Keyword" },
        peg$c41 = function(i, n) { return util.keyify([i, n]); },
        peg$c42 = function(t) { return util.key(t); },
        peg$c43 = { type: "other", description: "IS Keyword" },
        peg$c44 = function(i, n) {
            return util.keyify([i, n]);
          },
        peg$c45 = function(n) { return util.textNode(n); },
        peg$c46 = { type: "other", description: "BETWEEN Expression" },
        peg$c47 = function(v, n, b, e1, s, e2) {
            return {
              'type': 'expression',
              'format': 'binary',
              'variant': 'operation',
              'operation': util.keyify([n, b]),
              'left': v,
              'right': {
                'type': 'expression',
                'format': 'binary',
                'variant': 'operation',
                'operation': util.key(s),
                'left': e1,
                'right': e2
              }
            };
          },
        peg$c48 = { type: "other", description: "IN Expression" },
        peg$c49 = function(v, n, i, e) {
            return {
              'type': 'expression',
              'format': 'binary',
              'variant': 'operation',
              'operation': util.keyify([n, i]),
              'left': v,
              'right': e
            };
          },
        peg$c50 = function(e) { return e; },
        peg$c51 = { type: "other", description: "Type Definition" },
        peg$c52 = function(n, a) {
            return util.extend({
              'type': 'datatype',
              'variant': n[0],
              'affinity': n[1],
              'args': [] // datatype definition arguments
            }, a);
          },
        peg$c53 = { type: "other", description: "Type Definition Arguments" },
        peg$c54 = function(a1, a2) {
            return {
              'args': util.listify(a1, a2)
            };
          },
        peg$c55 = { type: "other", description: "Null Literal" },
        peg$c56 = function(n) {
            return {
              'type': 'literal',
              'variant': 'null',
              'value': util.key(n)
            };
          },
        peg$c57 = { type: "other", description: "Date Literal" },
        peg$c58 = function(d) {
            return {
              'type': 'literal',
              'variant': 'date',
              'value': util.key(d)
            };
          },
        peg$c59 = { type: "other", description: "String Literal" },
        peg$c60 = function(s) {
            return {
              'type': 'literal',
              'variant': 'string',
              'value': s
            };
          },
        peg$c61 = { type: "other", description: "Single-quoted String Literal" },
        peg$c62 = function(s) {
            /**
              * @note Unescaped the pairs of literal single quotation marks
              * @note Not sure if the BLOB type should be un-escaped
              */
            return util.unescape(s, "'");
          },
        peg$c63 = "''",
        peg$c64 = { type: "literal", value: "''", description: "\"''\"" },
        peg$c65 = /^[^']/,
        peg$c66 = { type: "class", value: "[^\\']", description: "[^\\']" },
        peg$c67 = { type: "other", description: "Blob Literal" },
        peg$c68 = /^[x]/i,
        peg$c69 = { type: "class", value: "[x]i", description: "[x]i" },
        peg$c70 = function(b) {
            return {
              'type': 'literal',
              'variant': 'blob',
              'value': b
            };
          },
        peg$c71 = { type: "other", description: "Number Sign" },
        peg$c72 = function(s, n) {
            if (util.isOkay(s)) {
              n['value'] = util.textMerge(s, n['value']);
            }
            return n;
          },
        peg$c73 = function(d, e) {
            return {
              'type': 'literal',
              'variant': 'decimal',
              'value': util.textMerge(d, e)
            };
          },
        peg$c74 = { type: "other", description: "Decimal Literal" },
        peg$c75 = function(f, b) { return util.textMerge(f, b); },
        peg$c76 = function(t, d) { return util.textMerge(t, d); },
        peg$c77 = { type: "other", description: "Decimal Literal Exponent" },
        peg$c78 = "e",
        peg$c79 = { type: "literal", value: "E", description: "\"E\"" },
        peg$c80 = /^[+\-]/,
        peg$c81 = { type: "class", value: "[\\+\\-]", description: "[\\+\\-]" },
        peg$c82 = function(e, s, d) { return util.textMerge(e, s, d); },
        peg$c83 = { type: "other", description: "Hexidecimal Literal" },
        peg$c84 = "0x",
        peg$c85 = { type: "literal", value: "0x", description: "\"0x\"" },
        peg$c86 = function(f, b) {
            return {
              'type': 'literal',
              'variant': 'hexidecimal',
              'value': util.textMerge(f, b)
            };
          },
        peg$c87 = /^[0-9a-f]/i,
        peg$c88 = { type: "class", value: "[0-9a-f]i", description: "[0-9a-f]i" },
        peg$c89 = /^[0-9]/,
        peg$c90 = { type: "class", value: "[0-9]", description: "[0-9]" },
        peg$c91 = { type: "other", description: "Bind Parameter" },
        peg$c92 = function(b) {
            return util.extend({
              'type': 'variable'
            }, b);
          },
        peg$c93 = { type: "other", description: "Numbered Bind Parameter" },
        peg$c94 = /^[1-9]/,
        peg$c95 = { type: "class", value: "[1-9]", description: "[1-9]" },
        peg$c96 = function(q, id) {
            return {
              'format': 'numbered',
              'name': util.textMerge(q, id)
            };
          },
        peg$c97 = { type: "other", description: "Named Bind Parameter" },
        peg$c98 = /^[:@]/,
        peg$c99 = { type: "class", value: "[\\:\\@]", description: "[\\:\\@]" },
        peg$c100 = function(s, name) {
            return {
              'format': 'named',
              'name': util.textMerge(s, name)
            };
          },
        peg$c101 = { type: "other", description: "TCL Bind Parameter" },
        peg$c102 = "$",
        peg$c103 = { type: "literal", value: "$", description: "\"$\"" },
        peg$c104 = ":",
        peg$c105 = { type: "literal", value: ":", description: "\":\"" },
        peg$c106 = function(d, name, s) {
            return util.extend({
              'format': 'tcl',
              'name': util.textMerge(d, name),
              'suffix': null
            }, s);
          },
        peg$c107 = function(sfx) {
            return {
              'suffix': sfx
            };
          },
        peg$c108 = { type: "other", description: "Binary Expression" },
        peg$c109 = function(v, o, e) {
            return {
              'type': 'expression',
              'format': 'binary',
              'variant': 'operation',
              'operation': util.key(o),
              'left': v,
              'right': e
            };
          },
        peg$c110 = function(c) { return util.key(c); },
        peg$c111 = { type: "other", description: "Expression List" },
        peg$c112 = function(f, rest) {
            return util.listify(f, rest);
          },
        peg$c113 = { type: "other", description: "Function Call" },
        peg$c114 = function(n, a) {
            return util.extend({
              'type': 'function',
              'name': n,
              'distinct': false,
              'args': []
            }, a);
          },
        peg$c115 = { type: "other", description: "Function Call Arguments" },
        peg$c116 = function(s) {
            return {
              'distinct': false,
              'args': [{
                'type': 'identifier',
                'variant': 'star',
                'name': s
              }]
            };
          },
        peg$c117 = function(d, e) {
            return {
              'distinct': util.isOkay(d),
              'args': e
            };
          },
        peg$c118 = { type: "other", description: "Error Message" },
        peg$c119 = function(m) { return m; },
        peg$c120 = function(m, s) {
            return util.extend({
              'explain': util.isOkay(m)
            }, m, s);
          },
        peg$c121 = { type: "other", description: "QUERY PLAN" },
        peg$c122 = function(e, q) {
            return util.keyify([e, q]);
          },
        peg$c123 = { type: "other", description: "QUERY PLAN Keyword" },
        peg$c124 = function(q, p) { return util.compose([q, p]); },
        peg$c125 = { type: "other", description: "Transaction" },
        peg$c126 = function(b, s, e) {
            return {
              'type': 'statement',
              'variant': 'transaction',
              'statement': util.isOkay(s) ? s : [],
              'defer': b
            };
          },
        peg$c127 = { type: "other", description: "END Transaction Statement" },
        peg$c128 = function(s, t) {
            return util.keyify([s, t]);
          },
        peg$c129 = { type: "other", description: "BEGIN Transaction Statement" },
        peg$c130 = function(s, m, t) {
            return util.isOkay(m) ? util.key(m) : null;
          },
        peg$c131 = function(m) { return util.key(m); },
        peg$c132 = { type: "other", description: "ROLLBACK Statement" },
        peg$c133 = function(s, n) {
            return {
              'type': 'statement',
              'variant': util.key(s),
              'to': n
            };
          },
        peg$c134 = { type: "other", description: "TO Clause" },
        peg$c135 = function(s) { return util.key(s); },
        peg$c136 = { type: "other", description: "SAVEPOINT Statement" },
        peg$c137 = function(s, n) {
            return {
              'type': 'statement',
              'variant': s,
              'target': n
            };
          },
        peg$c138 = { type: "other", description: "RELEASE Statement" },
        peg$c139 = function(s, a, n) {
            return {
              'type': 'statement',
              'variant': util.key(s),
              'target': n
            };
          },
        peg$c140 = { type: "other", description: "ALTER TABLE Statement" },
        peg$c141 = function(s, n, e) {
            return {
              'type': 'statement',
              'variant': util.key(s)
            };
          },
        peg$c142 = { type: "other", description: "ALTER TABLE Keyword" },
        peg$c143 = function(a, t) { return util.compose([a, t]); },
        peg$c144 = { type: "other", description: "RENAME TO Keyword" },
        peg$c145 = function(s, n) {
            return {
              'action': util.key(s),
              'name': n
            };
          },
        peg$c146 = { type: "other", description: "ADD COLUMN Keyword" },
        peg$c147 = function(s, d) {
            return {
              'action': util.key(s),
              'definition': d
            };
          },
        peg$c148 = function(w, s) { return util.extend(s, w); },
        peg$c149 = { type: "other", description: "WITH Clause" },
        peg$c150 = function(w) {
            return {
              'with': w
            };
          },
        peg$c151 = function(s, v, t) {
            var recursive = {
              'variant': util.isOkay(v) ? 'recursive' : 'common'
            };
            if (util.isArrayOkay(t)) {
              // Add 'recursive' property into each table expression
              t = t.map(function (elem) {
                return util.extend(elem, recursive);
              });
            }
            return t;
          },
        peg$c152 = function(f, r) { return util.listify(f, r); },
        peg$c153 = { type: "other", description: "Common Table Expression" },
        peg$c154 = function(t, s) {
            return util.extend({
              'type': 'expression',
              'format': 'table',
              'variant': 'common',
              'target': t,
              'expression': null
            }, s);
          },
        peg$c155 = function(s) {
            return {
              'expression': s
            };
          },
        peg$c156 = { type: "other", description: "DETACH Statement" },
        peg$c157 = function(d, b, n) {
            return {
              'type': 'statement',
              'variant': util.key(d),
              'target': n
            };
          },
        peg$c158 = { type: "other", description: "VACUUM Statement" },
        peg$c159 = function(v) {
            return {
              'type': 'statement',
              'variant': 'vacuum'
            };
          },
        peg$c160 = { type: "other", description: "ANALYZE Statement" },
        peg$c161 = function(s, a) {
            return {
              'type': 'statement',
              'variant': util.key(s),
              'target': (util.isOkay(a) ? a['name'] : null)
            };
          },
        peg$c162 = { type: "other", description: "REINDEX Statement" },
        peg$c163 = function(a) { return a; },
        peg$c164 = { type: "other", description: "PRAGMA Statement" },
        peg$c165 = function(s, n, v) {
            return {
              'type': 'statement',
              'variant': util.key(s),
              'target': n,
              'args': (util.isOkay(v) ? util.makeArray(v) : [])
            };
          },
        peg$c166 = function(v) { return v; },
        peg$c167 = function(v) { return /^(yes|no|false|true|0|1)$/i.test(v) },
        peg$c168 = function(v) {
            return {
              'type': 'literal',
              'variant': 'boolean',
              'normalized': (/^(yes|true|1)$/i.test(v) ? '1' : '0'),
              'value': v
            };
          },
        peg$c169 = function(n) {
            return {
              'type': 'identifier',
              'variant': 'name',
              'name': n
            };
          },
        peg$c170 = { type: "other", description: "SELECT Statement" },
        peg$c171 = function(s, o, l) {
            return util.extend(s, {
              'order': o,
              'limit': l
            });
          },
        peg$c172 = { type: "other", description: "ORDER BY Clause" },
        peg$c173 = { type: "other", description: "LIMIT Clause" },
        peg$c174 = function(s, e, d) {
            return {
              'start': e,
              'offset': d
            };
          },
        peg$c175 = { type: "other", description: "OFFSET Clause" },
        peg$c176 = function(o, e) { return e; },
        peg$c177 = function(s, u) {
            if (util.isArrayOkay(u)) {
              return {
                'type': 'statement',
                'variant': 'compound',
                'statement': s,
                'compound': u
              };
            } else {
              return s;
            }
          },
        peg$c178 = { type: "other", description: "Union Operation" },
        peg$c179 = function(c, s) {
            return {
              'type': 'compound',
              'variant': c,
              'statement': s
            };
          },
        peg$c180 = function(s, f, w, g) {
            return util.extend({
              'type': 'statement',
              'variant': 'select',
              'from': [],
              'where': w,
              'group': g
            }, s, f);
          },
        peg$c181 = { type: "other", description: "SELECT Results Clause" },
        peg$c182 = function(d, t) {
            return util.extend({
              'result': t,
              'distinct': false,
              'all': false
            }, d);
          },
        peg$c183 = { type: "other", description: "SELECT Results Modifier" },
        peg$c184 = function(s) {
            return {
              'distinct': true
            };
          },
        peg$c185 = function(s) {
            return {
              'all': true
            };
          },
        peg$c186 = { type: "other", description: "FROM Clause" },
        peg$c187 = function(s) {
            return {
              'from': s
            };
          },
        peg$c188 = { type: "other", description: "WHERE Clause" },
        peg$c189 = function(s, e) { return util.makeArray(e); },
        peg$c190 = { type: "other", description: "GROUP BY Clause" },
        peg$c191 = function(s, e, h) {
            return {
              'expression': util.makeArray(e),
              'having': h
            };
          },
        peg$c192 = { type: "other", description: "HAVING Clause" },
        peg$c193 = function(s, e) { return e; },
        peg$c194 = function(q, s) {
            return {
              'type': 'identifier',
              'variant': 'star',
              'name': util.textMerge(q, s)
            };
          },
        peg$c195 = function(n, s) { return util.textMerge(n, s); },
        peg$c196 = function(e, a) {
            return util.extend(e, {
              'alias': a
            });
          },
        peg$c197 = function(f, t) { return util.listify(f, t); },
        peg$c198 = { type: "other", description: "Qualified Table" },
        peg$c199 = function(d, i) {
            return util.extend(d, i);
          },
        peg$c200 = { type: "other", description: "Qualified Table Identifier" },
        peg$c201 = function(n, a) {
            return util.extend(n, {
              'alias': a
            });
          },
        peg$c202 = { type: "other", description: "Qualfied Table Index" },
        peg$c203 = function(i) {
            return {
              'index': i
            };
          },
        peg$c204 = function(s, n) { return n; },
        peg$c205 = function() { return null; },
        peg$c206 = { type: "other", description: "SELECT Source" },
        peg$c207 = function(l) { return l; },
        peg$c208 = { type: "other", description: "Subquery" },
        peg$c209 = function(s, a) {
            return util.extend({
              'alias': a
            }, s);
          },
        peg$c210 = { type: "other", description: "Alias" },
        peg$c211 = function(a, n) { return n; },
        peg$c212 = function(t, j) {
            return {
              'type': 'map',
              'variant': 'join',
              'source': t,
              'map': j
            };
          },
        peg$c213 = { type: "other", description: "JOIN Operation" },
        peg$c214 = function(o, n, c) {
            return {
              'type': 'join',
              'variant': util.key(o),
              'source': n,
              'constraint': c
            };
          },
        peg$c215 = { type: "other", description: "JOIN Operator" },
        peg$c216 = function(n, t, j) { return util.compose([n, t, j]); },
        peg$c217 = function(t, o) { return util.compose([t, o]); },
        peg$c218 = function(t) { return util.textNode(t); },
        peg$c219 = { type: "other", description: "JOIN Constraint" },
        peg$c220 = function(c) {
            return util.extend({
              'type': 'constraint',
              'variant': 'join'
            }, c);
          },
        peg$c221 = { type: "other", description: "Join ON Clause" },
        peg$c222 = function(s, e) {
            return {
              'format': util.key(s),
              'on': e
            };
          },
        peg$c223 = { type: "other", description: "Join USING Clause" },
        peg$c224 = function(s, e) {
            return {
              'format': util.key(s),
              'using': e
            };
          },
        peg$c225 = { type: "other", description: "VALUES Clause" },
        peg$c226 = function(s, l) {
            return {
              'type': 'statement',
              'variant': 'select',
              'result': l,
              'from': null,
              'where': null,
              'group': null
            };
          },
        peg$c227 = function(f, b) {
            return util.listify(f, b);
          },
        peg$c228 = function(i) { return i; },
        peg$c229 = { type: "other", description: "Ordering Expression" },
        peg$c230 = function(e, c, d) {
            return {
              'direction': util.textNode(d) /*|| 'ASC'*/,
              'expression': e,
              'collate': c
            };
          },
        peg$c231 = { type: "other", description: "Ordering Direction" },
        peg$c232 = { type: "other", description: "Star" },
        peg$c233 = { type: "other", description: "Fallback Type" },
        peg$c234 = function(k) { return k; },
        peg$c235 = { type: "other", description: "INSERT Statement" },
        peg$c236 = function(k, t) {
            return util.extend({
              'type': 'statement',
              'variant': 'insert',
              'into': null,
              'action': null,
              'or': null,
              'result': []
            }, k, t);
          },
        peg$c237 = { type: "other", description: "INSERT Keyword" },
        peg$c238 = function(a, m) {
            return util.extend({
              'action': util.key(a)
            }, m);
          },
        peg$c239 = { type: "other", description: "REPLACE Keyword" },
        peg$c240 = function(a) {
            return {
              'action': util.key(a)
            };
          },
        peg$c241 = { type: "other", description: "INSERT OR Modifier" },
        peg$c242 = function(s, m) {
            return {
              'or': util.key(m)
            };
          },
        peg$c243 = function(i, r) {
            return util.extend({
              'into': i
            }, r);
          },
        peg$c244 = { type: "other", description: "INTO Clause" },
        peg$c245 = function(s, t) {
            return t;
          },
        peg$c246 = { type: "other", description: "INTO Keyword" },
        peg$c247 = function(r) {
            return {
              'result': r
            };
          },
        peg$c248 = { type: "other", description: "Column List" },
        peg$c249 = function(f, b) {
            return {
              'columns': util.listify(f, b)
            };
          },
        peg$c250 = function(c) { return c; },
        peg$c251 = { type: "other", description: "Column Name" },
        peg$c252 = function(n) {
            return {
              'type': 'identifier',
              'variant': 'column',
              'name': n
            };
          },
        peg$c253 = function(s, r) { return r; },
        peg$c254 = { type: "other", description: "VALUES Keyword" },
        peg$c255 = { type: "other", description: "Insert Values List" },
        peg$c256 = function(e) {
            return {
              'type': 'values',
              'variant': 'list',
              'values': e
            };
          },
        peg$c257 = { type: "other", description: "DEFAULT VALUES Clause" },
        peg$c258 = function(d, v) {
            return {
              'type': 'values',
              'variant': 'default',
              'values': null
            };
          },
        peg$c259 = { type: "other", description: "Compound Operator" },
        peg$c260 = { type: "other", description: "UNION Operator" },
        peg$c261 = function(s, a) { return util.compose([s, a]); },
        peg$c262 = { type: "other", description: "UPDATE Statement" },
        peg$c263 = function(s, f, t, u, w, o, l) {
            return util.extend({
              'type': 'statement',
              'variant': s,
              'into': t,
              'where': w,
              'set': [],
              'order': o,
              'limit': l
            }, f, u);
          },
        peg$c264 = { type: "other", description: "UPDATE Keyword" },
        peg$c265 = { type: "other", description: "UPDATE OR Modifier" },
        peg$c266 = function(t) {
            return {
              'or': util.key(t)
            };
          },
        peg$c267 = { type: "other", description: "SET Clause" },
        peg$c268 = function(c) {
            return {
              'set': c
            };
          },
        peg$c269 = { type: "other", description: "Column Assignment" },
        peg$c270 = function(f, e) {
            return {
              'type': 'assignment',
              'target': f,
              'value': e
            };
          },
        peg$c271 = { type: "other", description: "DELETE Statement" },
        peg$c272 = function(s, t, w, o, l) {
            return {
              'type': 'statement',
              'variant': s,
              'from': t,
              'where': w,
              'order': o,
              'limit': l
            };
          },
        peg$c273 = { type: "other", description: "DELETE Keyword" },
        peg$c274 = { type: "other", description: "CREATE Statement" },
        peg$c275 = { type: "other", description: "CREATE TABLE Statement" },
        peg$c276 = function(s, ne, id, r) {
            return util.extend({
              'type': 'statement',
              'name': id,
              'condition': util.makeArray(ne),
              'optimization': null,
              'definition': []
            }, s, r);
          },
        peg$c277 = function(s, tmp, t) {
            return {
              'temporary': util.isOkay(tmp),
              'variant': s,
              'format': util.key(t)
            };
          },
        peg$c278 = { type: "other", description: "IF NOT EXISTS Modifier" },
        peg$c279 = function(i, n, e) {
            return {
              'type': 'condition',
              'condition': util.keyify([i, n, e])
            };
          },
        peg$c280 = { type: "other", description: "Table Definition" },
        peg$c281 = function(s, t, r) {
            return {
              'definition': util.listify(s, t),
              'optimization': util.makeArray(r)
            };
          },
        peg$c282 = function(r, w) {
            return {
              'type': 'optimization',
              'value': util.keyify([r, w])
            };
          },
        peg$c283 = function(f) { return f; },
        peg$c284 = { type: "other", description: "Column Definition" },
        peg$c285 = function(n, t, c) {
            return util.extend({
              'type': 'definition',
              'variant': 'column',
              'name': n,
              'definition': (util.isOkay(c) ? c : []),
              'datatype': null
            }, t);
          },
        peg$c286 = { type: "other", description: "Column Datatype" },
        peg$c287 = function(t) {
            return {
              'datatype': t
            };
          },
        peg$c288 = { type: "other", description: "Column Constraint" },
        peg$c289 = function(n, c) {
            return util.extend({
              'name': n
            }, c);
          },
        peg$c290 = { type: "other", description: "Column Constraint Name" },
        peg$c291 = { type: "other", description: "FOREIGN KEY Column Constraint" },
        peg$c292 = function(f) {
            return util.extend({
              'variant': 'foreign key'
            }, f);
          },
        peg$c293 = { type: "other", description: "PRIMARY KEY Column Constraint" },
        peg$c294 = function(p, d, c, a) {
            return util.extend(p, c, d, a);
          },
        peg$c295 = { type: "other", description: "PRIMARY KEY Keyword" },
        peg$c296 = function(s, k) {
            return {
              'type': 'constraint',
              'variant': util.keyify([s, k]),
              'conflict': null,
              'direction': null,
              'modififer': null,
              'autoIncrement': false
            };
          },
        peg$c297 = function(d) {
            return {
              'direction': util.key(d)
            };
          },
        peg$c298 = { type: "other", description: "AUTOINCREMENT Keyword" },
        peg$c299 = function(a) {
            return {
              'autoIncrement': true
            };
          },
        peg$c300 = function(s, c) {
            return util.extend({
              'type': 'constraint',
              'variant': s,
              'conflict': null
            }, c);
          },
        peg$c301 = { type: "other", description: "UNIQUE Column Constraint" },
        peg$c302 = { type: "other", description: "NULL Column Constraint" },
        peg$c303 = function(n, l) { return util.compose([n, l]); },
        peg$c304 = { type: "other", description: "CHECK Column Constraint" },
        peg$c305 = { type: "other", description: "DEFAULT Column Constraint" },
        peg$c306 = function(s, v) {
            return {
              'type': 'constraint',
              'variant': util.key(s),
              'value': v
            };
          },
        peg$c307 = { type: "other", description: "DEFAULT Column Value" },
        peg$c308 = { type: "other", description: "COLLATE Column Constraint" },
        peg$c309 = function(c) {
            return {
              'type': 'constraint',
              'variant': 'collate',
              'collate': c
            };
          },
        peg$c310 = { type: "other", description: "Table Constraint" },
        peg$c311 = function(n, c) {
            return util.extend({
              'type': 'definition',
              'variant': 'constraint',
              'name': n,
              'definition': null
            }, c);
          },
        peg$c312 = { type: "other", description: "Table Constraint Name" },
        peg$c313 = { type: "other", description: "CHECK Table Constraint" },
        peg$c314 = function(c) {
            return {
              'definition': util.makeArray(c)
            };
          },
        peg$c315 = { type: "other", description: "PRIMARY KEY Table Constraint" },
        peg$c316 = function(k, c, t) {
            return {
              'definition': util.makeArray(util.extend(k, t)),
              'columns': c
            };
          },
        peg$c317 = function(s) {
            return {
              'type': 'constraint',
              'variant': util.key(s),
              'conflict': null
            };
          },
        peg$c318 = function(p, k) { return util.compose([p, k]); },
        peg$c319 = { type: "other", description: "UNIQUE Keyword" },
        peg$c320 = function(u) { return util.textNode(u); },
        peg$c321 = { type: "other", description: "PRIMARY KEY Columns" },
        peg$c322 = { type: "other", description: "Indexed Column" },
        peg$c323 = function(e, c, d) {
            return {
              'type': 'identifier',
              'variant': 'column',
              'format': 'indexed',
              'direction': d,
              'name': e,
              'collate': c
            };
          },
        peg$c324 = { type: "other", description: "Column Collation" },
        peg$c325 = { type: "other", description: "Column Direction" },
        peg$c326 = function(s, t) {
            return {
              'conflict': util.key(t)
            };
          },
        peg$c327 = { type: "other", description: "ON CONFLICT Keyword" },
        peg$c328 = function(o, c) { return util.keyify([o, c]); },
        peg$c329 = function(k, c) {
            return {
              'type': 'constraint',
              'variant': util.key(k),
              'expression': c
            };
          },
        peg$c330 = { type: "other", description: "FOREIGN KEY Table Constraint" },
        peg$c331 = function(k, l, c) {
            return util.extend({
              'definition': util.makeArray(util.extend(k, c)),
              'columns': null
            }, l);
          },
        peg$c332 = { type: "other", description: "FOREIGN KEY Keyword" },
        peg$c333 = function(f, k) {
            return {
              'type': 'constraint',
              'variant': util.keyify([f, k]),
              'action': null,
              'defer': null,
              'references': null
            };
          },
        peg$c334 = function(r, a, d) {
            return util.extend({
              'type': 'constraint',
              'action': a,
              'defer': d
            }, r);
          },
        peg$c335 = { type: "other", description: "REFERENCES Clause" },
        peg$c336 = function(s, t) {
            return {
              'references': t
            };
          },
        peg$c337 = function(f, b) { return util.collect([f, b], []); },
        peg$c338 = { type: "other", description: "FOREIGN KEY Action Clause" },
        peg$c339 = function(m, a, n) {
            return {
              'type': 'action',
              'variant': util.key(m),
              'action': util.key(n)
            };
          },
        peg$c340 = { type: "other", description: "FOREIGN KEY Action" },
        peg$c341 = function(s, v) { return util.compose([s, v]); },
        peg$c342 = function(c) { return util.textNode(c); },
        peg$c343 = function(n, a) { return util.compose([n, a]); },
        peg$c344 = function(m, n) {
            return {
              'type': 'action',
              'variant': util.key(m),
              'action': n
            };
          },
        peg$c345 = { type: "other", description: "DEFERRABLE Clause" },
        peg$c346 = function(n, d, i) { return util.keyify([n, d, i]); },
        peg$c347 = function(i, d) { return util.compose([i, d]); },
        peg$c348 = function(s) {
            return {
              'definition': util.makeArray(s)
            };
          },
        peg$c349 = { type: "other", description: "CREATE INDEX Statement" },
        peg$c350 = function(s, ne, n, o, w) {
            return util.extend({
              'type': 'statement',
              'target': n,
              'where': w,
              'on': o,
              'condition': util.makeArray(ne),
              'unique': false
            }, s);
          },
        peg$c351 = function(s, u, i) {
            return util.extend({
              'variant': util.key(s),
              'format': util.key(i)
            }, u);
          },
        peg$c352 = function(u) {
            return {
              'unique': true
            };
          },
        peg$c353 = { type: "other", description: "ON Clause" },
        peg$c354 = function(o, t, c) {
            return {
              'target': t,
              'columns': c
            };
          },
        peg$c355 = { type: "other", description: "CREATE TRIGGER Statement" },
        peg$c356 = function(s, ne, n, cd, o, me, wh, a) {
            return util.extend({
              'type': 'statement',
              'when': wh,
              'target': n,
              'on': o,
              'condition': util.makeArray(ne),
              'event': cd,
              'by': (util.isOkay(me) ? me : 'row'),
              'action': util.makeArray(a)
            }, s);
          },
        peg$c357 = function(s, p, t) {
            return {
              'temporary': util.isOkay(p),
              'variant': util.key(s),
              'format': util.key(t)
            };
          },
        peg$c358 = { type: "other", description: "Conditional Clause" },
        peg$c359 = function(m, d) {
            return util.extend({
              'type': 'event',
              'occurs': null
            }, m, d);
          },
        peg$c360 = function(m) {
            return {
              'occurs': util.key(m)
            };
          },
        peg$c361 = function(i, o) { return util.compose([i, o]); },
        peg$c362 = { type: "other", description: "Conditional Action" },
        peg$c363 = function(o) {
            return {
              'event': util.key(o)
            };
          },
        peg$c364 = function(s, f) {
            return {
              'event': util.key(s),
              'of': f
            };
          },
        peg$c365 = function(s, c) { return c; },
        peg$c366 = "statement",
        peg$c367 = { type: "literal", value: "STATEMENT", description: "\"STATEMENT\"" },
        peg$c368 = function(f, e, r) { return util.key(r); },
        peg$c369 = function(w, e) { return e; },
        peg$c370 = { type: "other", description: "Actions Clause" },
        peg$c371 = function(s, a, e) { return a; },
        peg$c372 = { type: "other", description: "CREATE VIEW Statement" },
        peg$c373 = function(s, ne, n, r) {
            return util.extend({
              'type': 'statement',
              'condition': util.makeArray(ne),
              'target': n,
              'result': r
            }, s);
          },
        peg$c374 = function(s, p, v) {
            return {
              'temporary': util.isOkay(p),
              'variant': util.key(s),
              'format': util.key(v)
            };
          },
        peg$c375 = { type: "other", description: "CREATE VIRTUAL TABLE Statement" },
        peg$c376 = function(s, ne, n, m) {
            return util.extend({
              'type': 'statement',
              'condition': util.makeArray(ne),
              'target': n,
              'result': m
            }, s);
          },
        peg$c377 = function(s, v, t) {
            return {
              'variant': util.key(s),
              'format': util.key(v)
            };
          },
        peg$c378 = function(m, a) {
            return util.extend({
              'type': 'module',
              'name': m,
              'args': []
            }, a);
          },
        peg$c379 = { type: "other", description: "Module Arguments" },
        peg$c380 = function(f) {
            return {
              'args': f
            };
          },
        peg$c381 = { type: "other", description: "DROP Statement" },
        peg$c382 = function(s, q) {
            /**
             * @note Manually copy in the correct variant for the target
             */
            return util.extend({
              'type': 'statement',
              'target': util.extend(q, {
                          'variant': s['format']
                        })
            }, s);
          },
        peg$c383 = { type: "other", description: "DROP Keyword" },
        peg$c384 = function(s, t, i) {
             return util.extend({
               'variant': util.key(s),
               'format': t,
               'condition': []
             }, i);
          },
        peg$c385 = { type: "other", description: "DROP Type" },
        peg$c386 = function(c) {
            return {
              'condition': util.makeArray(c)
            };
          },
        peg$c387 = { type: "other", description: "IF EXISTS Keyword" },
        peg$c388 = function(i, e) {
            return {
              'type': 'condition',
              'condition': util.keyify([i, e])
            };
          },
        peg$c389 = { type: "other", description: "Unary Operator" },
        peg$c390 = { type: "other", description: "Binary Operator" },
        peg$c391 = function(o) { return util.key(o); },
        peg$c392 = { type: "other", description: "Or" },
        peg$c393 = { type: "other", description: "Add" },
        peg$c394 = { type: "other", description: "Subtract" },
        peg$c395 = { type: "other", description: "Multiply" },
        peg$c396 = { type: "other", description: "Modulo" },
        peg$c397 = { type: "other", description: "Shift Left" },
        peg$c398 = { type: "other", description: "Shift Right" },
        peg$c399 = { type: "other", description: "Logical AND" },
        peg$c400 = { type: "other", description: "Logical OR" },
        peg$c401 = { type: "other", description: "Less Than" },
        peg$c402 = { type: "other", description: "Greater Than" },
        peg$c403 = { type: "other", description: "Less Than Or Equal" },
        peg$c404 = { type: "other", description: "Greater Than Or Equal" },
        peg$c405 = { type: "other", description: "Equal" },
        peg$c406 = { type: "other", description: "Not Equal" },
        peg$c407 = { type: "other", description: "IS" },
        peg$c408 = { type: "other", description: "Database Identifier" },
        peg$c409 = function(n) {
            return {
              'type': 'identifier',
              'variant': 'database',
              'name': n
            };
          },
        peg$c410 = { type: "other", description: "Table Identifier" },
        peg$c411 = function(d, n) {
            return {
              'type': 'identifier',
              'variant': 'table',
              'name': util.textMerge(d, n)
            };
          },
        peg$c412 = function(n, d) { return util.textMerge(n, d); },
        peg$c413 = { type: "other", description: "Column Identifier" },
        peg$c414 = function(q, n) {
            return {
              'type': 'identifier',
              'variant': 'column',
              'name': util.textMerge(q, n)
            };
          },
        peg$c415 = function() { return ''; },
        peg$c416 = function(d, t) { return util.textMerge(d, t); },
        peg$c417 = { type: "other", description: "Collation Identifier" },
        peg$c418 = function(n) {
            return {
              'type': 'identifier',
              'variant': 'collation',
              'name': n
            };
          },
        peg$c419 = { type: "other", description: "Savepoint Indentifier" },
        peg$c420 = function(n) {
            return {
              'type': 'identifier',
              'variant': 'savepoint',
              'name': n
            };
          },
        peg$c421 = { type: "other", description: "Index Identifier" },
        peg$c422 = function(d, n) {
            return {
              'type': 'identifier',
              'variant': 'index',
              'name': util.textMerge(d, n)
            };
          },
        peg$c423 = { type: "other", description: "Trigger Identifier" },
        peg$c424 = function(d, n) {
            return {
              'type': 'identifier',
              'variant': 'trigger',
              'name': util.textMerge(d, n)
            };
          },
        peg$c425 = { type: "other", description: "View Identifier" },
        peg$c426 = function(d, n) {
            return {
              'type': 'identifier',
              'variant': 'view',
              'name': util.textMerge(d, n)
            };
          },
        peg$c427 = { type: "other", description: "Pragma Identifier" },
        peg$c428 = function(d, n) {
            return {
              'type': 'identifier',
              'variant': 'pragma',
              'name': util.textMerge(d, n)
            };
          },
        peg$c429 = { type: "other", description: "CTE Identifier" },
        peg$c430 = function(n, a) {
            return util.extend({
              'type': 'identifier',
              'variant': 'expression',
              'format': 'table',
              'name': n,
              'columns': []
            }, a);
          },
        peg$c431 = { type: "other", description: "Table Constraint Identifier" },
        peg$c432 = function(n) {
            return {
              'type': 'identifier',
              'variant': 'constraint',
              'format': 'table',
              'name': n
            };
          },
        peg$c433 = { type: "other", description: "Column Constraint Identifier" },
        peg$c434 = function(n) {
            return {
              'type': 'identifier',
              'variant': 'constraint',
              'format': 'column',
              'name': n
            };
          },
        peg$c435 = { type: "other", description: "Datatype Name" },
        peg$c436 = function(t) { return [t, 'text']; },
        peg$c437 = function(t) { return [t, 'real']; },
        peg$c438 = function(t) { return [t, 'numeric']; },
        peg$c439 = function(t) { return [t, 'integer']; },
        peg$c440 = function(t) { return [t, 'none']; },
        peg$c441 = { type: "other", description: "TEXT Datatype Name" },
        peg$c442 = "n",
        peg$c443 = { type: "literal", value: "N", description: "\"N\"" },
        peg$c444 = "var",
        peg$c445 = { type: "literal", value: "VAR", description: "\"VAR\"" },
        peg$c446 = "char",
        peg$c447 = { type: "literal", value: "CHAR", description: "\"CHAR\"" },
        peg$c448 = "tiny",
        peg$c449 = { type: "literal", value: "TINY", description: "\"TINY\"" },
        peg$c450 = "medium",
        peg$c451 = { type: "literal", value: "MEDIUM", description: "\"MEDIUM\"" },
        peg$c452 = "long",
        peg$c453 = { type: "literal", value: "LONG", description: "\"LONG\"" },
        peg$c454 = "text",
        peg$c455 = { type: "literal", value: "TEXT", description: "\"TEXT\"" },
        peg$c456 = "clob",
        peg$c457 = { type: "literal", value: "CLOB", description: "\"CLOB\"" },
        peg$c458 = { type: "other", description: "REAL Datatype Name" },
        peg$c459 = "float",
        peg$c460 = { type: "literal", value: "FLOAT", description: "\"FLOAT\"" },
        peg$c461 = "real",
        peg$c462 = { type: "literal", value: "REAL", description: "\"REAL\"" },
        peg$c463 = { type: "other", description: "DOUBLE Datatype Name" },
        peg$c464 = "double",
        peg$c465 = { type: "literal", value: "DOUBLE", description: "\"DOUBLE\"" },
        peg$c466 = function(d, p) { return util.compose([d, p]); },
        peg$c467 = "precision",
        peg$c468 = { type: "literal", value: "PRECISION", description: "\"PRECISION\"" },
        peg$c469 = function(p) { return p; },
        peg$c470 = { type: "other", description: "NUMERIC Datatype Name" },
        peg$c471 = "numeric",
        peg$c472 = { type: "literal", value: "NUMERIC", description: "\"NUMERIC\"" },
        peg$c473 = "decimal",
        peg$c474 = { type: "literal", value: "DECIMAL", description: "\"DECIMAL\"" },
        peg$c475 = "boolean",
        peg$c476 = { type: "literal", value: "BOOLEAN", description: "\"BOOLEAN\"" },
        peg$c477 = "date",
        peg$c478 = { type: "literal", value: "DATE", description: "\"DATE\"" },
        peg$c479 = "time",
        peg$c480 = { type: "literal", value: "TIME", description: "\"TIME\"" },
        peg$c481 = "stamp",
        peg$c482 = { type: "literal", value: "STAMP", description: "\"STAMP\"" },
        peg$c483 = { type: "other", description: "INTEGER Datatype Name" },
        peg$c484 = "int",
        peg$c485 = { type: "literal", value: "INT", description: "\"INT\"" },
        peg$c486 = "2",
        peg$c487 = { type: "literal", value: "2", description: "\"2\"" },
        peg$c488 = "4",
        peg$c489 = { type: "literal", value: "4", description: "\"4\"" },
        peg$c490 = "8",
        peg$c491 = { type: "literal", value: "8", description: "\"8\"" },
        peg$c492 = "eger",
        peg$c493 = { type: "literal", value: "EGER", description: "\"EGER\"" },
        peg$c494 = "big",
        peg$c495 = { type: "literal", value: "BIG", description: "\"BIG\"" },
        peg$c496 = "small",
        peg$c497 = { type: "literal", value: "SMALL", description: "\"SMALL\"" },
        peg$c498 = { type: "other", description: "BLOB Datatype Name" },
        peg$c499 = "blob",
        peg$c500 = { type: "literal", value: "BLOB", description: "\"BLOB\"" },
        peg$c501 = /^[a-z0-9$_]/i,
        peg$c502 = { type: "class", value: "[a-z0-9\\$\\_]i", description: "[a-z0-9\\$\\_]i" },
        peg$c503 = function(r) { return util.textNode(r); },
        peg$c504 = function(n) { return util.key(n); },
        peg$c505 = "]",
        peg$c506 = { type: "literal", value: "]", description: "\"]\"" },
        peg$c507 = /^[^\]]/,
        peg$c508 = { type: "class", value: "[^\\]]", description: "[^\\]]" },
        peg$c509 = "\"",
        peg$c510 = { type: "literal", value: "\"", description: "\"\\\"\"" },
        peg$c511 = function(n) { return util.unescape(n, '"'); },
        peg$c512 = "\"\"",
        peg$c513 = { type: "literal", value: "\"\"", description: "\"\\\"\\\"\"" },
        peg$c514 = /^[^"]/,
        peg$c515 = { type: "class", value: "[^\\\"]", description: "[^\\\"]" },
        peg$c516 = "'",
        peg$c517 = { type: "literal", value: "'", description: "\"'\"" },
        peg$c518 = function(n) { return util.unescape(n, "'"); },
        peg$c519 = "`",
        peg$c520 = { type: "literal", value: "`", description: "\"`\"" },
        peg$c521 = function(n) { return util.unescape(n, '`'); },
        peg$c522 = "``",
        peg$c523 = { type: "literal", value: "``", description: "\"``\"" },
        peg$c524 = /^[^`]/,
        peg$c525 = { type: "class", value: "[^\\`]", description: "[^\\`]" },
        peg$c526 = { type: "other", description: "Open Bracket" },
        peg$c527 = "[",
        peg$c528 = { type: "literal", value: "[", description: "\"[\"" },
        peg$c529 = { type: "other", description: "Close Bracket" },
        peg$c530 = { type: "other", description: "Open Parenthesis" },
        peg$c531 = "(",
        peg$c532 = { type: "literal", value: "(", description: "\"(\"" },
        peg$c533 = { type: "other", description: "Close Parenthesis" },
        peg$c534 = ")",
        peg$c535 = { type: "literal", value: ")", description: "\")\"" },
        peg$c536 = { type: "other", description: "Comma" },
        peg$c537 = ",",
        peg$c538 = { type: "literal", value: ",", description: "\",\"" },
        peg$c539 = { type: "other", description: "Period" },
        peg$c540 = ".",
        peg$c541 = { type: "literal", value: ".", description: "\".\"" },
        peg$c542 = { type: "other", description: "Asterisk" },
        peg$c543 = "*",
        peg$c544 = { type: "literal", value: "*", description: "\"*\"" },
        peg$c545 = { type: "other", description: "Question Mark" },
        peg$c546 = "?",
        peg$c547 = { type: "literal", value: "?", description: "\"?\"" },
        peg$c548 = { type: "other", description: "Single Quote" },
        peg$c549 = { type: "other", description: "Double Quote" },
        peg$c550 = { type: "other", description: "Backtick" },
        peg$c551 = { type: "other", description: "Tilde" },
        peg$c552 = "~",
        peg$c553 = { type: "literal", value: "~", description: "\"~\"" },
        peg$c554 = { type: "other", description: "Plus" },
        peg$c555 = "+",
        peg$c556 = { type: "literal", value: "+", description: "\"+\"" },
        peg$c557 = { type: "other", description: "Minus" },
        peg$c558 = "-",
        peg$c559 = { type: "literal", value: "-", description: "\"-\"" },
        peg$c560 = "=",
        peg$c561 = { type: "literal", value: "=", description: "\"=\"" },
        peg$c562 = { type: "other", description: "Ampersand" },
        peg$c563 = "&",
        peg$c564 = { type: "literal", value: "&", description: "\"&\"" },
        peg$c565 = { type: "other", description: "Pipe" },
        peg$c566 = "|",
        peg$c567 = { type: "literal", value: "|", description: "\"|\"" },
        peg$c568 = "%",
        peg$c569 = { type: "literal", value: "%", description: "\"%\"" },
        peg$c570 = "<",
        peg$c571 = { type: "literal", value: "<", description: "\"<\"" },
        peg$c572 = ">",
        peg$c573 = { type: "literal", value: ">", description: "\">\"" },
        peg$c574 = { type: "other", description: "Exclamation" },
        peg$c575 = "!",
        peg$c576 = { type: "literal", value: "!", description: "\"!\"" },
        peg$c577 = { type: "other", description: "Semicolon" },
        peg$c578 = ";",
        peg$c579 = { type: "literal", value: ";", description: "\";\"" },
        peg$c580 = { type: "other", description: "Colon" },
        peg$c581 = { type: "other", description: "Forward Slash" },
        peg$c582 = "/",
        peg$c583 = { type: "literal", value: "/", description: "\"/\"" },
        peg$c584 = { type: "other", description: "Backslash" },
        peg$c585 = "\\",
        peg$c586 = { type: "literal", value: "\\", description: "\"\\\\\"" },
        peg$c587 = "abort",
        peg$c588 = { type: "literal", value: "ABORT", description: "\"ABORT\"" },
        peg$c589 = "action",
        peg$c590 = { type: "literal", value: "ACTION", description: "\"ACTION\"" },
        peg$c591 = "add",
        peg$c592 = { type: "literal", value: "ADD", description: "\"ADD\"" },
        peg$c593 = "after",
        peg$c594 = { type: "literal", value: "AFTER", description: "\"AFTER\"" },
        peg$c595 = "all",
        peg$c596 = { type: "literal", value: "ALL", description: "\"ALL\"" },
        peg$c597 = "alter",
        peg$c598 = { type: "literal", value: "ALTER", description: "\"ALTER\"" },
        peg$c599 = "analyze",
        peg$c600 = { type: "literal", value: "ANALYZE", description: "\"ANALYZE\"" },
        peg$c601 = "and",
        peg$c602 = { type: "literal", value: "AND", description: "\"AND\"" },
        peg$c603 = "as",
        peg$c604 = { type: "literal", value: "AS", description: "\"AS\"" },
        peg$c605 = "asc",
        peg$c606 = { type: "literal", value: "ASC", description: "\"ASC\"" },
        peg$c607 = "attach",
        peg$c608 = { type: "literal", value: "ATTACH", description: "\"ATTACH\"" },
        peg$c609 = "autoincrement",
        peg$c610 = { type: "literal", value: "AUTOINCREMENT", description: "\"AUTOINCREMENT\"" },
        peg$c611 = "before",
        peg$c612 = { type: "literal", value: "BEFORE", description: "\"BEFORE\"" },
        peg$c613 = "begin",
        peg$c614 = { type: "literal", value: "BEGIN", description: "\"BEGIN\"" },
        peg$c615 = "between",
        peg$c616 = { type: "literal", value: "BETWEEN", description: "\"BETWEEN\"" },
        peg$c617 = "by",
        peg$c618 = { type: "literal", value: "BY", description: "\"BY\"" },
        peg$c619 = "cascade",
        peg$c620 = { type: "literal", value: "CASCADE", description: "\"CASCADE\"" },
        peg$c621 = "case",
        peg$c622 = { type: "literal", value: "CASE", description: "\"CASE\"" },
        peg$c623 = "cast",
        peg$c624 = { type: "literal", value: "CAST", description: "\"CAST\"" },
        peg$c625 = "check",
        peg$c626 = { type: "literal", value: "CHECK", description: "\"CHECK\"" },
        peg$c627 = "collate",
        peg$c628 = { type: "literal", value: "COLLATE", description: "\"COLLATE\"" },
        peg$c629 = "column",
        peg$c630 = { type: "literal", value: "COLUMN", description: "\"COLUMN\"" },
        peg$c631 = "commit",
        peg$c632 = { type: "literal", value: "COMMIT", description: "\"COMMIT\"" },
        peg$c633 = "conflict",
        peg$c634 = { type: "literal", value: "CONFLICT", description: "\"CONFLICT\"" },
        peg$c635 = "constraint",
        peg$c636 = { type: "literal", value: "CONSTRAINT", description: "\"CONSTRAINT\"" },
        peg$c637 = "create",
        peg$c638 = { type: "literal", value: "CREATE", description: "\"CREATE\"" },
        peg$c639 = "cross",
        peg$c640 = { type: "literal", value: "CROSS", description: "\"CROSS\"" },
        peg$c641 = "current_date",
        peg$c642 = { type: "literal", value: "CURRENT_DATE", description: "\"CURRENT_DATE\"" },
        peg$c643 = "current_time",
        peg$c644 = { type: "literal", value: "CURRENT_TIME", description: "\"CURRENT_TIME\"" },
        peg$c645 = "current_timestamp",
        peg$c646 = { type: "literal", value: "CURRENT_TIMESTAMP", description: "\"CURRENT_TIMESTAMP\"" },
        peg$c647 = "database",
        peg$c648 = { type: "literal", value: "DATABASE", description: "\"DATABASE\"" },
        peg$c649 = "default",
        peg$c650 = { type: "literal", value: "DEFAULT", description: "\"DEFAULT\"" },
        peg$c651 = "deferrable",
        peg$c652 = { type: "literal", value: "DEFERRABLE", description: "\"DEFERRABLE\"" },
        peg$c653 = "deferred",
        peg$c654 = { type: "literal", value: "DEFERRED", description: "\"DEFERRED\"" },
        peg$c655 = "delete",
        peg$c656 = { type: "literal", value: "DELETE", description: "\"DELETE\"" },
        peg$c657 = "desc",
        peg$c658 = { type: "literal", value: "DESC", description: "\"DESC\"" },
        peg$c659 = "detach",
        peg$c660 = { type: "literal", value: "DETACH", description: "\"DETACH\"" },
        peg$c661 = "distinct",
        peg$c662 = { type: "literal", value: "DISTINCT", description: "\"DISTINCT\"" },
        peg$c663 = "drop",
        peg$c664 = { type: "literal", value: "DROP", description: "\"DROP\"" },
        peg$c665 = "each",
        peg$c666 = { type: "literal", value: "EACH", description: "\"EACH\"" },
        peg$c667 = "else",
        peg$c668 = { type: "literal", value: "ELSE", description: "\"ELSE\"" },
        peg$c669 = "end",
        peg$c670 = { type: "literal", value: "END", description: "\"END\"" },
        peg$c671 = "escape",
        peg$c672 = { type: "literal", value: "ESCAPE", description: "\"ESCAPE\"" },
        peg$c673 = "except",
        peg$c674 = { type: "literal", value: "EXCEPT", description: "\"EXCEPT\"" },
        peg$c675 = "exclusive",
        peg$c676 = { type: "literal", value: "EXCLUSIVE", description: "\"EXCLUSIVE\"" },
        peg$c677 = "exists",
        peg$c678 = { type: "literal", value: "EXISTS", description: "\"EXISTS\"" },
        peg$c679 = "explain",
        peg$c680 = { type: "literal", value: "EXPLAIN", description: "\"EXPLAIN\"" },
        peg$c681 = "fail",
        peg$c682 = { type: "literal", value: "FAIL", description: "\"FAIL\"" },
        peg$c683 = "for",
        peg$c684 = { type: "literal", value: "FOR", description: "\"FOR\"" },
        peg$c685 = "foreign",
        peg$c686 = { type: "literal", value: "FOREIGN", description: "\"FOREIGN\"" },
        peg$c687 = "from",
        peg$c688 = { type: "literal", value: "FROM", description: "\"FROM\"" },
        peg$c689 = "full",
        peg$c690 = { type: "literal", value: "FULL", description: "\"FULL\"" },
        peg$c691 = "glob",
        peg$c692 = { type: "literal", value: "GLOB", description: "\"GLOB\"" },
        peg$c693 = "group",
        peg$c694 = { type: "literal", value: "GROUP", description: "\"GROUP\"" },
        peg$c695 = "having",
        peg$c696 = { type: "literal", value: "HAVING", description: "\"HAVING\"" },
        peg$c697 = "if",
        peg$c698 = { type: "literal", value: "IF", description: "\"IF\"" },
        peg$c699 = "ignore",
        peg$c700 = { type: "literal", value: "IGNORE", description: "\"IGNORE\"" },
        peg$c701 = "immediate",
        peg$c702 = { type: "literal", value: "IMMEDIATE", description: "\"IMMEDIATE\"" },
        peg$c703 = "in",
        peg$c704 = { type: "literal", value: "IN", description: "\"IN\"" },
        peg$c705 = "index",
        peg$c706 = { type: "literal", value: "INDEX", description: "\"INDEX\"" },
        peg$c707 = "indexed",
        peg$c708 = { type: "literal", value: "INDEXED", description: "\"INDEXED\"" },
        peg$c709 = "initially",
        peg$c710 = { type: "literal", value: "INITIALLY", description: "\"INITIALLY\"" },
        peg$c711 = "inner",
        peg$c712 = { type: "literal", value: "INNER", description: "\"INNER\"" },
        peg$c713 = "insert",
        peg$c714 = { type: "literal", value: "INSERT", description: "\"INSERT\"" },
        peg$c715 = "instead",
        peg$c716 = { type: "literal", value: "INSTEAD", description: "\"INSTEAD\"" },
        peg$c717 = "intersect",
        peg$c718 = { type: "literal", value: "INTERSECT", description: "\"INTERSECT\"" },
        peg$c719 = "into",
        peg$c720 = { type: "literal", value: "INTO", description: "\"INTO\"" },
        peg$c721 = "is",
        peg$c722 = { type: "literal", value: "IS", description: "\"IS\"" },
        peg$c723 = "isnull",
        peg$c724 = { type: "literal", value: "ISNULL", description: "\"ISNULL\"" },
        peg$c725 = "join",
        peg$c726 = { type: "literal", value: "JOIN", description: "\"JOIN\"" },
        peg$c727 = "key",
        peg$c728 = { type: "literal", value: "KEY", description: "\"KEY\"" },
        peg$c729 = "left",
        peg$c730 = { type: "literal", value: "LEFT", description: "\"LEFT\"" },
        peg$c731 = "like",
        peg$c732 = { type: "literal", value: "LIKE", description: "\"LIKE\"" },
        peg$c733 = "limit",
        peg$c734 = { type: "literal", value: "LIMIT", description: "\"LIMIT\"" },
        peg$c735 = "match",
        peg$c736 = { type: "literal", value: "MATCH", description: "\"MATCH\"" },
        peg$c737 = "natural",
        peg$c738 = { type: "literal", value: "NATURAL", description: "\"NATURAL\"" },
        peg$c739 = "no",
        peg$c740 = { type: "literal", value: "NO", description: "\"NO\"" },
        peg$c741 = "not",
        peg$c742 = { type: "literal", value: "NOT", description: "\"NOT\"" },
        peg$c743 = "notnull",
        peg$c744 = { type: "literal", value: "NOTNULL", description: "\"NOTNULL\"" },
        peg$c745 = "null",
        peg$c746 = { type: "literal", value: "NULL", description: "\"NULL\"" },
        peg$c747 = "of",
        peg$c748 = { type: "literal", value: "OF", description: "\"OF\"" },
        peg$c749 = "offset",
        peg$c750 = { type: "literal", value: "OFFSET", description: "\"OFFSET\"" },
        peg$c751 = "on",
        peg$c752 = { type: "literal", value: "ON", description: "\"ON\"" },
        peg$c753 = "or",
        peg$c754 = { type: "literal", value: "OR", description: "\"OR\"" },
        peg$c755 = "order",
        peg$c756 = { type: "literal", value: "ORDER", description: "\"ORDER\"" },
        peg$c757 = "outer",
        peg$c758 = { type: "literal", value: "OUTER", description: "\"OUTER\"" },
        peg$c759 = "plan",
        peg$c760 = { type: "literal", value: "PLAN", description: "\"PLAN\"" },
        peg$c761 = "pragma",
        peg$c762 = { type: "literal", value: "PRAGMA", description: "\"PRAGMA\"" },
        peg$c763 = "primary",
        peg$c764 = { type: "literal", value: "PRIMARY", description: "\"PRIMARY\"" },
        peg$c765 = "query",
        peg$c766 = { type: "literal", value: "QUERY", description: "\"QUERY\"" },
        peg$c767 = "raise",
        peg$c768 = { type: "literal", value: "RAISE", description: "\"RAISE\"" },
        peg$c769 = "recursive",
        peg$c770 = { type: "literal", value: "RECURSIVE", description: "\"RECURSIVE\"" },
        peg$c771 = "references",
        peg$c772 = { type: "literal", value: "REFERENCES", description: "\"REFERENCES\"" },
        peg$c773 = "regexp",
        peg$c774 = { type: "literal", value: "REGEXP", description: "\"REGEXP\"" },
        peg$c775 = "reindex",
        peg$c776 = { type: "literal", value: "REINDEX", description: "\"REINDEX\"" },
        peg$c777 = "release",
        peg$c778 = { type: "literal", value: "RELEASE", description: "\"RELEASE\"" },
        peg$c779 = "rename",
        peg$c780 = { type: "literal", value: "RENAME", description: "\"RENAME\"" },
        peg$c781 = "replace",
        peg$c782 = { type: "literal", value: "REPLACE", description: "\"REPLACE\"" },
        peg$c783 = "restrict",
        peg$c784 = { type: "literal", value: "RESTRICT", description: "\"RESTRICT\"" },
        peg$c785 = "right",
        peg$c786 = { type: "literal", value: "RIGHT", description: "\"RIGHT\"" },
        peg$c787 = "rollback",
        peg$c788 = { type: "literal", value: "ROLLBACK", description: "\"ROLLBACK\"" },
        peg$c789 = "row",
        peg$c790 = { type: "literal", value: "ROW", description: "\"ROW\"" },
        peg$c791 = "rowid",
        peg$c792 = { type: "literal", value: "ROWID", description: "\"ROWID\"" },
        peg$c793 = "savepoint",
        peg$c794 = { type: "literal", value: "SAVEPOINT", description: "\"SAVEPOINT\"" },
        peg$c795 = "select",
        peg$c796 = { type: "literal", value: "SELECT", description: "\"SELECT\"" },
        peg$c797 = "set",
        peg$c798 = { type: "literal", value: "SET", description: "\"SET\"" },
        peg$c799 = "table",
        peg$c800 = { type: "literal", value: "TABLE", description: "\"TABLE\"" },
        peg$c801 = "temp",
        peg$c802 = { type: "literal", value: "TEMP", description: "\"TEMP\"" },
        peg$c803 = "temporary",
        peg$c804 = { type: "literal", value: "TEMPORARY", description: "\"TEMPORARY\"" },
        peg$c805 = "then",
        peg$c806 = { type: "literal", value: "THEN", description: "\"THEN\"" },
        peg$c807 = "to",
        peg$c808 = { type: "literal", value: "TO", description: "\"TO\"" },
        peg$c809 = "transaction",
        peg$c810 = { type: "literal", value: "TRANSACTION", description: "\"TRANSACTION\"" },
        peg$c811 = "trigger",
        peg$c812 = { type: "literal", value: "TRIGGER", description: "\"TRIGGER\"" },
        peg$c813 = "union",
        peg$c814 = { type: "literal", value: "UNION", description: "\"UNION\"" },
        peg$c815 = "unique",
        peg$c816 = { type: "literal", value: "UNIQUE", description: "\"UNIQUE\"" },
        peg$c817 = "update",
        peg$c818 = { type: "literal", value: "UPDATE", description: "\"UPDATE\"" },
        peg$c819 = "using",
        peg$c820 = { type: "literal", value: "USING", description: "\"USING\"" },
        peg$c821 = "vacuum",
        peg$c822 = { type: "literal", value: "VACUUM", description: "\"VACUUM\"" },
        peg$c823 = "values",
        peg$c824 = { type: "literal", value: "VALUES", description: "\"VALUES\"" },
        peg$c825 = "view",
        peg$c826 = { type: "literal", value: "VIEW", description: "\"VIEW\"" },
        peg$c827 = "virtual",
        peg$c828 = { type: "literal", value: "VIRTUAL", description: "\"VIRTUAL\"" },
        peg$c829 = "when",
        peg$c830 = { type: "literal", value: "WHEN", description: "\"WHEN\"" },
        peg$c831 = "where",
        peg$c832 = { type: "literal", value: "WHERE", description: "\"WHERE\"" },
        peg$c833 = "with",
        peg$c834 = { type: "literal", value: "WITH", description: "\"WITH\"" },
        peg$c835 = "without",
        peg$c836 = { type: "literal", value: "WITHOUT", description: "\"WITHOUT\"" },
        peg$c837 = function(r) { return util.key(r); },
        peg$c838 = { type: "other", description: "SQL Line Comment" },
        peg$c839 = "--",
        peg$c840 = { type: "literal", value: "--", description: "\"--\"" },
        peg$c841 = { type: "other", description: "SQL Block Comment" },
        peg$c842 = "/*",
        peg$c843 = { type: "literal", value: "/*", description: "\"/*\"" },
        peg$c844 = "*/",
        peg$c845 = { type: "literal", value: "*/", description: "\"*/\"" },
        peg$c846 = { type: "any", description: "any character" },
        peg$c847 = { type: "other", description: "Whitespace" },
        peg$c848 = /^[ \t]/,
        peg$c849 = { type: "class", value: "[ \\t]", description: "[ \\t]" },
        peg$c850 = { type: "other", description: "New Line" },
        peg$c851 = /^[\n\x0B\f\r]/,
        peg$c852 = { type: "class", value: "[\\n\\v\\f\\r]", description: "[\\n\\v\\f\\r]" },
        peg$c853 = "__TODO__",
        peg$c854 = { type: "literal", value: "__TODO__", description: "\"__TODO__\"" },

        peg$currPos          = 0,
        peg$savedPos         = 0,
        peg$posDetailsCache  = [{ line: 1, column: 1, seenCR: false }],
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$descNames = {"start": null, "stmt_list": null, "semi_optional": null, "semi_required": null, "stmt_list_tail": null, "expression": "Expression", "expression_types": null, "expression_concat": "Logical Expression Group", "expression_wrapped": "Wrapped Expression", "expression_value": null, "expression_unary": "Unary Expression", "expression_cast": "CAST Expression", "type_alias": "Type Alias", "expression_exists": "EXISTS Expression", "expression_exists_ne": "EXISTS Keyword", "expression_case": "CASE Expression", "expression_case_when": "WHEN Clause", "expression_case_else": "ELSE Clause", "expression_raise": "RAISE Expression", "expression_raise_args": "RAISE Expression Arguments", "raise_args_ignore": "IGNORE Keyword", "raise_args_message": null, "expression_node": null, "expression_collate": "COLLATE Expression", "expression_compare": "Comparison Expression", "expression_escape": "ESCAPE Expression", "expression_null": "NULL Expression", "expression_null_nodes": "NULL Keyword", "null_nodes_types": null, "expression_isnt": "IS Keyword", "expression_is_not": null, "expression_between": "BETWEEN Expression", "expression_in": "IN Expression", "expression_in_target": null, "expression_list_or_select": null, "type_definition": "Type Definition", "type_definition_args": "Type Definition Arguments", "definition_args_loop": null, "literal_value": null, "literal_null": "Null Literal", "literal_date": "Date Literal", "literal_string": "String Literal", "literal_string_single": "Single-quoted String Literal", "literal_string_schar": null, "literal_blob": "Blob Literal", "number_sign": "Number Sign", "literal_number_signed": null, "literal_number": null, "literal_number_decimal": null, "number_decimal_node": "Decimal Literal", "number_decimal_full": null, "number_decimal_fraction": null, "number_decimal_exponent": "Decimal Literal Exponent", "literal_number_hex": "Hexidecimal Literal", "number_hex": null, "number_digit": null, "bind_parameter": "Bind Parameter", "bind_parameter_numbered": "Numbered Bind Parameter", "bind_parameter_named": "Named Bind Parameter", "bind_parameter_tcl": "TCL Bind Parameter", "tcl_suffix": null, "operation_binary": "Binary Expression", "binary_loop_concat": null, "expression_list": "Expression List", "expression_list_rest": null, "function_call": "Function Call", "function_call_args": "Function Call Arguments", "call_args_star": null, "call_args_list": null, "error_message": "Error Message", "stmt": null, "stmt_modifier": "QUERY PLAN", "modifier_query": "QUERY PLAN Keyword", "stmt_nodes": null, "stmt_transaction": "Transaction", "stmt_commit": "END Transaction Statement", "stmt_begin": "BEGIN Transaction Statement", "commit_transaction": null, "begin_transaction": null, "stmt_begin_modifier": null, "stmt_rollback": "ROLLBACK Statement", "rollback_savepoint": "TO Clause", "savepoint_alt": null, "stmt_savepoint": "SAVEPOINT Statement", "stmt_release": "RELEASE Statement", "stmt_alter": "ALTER TABLE Statement", "alter_start": "ALTER TABLE Keyword", "alter_action": null, "alter_action_rename": "RENAME TO Keyword", "alter_action_add": "ADD COLUMN Keyword", "action_add_modifier": null, "stmt_crud": null, "stmt_core_with": "WITH Clause", "clause_with": null, "clause_with_recursive": null, "clause_with_tables": null, "clause_with_loop": null, "expression_cte": "Common Table Expression", "select_alias": null, "select_wrapped": null, "stmt_sqlite": null, "stmt_detach": "DETACH Statement", "stmt_vacuum": "VACUUM Statement", "stmt_analyze": "ANALYZE Statement", "analyze_arg": null, "stmt_reindex": "REINDEX Statement", "reindex_arg": null, "stmt_pragma": "PRAGMA Statement", "pragma_expression": null, "pragma_value": null, "pragma_value_literal": null, "pragma_value_bool": null, "pragma_value_name": null, "stmt_crud_types": null, "stmt_select": "SELECT Statement", "stmt_core_order": "ORDER BY Clause", "stmt_core_limit": "LIMIT Clause", "stmt_core_limit_offset": "OFFSET Clause", "limit_offset_variant": null, "limit_offset_variant_name": null, "select_loop": null, "select_loop_union": "Union Operation", "select_parts": null, "select_parts_core": null, "select_core_select": "SELECT Results Clause", "select_modifier": "SELECT Results Modifier", "select_modifier_distinct": null, "select_modifier_all": null, "select_target": null, "select_target_loop": null, "select_core_from": "FROM Clause", "stmt_core_where": "WHERE Clause", "select_core_group": "GROUP BY Clause", "select_core_having": "HAVING Clause", "select_node": null, "select_node_star": null, "select_node_star_qualified": null, "select_node_aliased": null, "select_source": null, "select_source_loop": null, "source_loop_tail": null, "table_or_sub": null, "table_qualified": "Qualified Table", "table_qualified_id": "Qualified Table Identifier", "table_or_sub_index_node": "Qualfied Table Index", "index_node_indexed": null, "index_node_none": null, "table_or_sub_sub": "SELECT Source", "table_or_sub_select": "Subquery", "alias": "Alias", "select_join_loop": null, "select_join_clause": "JOIN Operation", "join_operator": "JOIN Operator", "join_operator_natural": null, "join_operator_types": null, "operator_types_hand": null, "types_hand_outer": null, "operator_types_misc": null, "join_condition": "JOIN Constraint", "join_condition_on": "Join ON Clause", "join_condition_using": "Join USING Clause", "select_parts_values": "VALUES Clause", "stmt_core_order_list": null, "stmt_core_order_list_loop": null, "stmt_core_order_list_item": "Ordering Expression", "stmt_core_order_list_dir": "Ordering Direction", "select_star": "Star", "stmt_fallback_types": "Fallback Type", "stmt_insert": "INSERT Statement", "insert_keyword": null, "insert_keyword_ins": "INSERT Keyword", "insert_keyword_repl": "REPLACE Keyword", "insert_keyword_mod": "INSERT OR Modifier", "insert_target": null, "insert_into": "INTO Clause", "insert_into_start": "INTO Keyword", "insert_results": "VALUES Clause", "loop_columns": "Column List", "loop_column_tail": null, "loop_name": "Column Name", "insert_value": "VALUES Clause", "insert_value_start": "VALUES Keyword", "insert_values_list": null, "insert_values_loop": null, "insert_values": "Insert Values List", "insert_select": "SELECT Results Clause", "insert_default": "DEFAULT VALUES Clause", "operator_compound": "Compound Operator", "compound_union": "UNION Operator", "compound_union_all": null, "stmt_update": "UPDATE Statement", "update_start": "UPDATE Keyword", "update_fallback": "UPDATE OR Modifier", "update_set": "SET Clause", "update_columns": null, "update_columns_tail": null, "update_column": "Column Assignment", "stmt_delete": "DELETE Statement", "delete_start": "DELETE Keyword", "stmt_create": "CREATE Statement", "create_start": null, "create_table_only": null, "create_index_only": null, "create_trigger_only": null, "create_view_only": null, "create_virtual_only": null, "create_table": "CREATE TABLE Statement", "create_table_start": null, "create_core_tmp": null, "create_core_ine": "IF NOT EXISTS Modifier", "create_table_source": null, "table_source_def": "Table Definition", "source_def_rowid": null, "source_def_loop": null, "source_def_tail": null, "source_tbl_loop": null, "source_def_column": "Column Definition", "column_type": "Column Datatype", "column_constraints": null, "column_constraint_tail": null, "column_constraint": "Column Constraint", "column_constraint_name": "Column Constraint Name", "column_constraint_types": null, "column_constraint_foreign": "FOREIGN KEY Column Constraint", "column_constraint_primary": "PRIMARY KEY Column Constraint", "col_primary_start": "PRIMARY KEY Keyword", "col_primary_dir": null, "col_primary_auto": "AUTOINCREMENT Keyword", "column_constraint_null": null, "constraint_null_types": "UNIQUE Column Constraint", "constraint_null_value": "NULL Column Constraint", "column_constraint_check": "CHECK Column Constraint", "column_constraint_default": "DEFAULT Column Constraint", "col_default_val": "DEFAULT Column Value", "column_constraint_collate": "COLLATE Column Constraint", "table_constraint": "Table Constraint", "table_constraint_name": "Table Constraint Name", "table_constraint_types": null, "table_constraint_check": "CHECK Table Constraint", "table_constraint_primary": "PRIMARY KEY Table Constraint", "primary_start": null, "primary_start_normal": "PRIMARY KEY Keyword", "primary_start_unique": "UNIQUE Keyword", "primary_columns": "PRIMARY KEY Columns", "primary_column": "Indexed Column", "column_collate": "Column Collation", "primary_column_dir": "Column Direction", "primary_column_tail": null, "primary_conflict": null, "primary_conflict_start": "ON CONFLICT Keyword", "constraint_check": null, "table_constraint_foreign": "FOREIGN KEY Table Constraint", "foreign_start": "FOREIGN KEY Keyword", "foreign_clause": null, "foreign_references": "REFERENCES Clause", "foreign_actions": null, "foreign_actions_tail": null, "foreign_action": "FOREIGN KEY Action Clause", "foreign_action_on": null, "action_on_action": "FOREIGN KEY Action", "on_action_set": null, "on_action_cascade": null, "on_action_none": null, "foreign_action_match": null, "foreign_deferrable": "DEFERRABLE Clause", "deferrable_initially": null, "table_source_select": null, "create_index": "CREATE INDEX Statement", "create_index_start": null, "index_unique": null, "index_on": "ON Clause", "create_trigger": "CREATE TRIGGER Statement", "create_trigger_start": null, "trigger_conditions": "Conditional Clause", "trigger_apply_mods": null, "trigger_apply_instead": null, "trigger_do": "Conditional Action", "trigger_do_on": null, "trigger_do_update": null, "do_update_of": null, "do_update_columns": null, "trigger_foreach": null, "trigger_when": "WHEN Clause", "trigger_action": "Actions Clause", "action_loop": null, "action_loop_stmt": null, "create_view": "CREATE VIEW Statement", "create_view_start": null, "create_as_select": null, "create_virtual": "CREATE VIRTUAL TABLE Statement", "create_virtual_start": null, "virtual_module": null, "virtual_args": "Module Arguments", "virtual_arg_types": null, "virtual_arg_list": null, "virtual_arg_def": null, "stmt_drop": "DROP Statement", "drop_start": "DROP Keyword", "drop_types": "DROP Type", "drop_conditions": null, "drop_ie": "IF EXISTS Keyword", "operator_unary": "Unary Operator", "operator_binary": "Binary Operator", "binary_nodes": null, "binary_concat": "Or", "binary_plus": "Add", "binary_minus": "Subtract", "binary_multiply": "Multiply", "binary_mod": "Modulo", "binary_left": "Shift Left", "binary_right": "Shift Right", "binary_and": "Logical AND", "binary_or": "Logical OR", "binary_lt": "Less Than", "binary_gt": "Greater Than", "binary_lte": "Less Than Or Equal", "binary_gte": "Greater Than Or Equal", "binary_equal": "Equal", "binary_notequal": "Not Equal", "binary_lang": null, "binary_lang_isnt": "IS", "binary_lang_misc": null, "id_database": "Database Identifier", "id_table": "Table Identifier", "id_table_qualified": null, "id_column": "Column Identifier", "column_unqualified": null, "column_qualifiers": null, "id_column_qualified": null, "id_collation": "Collation Identifier", "id_savepoint": "Savepoint Indentifier", "id_index": "Index Identifier", "id_trigger": "Trigger Identifier", "id_view": "View Identifier", "id_pragma": "Pragma Identifier", "id_cte": "CTE Identifier", "id_table_expression": null, "id_constraint_table": "Table Constraint Identifier", "id_constraint_column": "Column Constraint Identifier", "datatype_types": "Datatype Name", "datatype_text": "TEXT Datatype Name", "datatype_real": "REAL Datatype Name", "datatype_real_double": "DOUBLE Datatype Name", "real_double_precision": null, "datatype_numeric": "NUMERIC Datatype Name", "datatype_integer": "INTEGER Datatype Name", "datatype_none": "BLOB Datatype Name", "name_char": null, "name": null, "reserved_nodes": null, "name_unquoted": null, "name_bracketed": null, "name_bracketed_schar": null, "name_dblquoted": null, "name_dblquoted_schar": null, "name_sglquoted": null, "name_sglquoted_schar": null, "name_backticked": null, "name_backticked_schar": null, "sym_bopen": "Open Bracket", "sym_bclose": "Close Bracket", "sym_popen": "Open Parenthesis", "sym_pclose": "Close Parenthesis", "sym_comma": "Comma", "sym_dot": "Period", "sym_star": "Asterisk", "sym_quest": "Question Mark", "sym_sglquote": "Single Quote", "sym_dblquote": "Double Quote", "sym_backtick": "Backtick", "sym_tilde": "Tilde", "sym_plus": "Plus", "sym_minus": "Minus", "sym_equal": "Equal", "sym_amp": "Ampersand", "sym_pipe": "Pipe", "sym_mod": "Modulo", "sym_lt": "Less Than", "sym_gt": "Greater Than", "sym_excl": "Exclamation", "sym_semi": "Semicolon", "sym_colon": "Colon", "sym_fslash": "Forward Slash", "sym_bslash": "Backslash", "ABORT": null, "ACTION": null, "ADD": null, "AFTER": null, "ALL": null, "ALTER": null, "ANALYZE": null, "AND": null, "AS": null, "ASC": null, "ATTACH": null, "AUTOINCREMENT": null, "BEFORE": null, "BEGIN": null, "BETWEEN": null, "BY": null, "CASCADE": null, "CASE": null, "CAST": null, "CHECK": null, "COLLATE": null, "COLUMN": null, "COMMIT": null, "CONFLICT": null, "CONSTRAINT": null, "CREATE": null, "CROSS": null, "CURRENT_DATE": null, "CURRENT_TIME": null, "CURRENT_TIMESTAMP": null, "DATABASE": null, "DEFAULT": null, "DEFERRABLE": null, "DEFERRED": null, "DELETE": null, "DESC": null, "DETACH": null, "DISTINCT": null, "DROP": null, "EACH": null, "ELSE": null, "END": null, "ESCAPE": null, "EXCEPT": null, "EXCLUSIVE": null, "EXISTS": null, "EXPLAIN": null, "FAIL": null, "FOR": null, "FOREIGN": null, "FROM": null, "FULL": null, "GLOB": null, "GROUP": null, "HAVING": null, "IF": null, "IGNORE": null, "IMMEDIATE": null, "IN": null, "INDEX": null, "INDEXED": null, "INITIALLY": null, "INNER": null, "INSERT": null, "INSTEAD": null, "INTERSECT": null, "INTO": null, "IS": null, "ISNULL": null, "JOIN": null, "KEY": null, "LEFT": null, "LIKE": null, "LIMIT": null, "MATCH": null, "NATURAL": null, "NO": null, "NOT": null, "NOTNULL": null, "NULL": null, "OF": null, "OFFSET": null, "ON": null, "OR": null, "ORDER": null, "OUTER": null, "PLAN": null, "PRAGMA": null, "PRIMARY": null, "QUERY": null, "RAISE": null, "RECURSIVE": null, "REFERENCES": null, "REGEXP": null, "REINDEX": null, "RELEASE": null, "RENAME": null, "REPLACE": null, "RESTRICT": null, "RIGHT": null, "ROLLBACK": null, "ROW": null, "ROWID": null, "SAVEPOINT": null, "SELECT": null, "SET": null, "TABLE": null, "TEMP": null, "TEMPORARY": null, "THEN": null, "TO": null, "TRANSACTION": null, "TRIGGER": null, "UNION": null, "UNIQUE": null, "UPDATE": null, "USING": null, "VACUUM": null, "VALUES": null, "VIEW": null, "VIRTUAL": null, "WHEN": null, "WHERE": null, "WITH": null, "WITHOUT": null, "reserved_words": null, "reserved_word_list": null, "comment": null, "comment_line": "SQL Line Comment", "comment_line_start": null, "comment_block": "SQL Block Comment", "comment_block_start": null, "comment_block_end": null, "comment_block_body": null, "block_body_nodes": null, "comment_block_feed": null, "match_all": null, "o": null, "e": null, "whitespace_nodes": null, "whitespace": null, "whitespace_space": "Whitespace", "whitespace_line": "New Line", "_TODO_": null},

        peg$tracer = "tracer" in options ? options.tracer : new peg$DefaultTracer(),

        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$savedPos, peg$currPos);
    }

    function location() {
      return peg$computeLocation(peg$savedPos, peg$currPos);
    }

    function expected(description) {
      throw peg$buildException(
        null,
        [{ type: "other", description: description }],
        input.substring(peg$savedPos, peg$currPos),
        peg$computeLocation(peg$savedPos, peg$currPos)
      );
    }

    function error(message) {
      throw peg$buildException(
        message,
        null,
        input.substring(peg$savedPos, peg$currPos),
        peg$computeLocation(peg$savedPos, peg$currPos)
      );
    }

    function peg$computePosDetails(pos) {
      var details = peg$posDetailsCache[pos],
          p, ch;

      if (details) {
        return details;
      } else {
        p = pos - 1;
        while (!peg$posDetailsCache[p]) {
          p--;
        }

        details = peg$posDetailsCache[p];
        details = {
          line:   details.line,
          column: details.column,
          seenCR: details.seenCR
        };

        while (p < pos) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) { details.line++; }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }

          p++;
        }

        peg$posDetailsCache[pos] = details;
        return details;
      }
    }

    function peg$computeLocation(startPos, endPos) {
      var startPosDetails = peg$computePosDetails(startPos),
          endPosDetails   = peg$computePosDetails(endPos);

      return {
        start: {
          offset: startPos,
          line:   startPosDetails.line,
          column: startPosDetails.column
        },
        end: {
          offset: endPos,
          line:   endPosDetails.line,
          column: endPosDetails.column
        }
      };
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, found, location) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function(a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

          return s
            .replace(/\\/g,   '\\\\')
            .replace(/"/g,    '\\"')
            .replace(/\x08/g, '\\b')
            .replace(/\t/g,   '\\t')
            .replace(/\n/g,   '\\n')
            .replace(/\f/g,   '\\f')
            .replace(/\r/g,   '\\r')
            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
            .replace(/[\u0100-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
            .replace(/[\u1000-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc, foundDesc, i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1
          ? expectedDescs.slice(0, -1).join(", ")
              + " or "
              + expectedDescs[expected.length - 1]
          : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new peg$SyntaxError(
        message !== null ? message : buildMessage(expected, found),
        expected,
        found,
        location
      );
    }

    function peg$parsestart() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "start",
        description: peg$descNames["start"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseo();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsestmt_list();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c0(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "start",
        description: peg$descNames["start"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "start",
        description: peg$descNames["start"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsestmt_list() {
      var s0, s1, s2, s3, s4, s5,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "stmt_list",
        description: peg$descNames["stmt_list"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsesemi_optional();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsestmt();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseo();
          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$parsestmt_list_tail();
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parsestmt_list_tail();
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsesemi_optional();
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c1(s2, s4);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "stmt_list",
        description: peg$descNames["stmt_list"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "stmt_list",
        description: peg$descNames["stmt_list"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsesemi_optional() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "semi_optional",
        description: peg$descNames["semi_optional"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = [];
      s1 = peg$parsesym_semi();
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        s1 = peg$parsesym_semi();
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "semi_optional",
        description: peg$descNames["semi_optional"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "semi_optional",
        description: peg$descNames["semi_optional"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsesemi_required() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "semi_required",
        description: peg$descNames["semi_required"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = [];
      s1 = peg$parsesym_semi();
      if (s1 !== peg$FAILED) {
        while (s1 !== peg$FAILED) {
          s0.push(s1);
          s1 = peg$parsesym_semi();
        }
      } else {
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "semi_required",
        description: peg$descNames["semi_required"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "semi_required",
        description: peg$descNames["semi_required"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsestmt_list_tail() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "stmt_list_tail",
        description: peg$descNames["stmt_list_tail"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsesemi_required();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsestmt();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseo();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c2(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "stmt_list_tail",
        description: peg$descNames["stmt_list_tail"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "stmt_list_tail",
        description: peg$descNames["stmt_list_tail"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseexpression() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "expression",
        description: peg$descNames["expression"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseexpression_concat();
      if (s1 === peg$FAILED) {
        s1 = peg$parseexpression_types();
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c4(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c3); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "expression",
        description: peg$descNames["expression"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "expression",
        description: peg$descNames["expression"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseexpression_types() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "expression_types",
        description: peg$descNames["expression_types"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$parseexpression_wrapped();
      if (s0 === peg$FAILED) {
        s0 = peg$parseexpression_unary();
        if (s0 === peg$FAILED) {
          s0 = peg$parseexpression_node();
          if (s0 === peg$FAILED) {
            s0 = peg$parseexpression_value();
          }
        }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "expression_types",
        description: peg$descNames["expression_types"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "expression_types",
        description: peg$descNames["expression_types"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseexpression_concat() {
      var s0, s1, s2, s3, s4, s5,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "expression_concat",
        description: peg$descNames["expression_concat"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseexpression_types();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsebinary_loop_concat();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseo();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseexpression();
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c6(s1, s3, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c5); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "expression_concat",
        description: peg$descNames["expression_concat"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "expression_concat",
        description: peg$descNames["expression_concat"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseexpression_wrapped() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "expression_wrapped",
        description: peg$descNames["expression_wrapped"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsesym_popen();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseexpression();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseo();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsesym_pclose();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c8(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c7); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "expression_wrapped",
        description: peg$descNames["expression_wrapped"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "expression_wrapped",
        description: peg$descNames["expression_wrapped"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseexpression_value() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "expression_value",
        description: peg$descNames["expression_value"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$parseexpression_cast();
      if (s0 === peg$FAILED) {
        s0 = peg$parseexpression_exists();
        if (s0 === peg$FAILED) {
          s0 = peg$parseexpression_case();
          if (s0 === peg$FAILED) {
            s0 = peg$parseexpression_raise();
            if (s0 === peg$FAILED) {
              s0 = peg$parsebind_parameter();
              if (s0 === peg$FAILED) {
                s0 = peg$parsefunction_call();
                if (s0 === peg$FAILED) {
                  s0 = peg$parseliteral_value();
                  if (s0 === peg$FAILED) {
                    s0 = peg$parseid_column();
                  }
                }
              }
            }
          }
        }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "expression_value",
        description: peg$descNames["expression_value"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "expression_value",
        description: peg$descNames["expression_value"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseexpression_unary() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "expression_unary",
        description: peg$descNames["expression_unary"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseoperator_unary();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseexpression_types();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c10(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c9); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "expression_unary",
        description: peg$descNames["expression_unary"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "expression_unary",
        description: peg$descNames["expression_unary"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseexpression_cast() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "expression_cast",
        description: peg$descNames["expression_cast"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseCAST();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsesym_popen();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseexpression();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseo();
              if (s5 !== peg$FAILED) {
                s6 = peg$parsetype_alias();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parseo();
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parsesym_pclose();
                    if (s8 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c12(s1, s4, s6);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c11); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "expression_cast",
        description: peg$descNames["expression_cast"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "expression_cast",
        description: peg$descNames["expression_cast"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsetype_alias() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "type_alias",
        description: peg$descNames["type_alias"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseAS();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsetype_definition();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c14(s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c13); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "type_alias",
        description: peg$descNames["type_alias"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "type_alias",
        description: peg$descNames["type_alias"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseexpression_exists() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "expression_exists",
        description: peg$descNames["expression_exists"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseexpression_exists_ne();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseselect_wrapped();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c16(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c15); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "expression_exists",
        description: peg$descNames["expression_exists"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "expression_exists",
        description: peg$descNames["expression_exists"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseexpression_exists_ne() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "expression_exists_ne",
        description: peg$descNames["expression_exists_ne"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseexpression_is_not();
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseEXISTS();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseo();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c18(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c17); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "expression_exists_ne",
        description: peg$descNames["expression_exists_ne"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "expression_exists_ne",
        description: peg$descNames["expression_exists_ne"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseexpression_case() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "expression_case",
        description: peg$descNames["expression_case"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseCASE();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseexpression();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseo();
            if (s4 !== peg$FAILED) {
              s5 = [];
              s6 = peg$parseexpression_case_when();
              if (s6 !== peg$FAILED) {
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$parseexpression_case_when();
                }
              } else {
                s5 = peg$FAILED;
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parseo();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parseexpression_case_else();
                  if (s7 === peg$FAILED) {
                    s7 = null;
                  }
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parseo();
                    if (s8 !== peg$FAILED) {
                      s9 = peg$parseEND();
                      if (s9 !== peg$FAILED) {
                        s10 = peg$parseo();
                        if (s10 !== peg$FAILED) {
                          peg$savedPos = s0;
                          s1 = peg$c20(s1, s3, s5, s7);
                          s0 = s1;
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c19); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "expression_case",
        description: peg$descNames["expression_case"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "expression_case",
        description: peg$descNames["expression_case"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseexpression_case_when() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "expression_case_when",
        description: peg$descNames["expression_case_when"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseWHEN();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseexpression();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseo();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseTHEN();
              if (s5 !== peg$FAILED) {
                s6 = peg$parsee();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parseexpression();
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parseo();
                    if (s8 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c22(s1, s3, s7);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c21); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "expression_case_when",
        description: peg$descNames["expression_case_when"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "expression_case_when",
        description: peg$descNames["expression_case_when"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseexpression_case_else() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "expression_case_else",
        description: peg$descNames["expression_case_else"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseELSE();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseexpression();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseo();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c24(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c23); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "expression_case_else",
        description: peg$descNames["expression_case_else"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "expression_case_else",
        description: peg$descNames["expression_case_else"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseexpression_raise() {
      var s0, s1, s2, s3, s4, s5, s6, s7,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "expression_raise",
        description: peg$descNames["expression_raise"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseRAISE();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsesym_popen();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseo();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseexpression_raise_args();
              if (s5 !== peg$FAILED) {
                s6 = peg$parseo();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parsesym_pclose();
                  if (s7 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c26(s1, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c25); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "expression_raise",
        description: peg$descNames["expression_raise"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "expression_raise",
        description: peg$descNames["expression_raise"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseexpression_raise_args() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "expression_raise_args",
        description: peg$descNames["expression_raise_args"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseraise_args_ignore();
      if (s1 === peg$FAILED) {
        s1 = peg$parseraise_args_message();
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c28(s1);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c27); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "expression_raise_args",
        description: peg$descNames["expression_raise_args"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "expression_raise_args",
        description: peg$descNames["expression_raise_args"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseraise_args_ignore() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "raise_args_ignore",
        description: peg$descNames["raise_args_ignore"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseIGNORE();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c30(s1);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c29); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "raise_args_ignore",
        description: peg$descNames["raise_args_ignore"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "raise_args_ignore",
        description: peg$descNames["raise_args_ignore"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseraise_args_message() {
      var s0, s1, s2, s3, s4, s5,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "raise_args_message",
        description: peg$descNames["raise_args_message"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseROLLBACK();
      if (s1 === peg$FAILED) {
        s1 = peg$parseABORT();
        if (s1 === peg$FAILED) {
          s1 = peg$parseFAIL();
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsesym_comma();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseo();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseerror_message();
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c31(s1, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "raise_args_message",
        description: peg$descNames["raise_args_message"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "raise_args_message",
        description: peg$descNames["raise_args_message"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseexpression_node() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "expression_node",
        description: peg$descNames["expression_node"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$parseexpression_collate();
      if (s0 === peg$FAILED) {
        s0 = peg$parseexpression_compare();
        if (s0 === peg$FAILED) {
          s0 = peg$parseexpression_null();
          if (s0 === peg$FAILED) {
            s0 = peg$parseexpression_between();
            if (s0 === peg$FAILED) {
              s0 = peg$parseexpression_in();
              if (s0 === peg$FAILED) {
                s0 = peg$parsestmt_select();
                if (s0 === peg$FAILED) {
                  s0 = peg$parseoperation_binary();
                }
              }
            }
          }
        }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "expression_node",
        description: peg$descNames["expression_node"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "expression_node",
        description: peg$descNames["expression_node"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseexpression_collate() {
      var s0, s1, s2, s3, s4, s5,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "expression_collate",
        description: peg$descNames["expression_collate"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseexpression_value();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseCOLLATE();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsee();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseid_collation();
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c33(s1, s3, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c32); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "expression_collate",
        description: peg$descNames["expression_collate"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "expression_collate",
        description: peg$descNames["expression_collate"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseexpression_compare() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "expression_compare",
        description: peg$descNames["expression_compare"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseexpression_value();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseexpression_is_not();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseLIKE();
            if (s4 === peg$FAILED) {
              s4 = peg$parseGLOB();
              if (s4 === peg$FAILED) {
                s4 = peg$parseREGEXP();
                if (s4 === peg$FAILED) {
                  s4 = peg$parseMATCH();
                }
              }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsee();
              if (s5 !== peg$FAILED) {
                s6 = peg$parseexpression();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parseo();
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parseexpression_escape();
                    if (s8 === peg$FAILED) {
                      s8 = null;
                    }
                    if (s8 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c35(s1, s3, s4, s6, s8);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c34); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "expression_compare",
        description: peg$descNames["expression_compare"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "expression_compare",
        description: peg$descNames["expression_compare"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseexpression_escape() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "expression_escape",
        description: peg$descNames["expression_escape"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseESCAPE();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseexpression();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c37(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c36); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "expression_escape",
        description: peg$descNames["expression_escape"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "expression_escape",
        description: peg$descNames["expression_escape"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseexpression_null() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "expression_null",
        description: peg$descNames["expression_null"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseexpression_value();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseexpression_null_nodes();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c39(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c38); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "expression_null",
        description: peg$descNames["expression_null"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "expression_null",
        description: peg$descNames["expression_null"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseexpression_null_nodes() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "expression_null_nodes",
        description: peg$descNames["expression_null_nodes"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsenull_nodes_types();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseNULL();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsee();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c41(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c40); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "expression_null_nodes",
        description: peg$descNames["expression_null_nodes"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "expression_null_nodes",
        description: peg$descNames["expression_null_nodes"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsenull_nodes_types() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "null_nodes_types",
        description: peg$descNames["null_nodes_types"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseIS();
      if (s1 === peg$FAILED) {
        s1 = peg$currPos;
        s2 = peg$parseNOT();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseo();
          if (s3 !== peg$FAILED) {
            s2 = [s2, s3];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c42(s1);
      }
      s0 = s1;

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "null_nodes_types",
        description: peg$descNames["null_nodes_types"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "null_nodes_types",
        description: peg$descNames["null_nodes_types"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseexpression_isnt() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "expression_isnt",
        description: peg$descNames["expression_isnt"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseIS();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseexpression_is_not();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c44(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c43); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "expression_isnt",
        description: peg$descNames["expression_isnt"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "expression_isnt",
        description: peg$descNames["expression_isnt"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseexpression_is_not() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "expression_is_not",
        description: peg$descNames["expression_is_not"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseNOT();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c45(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "expression_is_not",
        description: peg$descNames["expression_is_not"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "expression_is_not",
        description: peg$descNames["expression_is_not"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseexpression_between() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "expression_between",
        description: peg$descNames["expression_between"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseexpression_value();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseexpression_is_not();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseBETWEEN();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsee();
              if (s5 !== peg$FAILED) {
                s6 = peg$parseexpression();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parseo();
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parseAND();
                    if (s8 !== peg$FAILED) {
                      s9 = peg$parsee();
                      if (s9 !== peg$FAILED) {
                        s10 = peg$parseexpression();
                        if (s10 !== peg$FAILED) {
                          peg$savedPos = s0;
                          s1 = peg$c47(s1, s3, s4, s6, s8, s10);
                          s0 = s1;
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c46); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "expression_between",
        description: peg$descNames["expression_between"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "expression_between",
        description: peg$descNames["expression_between"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseexpression_in() {
      var s0, s1, s2, s3, s4, s5, s6,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "expression_in",
        description: peg$descNames["expression_in"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseexpression_value();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseexpression_is_not();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseIN();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsee();
              if (s5 !== peg$FAILED) {
                s6 = peg$parseexpression_in_target();
                if (s6 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c49(s1, s3, s4, s6);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c48); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "expression_in",
        description: peg$descNames["expression_in"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "expression_in",
        description: peg$descNames["expression_in"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseexpression_in_target() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "expression_in_target",
        description: peg$descNames["expression_in_target"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$parseexpression_list_or_select();
      if (s0 === peg$FAILED) {
        s0 = peg$parseid_table();
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "expression_in_target",
        description: peg$descNames["expression_in_target"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "expression_in_target",
        description: peg$descNames["expression_in_target"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseexpression_list_or_select() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "expression_list_or_select",
        description: peg$descNames["expression_list_or_select"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsesym_popen();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsestmt_select();
        if (s2 === peg$FAILED) {
          s2 = peg$parseexpression_list();
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseo();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsesym_pclose();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c50(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "expression_list_or_select",
        description: peg$descNames["expression_list_or_select"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "expression_list_or_select",
        description: peg$descNames["expression_list_or_select"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsetype_definition() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "type_definition",
        description: peg$descNames["type_definition"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsedatatype_types();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsetype_definition_args();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c52(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c51); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "type_definition",
        description: peg$descNames["type_definition"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "type_definition",
        description: peg$descNames["type_definition"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsetype_definition_args() {
      var s0, s1, s2, s3, s4, s5,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "type_definition_args",
        description: peg$descNames["type_definition_args"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsesym_popen();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseliteral_number_signed();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseo();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsedefinition_args_loop();
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsesym_pclose();
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c54(s2, s4);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c53); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "type_definition_args",
        description: peg$descNames["type_definition_args"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "type_definition_args",
        description: peg$descNames["type_definition_args"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsedefinition_args_loop() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "definition_args_loop",
        description: peg$descNames["definition_args_loop"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsesym_comma();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseliteral_number_signed();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseo();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c8(s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "definition_args_loop",
        description: peg$descNames["definition_args_loop"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "definition_args_loop",
        description: peg$descNames["definition_args_loop"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseliteral_value() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "literal_value",
        description: peg$descNames["literal_value"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$parseliteral_number();
      if (s0 === peg$FAILED) {
        s0 = peg$parseliteral_string();
        if (s0 === peg$FAILED) {
          s0 = peg$parseliteral_blob();
          if (s0 === peg$FAILED) {
            s0 = peg$parseliteral_null();
            if (s0 === peg$FAILED) {
              s0 = peg$parseliteral_date();
            }
          }
        }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "literal_value",
        description: peg$descNames["literal_value"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "literal_value",
        description: peg$descNames["literal_value"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseliteral_null() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "literal_null",
        description: peg$descNames["literal_null"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseNULL();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c56(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c55); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "literal_null",
        description: peg$descNames["literal_null"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "literal_null",
        description: peg$descNames["literal_null"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseliteral_date() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "literal_date",
        description: peg$descNames["literal_date"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseCURRENT_DATE();
      if (s1 === peg$FAILED) {
        s1 = peg$parseCURRENT_TIMESTAMP();
        if (s1 === peg$FAILED) {
          s1 = peg$parseCURRENT_TIME();
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c58(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c57); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "literal_date",
        description: peg$descNames["literal_date"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "literal_date",
        description: peg$descNames["literal_date"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseliteral_string() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "literal_string",
        description: peg$descNames["literal_string"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseliteral_string_single();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c60(s1);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c59); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "literal_string",
        description: peg$descNames["literal_string"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "literal_string",
        description: peg$descNames["literal_string"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseliteral_string_single() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "literal_string_single",
        description: peg$descNames["literal_string_single"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsesym_sglquote();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parseliteral_string_schar();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parseliteral_string_schar();
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsesym_sglquote();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c62(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c61); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "literal_string_single",
        description: peg$descNames["literal_string_single"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "literal_string_single",
        description: peg$descNames["literal_string_single"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseliteral_string_schar() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "literal_string_schar",
        description: peg$descNames["literal_string_schar"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 2) === peg$c63) {
        s0 = peg$c63;
        peg$currPos += 2;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c64); }
      }
      if (s0 === peg$FAILED) {
        if (peg$c65.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c66); }
        }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "literal_string_schar",
        description: peg$descNames["literal_string_schar"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "literal_string_schar",
        description: peg$descNames["literal_string_schar"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseliteral_blob() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "literal_blob",
        description: peg$descNames["literal_blob"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      if (peg$c68.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c69); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseliteral_string_single();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c70(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c67); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "literal_blob",
        description: peg$descNames["literal_blob"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "literal_blob",
        description: peg$descNames["literal_blob"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsenumber_sign() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "number_sign",
        description: peg$descNames["number_sign"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsesym_plus();
      if (s1 === peg$FAILED) {
        s1 = peg$parsesym_minus();
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c2(s1);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c71); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "number_sign",
        description: peg$descNames["number_sign"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "number_sign",
        description: peg$descNames["number_sign"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseliteral_number_signed() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "literal_number_signed",
        description: peg$descNames["literal_number_signed"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsenumber_sign();
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseliteral_number();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c72(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "literal_number_signed",
        description: peg$descNames["literal_number_signed"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "literal_number_signed",
        description: peg$descNames["literal_number_signed"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseliteral_number() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "literal_number",
        description: peg$descNames["literal_number"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$parseliteral_number_decimal();
      if (s0 === peg$FAILED) {
        s0 = peg$parseliteral_number_hex();
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "literal_number",
        description: peg$descNames["literal_number"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "literal_number",
        description: peg$descNames["literal_number"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseliteral_number_decimal() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "literal_number_decimal",
        description: peg$descNames["literal_number_decimal"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsenumber_decimal_node();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsenumber_decimal_exponent();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c73(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "literal_number_decimal",
        description: peg$descNames["literal_number_decimal"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "literal_number_decimal",
        description: peg$descNames["literal_number_decimal"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsenumber_decimal_node() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "number_decimal_node",
        description: peg$descNames["number_decimal_node"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$parsenumber_decimal_full();
      if (s0 === peg$FAILED) {
        s0 = peg$parsenumber_decimal_fraction();
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c74); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "number_decimal_node",
        description: peg$descNames["number_decimal_node"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "number_decimal_node",
        description: peg$descNames["number_decimal_node"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsenumber_decimal_full() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "number_decimal_full",
        description: peg$descNames["number_decimal_full"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsenumber_digit();
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parsenumber_digit();
        }
      } else {
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsenumber_decimal_fraction();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c75(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "number_decimal_full",
        description: peg$descNames["number_decimal_full"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "number_decimal_full",
        description: peg$descNames["number_decimal_full"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsenumber_decimal_fraction() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "number_decimal_fraction",
        description: peg$descNames["number_decimal_fraction"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsesym_dot();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsenumber_digit();
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsenumber_digit();
          }
        } else {
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c76(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "number_decimal_fraction",
        description: peg$descNames["number_decimal_fraction"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "number_decimal_fraction",
        description: peg$descNames["number_decimal_fraction"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsenumber_decimal_exponent() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "number_decimal_exponent",
        description: peg$descNames["number_decimal_exponent"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 1).toLowerCase() === peg$c78) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c79); }
      }
      if (s1 !== peg$FAILED) {
        if (peg$c80.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c81); }
        }
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parsenumber_digit();
          if (s4 !== peg$FAILED) {
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$parsenumber_digit();
            }
          } else {
            s3 = peg$FAILED;
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c82(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c77); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "number_decimal_exponent",
        description: peg$descNames["number_decimal_exponent"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "number_decimal_exponent",
        description: peg$descNames["number_decimal_exponent"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseliteral_number_hex() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "literal_number_hex",
        description: peg$descNames["literal_number_hex"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2).toLowerCase() === peg$c84) {
        s1 = input.substr(peg$currPos, 2);
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c85); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsenumber_hex();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsenumber_hex();
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c86(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c83); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "literal_number_hex",
        description: peg$descNames["literal_number_hex"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "literal_number_hex",
        description: peg$descNames["literal_number_hex"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsenumber_hex() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "number_hex",
        description: peg$descNames["number_hex"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (peg$c87.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c88); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "number_hex",
        description: peg$descNames["number_hex"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "number_hex",
        description: peg$descNames["number_hex"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsenumber_digit() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "number_digit",
        description: peg$descNames["number_digit"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (peg$c89.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c90); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "number_digit",
        description: peg$descNames["number_digit"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "number_digit",
        description: peg$descNames["number_digit"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsebind_parameter() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "bind_parameter",
        description: peg$descNames["bind_parameter"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsebind_parameter_numbered();
      if (s1 === peg$FAILED) {
        s1 = peg$parsebind_parameter_named();
        if (s1 === peg$FAILED) {
          s1 = peg$parsebind_parameter_tcl();
        }
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c92(s1);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c91); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "bind_parameter",
        description: peg$descNames["bind_parameter"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "bind_parameter",
        description: peg$descNames["bind_parameter"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsebind_parameter_numbered() {
      var s0, s1, s2, s3, s4, s5,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "bind_parameter_numbered",
        description: peg$descNames["bind_parameter_numbered"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsesym_quest();
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        if (peg$c94.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c95); }
        }
        if (s3 !== peg$FAILED) {
          s4 = [];
          if (peg$c89.test(input.charAt(peg$currPos))) {
            s5 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c90); }
          }
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            if (peg$c89.test(input.charAt(peg$currPos))) {
              s5 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c90); }
            }
          }
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseo();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c96(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c93); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "bind_parameter_numbered",
        description: peg$descNames["bind_parameter_numbered"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "bind_parameter_numbered",
        description: peg$descNames["bind_parameter_numbered"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsebind_parameter_named() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "bind_parameter_named",
        description: peg$descNames["bind_parameter_named"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      if (peg$c98.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c99); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsename_char();
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsename_char();
          }
        } else {
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseo();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c100(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c97); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "bind_parameter_named",
        description: peg$descNames["bind_parameter_named"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "bind_parameter_named",
        description: peg$descNames["bind_parameter_named"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsebind_parameter_tcl() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "bind_parameter_tcl",
        description: peg$descNames["bind_parameter_tcl"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 36) {
        s1 = peg$c102;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c103); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsename_char();
        if (s3 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 58) {
            s3 = peg$c104;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c105); }
          }
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsename_char();
            if (s3 === peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 58) {
                s3 = peg$c104;
                peg$currPos++;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c105); }
              }
            }
          }
        } else {
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseo();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsetcl_suffix();
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c106(s1, s2, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c101); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "bind_parameter_tcl",
        description: peg$descNames["bind_parameter_tcl"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "bind_parameter_tcl",
        description: peg$descNames["bind_parameter_tcl"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsetcl_suffix() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "tcl_suffix",
        description: peg$descNames["tcl_suffix"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsename_dblquoted();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c107(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "tcl_suffix",
        description: peg$descNames["tcl_suffix"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "tcl_suffix",
        description: peg$descNames["tcl_suffix"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseoperation_binary() {
      var s0, s1, s2, s3, s4, s5,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "operation_binary",
        description: peg$descNames["operation_binary"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseexpression_value();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseoperator_binary();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseo();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseexpression_types();
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c109(s1, s3, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c108); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "operation_binary",
        description: peg$descNames["operation_binary"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "operation_binary",
        description: peg$descNames["operation_binary"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsebinary_loop_concat() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "binary_loop_concat",
        description: peg$descNames["binary_loop_concat"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseAND();
      if (s1 === peg$FAILED) {
        s1 = peg$parseOR();
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c110(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "binary_loop_concat",
        description: peg$descNames["binary_loop_concat"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "binary_loop_concat",
        description: peg$descNames["binary_loop_concat"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseexpression_list() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "expression_list",
        description: peg$descNames["expression_list"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseexpression();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parseexpression_list_rest();
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$parseexpression_list_rest();
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c112(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c111); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "expression_list",
        description: peg$descNames["expression_list"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "expression_list",
        description: peg$descNames["expression_list"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseexpression_list_rest() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "expression_list_rest",
        description: peg$descNames["expression_list_rest"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsesym_comma();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseexpression();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseo();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c50(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "expression_list_rest",
        description: peg$descNames["expression_list_rest"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "expression_list_rest",
        description: peg$descNames["expression_list_rest"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsefunction_call() {
      var s0, s1, s2, s3, s4, s5,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "function_call",
        description: peg$descNames["function_call"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsename_unquoted();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsesym_popen();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsefunction_call_args();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseo();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsesym_pclose();
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c114(s1, s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c113); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "function_call",
        description: peg$descNames["function_call"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "function_call",
        description: peg$descNames["function_call"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsefunction_call_args() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "function_call_args",
        description: peg$descNames["function_call_args"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$parsecall_args_star();
      if (s0 === peg$FAILED) {
        s0 = peg$parsecall_args_list();
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c115); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "function_call_args",
        description: peg$descNames["function_call_args"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "function_call_args",
        description: peg$descNames["function_call_args"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecall_args_star() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "call_args_star",
        description: peg$descNames["call_args_star"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseselect_star();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c116(s1);
      }
      s0 = s1;

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "call_args_star",
        description: peg$descNames["call_args_star"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "call_args_star",
        description: peg$descNames["call_args_star"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecall_args_list() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "call_args_list",
        description: peg$descNames["call_args_list"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$parseDISTINCT();
      if (s2 !== peg$FAILED) {
        s3 = peg$parsee();
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseexpression_list();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c117(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "call_args_list",
        description: peg$descNames["call_args_list"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "call_args_list",
        description: peg$descNames["call_args_list"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseerror_message() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "error_message",
        description: peg$descNames["error_message"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseliteral_string();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c119(s1);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c118); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "error_message",
        description: peg$descNames["error_message"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "error_message",
        description: peg$descNames["error_message"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsestmt() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "stmt",
        description: peg$descNames["stmt"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsestmt_modifier();
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsestmt_nodes();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseo();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c120(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "stmt",
        description: peg$descNames["stmt"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "stmt",
        description: peg$descNames["stmt"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsestmt_modifier() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "stmt_modifier",
        description: peg$descNames["stmt_modifier"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseEXPLAIN();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsemodifier_query();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c122(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c121); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "stmt_modifier",
        description: peg$descNames["stmt_modifier"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "stmt_modifier",
        description: peg$descNames["stmt_modifier"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsemodifier_query() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "modifier_query",
        description: peg$descNames["modifier_query"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseQUERY();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsePLAN();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsee();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c124(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c123); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "modifier_query",
        description: peg$descNames["modifier_query"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "modifier_query",
        description: peg$descNames["modifier_query"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsestmt_nodes() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "stmt_nodes",
        description: peg$descNames["stmt_nodes"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$parsestmt_crud();
      if (s0 === peg$FAILED) {
        s0 = peg$parsestmt_create();
        if (s0 === peg$FAILED) {
          s0 = peg$parsestmt_drop();
          if (s0 === peg$FAILED) {
            s0 = peg$parsestmt_transaction();
            if (s0 === peg$FAILED) {
              s0 = peg$parsestmt_alter();
              if (s0 === peg$FAILED) {
                s0 = peg$parsestmt_rollback();
                if (s0 === peg$FAILED) {
                  s0 = peg$parsestmt_savepoint();
                  if (s0 === peg$FAILED) {
                    s0 = peg$parsestmt_release();
                    if (s0 === peg$FAILED) {
                      s0 = peg$parsestmt_sqlite();
                    }
                  }
                }
              }
            }
          }
        }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "stmt_nodes",
        description: peg$descNames["stmt_nodes"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "stmt_nodes",
        description: peg$descNames["stmt_nodes"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsestmt_transaction() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "stmt_transaction",
        description: peg$descNames["stmt_transaction"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsestmt_begin();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsestmt_list();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsestmt_commit();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c126(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c125); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "stmt_transaction",
        description: peg$descNames["stmt_transaction"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "stmt_transaction",
        description: peg$descNames["stmt_transaction"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsestmt_commit() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "stmt_commit",
        description: peg$descNames["stmt_commit"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseCOMMIT();
      if (s1 === peg$FAILED) {
        s1 = peg$parseEND();
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsecommit_transaction();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseo();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c128(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c127); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "stmt_commit",
        description: peg$descNames["stmt_commit"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "stmt_commit",
        description: peg$descNames["stmt_commit"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsestmt_begin() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "stmt_begin",
        description: peg$descNames["stmt_begin"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseBEGIN();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsestmt_begin_modifier();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parsebegin_transaction();
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c130(s1, s3, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c129); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "stmt_begin",
        description: peg$descNames["stmt_begin"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "stmt_begin",
        description: peg$descNames["stmt_begin"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecommit_transaction() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "commit_transaction",
        description: peg$descNames["commit_transaction"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsee();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseTRANSACTION();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c4(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "commit_transaction",
        description: peg$descNames["commit_transaction"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "commit_transaction",
        description: peg$descNames["commit_transaction"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsebegin_transaction() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "begin_transaction",
        description: peg$descNames["begin_transaction"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseTRANSACTION();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c4(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "begin_transaction",
        description: peg$descNames["begin_transaction"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "begin_transaction",
        description: peg$descNames["begin_transaction"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsestmt_begin_modifier() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "stmt_begin_modifier",
        description: peg$descNames["stmt_begin_modifier"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseDEFERRED();
      if (s1 === peg$FAILED) {
        s1 = peg$parseIMMEDIATE();
        if (s1 === peg$FAILED) {
          s1 = peg$parseEXCLUSIVE();
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c131(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "stmt_begin_modifier",
        description: peg$descNames["stmt_begin_modifier"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "stmt_begin_modifier",
        description: peg$descNames["stmt_begin_modifier"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsestmt_rollback() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "stmt_rollback",
        description: peg$descNames["stmt_rollback"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseROLLBACK();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsebegin_transaction();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parserollback_savepoint();
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c133(s1, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c132); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "stmt_rollback",
        description: peg$descNames["stmt_rollback"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "stmt_rollback",
        description: peg$descNames["stmt_rollback"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parserollback_savepoint() {
      var s0, s1, s2, s3, s4, s5,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "rollback_savepoint",
        description: peg$descNames["rollback_savepoint"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseTO();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsesavepoint_alt();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseid_savepoint();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseo();
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c8(s4);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c134); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "rollback_savepoint",
        description: peg$descNames["rollback_savepoint"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "rollback_savepoint",
        description: peg$descNames["rollback_savepoint"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsesavepoint_alt() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "savepoint_alt",
        description: peg$descNames["savepoint_alt"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseSAVEPOINT();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c135(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "savepoint_alt",
        description: peg$descNames["savepoint_alt"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "savepoint_alt",
        description: peg$descNames["savepoint_alt"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsestmt_savepoint() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "stmt_savepoint",
        description: peg$descNames["stmt_savepoint"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsesavepoint_alt();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseid_savepoint();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseo();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c137(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c136); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "stmt_savepoint",
        description: peg$descNames["stmt_savepoint"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "stmt_savepoint",
        description: peg$descNames["stmt_savepoint"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsestmt_release() {
      var s0, s1, s2, s3, s4, s5,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "stmt_release",
        description: peg$descNames["stmt_release"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseRELEASE();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsesavepoint_alt();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseid_savepoint();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseo();
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c139(s1, s3, s4);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c138); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "stmt_release",
        description: peg$descNames["stmt_release"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "stmt_release",
        description: peg$descNames["stmt_release"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsestmt_alter() {
      var s0, s1, s2, s3, s4, s5,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "stmt_alter",
        description: peg$descNames["stmt_alter"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsealter_start();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseid_table();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseo();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsealter_action();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseo();
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c141(s1, s2, s4);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c140); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "stmt_alter",
        description: peg$descNames["stmt_alter"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "stmt_alter",
        description: peg$descNames["stmt_alter"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsealter_start() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "alter_start",
        description: peg$descNames["alter_start"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseALTER();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseTABLE();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsee();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c143(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c142); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "alter_start",
        description: peg$descNames["alter_start"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "alter_start",
        description: peg$descNames["alter_start"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsealter_action() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "alter_action",
        description: peg$descNames["alter_action"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$parsealter_action_rename();
      if (s0 === peg$FAILED) {
        s0 = peg$parsealter_action_add();
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "alter_action",
        description: peg$descNames["alter_action"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "alter_action",
        description: peg$descNames["alter_action"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsealter_action_rename() {
      var s0, s1, s2, s3, s4, s5,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "alter_action_rename",
        description: peg$descNames["alter_action_rename"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseRENAME();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseTO();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsee();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseid_table();
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c145(s1, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c144); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "alter_action_rename",
        description: peg$descNames["alter_action_rename"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "alter_action_rename",
        description: peg$descNames["alter_action_rename"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsealter_action_add() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "alter_action_add",
        description: peg$descNames["alter_action_add"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseADD();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseaction_add_modifier();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parsesource_def_column();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c147(s1, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c146); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "alter_action_add",
        description: peg$descNames["alter_action_add"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "alter_action_add",
        description: peg$descNames["alter_action_add"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseaction_add_modifier() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "action_add_modifier",
        description: peg$descNames["action_add_modifier"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseCOLUMN();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c135(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "action_add_modifier",
        description: peg$descNames["action_add_modifier"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "action_add_modifier",
        description: peg$descNames["action_add_modifier"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsestmt_crud() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "stmt_crud",
        description: peg$descNames["stmt_crud"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsestmt_core_with();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsestmt_crud_types();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c148(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "stmt_crud",
        description: peg$descNames["stmt_crud"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "stmt_crud",
        description: peg$descNames["stmt_crud"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsestmt_core_with() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "stmt_core_with",
        description: peg$descNames["stmt_core_with"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseclause_with();
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c150(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c149); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "stmt_core_with",
        description: peg$descNames["stmt_core_with"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "stmt_core_with",
        description: peg$descNames["stmt_core_with"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseclause_with() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "clause_with",
        description: peg$descNames["clause_with"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseWITH();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseclause_with_recursive();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseclause_with_tables();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c151(s1, s3, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "clause_with",
        description: peg$descNames["clause_with"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "clause_with",
        description: peg$descNames["clause_with"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseclause_with_recursive() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "clause_with_recursive",
        description: peg$descNames["clause_with_recursive"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseRECURSIVE();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c135(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "clause_with_recursive",
        description: peg$descNames["clause_with_recursive"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "clause_with_recursive",
        description: peg$descNames["clause_with_recursive"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseclause_with_tables() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "clause_with_tables",
        description: peg$descNames["clause_with_tables"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseexpression_cte();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parseclause_with_loop();
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$parseclause_with_loop();
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c152(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "clause_with_tables",
        description: peg$descNames["clause_with_tables"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "clause_with_tables",
        description: peg$descNames["clause_with_tables"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseclause_with_loop() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "clause_with_loop",
        description: peg$descNames["clause_with_loop"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsesym_comma();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseexpression_cte();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseo();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c50(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "clause_with_loop",
        description: peg$descNames["clause_with_loop"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "clause_with_loop",
        description: peg$descNames["clause_with_loop"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseexpression_cte() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "expression_cte",
        description: peg$descNames["expression_cte"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseid_cte();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseselect_alias();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c154(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c153); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "expression_cte",
        description: peg$descNames["expression_cte"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "expression_cte",
        description: peg$descNames["expression_cte"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseselect_alias() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "select_alias",
        description: peg$descNames["select_alias"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseAS();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseselect_wrapped();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c155(s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "select_alias",
        description: peg$descNames["select_alias"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "select_alias",
        description: peg$descNames["select_alias"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseselect_wrapped() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "select_wrapped",
        description: peg$descNames["select_wrapped"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsesym_popen();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsestmt_select();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseo();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsesym_pclose();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c2(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "select_wrapped",
        description: peg$descNames["select_wrapped"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "select_wrapped",
        description: peg$descNames["select_wrapped"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsestmt_sqlite() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "stmt_sqlite",
        description: peg$descNames["stmt_sqlite"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$parsestmt_detach();
      if (s0 === peg$FAILED) {
        s0 = peg$parsestmt_vacuum();
        if (s0 === peg$FAILED) {
          s0 = peg$parsestmt_analyze();
          if (s0 === peg$FAILED) {
            s0 = peg$parsestmt_reindex();
            if (s0 === peg$FAILED) {
              s0 = peg$parsestmt_pragma();
            }
          }
        }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "stmt_sqlite",
        description: peg$descNames["stmt_sqlite"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "stmt_sqlite",
        description: peg$descNames["stmt_sqlite"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsestmt_detach() {
      var s0, s1, s2, s3, s4, s5,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "stmt_detach",
        description: peg$descNames["stmt_detach"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseDETACH();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$currPos;
          s4 = peg$parseDATABASE();
          if (s4 !== peg$FAILED) {
            s5 = peg$parsee();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseid_database();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseo();
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c157(s1, s3, s4);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c156); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "stmt_detach",
        description: peg$descNames["stmt_detach"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "stmt_detach",
        description: peg$descNames["stmt_detach"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsestmt_vacuum() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "stmt_vacuum",
        description: peg$descNames["stmt_vacuum"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseVACUUM();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c159(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c158); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "stmt_vacuum",
        description: peg$descNames["stmt_vacuum"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "stmt_vacuum",
        description: peg$descNames["stmt_vacuum"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsestmt_analyze() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "stmt_analyze",
        description: peg$descNames["stmt_analyze"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseANALYZE();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseanalyze_arg();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseo();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c161(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c160); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "stmt_analyze",
        description: peg$descNames["stmt_analyze"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "stmt_analyze",
        description: peg$descNames["stmt_analyze"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseanalyze_arg() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "analyze_arg",
        description: peg$descNames["analyze_arg"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsee();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseid_table();
        if (s2 === peg$FAILED) {
          s2 = peg$parseid_index();
          if (s2 === peg$FAILED) {
            s2 = peg$parseid_database();
          }
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c8(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "analyze_arg",
        description: peg$descNames["analyze_arg"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "analyze_arg",
        description: peg$descNames["analyze_arg"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsestmt_reindex() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "stmt_reindex",
        description: peg$descNames["stmt_reindex"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseREINDEX();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsereindex_arg();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseo();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c161(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c162); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "stmt_reindex",
        description: peg$descNames["stmt_reindex"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "stmt_reindex",
        description: peg$descNames["stmt_reindex"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsereindex_arg() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "reindex_arg",
        description: peg$descNames["reindex_arg"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsee();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseid_table();
        if (s2 === peg$FAILED) {
          s2 = peg$parseid_index();
          if (s2 === peg$FAILED) {
            s2 = peg$parseid_collation();
          }
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c163(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "reindex_arg",
        description: peg$descNames["reindex_arg"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "reindex_arg",
        description: peg$descNames["reindex_arg"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsestmt_pragma() {
      var s0, s1, s2, s3, s4, s5,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "stmt_pragma",
        description: peg$descNames["stmt_pragma"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsePRAGMA();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseid_pragma();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseo();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsepragma_expression();
              if (s5 === peg$FAILED) {
                s5 = null;
              }
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c165(s1, s3, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c164); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "stmt_pragma",
        description: peg$descNames["stmt_pragma"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "stmt_pragma",
        description: peg$descNames["stmt_pragma"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsepragma_expression() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "pragma_expression",
        description: peg$descNames["pragma_expression"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsesym_equal();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsepragma_value();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseo();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c166(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsesym_popen();
        if (s1 !== peg$FAILED) {
          s2 = peg$parsepragma_value();
          if (s2 !== peg$FAILED) {
            s3 = peg$parseo();
            if (s3 !== peg$FAILED) {
              s4 = peg$parsesym_pclose();
              if (s4 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c166(s2);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "pragma_expression",
        description: peg$descNames["pragma_expression"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "pragma_expression",
        description: peg$descNames["pragma_expression"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsepragma_value() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "pragma_value",
        description: peg$descNames["pragma_value"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$parsepragma_value_bool();
      if (s0 === peg$FAILED) {
        s0 = peg$parsepragma_value_literal();
        if (s0 === peg$FAILED) {
          s0 = peg$parsepragma_value_name();
        }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "pragma_value",
        description: peg$descNames["pragma_value"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "pragma_value",
        description: peg$descNames["pragma_value"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsepragma_value_literal() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "pragma_value_literal",
        description: peg$descNames["pragma_value_literal"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseliteral_number_signed();
      if (s1 === peg$FAILED) {
        s1 = peg$parseliteral_string();
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c166(s1);
      }
      s0 = s1;

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "pragma_value_literal",
        description: peg$descNames["pragma_value_literal"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "pragma_value_literal",
        description: peg$descNames["pragma_value_literal"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsepragma_value_bool() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "pragma_value_bool",
        description: peg$descNames["pragma_value_bool"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsename();
      if (s1 !== peg$FAILED) {
        peg$savedPos = peg$currPos;
        s2 = peg$c167(s1);
        if (s2) {
          s2 = void 0;
        } else {
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c168(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "pragma_value_bool",
        description: peg$descNames["pragma_value_bool"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "pragma_value_bool",
        description: peg$descNames["pragma_value_bool"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsepragma_value_name() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "pragma_value_name",
        description: peg$descNames["pragma_value_name"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsename();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c169(s1);
      }
      s0 = s1;

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "pragma_value_name",
        description: peg$descNames["pragma_value_name"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "pragma_value_name",
        description: peg$descNames["pragma_value_name"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsestmt_crud_types() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "stmt_crud_types",
        description: peg$descNames["stmt_crud_types"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$parsestmt_select();
      if (s0 === peg$FAILED) {
        s0 = peg$parsestmt_insert();
        if (s0 === peg$FAILED) {
          s0 = peg$parsestmt_update();
          if (s0 === peg$FAILED) {
            s0 = peg$parsestmt_delete();
          }
        }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "stmt_crud_types",
        description: peg$descNames["stmt_crud_types"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "stmt_crud_types",
        description: peg$descNames["stmt_crud_types"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsestmt_select() {
      var s0, s1, s2, s3, s4, s5,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "stmt_select",
        description: peg$descNames["stmt_select"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseselect_loop();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsestmt_core_order();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseo();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsestmt_core_limit();
              if (s5 === peg$FAILED) {
                s5 = null;
              }
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c171(s1, s3, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c170); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "stmt_select",
        description: peg$descNames["stmt_select"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "stmt_select",
        description: peg$descNames["stmt_select"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsestmt_core_order() {
      var s0, s1, s2, s3, s4, s5,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "stmt_core_order",
        description: peg$descNames["stmt_core_order"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseORDER();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseBY();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsee();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsestmt_core_order_list();
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c14(s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c172); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "stmt_core_order",
        description: peg$descNames["stmt_core_order"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "stmt_core_order",
        description: peg$descNames["stmt_core_order"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsestmt_core_limit() {
      var s0, s1, s2, s3, s4, s5,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "stmt_core_limit",
        description: peg$descNames["stmt_core_limit"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseLIMIT();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseexpression();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseo();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsestmt_core_limit_offset();
              if (s5 === peg$FAILED) {
                s5 = null;
              }
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c174(s1, s3, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c173); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "stmt_core_limit",
        description: peg$descNames["stmt_core_limit"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "stmt_core_limit",
        description: peg$descNames["stmt_core_limit"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsestmt_core_limit_offset() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "stmt_core_limit_offset",
        description: peg$descNames["stmt_core_limit_offset"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parselimit_offset_variant();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseexpression();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c176(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c175); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "stmt_core_limit_offset",
        description: peg$descNames["stmt_core_limit_offset"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "stmt_core_limit_offset",
        description: peg$descNames["stmt_core_limit_offset"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parselimit_offset_variant() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "limit_offset_variant",
        description: peg$descNames["limit_offset_variant"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$parselimit_offset_variant_name();
      if (s0 === peg$FAILED) {
        s0 = peg$parsesym_comma();
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "limit_offset_variant",
        description: peg$descNames["limit_offset_variant"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "limit_offset_variant",
        description: peg$descNames["limit_offset_variant"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parselimit_offset_variant_name() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "limit_offset_variant_name",
        description: peg$descNames["limit_offset_variant_name"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseOFFSET();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c135(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "limit_offset_variant_name",
        description: peg$descNames["limit_offset_variant_name"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "limit_offset_variant_name",
        description: peg$descNames["limit_offset_variant_name"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseselect_loop() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "select_loop",
        description: peg$descNames["select_loop"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseselect_parts();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parseselect_loop_union();
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$parseselect_loop_union();
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c177(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "select_loop",
        description: peg$descNames["select_loop"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "select_loop",
        description: peg$descNames["select_loop"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseselect_loop_union() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "select_loop_union",
        description: peg$descNames["select_loop_union"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseoperator_compound();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseselect_parts();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseo();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c179(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c178); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "select_loop_union",
        description: peg$descNames["select_loop_union"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "select_loop_union",
        description: peg$descNames["select_loop_union"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseselect_parts() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "select_parts",
        description: peg$descNames["select_parts"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$parseselect_parts_core();
      if (s0 === peg$FAILED) {
        s0 = peg$parseselect_parts_values();
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "select_parts",
        description: peg$descNames["select_parts"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "select_parts",
        description: peg$descNames["select_parts"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseselect_parts_core() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "select_parts_core",
        description: peg$descNames["select_parts_core"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseselect_core_select();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseselect_core_from();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsestmt_core_where();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseselect_core_group();
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c180(s1, s2, s3, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "select_parts_core",
        description: peg$descNames["select_parts_core"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "select_parts_core",
        description: peg$descNames["select_parts_core"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseselect_core_select() {
      var s0, s1, s2, s3, s4, s5,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "select_core_select",
        description: peg$descNames["select_core_select"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseSELECT();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseselect_modifier();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseo();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseselect_target();
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c182(s3, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c181); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "select_core_select",
        description: peg$descNames["select_core_select"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "select_core_select",
        description: peg$descNames["select_core_select"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseselect_modifier() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "select_modifier",
        description: peg$descNames["select_modifier"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$parseselect_modifier_distinct();
      if (s0 === peg$FAILED) {
        s0 = peg$parseselect_modifier_all();
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c183); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "select_modifier",
        description: peg$descNames["select_modifier"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "select_modifier",
        description: peg$descNames["select_modifier"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseselect_modifier_distinct() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "select_modifier_distinct",
        description: peg$descNames["select_modifier_distinct"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseDISTINCT();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c184(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "select_modifier_distinct",
        description: peg$descNames["select_modifier_distinct"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "select_modifier_distinct",
        description: peg$descNames["select_modifier_distinct"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseselect_modifier_all() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "select_modifier_all",
        description: peg$descNames["select_modifier_all"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseALL();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c185(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "select_modifier_all",
        description: peg$descNames["select_modifier_all"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "select_modifier_all",
        description: peg$descNames["select_modifier_all"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseselect_target() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "select_target",
        description: peg$descNames["select_target"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseselect_node();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parseselect_target_loop();
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$parseselect_target_loop();
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c152(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "select_target",
        description: peg$descNames["select_target"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "select_target",
        description: peg$descNames["select_target"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseselect_target_loop() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "select_target_loop",
        description: peg$descNames["select_target_loop"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsesym_comma();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseselect_node();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseo();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c8(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "select_target_loop",
        description: peg$descNames["select_target_loop"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "select_target_loop",
        description: peg$descNames["select_target_loop"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseselect_core_from() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "select_core_from",
        description: peg$descNames["select_core_from"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseFROM();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseselect_source();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseo();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c187(s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c186); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "select_core_from",
        description: peg$descNames["select_core_from"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "select_core_from",
        description: peg$descNames["select_core_from"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsestmt_core_where() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "stmt_core_where",
        description: peg$descNames["stmt_core_where"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseWHERE();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseexpression();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseo();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c189(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c188); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "stmt_core_where",
        description: peg$descNames["stmt_core_where"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "stmt_core_where",
        description: peg$descNames["stmt_core_where"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseselect_core_group() {
      var s0, s1, s2, s3, s4, s5, s6, s7,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "select_core_group",
        description: peg$descNames["select_core_group"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseGROUP();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseBY();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsee();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseexpression_list();
              if (s5 !== peg$FAILED) {
                s6 = peg$parseo();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parseselect_core_having();
                  if (s7 === peg$FAILED) {
                    s7 = null;
                  }
                  if (s7 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c191(s1, s5, s7);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c190); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "select_core_group",
        description: peg$descNames["select_core_group"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "select_core_group",
        description: peg$descNames["select_core_group"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseselect_core_having() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "select_core_having",
        description: peg$descNames["select_core_having"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseHAVING();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseexpression();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseo();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c193(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c192); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "select_core_having",
        description: peg$descNames["select_core_having"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "select_core_having",
        description: peg$descNames["select_core_having"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseselect_node() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "select_node",
        description: peg$descNames["select_node"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$parseselect_node_star();
      if (s0 === peg$FAILED) {
        s0 = peg$parseselect_node_aliased();
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "select_node",
        description: peg$descNames["select_node"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "select_node",
        description: peg$descNames["select_node"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseselect_node_star() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "select_node_star",
        description: peg$descNames["select_node_star"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseselect_node_star_qualified();
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseselect_star();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c194(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "select_node_star",
        description: peg$descNames["select_node_star"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "select_node_star",
        description: peg$descNames["select_node_star"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseselect_node_star_qualified() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "select_node_star_qualified",
        description: peg$descNames["select_node_star_qualified"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsename();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsesym_dot();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c195(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "select_node_star_qualified",
        description: peg$descNames["select_node_star_qualified"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "select_node_star_qualified",
        description: peg$descNames["select_node_star_qualified"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseselect_node_aliased() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "select_node_aliased",
        description: peg$descNames["select_node_aliased"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseexpression();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsealias();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c196(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "select_node_aliased",
        description: peg$descNames["select_node_aliased"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "select_node_aliased",
        description: peg$descNames["select_node_aliased"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseselect_source() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "select_source",
        description: peg$descNames["select_source"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$parseselect_join_loop();
      if (s0 === peg$FAILED) {
        s0 = peg$parseselect_source_loop();
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "select_source",
        description: peg$descNames["select_source"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "select_source",
        description: peg$descNames["select_source"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseselect_source_loop() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "select_source_loop",
        description: peg$descNames["select_source_loop"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsetable_or_sub();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parsesource_loop_tail();
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$parsesource_loop_tail();
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c197(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "select_source_loop",
        description: peg$descNames["select_source_loop"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "select_source_loop",
        description: peg$descNames["select_source_loop"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsesource_loop_tail() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "source_loop_tail",
        description: peg$descNames["source_loop_tail"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsesym_comma();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsetable_or_sub();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseo();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c4(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "source_loop_tail",
        description: peg$descNames["source_loop_tail"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "source_loop_tail",
        description: peg$descNames["source_loop_tail"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsetable_or_sub() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "table_or_sub",
        description: peg$descNames["table_or_sub"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$parsetable_or_sub_sub();
      if (s0 === peg$FAILED) {
        s0 = peg$parsetable_qualified();
        if (s0 === peg$FAILED) {
          s0 = peg$parsetable_or_sub_select();
        }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "table_or_sub",
        description: peg$descNames["table_or_sub"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "table_or_sub",
        description: peg$descNames["table_or_sub"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsetable_qualified() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "table_qualified",
        description: peg$descNames["table_qualified"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsetable_qualified_id();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsetable_or_sub_index_node();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c199(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c198); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "table_qualified",
        description: peg$descNames["table_qualified"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "table_qualified",
        description: peg$descNames["table_qualified"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsetable_qualified_id() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "table_qualified_id",
        description: peg$descNames["table_qualified_id"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseid_table();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsealias();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c201(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c200); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "table_qualified_id",
        description: peg$descNames["table_qualified_id"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "table_qualified_id",
        description: peg$descNames["table_qualified_id"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsetable_or_sub_index_node() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "table_or_sub_index_node",
        description: peg$descNames["table_or_sub_index_node"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseindex_node_indexed();
      if (s1 === peg$FAILED) {
        s1 = peg$parseindex_node_none();
      }
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c203(s1);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c202); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "table_or_sub_index_node",
        description: peg$descNames["table_or_sub_index_node"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "table_or_sub_index_node",
        description: peg$descNames["table_or_sub_index_node"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseindex_node_indexed() {
      var s0, s1, s2, s3, s4, s5, s6,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "index_node_indexed",
        description: peg$descNames["index_node_indexed"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseINDEXED();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseBY();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsee();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsename();
              if (s5 !== peg$FAILED) {
                s6 = peg$parseo();
                if (s6 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c204(s1, s5);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "index_node_indexed",
        description: peg$descNames["index_node_indexed"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "index_node_indexed",
        description: peg$descNames["index_node_indexed"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseindex_node_none() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "index_node_none",
        description: peg$descNames["index_node_none"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseexpression_is_not();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseINDEXED();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseo();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c205();
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "index_node_none",
        description: peg$descNames["index_node_none"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "index_node_none",
        description: peg$descNames["index_node_none"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsetable_or_sub_sub() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "table_or_sub_sub",
        description: peg$descNames["table_or_sub_sub"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsesym_popen();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseselect_source();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseo();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsesym_pclose();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c207(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c206); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "table_or_sub_sub",
        description: peg$descNames["table_or_sub_sub"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "table_or_sub_sub",
        description: peg$descNames["table_or_sub_sub"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsetable_or_sub_select() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "table_or_sub_select",
        description: peg$descNames["table_or_sub_select"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseselect_wrapped();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsealias();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c209(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c208); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "table_or_sub_select",
        description: peg$descNames["table_or_sub_select"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "table_or_sub_select",
        description: peg$descNames["table_or_sub_select"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsealias() {
      var s0, s1, s2, s3, s4, s5,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "alias",
        description: peg$descNames["alias"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$parseAS();
      if (s2 !== peg$FAILED) {
        s3 = peg$currPos;
        s4 = peg$currPos;
        peg$silentFails++;
        s5 = peg$parsename_char();
        peg$silentFails--;
        if (s5 === peg$FAILED) {
          s4 = void 0;
        } else {
          peg$currPos = s4;
          s4 = peg$FAILED;
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parseo();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsename();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseo();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c211(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c210); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "alias",
        description: peg$descNames["alias"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "alias",
        description: peg$descNames["alias"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseselect_join_loop() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "select_join_loop",
        description: peg$descNames["select_join_loop"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsetable_or_sub();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parseselect_join_clause();
          if (s4 !== peg$FAILED) {
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$parseselect_join_clause();
            }
          } else {
            s3 = peg$FAILED;
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c212(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "select_join_loop",
        description: peg$descNames["select_join_loop"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "select_join_loop",
        description: peg$descNames["select_join_loop"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseselect_join_clause() {
      var s0, s1, s2, s3, s4, s5,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "select_join_clause",
        description: peg$descNames["select_join_clause"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsejoin_operator();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsetable_or_sub();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseo();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsejoin_condition();
              if (s5 === peg$FAILED) {
                s5 = null;
              }
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c214(s1, s3, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c213); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "select_join_clause",
        description: peg$descNames["select_join_clause"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "select_join_clause",
        description: peg$descNames["select_join_clause"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsejoin_operator() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "join_operator",
        description: peg$descNames["join_operator"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsejoin_operator_natural();
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsejoin_operator_types();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseJOIN();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c216(s1, s3, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c215); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "join_operator",
        description: peg$descNames["join_operator"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "join_operator",
        description: peg$descNames["join_operator"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsejoin_operator_natural() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "join_operator_natural",
        description: peg$descNames["join_operator_natural"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseNATURAL();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c45(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "join_operator_natural",
        description: peg$descNames["join_operator_natural"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "join_operator_natural",
        description: peg$descNames["join_operator_natural"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsejoin_operator_types() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "join_operator_types",
        description: peg$descNames["join_operator_types"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$parseoperator_types_hand();
      if (s0 === peg$FAILED) {
        s0 = peg$parseoperator_types_misc();
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "join_operator_types",
        description: peg$descNames["join_operator_types"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "join_operator_types",
        description: peg$descNames["join_operator_types"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseoperator_types_hand() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "operator_types_hand",
        description: peg$descNames["operator_types_hand"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseLEFT();
      if (s1 === peg$FAILED) {
        s1 = peg$parseRIGHT();
        if (s1 === peg$FAILED) {
          s1 = peg$parseFULL();
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsetypes_hand_outer();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c217(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "operator_types_hand",
        description: peg$descNames["operator_types_hand"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "operator_types_hand",
        description: peg$descNames["operator_types_hand"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsetypes_hand_outer() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "types_hand_outer",
        description: peg$descNames["types_hand_outer"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseOUTER();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c218(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "types_hand_outer",
        description: peg$descNames["types_hand_outer"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "types_hand_outer",
        description: peg$descNames["types_hand_outer"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseoperator_types_misc() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "operator_types_misc",
        description: peg$descNames["operator_types_misc"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseINNER();
      if (s1 === peg$FAILED) {
        s1 = peg$parseCROSS();
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c218(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "operator_types_misc",
        description: peg$descNames["operator_types_misc"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "operator_types_misc",
        description: peg$descNames["operator_types_misc"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsejoin_condition() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "join_condition",
        description: peg$descNames["join_condition"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsejoin_condition_on();
      if (s1 === peg$FAILED) {
        s1 = peg$parsejoin_condition_using();
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c220(s1);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c219); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "join_condition",
        description: peg$descNames["join_condition"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "join_condition",
        description: peg$descNames["join_condition"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsejoin_condition_on() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "join_condition_on",
        description: peg$descNames["join_condition_on"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseON();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseexpression();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c222(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c221); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "join_condition_on",
        description: peg$descNames["join_condition_on"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "join_condition_on",
        description: peg$descNames["join_condition_on"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsejoin_condition_using() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "join_condition_using",
        description: peg$descNames["join_condition_using"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseUSING();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseloop_columns();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c224(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c223); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "join_condition_using",
        description: peg$descNames["join_condition_using"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "join_condition_using",
        description: peg$descNames["join_condition_using"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseselect_parts_values() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "select_parts_values",
        description: peg$descNames["select_parts_values"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseVALUES();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseinsert_values_list();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c226(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c225); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "select_parts_values",
        description: peg$descNames["select_parts_values"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "select_parts_values",
        description: peg$descNames["select_parts_values"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsestmt_core_order_list() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "stmt_core_order_list",
        description: peg$descNames["stmt_core_order_list"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsestmt_core_order_list_item();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsestmt_core_order_list_loop();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c227(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "stmt_core_order_list",
        description: peg$descNames["stmt_core_order_list"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "stmt_core_order_list",
        description: peg$descNames["stmt_core_order_list"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsestmt_core_order_list_loop() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "stmt_core_order_list_loop",
        description: peg$descNames["stmt_core_order_list_loop"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsesym_comma();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsestmt_core_order_list_item();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseo();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c228(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "stmt_core_order_list_loop",
        description: peg$descNames["stmt_core_order_list_loop"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "stmt_core_order_list_loop",
        description: peg$descNames["stmt_core_order_list_loop"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsestmt_core_order_list_item() {
      var s0, s1, s2, s3, s4, s5,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "stmt_core_order_list_item",
        description: peg$descNames["stmt_core_order_list_item"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseexpression();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsecolumn_collate();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseo();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsestmt_core_order_list_dir();
              if (s5 === peg$FAILED) {
                s5 = null;
              }
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c230(s1, s3, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c229); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "stmt_core_order_list_item",
        description: peg$descNames["stmt_core_order_list_item"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "stmt_core_order_list_item",
        description: peg$descNames["stmt_core_order_list_item"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsestmt_core_order_list_dir() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "stmt_core_order_list_dir",
        description: peg$descNames["stmt_core_order_list_dir"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$parseprimary_column_dir();
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c231); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "stmt_core_order_list_dir",
        description: peg$descNames["stmt_core_order_list_dir"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "stmt_core_order_list_dir",
        description: peg$descNames["stmt_core_order_list_dir"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseselect_star() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "select_star",
        description: peg$descNames["select_star"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$parsesym_star();
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c232); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "select_star",
        description: peg$descNames["select_star"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "select_star",
        description: peg$descNames["select_star"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsestmt_fallback_types() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "stmt_fallback_types",
        description: peg$descNames["stmt_fallback_types"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseREPLACE();
      if (s1 === peg$FAILED) {
        s1 = peg$parseROLLBACK();
        if (s1 === peg$FAILED) {
          s1 = peg$parseABORT();
          if (s1 === peg$FAILED) {
            s1 = peg$parseFAIL();
            if (s1 === peg$FAILED) {
              s1 = peg$parseIGNORE();
            }
          }
        }
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c234(s1);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c233); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "stmt_fallback_types",
        description: peg$descNames["stmt_fallback_types"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "stmt_fallback_types",
        description: peg$descNames["stmt_fallback_types"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsestmt_insert() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "stmt_insert",
        description: peg$descNames["stmt_insert"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseinsert_keyword();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseinsert_target();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c236(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c235); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "stmt_insert",
        description: peg$descNames["stmt_insert"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "stmt_insert",
        description: peg$descNames["stmt_insert"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseinsert_keyword() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "insert_keyword",
        description: peg$descNames["insert_keyword"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$parseinsert_keyword_ins();
      if (s0 === peg$FAILED) {
        s0 = peg$parseinsert_keyword_repl();
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "insert_keyword",
        description: peg$descNames["insert_keyword"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "insert_keyword",
        description: peg$descNames["insert_keyword"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseinsert_keyword_ins() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "insert_keyword_ins",
        description: peg$descNames["insert_keyword_ins"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseINSERT();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseinsert_keyword_mod();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c238(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c237); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "insert_keyword_ins",
        description: peg$descNames["insert_keyword_ins"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "insert_keyword_ins",
        description: peg$descNames["insert_keyword_ins"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseinsert_keyword_repl() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "insert_keyword_repl",
        description: peg$descNames["insert_keyword_repl"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseREPLACE();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c240(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c239); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "insert_keyword_repl",
        description: peg$descNames["insert_keyword_repl"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "insert_keyword_repl",
        description: peg$descNames["insert_keyword_repl"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseinsert_keyword_mod() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "insert_keyword_mod",
        description: peg$descNames["insert_keyword_mod"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseOR();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsestmt_fallback_types();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c242(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c241); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "insert_keyword_mod",
        description: peg$descNames["insert_keyword_mod"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "insert_keyword_mod",
        description: peg$descNames["insert_keyword_mod"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseinsert_target() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "insert_target",
        description: peg$descNames["insert_target"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseinsert_into();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseinsert_results();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c243(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "insert_target",
        description: peg$descNames["insert_target"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "insert_target",
        description: peg$descNames["insert_target"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseinsert_into() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "insert_into",
        description: peg$descNames["insert_into"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseinsert_into_start();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseid_cte();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c245(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c244); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "insert_into",
        description: peg$descNames["insert_into"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "insert_into",
        description: peg$descNames["insert_into"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseinsert_into_start() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "insert_into_start",
        description: peg$descNames["insert_into_start"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseINTO();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c246); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "insert_into_start",
        description: peg$descNames["insert_into_start"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "insert_into_start",
        description: peg$descNames["insert_into_start"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseinsert_results() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "insert_results",
        description: peg$descNames["insert_results"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseinsert_value();
      if (s1 === peg$FAILED) {
        s1 = peg$parseinsert_select();
        if (s1 === peg$FAILED) {
          s1 = peg$parseinsert_default();
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c247(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c225); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "insert_results",
        description: peg$descNames["insert_results"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "insert_results",
        description: peg$descNames["insert_results"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseloop_columns() {
      var s0, s1, s2, s3, s4, s5,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "loop_columns",
        description: peg$descNames["loop_columns"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsesym_popen();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseloop_name();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseo();
          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$parseloop_column_tail();
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parseloop_column_tail();
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsesym_pclose();
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c249(s2, s4);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c248); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "loop_columns",
        description: peg$descNames["loop_columns"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "loop_columns",
        description: peg$descNames["loop_columns"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseloop_column_tail() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "loop_column_tail",
        description: peg$descNames["loop_column_tail"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsesym_comma();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseloop_name();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseo();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c250(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "loop_column_tail",
        description: peg$descNames["loop_column_tail"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "loop_column_tail",
        description: peg$descNames["loop_column_tail"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseloop_name() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "loop_name",
        description: peg$descNames["loop_name"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsename();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c252(s1);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c251); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "loop_name",
        description: peg$descNames["loop_name"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "loop_name",
        description: peg$descNames["loop_name"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseinsert_value() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "insert_value",
        description: peg$descNames["insert_value"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseinsert_value_start();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseinsert_values_list();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c253(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c225); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "insert_value",
        description: peg$descNames["insert_value"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "insert_value",
        description: peg$descNames["insert_value"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseinsert_value_start() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "insert_value_start",
        description: peg$descNames["insert_value_start"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseVALUES();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c135(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c254); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "insert_value_start",
        description: peg$descNames["insert_value_start"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "insert_value_start",
        description: peg$descNames["insert_value_start"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseinsert_values_list() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "insert_values_list",
        description: peg$descNames["insert_values_list"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseinsert_values();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parseinsert_values_loop();
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$parseinsert_values_loop();
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c1(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "insert_values_list",
        description: peg$descNames["insert_values_list"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "insert_values_list",
        description: peg$descNames["insert_values_list"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseinsert_values_loop() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "insert_values_loop",
        description: peg$descNames["insert_values_loop"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsesym_comma();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseinsert_values();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseo();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c50(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "insert_values_loop",
        description: peg$descNames["insert_values_loop"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "insert_values_loop",
        description: peg$descNames["insert_values_loop"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseinsert_values() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "insert_values",
        description: peg$descNames["insert_values"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsesym_popen();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseexpression_list();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseo();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsesym_pclose();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c256(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c255); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "insert_values",
        description: peg$descNames["insert_values"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "insert_values",
        description: peg$descNames["insert_values"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseinsert_select() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "insert_select",
        description: peg$descNames["insert_select"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$parsestmt_select();
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c181); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "insert_select",
        description: peg$descNames["insert_select"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "insert_select",
        description: peg$descNames["insert_select"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseinsert_default() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "insert_default",
        description: peg$descNames["insert_default"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseDEFAULT();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseVALUES();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c258(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c257); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "insert_default",
        description: peg$descNames["insert_default"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "insert_default",
        description: peg$descNames["insert_default"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseoperator_compound() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "operator_compound",
        description: peg$descNames["operator_compound"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsecompound_union();
      if (s1 === peg$FAILED) {
        s1 = peg$parseINTERSECT();
        if (s1 === peg$FAILED) {
          s1 = peg$parseEXCEPT();
        }
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c135(s1);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c259); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "operator_compound",
        description: peg$descNames["operator_compound"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "operator_compound",
        description: peg$descNames["operator_compound"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecompound_union() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "compound_union",
        description: peg$descNames["compound_union"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseUNION();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsecompound_union_all();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c261(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c260); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "compound_union",
        description: peg$descNames["compound_union"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "compound_union",
        description: peg$descNames["compound_union"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecompound_union_all() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "compound_union_all",
        description: peg$descNames["compound_union_all"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsee();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseALL();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c163(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "compound_union_all",
        description: peg$descNames["compound_union_all"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "compound_union_all",
        description: peg$descNames["compound_union_all"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsestmt_update() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "stmt_update",
        description: peg$descNames["stmt_update"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseupdate_start();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseupdate_fallback();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsetable_qualified();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseo();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseupdate_set();
              if (s5 !== peg$FAILED) {
                s6 = peg$parsestmt_core_where();
                if (s6 === peg$FAILED) {
                  s6 = null;
                }
                if (s6 !== peg$FAILED) {
                  s7 = peg$parsestmt_core_order();
                  if (s7 === peg$FAILED) {
                    s7 = null;
                  }
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parseo();
                    if (s8 !== peg$FAILED) {
                      s9 = peg$parsestmt_core_limit();
                      if (s9 === peg$FAILED) {
                        s9 = null;
                      }
                      if (s9 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c263(s1, s2, s3, s5, s6, s7, s9);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c262); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "stmt_update",
        description: peg$descNames["stmt_update"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "stmt_update",
        description: peg$descNames["stmt_update"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseupdate_start() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "update_start",
        description: peg$descNames["update_start"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseUPDATE();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c135(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c264); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "update_start",
        description: peg$descNames["update_start"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "update_start",
        description: peg$descNames["update_start"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseupdate_fallback() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "update_fallback",
        description: peg$descNames["update_fallback"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseOR();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsestmt_fallback_types();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsee();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c266(s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c265); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "update_fallback",
        description: peg$descNames["update_fallback"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "update_fallback",
        description: peg$descNames["update_fallback"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseupdate_set() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "update_set",
        description: peg$descNames["update_set"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseSET();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseupdate_columns();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseo();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c268(s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c267); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "update_set",
        description: peg$descNames["update_set"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "update_set",
        description: peg$descNames["update_set"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseupdate_columns() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "update_columns",
        description: peg$descNames["update_columns"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseupdate_column();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parseupdate_columns_tail();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parseupdate_columns_tail();
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c1(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "update_columns",
        description: peg$descNames["update_columns"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "update_columns",
        description: peg$descNames["update_columns"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseupdate_columns_tail() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "update_columns_tail",
        description: peg$descNames["update_columns_tail"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseo();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsesym_comma();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseupdate_column();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c250(s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "update_columns_tail",
        description: peg$descNames["update_columns_tail"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "update_columns_tail",
        description: peg$descNames["update_columns_tail"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseupdate_column() {
      var s0, s1, s2, s3, s4, s5,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "update_column",
        description: peg$descNames["update_column"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseid_column();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsesym_equal();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseexpression_types();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseo();
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c270(s1, s4);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c269); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "update_column",
        description: peg$descNames["update_column"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "update_column",
        description: peg$descNames["update_column"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsestmt_delete() {
      var s0, s1, s2, s3, s4, s5, s6,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "stmt_delete",
        description: peg$descNames["stmt_delete"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsedelete_start();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsetable_qualified();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseo();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsestmt_core_where();
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsestmt_core_order();
              if (s5 === peg$FAILED) {
                s5 = null;
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parsestmt_core_limit();
                if (s6 === peg$FAILED) {
                  s6 = null;
                }
                if (s6 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c272(s1, s2, s4, s5, s6);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c271); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "stmt_delete",
        description: peg$descNames["stmt_delete"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "stmt_delete",
        description: peg$descNames["stmt_delete"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsedelete_start() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "delete_start",
        description: peg$descNames["delete_start"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseDELETE();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseFROM();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsee();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c135(s1);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c273); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "delete_start",
        description: peg$descNames["delete_start"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "delete_start",
        description: peg$descNames["delete_start"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsestmt_create() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "stmt_create",
        description: peg$descNames["stmt_create"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$parsecreate_table_only();
      if (s0 === peg$FAILED) {
        s0 = peg$parsecreate_index_only();
        if (s0 === peg$FAILED) {
          s0 = peg$parsecreate_trigger_only();
          if (s0 === peg$FAILED) {
            s0 = peg$parsecreate_view_only();
            if (s0 === peg$FAILED) {
              s0 = peg$parsecreate_virtual_only();
            }
          }
        }
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c274); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "stmt_create",
        description: peg$descNames["stmt_create"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "stmt_create",
        description: peg$descNames["stmt_create"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecreate_start() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "create_start",
        description: peg$descNames["create_start"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseCREATE();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c135(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "create_start",
        description: peg$descNames["create_start"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "create_start",
        description: peg$descNames["create_start"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecreate_table_only() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "create_table_only",
        description: peg$descNames["create_table_only"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$currPos;
      peg$silentFails++;
      s2 = peg$currPos;
      s3 = peg$parsecreate_start();
      if (s3 !== peg$FAILED) {
        s4 = peg$parseINDEX();
        if (s4 === peg$FAILED) {
          s4 = peg$parseTRIGGER();
          if (s4 === peg$FAILED) {
            s4 = peg$parseVIEW();
            if (s4 === peg$FAILED) {
              s4 = peg$parseVIRTUAL();
            }
          }
        }
        if (s4 !== peg$FAILED) {
          s3 = [s3, s4];
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      peg$silentFails--;
      if (s2 === peg$FAILED) {
        s1 = void 0;
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsecreate_table();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c250(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "create_table_only",
        description: peg$descNames["create_table_only"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "create_table_only",
        description: peg$descNames["create_table_only"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecreate_index_only() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "create_index_only",
        description: peg$descNames["create_index_only"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$currPos;
      peg$silentFails++;
      s2 = peg$currPos;
      s3 = peg$parsecreate_start();
      if (s3 !== peg$FAILED) {
        s4 = peg$parseTABLE();
        if (s4 === peg$FAILED) {
          s4 = peg$parseTRIGGER();
          if (s4 === peg$FAILED) {
            s4 = peg$parseVIEW();
            if (s4 === peg$FAILED) {
              s4 = peg$parseVIRTUAL();
            }
          }
        }
        if (s4 !== peg$FAILED) {
          s3 = [s3, s4];
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      peg$silentFails--;
      if (s2 === peg$FAILED) {
        s1 = void 0;
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsecreate_index();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c250(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "create_index_only",
        description: peg$descNames["create_index_only"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "create_index_only",
        description: peg$descNames["create_index_only"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecreate_trigger_only() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "create_trigger_only",
        description: peg$descNames["create_trigger_only"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$currPos;
      peg$silentFails++;
      s2 = peg$currPos;
      s3 = peg$parsecreate_start();
      if (s3 !== peg$FAILED) {
        s4 = peg$parseTABLE();
        if (s4 === peg$FAILED) {
          s4 = peg$parseINDEX();
          if (s4 === peg$FAILED) {
            s4 = peg$parseVIEW();
            if (s4 === peg$FAILED) {
              s4 = peg$parseVIRTUAL();
            }
          }
        }
        if (s4 !== peg$FAILED) {
          s3 = [s3, s4];
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      peg$silentFails--;
      if (s2 === peg$FAILED) {
        s1 = void 0;
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsecreate_trigger();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c250(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "create_trigger_only",
        description: peg$descNames["create_trigger_only"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "create_trigger_only",
        description: peg$descNames["create_trigger_only"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecreate_view_only() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "create_view_only",
        description: peg$descNames["create_view_only"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$currPos;
      peg$silentFails++;
      s2 = peg$currPos;
      s3 = peg$parsecreate_start();
      if (s3 !== peg$FAILED) {
        s4 = peg$parseTABLE();
        if (s4 === peg$FAILED) {
          s4 = peg$parseINDEX();
          if (s4 === peg$FAILED) {
            s4 = peg$parseTRIGGER();
            if (s4 === peg$FAILED) {
              s4 = peg$parseVIRTUAL();
            }
          }
        }
        if (s4 !== peg$FAILED) {
          s3 = [s3, s4];
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      peg$silentFails--;
      if (s2 === peg$FAILED) {
        s1 = void 0;
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsecreate_view();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c250(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "create_view_only",
        description: peg$descNames["create_view_only"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "create_view_only",
        description: peg$descNames["create_view_only"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecreate_virtual_only() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "create_virtual_only",
        description: peg$descNames["create_virtual_only"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$currPos;
      peg$silentFails++;
      s2 = peg$currPos;
      s3 = peg$parsecreate_start();
      if (s3 !== peg$FAILED) {
        s4 = peg$parseTABLE();
        if (s4 === peg$FAILED) {
          s4 = peg$parseINDEX();
          if (s4 === peg$FAILED) {
            s4 = peg$parseTRIGGER();
            if (s4 === peg$FAILED) {
              s4 = peg$parseVIEW();
            }
          }
        }
        if (s4 !== peg$FAILED) {
          s3 = [s3, s4];
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      peg$silentFails--;
      if (s2 === peg$FAILED) {
        s1 = void 0;
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsecreate_virtual();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c250(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "create_virtual_only",
        description: peg$descNames["create_virtual_only"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "create_virtual_only",
        description: peg$descNames["create_virtual_only"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecreate_table() {
      var s0, s1, s2, s3, s4, s5,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "create_table",
        description: peg$descNames["create_table"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsecreate_table_start();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsecreate_core_ine();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseid_table();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseo();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsecreate_table_source();
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c276(s1, s2, s3, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c275); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "create_table",
        description: peg$descNames["create_table"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "create_table",
        description: peg$descNames["create_table"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecreate_table_start() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "create_table_start",
        description: peg$descNames["create_table_start"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsecreate_start();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsecreate_core_tmp();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseTABLE();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsee();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c277(s1, s2, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "create_table_start",
        description: peg$descNames["create_table_start"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "create_table_start",
        description: peg$descNames["create_table_start"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecreate_core_tmp() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "create_core_tmp",
        description: peg$descNames["create_core_tmp"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseTEMPORARY();
      if (s1 === peg$FAILED) {
        s1 = peg$parseTEMP();
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c42(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "create_core_tmp",
        description: peg$descNames["create_core_tmp"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "create_core_tmp",
        description: peg$descNames["create_core_tmp"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecreate_core_ine() {
      var s0, s1, s2, s3, s4, s5,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "create_core_ine",
        description: peg$descNames["create_core_ine"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseIF();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseexpression_is_not();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseEXISTS();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsee();
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c279(s1, s3, s4);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c278); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "create_core_ine",
        description: peg$descNames["create_core_ine"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "create_core_ine",
        description: peg$descNames["create_core_ine"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecreate_table_source() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "create_table_source",
        description: peg$descNames["create_table_source"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$parsetable_source_def();
      if (s0 === peg$FAILED) {
        s0 = peg$parsetable_source_select();
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "create_table_source",
        description: peg$descNames["create_table_source"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "create_table_source",
        description: peg$descNames["create_table_source"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsetable_source_def() {
      var s0, s1, s2, s3, s4, s5,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "table_source_def",
        description: peg$descNames["table_source_def"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsesym_popen();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsesource_def_loop();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parsesource_tbl_loop();
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$parsesource_tbl_loop();
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parsesym_pclose();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsesource_def_rowid();
              if (s5 === peg$FAILED) {
                s5 = null;
              }
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c281(s2, s3, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c280); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "table_source_def",
        description: peg$descNames["table_source_def"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "table_source_def",
        description: peg$descNames["table_source_def"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsesource_def_rowid() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "source_def_rowid",
        description: peg$descNames["source_def_rowid"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseWITHOUT();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseROWID();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseo();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c282(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "source_def_rowid",
        description: peg$descNames["source_def_rowid"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "source_def_rowid",
        description: peg$descNames["source_def_rowid"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsesource_def_loop() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "source_def_loop",
        description: peg$descNames["source_def_loop"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsesource_def_column();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parsesource_def_tail();
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$parsesource_def_tail();
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c1(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "source_def_loop",
        description: peg$descNames["source_def_loop"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "source_def_loop",
        description: peg$descNames["source_def_loop"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsesource_def_tail() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "source_def_tail",
        description: peg$descNames["source_def_tail"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsesym_comma();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsesource_def_column();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseo();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c4(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "source_def_tail",
        description: peg$descNames["source_def_tail"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "source_def_tail",
        description: peg$descNames["source_def_tail"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsesource_tbl_loop() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "source_tbl_loop",
        description: peg$descNames["source_tbl_loop"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsesym_comma();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsetable_constraint();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c283(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "source_tbl_loop",
        description: peg$descNames["source_tbl_loop"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "source_tbl_loop",
        description: peg$descNames["source_tbl_loop"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsesource_def_column() {
      var s0, s1, s2, s3, s4, s5,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "source_def_column",
        description: peg$descNames["source_def_column"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseid_column();
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        s3 = peg$currPos;
        peg$silentFails++;
        s4 = peg$parsename_char();
        peg$silentFails--;
        if (s4 === peg$FAILED) {
          s3 = void 0;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parseo();
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsecolumn_type();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseo();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsecolumn_constraints();
              if (s5 === peg$FAILED) {
                s5 = null;
              }
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c285(s1, s3, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c284); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "source_def_column",
        description: peg$descNames["source_def_column"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "source_def_column",
        description: peg$descNames["source_def_column"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecolumn_type() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "column_type",
        description: peg$descNames["column_type"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsetype_definition();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c287(s1);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c286); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "column_type",
        description: peg$descNames["column_type"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "column_type",
        description: peg$descNames["column_type"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecolumn_constraints() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "column_constraints",
        description: peg$descNames["column_constraints"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsecolumn_constraint();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsecolumn_constraint_tail();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsecolumn_constraint_tail();
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseo();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c1(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "column_constraints",
        description: peg$descNames["column_constraints"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "column_constraints",
        description: peg$descNames["column_constraints"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecolumn_constraint_tail() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "column_constraint_tail",
        description: peg$descNames["column_constraint_tail"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseo();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsecolumn_constraint();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c250(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "column_constraint_tail",
        description: peg$descNames["column_constraint_tail"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "column_constraint_tail",
        description: peg$descNames["column_constraint_tail"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecolumn_constraint() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "column_constraint",
        description: peg$descNames["column_constraint"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsecolumn_constraint_name();
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsecolumn_constraint_types();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c289(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c288); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "column_constraint",
        description: peg$descNames["column_constraint"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "column_constraint",
        description: peg$descNames["column_constraint"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecolumn_constraint_name() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "column_constraint_name",
        description: peg$descNames["column_constraint_name"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseCONSTRAINT();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseid_constraint_column();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseo();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c8(s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c290); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "column_constraint_name",
        description: peg$descNames["column_constraint_name"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "column_constraint_name",
        description: peg$descNames["column_constraint_name"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecolumn_constraint_types() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "column_constraint_types",
        description: peg$descNames["column_constraint_types"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$parsecolumn_constraint_primary();
      if (s0 === peg$FAILED) {
        s0 = peg$parsecolumn_constraint_null();
        if (s0 === peg$FAILED) {
          s0 = peg$parsecolumn_constraint_check();
          if (s0 === peg$FAILED) {
            s0 = peg$parsecolumn_constraint_default();
            if (s0 === peg$FAILED) {
              s0 = peg$parsecolumn_constraint_collate();
              if (s0 === peg$FAILED) {
                s0 = peg$parsecolumn_constraint_foreign();
              }
            }
          }
        }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "column_constraint_types",
        description: peg$descNames["column_constraint_types"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "column_constraint_types",
        description: peg$descNames["column_constraint_types"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecolumn_constraint_foreign() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "column_constraint_foreign",
        description: peg$descNames["column_constraint_foreign"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseforeign_clause();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c292(s1);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c291); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "column_constraint_foreign",
        description: peg$descNames["column_constraint_foreign"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "column_constraint_foreign",
        description: peg$descNames["column_constraint_foreign"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecolumn_constraint_primary() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "column_constraint_primary",
        description: peg$descNames["column_constraint_primary"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsecol_primary_start();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsecol_primary_dir();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseprimary_conflict();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parsecol_primary_auto();
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c294(s1, s2, s3, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c293); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "column_constraint_primary",
        description: peg$descNames["column_constraint_primary"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "column_constraint_primary",
        description: peg$descNames["column_constraint_primary"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecol_primary_start() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "col_primary_start",
        description: peg$descNames["col_primary_start"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsePRIMARY();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseKEY();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseo();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c296(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c295); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "col_primary_start",
        description: peg$descNames["col_primary_start"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "col_primary_start",
        description: peg$descNames["col_primary_start"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecol_primary_dir() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "col_primary_dir",
        description: peg$descNames["col_primary_dir"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseprimary_column_dir();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c297(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "col_primary_dir",
        description: peg$descNames["col_primary_dir"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "col_primary_dir",
        description: peg$descNames["col_primary_dir"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecol_primary_auto() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "col_primary_auto",
        description: peg$descNames["col_primary_auto"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseAUTOINCREMENT();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c299(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c298); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "col_primary_auto",
        description: peg$descNames["col_primary_auto"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "col_primary_auto",
        description: peg$descNames["col_primary_auto"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecolumn_constraint_null() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "column_constraint_null",
        description: peg$descNames["column_constraint_null"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseconstraint_null_types();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseprimary_conflict();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseo();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c300(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "column_constraint_null",
        description: peg$descNames["column_constraint_null"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "column_constraint_null",
        description: peg$descNames["column_constraint_null"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseconstraint_null_types() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "constraint_null_types",
        description: peg$descNames["constraint_null_types"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseconstraint_null_value();
      if (s1 === peg$FAILED) {
        s1 = peg$parseUNIQUE();
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c42(s1);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c301); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "constraint_null_types",
        description: peg$descNames["constraint_null_types"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "constraint_null_types",
        description: peg$descNames["constraint_null_types"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseconstraint_null_value() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "constraint_null_value",
        description: peg$descNames["constraint_null_value"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseexpression_is_not();
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseNULL();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c303(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c302); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "constraint_null_value",
        description: peg$descNames["constraint_null_value"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "constraint_null_value",
        description: peg$descNames["constraint_null_value"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecolumn_constraint_check() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "column_constraint_check",
        description: peg$descNames["column_constraint_check"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$parseconstraint_check();
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c304); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "column_constraint_check",
        description: peg$descNames["column_constraint_check"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "column_constraint_check",
        description: peg$descNames["column_constraint_check"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecolumn_constraint_default() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "column_constraint_default",
        description: peg$descNames["column_constraint_default"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseDEFAULT();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsecol_default_val();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c306(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c305); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "column_constraint_default",
        description: peg$descNames["column_constraint_default"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "column_constraint_default",
        description: peg$descNames["column_constraint_default"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecol_default_val() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "col_default_val",
        description: peg$descNames["col_default_val"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseo();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseexpression_wrapped();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c166(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsee();
        if (s1 !== peg$FAILED) {
          s2 = peg$parseliteral_number_signed();
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c166(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parsee();
          if (s1 !== peg$FAILED) {
            s2 = peg$parseliteral_value();
            if (s2 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c166(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        }
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c307); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "col_default_val",
        description: peg$descNames["col_default_val"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "col_default_val",
        description: peg$descNames["col_default_val"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecolumn_constraint_collate() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "column_constraint_collate",
        description: peg$descNames["column_constraint_collate"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsecolumn_collate();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c309(s1);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c308); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "column_constraint_collate",
        description: peg$descNames["column_constraint_collate"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "column_constraint_collate",
        description: peg$descNames["column_constraint_collate"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsetable_constraint() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "table_constraint",
        description: peg$descNames["table_constraint"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsetable_constraint_name();
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsetable_constraint_types();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseo();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c311(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c310); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "table_constraint",
        description: peg$descNames["table_constraint"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "table_constraint",
        description: peg$descNames["table_constraint"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsetable_constraint_name() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "table_constraint_name",
        description: peg$descNames["table_constraint_name"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseCONSTRAINT();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseid_constraint_table();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c8(s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c312); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "table_constraint_name",
        description: peg$descNames["table_constraint_name"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "table_constraint_name",
        description: peg$descNames["table_constraint_name"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsetable_constraint_types() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "table_constraint_types",
        description: peg$descNames["table_constraint_types"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$parsetable_constraint_foreign();
      if (s0 === peg$FAILED) {
        s0 = peg$parsetable_constraint_primary();
        if (s0 === peg$FAILED) {
          s0 = peg$parsetable_constraint_check();
        }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "table_constraint_types",
        description: peg$descNames["table_constraint_types"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "table_constraint_types",
        description: peg$descNames["table_constraint_types"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsetable_constraint_check() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "table_constraint_check",
        description: peg$descNames["table_constraint_check"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseconstraint_check();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c314(s1);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c313); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "table_constraint_check",
        description: peg$descNames["table_constraint_check"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "table_constraint_check",
        description: peg$descNames["table_constraint_check"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsetable_constraint_primary() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "table_constraint_primary",
        description: peg$descNames["table_constraint_primary"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseprimary_start();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseprimary_columns();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseprimary_conflict();
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c316(s1, s3, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c315); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "table_constraint_primary",
        description: peg$descNames["table_constraint_primary"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "table_constraint_primary",
        description: peg$descNames["table_constraint_primary"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseprimary_start() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "primary_start",
        description: peg$descNames["primary_start"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseprimary_start_normal();
      if (s1 === peg$FAILED) {
        s1 = peg$parseprimary_start_unique();
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c317(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "primary_start",
        description: peg$descNames["primary_start"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "primary_start",
        description: peg$descNames["primary_start"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseprimary_start_normal() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "primary_start_normal",
        description: peg$descNames["primary_start_normal"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsePRIMARY();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseKEY();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c318(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c295); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "primary_start_normal",
        description: peg$descNames["primary_start_normal"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "primary_start_normal",
        description: peg$descNames["primary_start_normal"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseprimary_start_unique() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "primary_start_unique",
        description: peg$descNames["primary_start_unique"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseUNIQUE();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c320(s1);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c319); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "primary_start_unique",
        description: peg$descNames["primary_start_unique"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "primary_start_unique",
        description: peg$descNames["primary_start_unique"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseprimary_columns() {
      var s0, s1, s2, s3, s4, s5,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "primary_columns",
        description: peg$descNames["primary_columns"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsesym_popen();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseprimary_column();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseo();
          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$parseprimary_column_tail();
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parseprimary_column_tail();
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsesym_pclose();
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c1(s2, s4);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c321); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "primary_columns",
        description: peg$descNames["primary_columns"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "primary_columns",
        description: peg$descNames["primary_columns"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseprimary_column() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "primary_column",
        description: peg$descNames["primary_column"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsename();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsecolumn_collate();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseprimary_column_dir();
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c323(s1, s3, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c322); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "primary_column",
        description: peg$descNames["primary_column"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "primary_column",
        description: peg$descNames["primary_column"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecolumn_collate() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "column_collate",
        description: peg$descNames["column_collate"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseCOLLATE();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseid_collation();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseo();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c8(s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c324); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "column_collate",
        description: peg$descNames["column_collate"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "column_collate",
        description: peg$descNames["column_collate"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseprimary_column_dir() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "primary_column_dir",
        description: peg$descNames["primary_column_dir"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseASC();
      if (s1 === peg$FAILED) {
        s1 = peg$parseDESC();
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c42(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c325); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "primary_column_dir",
        description: peg$descNames["primary_column_dir"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "primary_column_dir",
        description: peg$descNames["primary_column_dir"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseprimary_column_tail() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "primary_column_tail",
        description: peg$descNames["primary_column_tail"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsesym_comma();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseprimary_column();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseo();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c250(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "primary_column_tail",
        description: peg$descNames["primary_column_tail"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "primary_column_tail",
        description: peg$descNames["primary_column_tail"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseprimary_conflict() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "primary_conflict",
        description: peg$descNames["primary_conflict"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseprimary_conflict_start();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsestmt_fallback_types();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseo();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c326(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "primary_conflict",
        description: peg$descNames["primary_conflict"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "primary_conflict",
        description: peg$descNames["primary_conflict"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseprimary_conflict_start() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "primary_conflict_start",
        description: peg$descNames["primary_conflict_start"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseON();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseCONFLICT();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c328(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c327); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "primary_conflict_start",
        description: peg$descNames["primary_conflict_start"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "primary_conflict_start",
        description: peg$descNames["primary_conflict_start"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseconstraint_check() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "constraint_check",
        description: peg$descNames["constraint_check"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseCHECK();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseexpression_wrapped();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c329(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "constraint_check",
        description: peg$descNames["constraint_check"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "constraint_check",
        description: peg$descNames["constraint_check"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsetable_constraint_foreign() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "table_constraint_foreign",
        description: peg$descNames["table_constraint_foreign"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseforeign_start();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseloop_columns();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseforeign_clause();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseo();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c331(s1, s2, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c330); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "table_constraint_foreign",
        description: peg$descNames["table_constraint_foreign"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "table_constraint_foreign",
        description: peg$descNames["table_constraint_foreign"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseforeign_start() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "foreign_start",
        description: peg$descNames["foreign_start"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseFOREIGN();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseKEY();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseo();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c333(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c332); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "foreign_start",
        description: peg$descNames["foreign_start"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "foreign_start",
        description: peg$descNames["foreign_start"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseforeign_clause() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "foreign_clause",
        description: peg$descNames["foreign_clause"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseforeign_references();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseforeign_actions();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseforeign_deferrable();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c334(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "foreign_clause",
        description: peg$descNames["foreign_clause"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "foreign_clause",
        description: peg$descNames["foreign_clause"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseforeign_references() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "foreign_references",
        description: peg$descNames["foreign_references"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseREFERENCES();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseid_cte();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c336(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c335); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "foreign_references",
        description: peg$descNames["foreign_references"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "foreign_references",
        description: peg$descNames["foreign_references"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseforeign_actions() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "foreign_actions",
        description: peg$descNames["foreign_actions"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseforeign_action();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parseforeign_actions_tail();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parseforeign_actions_tail();
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseo();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c337(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "foreign_actions",
        description: peg$descNames["foreign_actions"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "foreign_actions",
        description: peg$descNames["foreign_actions"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseforeign_actions_tail() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "foreign_actions_tail",
        description: peg$descNames["foreign_actions_tail"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsee();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseforeign_action();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c163(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "foreign_actions_tail",
        description: peg$descNames["foreign_actions_tail"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "foreign_actions_tail",
        description: peg$descNames["foreign_actions_tail"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseforeign_action() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "foreign_action",
        description: peg$descNames["foreign_action"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$parseforeign_action_on();
      if (s0 === peg$FAILED) {
        s0 = peg$parseforeign_action_match();
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c338); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "foreign_action",
        description: peg$descNames["foreign_action"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "foreign_action",
        description: peg$descNames["foreign_action"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseforeign_action_on() {
      var s0, s1, s2, s3, s4, s5,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "foreign_action_on",
        description: peg$descNames["foreign_action_on"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseON();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseDELETE();
          if (s3 === peg$FAILED) {
            s3 = peg$parseUPDATE();
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parsee();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseaction_on_action();
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c339(s1, s3, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "foreign_action_on",
        description: peg$descNames["foreign_action_on"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "foreign_action_on",
        description: peg$descNames["foreign_action_on"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseaction_on_action() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "action_on_action",
        description: peg$descNames["action_on_action"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$parseon_action_set();
      if (s0 === peg$FAILED) {
        s0 = peg$parseon_action_cascade();
        if (s0 === peg$FAILED) {
          s0 = peg$parseon_action_none();
        }
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c340); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "action_on_action",
        description: peg$descNames["action_on_action"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "action_on_action",
        description: peg$descNames["action_on_action"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseon_action_set() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "on_action_set",
        description: peg$descNames["on_action_set"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseSET();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseNULL();
          if (s3 === peg$FAILED) {
            s3 = peg$parseDEFAULT();
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c341(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "on_action_set",
        description: peg$descNames["on_action_set"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "on_action_set",
        description: peg$descNames["on_action_set"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseon_action_cascade() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "on_action_cascade",
        description: peg$descNames["on_action_cascade"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseCASCADE();
      if (s1 === peg$FAILED) {
        s1 = peg$parseRESTRICT();
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c342(s1);
      }
      s0 = s1;

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "on_action_cascade",
        description: peg$descNames["on_action_cascade"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "on_action_cascade",
        description: peg$descNames["on_action_cascade"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseon_action_none() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "on_action_none",
        description: peg$descNames["on_action_none"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseNO();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseACTION();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c343(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "on_action_none",
        description: peg$descNames["on_action_none"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "on_action_none",
        description: peg$descNames["on_action_none"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseforeign_action_match() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "foreign_action_match",
        description: peg$descNames["foreign_action_match"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseMATCH();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsename();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c344(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "foreign_action_match",
        description: peg$descNames["foreign_action_match"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "foreign_action_match",
        description: peg$descNames["foreign_action_match"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseforeign_deferrable() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "foreign_deferrable",
        description: peg$descNames["foreign_deferrable"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseexpression_is_not();
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseDEFERRABLE();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsedeferrable_initially();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c346(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c345); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "foreign_deferrable",
        description: peg$descNames["foreign_deferrable"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "foreign_deferrable",
        description: peg$descNames["foreign_deferrable"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsedeferrable_initially() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "deferrable_initially",
        description: peg$descNames["deferrable_initially"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsee();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseINITIALLY();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsee();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseDEFERRED();
            if (s4 === peg$FAILED) {
              s4 = peg$parseIMMEDIATE();
            }
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c347(s2, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "deferrable_initially",
        description: peg$descNames["deferrable_initially"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "deferrable_initially",
        description: peg$descNames["deferrable_initially"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsetable_source_select() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "table_source_select",
        description: peg$descNames["table_source_select"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsecreate_as_select();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c348(s1);
      }
      s0 = s1;

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "table_source_select",
        description: peg$descNames["table_source_select"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "table_source_select",
        description: peg$descNames["table_source_select"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecreate_index() {
      var s0, s1, s2, s3, s4, s5, s6,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "create_index",
        description: peg$descNames["create_index"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsecreate_index_start();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsecreate_core_ine();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseid_index();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseo();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseindex_on();
              if (s5 !== peg$FAILED) {
                s6 = peg$parsestmt_core_where();
                if (s6 === peg$FAILED) {
                  s6 = null;
                }
                if (s6 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c350(s1, s2, s3, s5, s6);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c349); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "create_index",
        description: peg$descNames["create_index"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "create_index",
        description: peg$descNames["create_index"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecreate_index_start() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "create_index_start",
        description: peg$descNames["create_index_start"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsecreate_start();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseindex_unique();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseINDEX();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsee();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c351(s1, s2, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "create_index_start",
        description: peg$descNames["create_index_start"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "create_index_start",
        description: peg$descNames["create_index_start"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseindex_unique() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "index_unique",
        description: peg$descNames["index_unique"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseUNIQUE();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c352(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "index_unique",
        description: peg$descNames["index_unique"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "index_unique",
        description: peg$descNames["index_unique"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseindex_on() {
      var s0, s1, s2, s3, s4, s5,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "index_on",
        description: peg$descNames["index_on"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseON();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsename();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseo();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseprimary_columns();
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c354(s1, s3, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c353); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "index_on",
        description: peg$descNames["index_on"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "index_on",
        description: peg$descNames["index_on"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecreate_trigger() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "create_trigger",
        description: peg$descNames["create_trigger"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsecreate_trigger_start();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsecreate_core_ine();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseid_trigger();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseo();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsetrigger_conditions();
              if (s5 !== peg$FAILED) {
                s6 = peg$parseON();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parsee();
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parsename();
                    if (s8 !== peg$FAILED) {
                      s9 = peg$parseo();
                      if (s9 !== peg$FAILED) {
                        s10 = peg$parsetrigger_foreach();
                        if (s10 === peg$FAILED) {
                          s10 = null;
                        }
                        if (s10 !== peg$FAILED) {
                          s11 = peg$parsetrigger_when();
                          if (s11 === peg$FAILED) {
                            s11 = null;
                          }
                          if (s11 !== peg$FAILED) {
                            s12 = peg$parsetrigger_action();
                            if (s12 !== peg$FAILED) {
                              peg$savedPos = s0;
                              s1 = peg$c356(s1, s2, s3, s5, s8, s10, s11, s12);
                              s0 = s1;
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c355); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "create_trigger",
        description: peg$descNames["create_trigger"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "create_trigger",
        description: peg$descNames["create_trigger"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecreate_trigger_start() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "create_trigger_start",
        description: peg$descNames["create_trigger_start"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsecreate_start();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsecreate_core_tmp();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseTRIGGER();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsee();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c357(s1, s2, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "create_trigger_start",
        description: peg$descNames["create_trigger_start"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "create_trigger_start",
        description: peg$descNames["create_trigger_start"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsetrigger_conditions() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "trigger_conditions",
        description: peg$descNames["trigger_conditions"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsetrigger_apply_mods();
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsetrigger_do();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c359(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c358); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "trigger_conditions",
        description: peg$descNames["trigger_conditions"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "trigger_conditions",
        description: peg$descNames["trigger_conditions"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsetrigger_apply_mods() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "trigger_apply_mods",
        description: peg$descNames["trigger_apply_mods"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseBEFORE();
      if (s1 === peg$FAILED) {
        s1 = peg$parseAFTER();
        if (s1 === peg$FAILED) {
          s1 = peg$parsetrigger_apply_instead();
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c360(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "trigger_apply_mods",
        description: peg$descNames["trigger_apply_mods"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "trigger_apply_mods",
        description: peg$descNames["trigger_apply_mods"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsetrigger_apply_instead() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "trigger_apply_instead",
        description: peg$descNames["trigger_apply_instead"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseINSTEAD();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseOF();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c361(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "trigger_apply_instead",
        description: peg$descNames["trigger_apply_instead"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "trigger_apply_instead",
        description: peg$descNames["trigger_apply_instead"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsetrigger_do() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "trigger_do",
        description: peg$descNames["trigger_do"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$parsetrigger_do_on();
      if (s0 === peg$FAILED) {
        s0 = peg$parsetrigger_do_update();
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c362); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "trigger_do",
        description: peg$descNames["trigger_do"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "trigger_do",
        description: peg$descNames["trigger_do"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsetrigger_do_on() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "trigger_do_on",
        description: peg$descNames["trigger_do_on"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseDELETE();
      if (s1 === peg$FAILED) {
        s1 = peg$parseINSERT();
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c363(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "trigger_do_on",
        description: peg$descNames["trigger_do_on"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "trigger_do_on",
        description: peg$descNames["trigger_do_on"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsetrigger_do_update() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "trigger_do_update",
        description: peg$descNames["trigger_do_update"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseUPDATE();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsedo_update_of();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c364(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "trigger_do_update",
        description: peg$descNames["trigger_do_update"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "trigger_do_update",
        description: peg$descNames["trigger_do_update"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsedo_update_of() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "do_update_of",
        description: peg$descNames["do_update_of"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseOF();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsedo_update_columns();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c365(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "do_update_of",
        description: peg$descNames["do_update_of"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "do_update_of",
        description: peg$descNames["do_update_of"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsedo_update_columns() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "do_update_columns",
        description: peg$descNames["do_update_columns"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseloop_name();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parseloop_column_tail();
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$parseloop_column_tail();
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c1(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "do_update_columns",
        description: peg$descNames["do_update_columns"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "do_update_columns",
        description: peg$descNames["do_update_columns"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsetrigger_foreach() {
      var s0, s1, s2, s3, s4, s5, s6,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "trigger_foreach",
        description: peg$descNames["trigger_foreach"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseFOR();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseEACH();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsee();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseROW();
              if (s5 === peg$FAILED) {
                if (input.substr(peg$currPos, 9).toLowerCase() === peg$c366) {
                  s5 = input.substr(peg$currPos, 9);
                  peg$currPos += 9;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c367); }
                }
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parsee();
                if (s6 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c368(s1, s3, s5);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "trigger_foreach",
        description: peg$descNames["trigger_foreach"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "trigger_foreach",
        description: peg$descNames["trigger_foreach"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsetrigger_when() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "trigger_when",
        description: peg$descNames["trigger_when"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseWHEN();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseexpression();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseo();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c369(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c21); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "trigger_when",
        description: peg$descNames["trigger_when"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "trigger_when",
        description: peg$descNames["trigger_when"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsetrigger_action() {
      var s0, s1, s2, s3, s4, s5, s6,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "trigger_action",
        description: peg$descNames["trigger_action"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseBEGIN();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseaction_loop();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseo();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseEND();
              if (s5 !== peg$FAILED) {
                s6 = peg$parseo();
                if (s6 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c371(s1, s3, s5);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c370); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "trigger_action",
        description: peg$descNames["trigger_action"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "trigger_action",
        description: peg$descNames["trigger_action"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseaction_loop() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "action_loop",
        description: peg$descNames["action_loop"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parseaction_loop_stmt();
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parseaction_loop_stmt();
        }
      } else {
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c207(s1);
      }
      s0 = s1;

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "action_loop",
        description: peg$descNames["action_loop"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "action_loop",
        description: peg$descNames["action_loop"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseaction_loop_stmt() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "action_loop_stmt",
        description: peg$descNames["action_loop_stmt"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsestmt();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsesemi_required();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c2(s1);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "action_loop_stmt",
        description: peg$descNames["action_loop_stmt"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "action_loop_stmt",
        description: peg$descNames["action_loop_stmt"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecreate_view() {
      var s0, s1, s2, s3, s4, s5,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "create_view",
        description: peg$descNames["create_view"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsecreate_view_start();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsecreate_core_ine();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseid_view();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseo();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsecreate_as_select();
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c373(s1, s2, s3, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c372); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "create_view",
        description: peg$descNames["create_view"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "create_view",
        description: peg$descNames["create_view"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecreate_view_start() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "create_view_start",
        description: peg$descNames["create_view_start"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsecreate_start();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsecreate_core_tmp();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseVIEW();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsee();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c374(s1, s2, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "create_view_start",
        description: peg$descNames["create_view_start"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "create_view_start",
        description: peg$descNames["create_view_start"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecreate_as_select() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "create_as_select",
        description: peg$descNames["create_as_select"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseAS();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsestmt_select();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseo();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c253(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "create_as_select",
        description: peg$descNames["create_as_select"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "create_as_select",
        description: peg$descNames["create_as_select"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecreate_virtual() {
      var s0, s1, s2, s3, s4, s5, s6, s7,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "create_virtual",
        description: peg$descNames["create_virtual"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsecreate_virtual_start();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsecreate_core_ine();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseid_table();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsee();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseUSING();
              if (s5 !== peg$FAILED) {
                s6 = peg$parsee();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parsevirtual_module();
                  if (s7 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c376(s1, s2, s3, s7);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c375); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "create_virtual",
        description: peg$descNames["create_virtual"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "create_virtual",
        description: peg$descNames["create_virtual"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecreate_virtual_start() {
      var s0, s1, s2, s3, s4, s5,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "create_virtual_start",
        description: peg$descNames["create_virtual_start"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsecreate_start();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseVIRTUAL();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsee();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseTABLE();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsee();
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c377(s1, s2, s4);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "create_virtual_start",
        description: peg$descNames["create_virtual_start"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "create_virtual_start",
        description: peg$descNames["create_virtual_start"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsevirtual_module() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "virtual_module",
        description: peg$descNames["virtual_module"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsename_unquoted();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsevirtual_args();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c378(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "virtual_module",
        description: peg$descNames["virtual_module"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "virtual_module",
        description: peg$descNames["virtual_module"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsevirtual_args() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "virtual_args",
        description: peg$descNames["virtual_args"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsesym_popen();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsevirtual_arg_types();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseo();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsesym_pclose();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c380(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c379); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "virtual_args",
        description: peg$descNames["virtual_args"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "virtual_args",
        description: peg$descNames["virtual_args"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsevirtual_arg_types() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "virtual_arg_types",
        description: peg$descNames["virtual_arg_types"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$parsevirtual_arg_list();
      if (s0 === peg$FAILED) {
        s0 = peg$parsevirtual_arg_def();
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "virtual_arg_types",
        description: peg$descNames["virtual_arg_types"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "virtual_arg_types",
        description: peg$descNames["virtual_arg_types"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsevirtual_arg_list() {
      var s0, s1, s2, s3, s4, s5,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "virtual_arg_list",
        description: peg$descNames["virtual_arg_list"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$currPos;
      peg$silentFails++;
      s2 = peg$currPos;
      s3 = peg$parsename();
      if (s3 !== peg$FAILED) {
        s4 = peg$parseo();
        if (s4 !== peg$FAILED) {
          s5 = peg$parsetype_definition();
          if (s5 === peg$FAILED) {
            s5 = peg$parsecolumn_constraint();
          }
          if (s5 !== peg$FAILED) {
            s3 = [s3, s4, s5];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      peg$silentFails--;
      if (s2 === peg$FAILED) {
        s1 = void 0;
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseexpression_list();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c207(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "virtual_arg_list",
        description: peg$descNames["virtual_arg_list"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "virtual_arg_list",
        description: peg$descNames["virtual_arg_list"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsevirtual_arg_def() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "virtual_arg_def",
        description: peg$descNames["virtual_arg_def"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsesource_def_loop();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c207(s1);
      }
      s0 = s1;

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "virtual_arg_def",
        description: peg$descNames["virtual_arg_def"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "virtual_arg_def",
        description: peg$descNames["virtual_arg_def"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsestmt_drop() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "stmt_drop",
        description: peg$descNames["stmt_drop"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsedrop_start();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseid_table();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseo();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c382(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c381); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "stmt_drop",
        description: peg$descNames["stmt_drop"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "stmt_drop",
        description: peg$descNames["stmt_drop"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsedrop_start() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "drop_start",
        description: peg$descNames["drop_start"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseDROP();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsedrop_types();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsedrop_conditions();
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c384(s1, s3, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c383); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "drop_start",
        description: peg$descNames["drop_start"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "drop_start",
        description: peg$descNames["drop_start"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsedrop_types() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "drop_types",
        description: peg$descNames["drop_types"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseTABLE();
      if (s1 === peg$FAILED) {
        s1 = peg$parseINDEX();
        if (s1 === peg$FAILED) {
          s1 = peg$parseTRIGGER();
          if (s1 === peg$FAILED) {
            s1 = peg$parseVIEW();
          }
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c42(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c385); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "drop_types",
        description: peg$descNames["drop_types"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "drop_types",
        description: peg$descNames["drop_types"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsedrop_conditions() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "drop_conditions",
        description: peg$descNames["drop_conditions"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsedrop_ie();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c386(s1);
      }
      s0 = s1;

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "drop_conditions",
        description: peg$descNames["drop_conditions"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "drop_conditions",
        description: peg$descNames["drop_conditions"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsedrop_ie() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "drop_ie",
        description: peg$descNames["drop_ie"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseIF();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseEXISTS();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsee();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c388(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c387); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "drop_ie",
        description: peg$descNames["drop_ie"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "drop_ie",
        description: peg$descNames["drop_ie"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseoperator_unary() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "operator_unary",
        description: peg$descNames["operator_unary"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$parsesym_tilde();
      if (s0 === peg$FAILED) {
        s0 = peg$parsesym_minus();
        if (s0 === peg$FAILED) {
          s0 = peg$parsesym_plus();
          if (s0 === peg$FAILED) {
            s0 = peg$parseexpression_is_not();
          }
        }
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c389); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "operator_unary",
        description: peg$descNames["operator_unary"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "operator_unary",
        description: peg$descNames["operator_unary"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseoperator_binary() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "operator_binary",
        description: peg$descNames["operator_binary"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsebinary_nodes();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c391(s1);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c390); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "operator_binary",
        description: peg$descNames["operator_binary"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "operator_binary",
        description: peg$descNames["operator_binary"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsebinary_nodes() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "binary_nodes",
        description: peg$descNames["binary_nodes"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$parsebinary_concat();
      if (s0 === peg$FAILED) {
        s0 = peg$parseexpression_isnt();
        if (s0 === peg$FAILED) {
          s0 = peg$parsebinary_multiply();
          if (s0 === peg$FAILED) {
            s0 = peg$parsebinary_mod();
            if (s0 === peg$FAILED) {
              s0 = peg$parsebinary_plus();
              if (s0 === peg$FAILED) {
                s0 = peg$parsebinary_minus();
                if (s0 === peg$FAILED) {
                  s0 = peg$parsebinary_left();
                  if (s0 === peg$FAILED) {
                    s0 = peg$parsebinary_right();
                    if (s0 === peg$FAILED) {
                      s0 = peg$parsebinary_and();
                      if (s0 === peg$FAILED) {
                        s0 = peg$parsebinary_or();
                        if (s0 === peg$FAILED) {
                          s0 = peg$parsebinary_lte();
                          if (s0 === peg$FAILED) {
                            s0 = peg$parsebinary_lt();
                            if (s0 === peg$FAILED) {
                              s0 = peg$parsebinary_gte();
                              if (s0 === peg$FAILED) {
                                s0 = peg$parsebinary_gt();
                                if (s0 === peg$FAILED) {
                                  s0 = peg$parsebinary_lang();
                                  if (s0 === peg$FAILED) {
                                    s0 = peg$parsebinary_notequal();
                                    if (s0 === peg$FAILED) {
                                      s0 = peg$parsebinary_equal();
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "binary_nodes",
        description: peg$descNames["binary_nodes"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "binary_nodes",
        description: peg$descNames["binary_nodes"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsebinary_concat() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "binary_concat",
        description: peg$descNames["binary_concat"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsesym_pipe();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsesym_pipe();
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c392); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "binary_concat",
        description: peg$descNames["binary_concat"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "binary_concat",
        description: peg$descNames["binary_concat"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsebinary_plus() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "binary_plus",
        description: peg$descNames["binary_plus"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$parsesym_plus();
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c393); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "binary_plus",
        description: peg$descNames["binary_plus"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "binary_plus",
        description: peg$descNames["binary_plus"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsebinary_minus() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "binary_minus",
        description: peg$descNames["binary_minus"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$parsesym_minus();
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c394); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "binary_minus",
        description: peg$descNames["binary_minus"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "binary_minus",
        description: peg$descNames["binary_minus"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsebinary_multiply() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "binary_multiply",
        description: peg$descNames["binary_multiply"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$parsesym_star();
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c395); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "binary_multiply",
        description: peg$descNames["binary_multiply"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "binary_multiply",
        description: peg$descNames["binary_multiply"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsebinary_mod() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "binary_mod",
        description: peg$descNames["binary_mod"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$parsesym_mod();
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c396); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "binary_mod",
        description: peg$descNames["binary_mod"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "binary_mod",
        description: peg$descNames["binary_mod"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsebinary_left() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "binary_left",
        description: peg$descNames["binary_left"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsesym_lt();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsesym_lt();
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c397); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "binary_left",
        description: peg$descNames["binary_left"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "binary_left",
        description: peg$descNames["binary_left"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsebinary_right() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "binary_right",
        description: peg$descNames["binary_right"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsesym_gt();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsesym_gt();
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c398); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "binary_right",
        description: peg$descNames["binary_right"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "binary_right",
        description: peg$descNames["binary_right"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsebinary_and() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "binary_and",
        description: peg$descNames["binary_and"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$parsesym_amp();
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c399); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "binary_and",
        description: peg$descNames["binary_and"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "binary_and",
        description: peg$descNames["binary_and"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsebinary_or() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "binary_or",
        description: peg$descNames["binary_or"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$parsesym_pipe();
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c400); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "binary_or",
        description: peg$descNames["binary_or"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "binary_or",
        description: peg$descNames["binary_or"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsebinary_lt() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "binary_lt",
        description: peg$descNames["binary_lt"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$parsesym_lt();
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c401); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "binary_lt",
        description: peg$descNames["binary_lt"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "binary_lt",
        description: peg$descNames["binary_lt"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsebinary_gt() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "binary_gt",
        description: peg$descNames["binary_gt"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$parsesym_gt();
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c402); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "binary_gt",
        description: peg$descNames["binary_gt"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "binary_gt",
        description: peg$descNames["binary_gt"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsebinary_lte() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "binary_lte",
        description: peg$descNames["binary_lte"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsesym_lt();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsesym_equal();
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c403); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "binary_lte",
        description: peg$descNames["binary_lte"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "binary_lte",
        description: peg$descNames["binary_lte"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsebinary_gte() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "binary_gte",
        description: peg$descNames["binary_gte"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsesym_gt();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsesym_equal();
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c404); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "binary_gte",
        description: peg$descNames["binary_gte"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "binary_gte",
        description: peg$descNames["binary_gte"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsebinary_equal() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "binary_equal",
        description: peg$descNames["binary_equal"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsesym_equal();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsesym_equal();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c405); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "binary_equal",
        description: peg$descNames["binary_equal"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "binary_equal",
        description: peg$descNames["binary_equal"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsebinary_notequal() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "binary_notequal",
        description: peg$descNames["binary_notequal"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsesym_excl();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsesym_equal();
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsesym_lt();
        if (s1 !== peg$FAILED) {
          s2 = peg$parsesym_gt();
          if (s2 !== peg$FAILED) {
            s1 = [s1, s2];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c406); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "binary_notequal",
        description: peg$descNames["binary_notequal"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "binary_notequal",
        description: peg$descNames["binary_notequal"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsebinary_lang() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "binary_lang",
        description: peg$descNames["binary_lang"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$parsebinary_lang_isnt();
      if (s0 === peg$FAILED) {
        s0 = peg$parsebinary_lang_misc();
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "binary_lang",
        description: peg$descNames["binary_lang"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "binary_lang",
        description: peg$descNames["binary_lang"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsebinary_lang_isnt() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "binary_lang_isnt",
        description: peg$descNames["binary_lang_isnt"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseIS();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsee();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseexpression_is_not();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c41(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c407); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "binary_lang_isnt",
        description: peg$descNames["binary_lang_isnt"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "binary_lang_isnt",
        description: peg$descNames["binary_lang_isnt"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsebinary_lang_misc() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "binary_lang_misc",
        description: peg$descNames["binary_lang_misc"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseIN();
      if (s1 === peg$FAILED) {
        s1 = peg$parseLIKE();
        if (s1 === peg$FAILED) {
          s1 = peg$parseGLOB();
          if (s1 === peg$FAILED) {
            s1 = peg$parseMATCH();
            if (s1 === peg$FAILED) {
              s1 = peg$parseREGEXP();
            }
          }
        }
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c131(s1);
      }
      s0 = s1;

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "binary_lang_misc",
        description: peg$descNames["binary_lang_misc"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "binary_lang_misc",
        description: peg$descNames["binary_lang_misc"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseid_database() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "id_database",
        description: peg$descNames["id_database"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsename();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c409(s1);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c408); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "id_database",
        description: peg$descNames["id_database"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "id_database",
        description: peg$descNames["id_database"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseid_table() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "id_table",
        description: peg$descNames["id_table"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseid_table_qualified();
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsename();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c411(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c410); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "id_table",
        description: peg$descNames["id_table"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "id_table",
        description: peg$descNames["id_table"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseid_table_qualified() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "id_table_qualified",
        description: peg$descNames["id_table_qualified"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsename();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsesym_dot();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c412(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "id_table_qualified",
        description: peg$descNames["id_table_qualified"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "id_table_qualified",
        description: peg$descNames["id_table_qualified"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseid_column() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "id_column",
        description: peg$descNames["id_column"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsecolumn_qualifiers();
      if (s1 === peg$FAILED) {
        s1 = peg$parseid_column_qualified();
        if (s1 === peg$FAILED) {
          s1 = peg$parsecolumn_unqualified();
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsename();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c414(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c413); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "id_column",
        description: peg$descNames["id_column"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "id_column",
        description: peg$descNames["id_column"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecolumn_unqualified() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "column_unqualified",
        description: peg$descNames["column_unqualified"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseo();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c415();
      }
      s0 = s1;

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "column_unqualified",
        description: peg$descNames["column_unqualified"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "column_unqualified",
        description: peg$descNames["column_unqualified"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecolumn_qualifiers() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "column_qualifiers",
        description: peg$descNames["column_qualifiers"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseid_table_qualified();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseid_column_qualified();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c416(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "column_qualifiers",
        description: peg$descNames["column_qualifiers"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "column_qualifiers",
        description: peg$descNames["column_qualifiers"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseid_column_qualified() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "id_column_qualified",
        description: peg$descNames["id_column_qualified"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsename();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsesym_dot();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c76(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "id_column_qualified",
        description: peg$descNames["id_column_qualified"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "id_column_qualified",
        description: peg$descNames["id_column_qualified"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseid_collation() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "id_collation",
        description: peg$descNames["id_collation"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsename_unquoted();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c418(s1);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c417); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "id_collation",
        description: peg$descNames["id_collation"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "id_collation",
        description: peg$descNames["id_collation"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseid_savepoint() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "id_savepoint",
        description: peg$descNames["id_savepoint"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsename();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c420(s1);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c419); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "id_savepoint",
        description: peg$descNames["id_savepoint"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "id_savepoint",
        description: peg$descNames["id_savepoint"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseid_index() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "id_index",
        description: peg$descNames["id_index"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseid_table_qualified();
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsename();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c422(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c421); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "id_index",
        description: peg$descNames["id_index"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "id_index",
        description: peg$descNames["id_index"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseid_trigger() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "id_trigger",
        description: peg$descNames["id_trigger"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseid_table_qualified();
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsename();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c424(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c423); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "id_trigger",
        description: peg$descNames["id_trigger"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "id_trigger",
        description: peg$descNames["id_trigger"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseid_view() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "id_view",
        description: peg$descNames["id_view"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseid_table_qualified();
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsename();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c426(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c425); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "id_view",
        description: peg$descNames["id_view"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "id_view",
        description: peg$descNames["id_view"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseid_pragma() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "id_pragma",
        description: peg$descNames["id_pragma"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseid_table_qualified();
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsename();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c428(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c427); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "id_pragma",
        description: peg$descNames["id_pragma"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "id_pragma",
        description: peg$descNames["id_pragma"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseid_cte() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "id_cte",
        description: peg$descNames["id_cte"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseid_table_expression();
      if (s1 === peg$FAILED) {
        s1 = peg$parseid_table();
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c14(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c429); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "id_cte",
        description: peg$descNames["id_cte"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "id_cte",
        description: peg$descNames["id_cte"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseid_table_expression() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "id_table_expression",
        description: peg$descNames["id_table_expression"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsename();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseloop_columns();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c430(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "id_table_expression",
        description: peg$descNames["id_table_expression"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "id_table_expression",
        description: peg$descNames["id_table_expression"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseid_constraint_table() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "id_constraint_table",
        description: peg$descNames["id_constraint_table"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsename();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c432(s1);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c431); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "id_constraint_table",
        description: peg$descNames["id_constraint_table"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "id_constraint_table",
        description: peg$descNames["id_constraint_table"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseid_constraint_column() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "id_constraint_column",
        description: peg$descNames["id_constraint_column"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsename();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c434(s1);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c433); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "id_constraint_column",
        description: peg$descNames["id_constraint_column"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "id_constraint_column",
        description: peg$descNames["id_constraint_column"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsedatatype_types() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "datatype_types",
        description: peg$descNames["datatype_types"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsedatatype_text();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c436(s1);
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsedatatype_real();
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c437(s1);
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parsedatatype_numeric();
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c438(s1);
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parsedatatype_integer();
            if (s1 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c439(s1);
            }
            s0 = s1;
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              s1 = peg$parsedatatype_none();
              if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c440(s1);
              }
              s0 = s1;
            }
          }
        }
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c435); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "datatype_types",
        description: peg$descNames["datatype_types"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "datatype_types",
        description: peg$descNames["datatype_types"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsedatatype_text() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "datatype_text",
        description: peg$descNames["datatype_text"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$currPos;
      if (input.substr(peg$currPos, 1).toLowerCase() === peg$c442) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c443); }
      }
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        if (input.substr(peg$currPos, 3).toLowerCase() === peg$c444) {
          s3 = input.substr(peg$currPos, 3);
          peg$currPos += 3;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c445); }
        }
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        if (s3 !== peg$FAILED) {
          if (input.substr(peg$currPos, 4).toLowerCase() === peg$c446) {
            s4 = input.substr(peg$currPos, 4);
            peg$currPos += 4;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c447); }
          }
          if (s4 !== peg$FAILED) {
            s2 = [s2, s3, s4];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 === peg$FAILED) {
        s1 = peg$currPos;
        if (input.substr(peg$currPos, 4).toLowerCase() === peg$c448) {
          s2 = input.substr(peg$currPos, 4);
          peg$currPos += 4;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c449); }
        }
        if (s2 === peg$FAILED) {
          if (input.substr(peg$currPos, 6).toLowerCase() === peg$c450) {
            s2 = input.substr(peg$currPos, 6);
            peg$currPos += 6;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c451); }
          }
          if (s2 === peg$FAILED) {
            if (input.substr(peg$currPos, 4).toLowerCase() === peg$c452) {
              s2 = input.substr(peg$currPos, 4);
              peg$currPos += 4;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c453); }
            }
          }
        }
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          if (input.substr(peg$currPos, 4).toLowerCase() === peg$c454) {
            s3 = input.substr(peg$currPos, 4);
            peg$currPos += 4;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c455); }
          }
          if (s3 !== peg$FAILED) {
            s2 = [s2, s3];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 4).toLowerCase() === peg$c456) {
            s1 = input.substr(peg$currPos, 4);
            peg$currPos += 4;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c457); }
          }
        }
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c42(s1);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c441); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "datatype_text",
        description: peg$descNames["datatype_text"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "datatype_text",
        description: peg$descNames["datatype_text"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsedatatype_real() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "datatype_real",
        description: peg$descNames["datatype_real"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsedatatype_real_double();
      if (s1 === peg$FAILED) {
        if (input.substr(peg$currPos, 5).toLowerCase() === peg$c459) {
          s1 = input.substr(peg$currPos, 5);
          peg$currPos += 5;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c460); }
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 4).toLowerCase() === peg$c461) {
            s1 = input.substr(peg$currPos, 4);
            peg$currPos += 4;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c462); }
          }
        }
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c42(s1);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c458); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "datatype_real",
        description: peg$descNames["datatype_real"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "datatype_real",
        description: peg$descNames["datatype_real"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsedatatype_real_double() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "datatype_real_double",
        description: peg$descNames["datatype_real_double"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6).toLowerCase() === peg$c464) {
        s1 = input.substr(peg$currPos, 6);
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c465); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsereal_double_precision();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c466(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c463); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "datatype_real_double",
        description: peg$descNames["datatype_real_double"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "datatype_real_double",
        description: peg$descNames["datatype_real_double"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsereal_double_precision() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "real_double_precision",
        description: peg$descNames["real_double_precision"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsee();
      if (s1 !== peg$FAILED) {
        if (input.substr(peg$currPos, 9).toLowerCase() === peg$c467) {
          s2 = input.substr(peg$currPos, 9);
          peg$currPos += 9;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c468); }
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c469(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "real_double_precision",
        description: peg$descNames["real_double_precision"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "real_double_precision",
        description: peg$descNames["real_double_precision"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsedatatype_numeric() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "datatype_numeric",
        description: peg$descNames["datatype_numeric"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 7).toLowerCase() === peg$c471) {
        s1 = input.substr(peg$currPos, 7);
        peg$currPos += 7;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c472); }
      }
      if (s1 === peg$FAILED) {
        if (input.substr(peg$currPos, 7).toLowerCase() === peg$c473) {
          s1 = input.substr(peg$currPos, 7);
          peg$currPos += 7;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c474); }
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 7).toLowerCase() === peg$c475) {
            s1 = input.substr(peg$currPos, 7);
            peg$currPos += 7;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c476); }
          }
          if (s1 === peg$FAILED) {
            s1 = peg$currPos;
            if (input.substr(peg$currPos, 4).toLowerCase() === peg$c477) {
              s2 = input.substr(peg$currPos, 4);
              peg$currPos += 4;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c478); }
            }
            if (s2 !== peg$FAILED) {
              if (input.substr(peg$currPos, 4).toLowerCase() === peg$c479) {
                s3 = input.substr(peg$currPos, 4);
                peg$currPos += 4;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c480); }
              }
              if (s3 === peg$FAILED) {
                s3 = null;
              }
              if (s3 !== peg$FAILED) {
                s2 = [s2, s3];
                s1 = s2;
              } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
              }
            } else {
              peg$currPos = s1;
              s1 = peg$FAILED;
            }
            if (s1 === peg$FAILED) {
              s1 = peg$currPos;
              if (input.substr(peg$currPos, 4).toLowerCase() === peg$c479) {
                s2 = input.substr(peg$currPos, 4);
                peg$currPos += 4;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c480); }
              }
              if (s2 !== peg$FAILED) {
                if (input.substr(peg$currPos, 5).toLowerCase() === peg$c481) {
                  s3 = input.substr(peg$currPos, 5);
                  peg$currPos += 5;
                } else {
                  s3 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c482); }
                }
                if (s3 === peg$FAILED) {
                  s3 = null;
                }
                if (s3 !== peg$FAILED) {
                  s2 = [s2, s3];
                  s1 = s2;
                } else {
                  peg$currPos = s1;
                  s1 = peg$FAILED;
                }
              } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
              }
            }
          }
        }
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c42(s1);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c470); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "datatype_numeric",
        description: peg$descNames["datatype_numeric"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "datatype_numeric",
        description: peg$descNames["datatype_numeric"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsedatatype_integer() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "datatype_integer",
        description: peg$descNames["datatype_integer"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$currPos;
      if (input.substr(peg$currPos, 3).toLowerCase() === peg$c484) {
        s2 = input.substr(peg$currPos, 3);
        peg$currPos += 3;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c485); }
      }
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 50) {
          s3 = peg$c486;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c487); }
        }
        if (s3 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 52) {
            s3 = peg$c488;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c489); }
          }
          if (s3 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 56) {
              s3 = peg$c490;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c491); }
            }
            if (s3 === peg$FAILED) {
              if (input.substr(peg$currPos, 4).toLowerCase() === peg$c492) {
                s3 = input.substr(peg$currPos, 4);
                peg$currPos += 4;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c493); }
              }
            }
          }
        }
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 === peg$FAILED) {
        s1 = peg$currPos;
        if (input.substr(peg$currPos, 3).toLowerCase() === peg$c494) {
          s2 = input.substr(peg$currPos, 3);
          peg$currPos += 3;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c495); }
        }
        if (s2 === peg$FAILED) {
          if (input.substr(peg$currPos, 6).toLowerCase() === peg$c450) {
            s2 = input.substr(peg$currPos, 6);
            peg$currPos += 6;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c451); }
          }
          if (s2 === peg$FAILED) {
            if (input.substr(peg$currPos, 5).toLowerCase() === peg$c496) {
              s2 = input.substr(peg$currPos, 5);
              peg$currPos += 5;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c497); }
            }
            if (s2 === peg$FAILED) {
              if (input.substr(peg$currPos, 4).toLowerCase() === peg$c448) {
                s2 = input.substr(peg$currPos, 4);
                peg$currPos += 4;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c449); }
              }
            }
          }
        }
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          if (input.substr(peg$currPos, 3).toLowerCase() === peg$c484) {
            s3 = input.substr(peg$currPos, 3);
            peg$currPos += 3;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c485); }
          }
          if (s3 !== peg$FAILED) {
            s2 = [s2, s3];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c42(s1);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c483); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "datatype_integer",
        description: peg$descNames["datatype_integer"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "datatype_integer",
        description: peg$descNames["datatype_integer"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsedatatype_none() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "datatype_none",
        description: peg$descNames["datatype_none"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 4).toLowerCase() === peg$c499) {
        s1 = input.substr(peg$currPos, 4);
        peg$currPos += 4;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c500); }
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c42(s1);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c498); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "datatype_none",
        description: peg$descNames["datatype_none"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "datatype_none",
        description: peg$descNames["datatype_none"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsename_char() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "name_char",
        description: peg$descNames["name_char"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (peg$c501.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c502); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "name_char",
        description: peg$descNames["name_char"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "name_char",
        description: peg$descNames["name_char"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsename() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "name",
        description: peg$descNames["name"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$parsename_bracketed();
      if (s0 === peg$FAILED) {
        s0 = peg$parsename_backticked();
        if (s0 === peg$FAILED) {
          s0 = peg$parsename_dblquoted();
          if (s0 === peg$FAILED) {
            s0 = peg$parsename_sglquoted();
            if (s0 === peg$FAILED) {
              s0 = peg$parsename_unquoted();
            }
          }
        }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "name",
        description: peg$descNames["name"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "name",
        description: peg$descNames["name"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsereserved_nodes() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "reserved_nodes",
        description: peg$descNames["reserved_nodes"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsedatatype_types();
      if (s1 === peg$FAILED) {
        s1 = peg$parsereserved_words();
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parsename_char();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = void 0;
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c503(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "reserved_nodes",
        description: peg$descNames["reserved_nodes"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "reserved_nodes",
        description: peg$descNames["reserved_nodes"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsename_unquoted() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "name_unquoted",
        description: peg$descNames["name_unquoted"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$currPos;
      peg$silentFails++;
      s2 = peg$parsereserved_nodes();
      if (s2 === peg$FAILED) {
        s2 = peg$parsenumber_digit();
      }
      peg$silentFails--;
      if (s2 === peg$FAILED) {
        s1 = void 0;
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsename_char();
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsename_char();
          }
        } else {
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c504(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "name_unquoted",
        description: peg$descNames["name_unquoted"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "name_unquoted",
        description: peg$descNames["name_unquoted"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsename_bracketed() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "name_bracketed",
        description: peg$descNames["name_bracketed"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsesym_bopen();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsename_bracketed_schar();
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsename_bracketed_schar();
          }
        } else {
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseo();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsesym_bclose();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c45(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "name_bracketed",
        description: peg$descNames["name_bracketed"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "name_bracketed",
        description: peg$descNames["name_bracketed"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsename_bracketed_schar() {
      var s0, s1, s2, s3, s4,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "name_bracketed_schar",
        description: peg$descNames["name_bracketed_schar"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$currPos;
      peg$silentFails++;
      s2 = peg$currPos;
      s3 = [];
      s4 = peg$parsewhitespace_space();
      while (s4 !== peg$FAILED) {
        s3.push(s4);
        s4 = peg$parsewhitespace_space();
      }
      if (s3 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 93) {
          s4 = peg$c505;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c506); }
        }
        if (s4 !== peg$FAILED) {
          s3 = [s3, s4];
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      peg$silentFails--;
      if (s2 === peg$FAILED) {
        s1 = void 0;
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        if (peg$c507.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c508); }
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c8(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "name_bracketed_schar",
        description: peg$descNames["name_bracketed_schar"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "name_bracketed_schar",
        description: peg$descNames["name_bracketed_schar"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsename_dblquoted() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "name_dblquoted",
        description: peg$descNames["name_dblquoted"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 34) {
        s1 = peg$c509;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c510); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsename_dblquoted_schar();
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsename_dblquoted_schar();
          }
        } else {
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 34) {
            s3 = peg$c509;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c510); }
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c511(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "name_dblquoted",
        description: peg$descNames["name_dblquoted"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "name_dblquoted",
        description: peg$descNames["name_dblquoted"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsename_dblquoted_schar() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "name_dblquoted_schar",
        description: peg$descNames["name_dblquoted_schar"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 2) === peg$c512) {
        s0 = peg$c512;
        peg$currPos += 2;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c513); }
      }
      if (s0 === peg$FAILED) {
        if (peg$c514.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c515); }
        }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "name_dblquoted_schar",
        description: peg$descNames["name_dblquoted_schar"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "name_dblquoted_schar",
        description: peg$descNames["name_dblquoted_schar"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsename_sglquoted() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "name_sglquoted",
        description: peg$descNames["name_sglquoted"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 39) {
        s1 = peg$c516;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c517); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsename_sglquoted_schar();
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsename_sglquoted_schar();
          }
        } else {
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 39) {
            s3 = peg$c516;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c517); }
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c518(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "name_sglquoted",
        description: peg$descNames["name_sglquoted"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "name_sglquoted",
        description: peg$descNames["name_sglquoted"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsename_sglquoted_schar() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "name_sglquoted_schar",
        description: peg$descNames["name_sglquoted_schar"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 2) === peg$c63) {
        s0 = peg$c63;
        peg$currPos += 2;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c64); }
      }
      if (s0 === peg$FAILED) {
        if (peg$c65.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c66); }
        }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "name_sglquoted_schar",
        description: peg$descNames["name_sglquoted_schar"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "name_sglquoted_schar",
        description: peg$descNames["name_sglquoted_schar"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsename_backticked() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "name_backticked",
        description: peg$descNames["name_backticked"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 96) {
        s1 = peg$c519;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c520); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsename_backticked_schar();
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsename_backticked_schar();
          }
        } else {
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 96) {
            s3 = peg$c519;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c520); }
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c521(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "name_backticked",
        description: peg$descNames["name_backticked"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "name_backticked",
        description: peg$descNames["name_backticked"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsename_backticked_schar() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "name_backticked_schar",
        description: peg$descNames["name_backticked_schar"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 2) === peg$c522) {
        s0 = peg$c522;
        peg$currPos += 2;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c523); }
      }
      if (s0 === peg$FAILED) {
        if (peg$c524.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c525); }
        }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "name_backticked_schar",
        description: peg$descNames["name_backticked_schar"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "name_backticked_schar",
        description: peg$descNames["name_backticked_schar"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsesym_bopen() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "sym_bopen",
        description: peg$descNames["sym_bopen"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 91) {
        s1 = peg$c527;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c528); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c2(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c526); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "sym_bopen",
        description: peg$descNames["sym_bopen"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "sym_bopen",
        description: peg$descNames["sym_bopen"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsesym_bclose() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "sym_bclose",
        description: peg$descNames["sym_bclose"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 93) {
        s1 = peg$c505;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c506); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c2(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c529); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "sym_bclose",
        description: peg$descNames["sym_bclose"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "sym_bclose",
        description: peg$descNames["sym_bclose"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsesym_popen() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "sym_popen",
        description: peg$descNames["sym_popen"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 40) {
        s1 = peg$c531;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c532); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c2(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c530); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "sym_popen",
        description: peg$descNames["sym_popen"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "sym_popen",
        description: peg$descNames["sym_popen"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsesym_pclose() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "sym_pclose",
        description: peg$descNames["sym_pclose"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 41) {
        s1 = peg$c534;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c535); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c2(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c533); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "sym_pclose",
        description: peg$descNames["sym_pclose"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "sym_pclose",
        description: peg$descNames["sym_pclose"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsesym_comma() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "sym_comma",
        description: peg$descNames["sym_comma"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 44) {
        s1 = peg$c537;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c538); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c2(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c536); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "sym_comma",
        description: peg$descNames["sym_comma"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "sym_comma",
        description: peg$descNames["sym_comma"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsesym_dot() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "sym_dot",
        description: peg$descNames["sym_dot"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 46) {
        s1 = peg$c540;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c541); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c2(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c539); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "sym_dot",
        description: peg$descNames["sym_dot"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "sym_dot",
        description: peg$descNames["sym_dot"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsesym_star() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "sym_star",
        description: peg$descNames["sym_star"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 42) {
        s1 = peg$c543;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c544); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c2(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c542); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "sym_star",
        description: peg$descNames["sym_star"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "sym_star",
        description: peg$descNames["sym_star"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsesym_quest() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "sym_quest",
        description: peg$descNames["sym_quest"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 63) {
        s1 = peg$c546;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c547); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c2(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c545); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "sym_quest",
        description: peg$descNames["sym_quest"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "sym_quest",
        description: peg$descNames["sym_quest"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsesym_sglquote() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "sym_sglquote",
        description: peg$descNames["sym_sglquote"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 39) {
        s1 = peg$c516;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c517); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c2(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c548); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "sym_sglquote",
        description: peg$descNames["sym_sglquote"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "sym_sglquote",
        description: peg$descNames["sym_sglquote"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsesym_dblquote() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "sym_dblquote",
        description: peg$descNames["sym_dblquote"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 34) {
        s1 = peg$c509;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c510); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c2(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c549); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "sym_dblquote",
        description: peg$descNames["sym_dblquote"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "sym_dblquote",
        description: peg$descNames["sym_dblquote"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsesym_backtick() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "sym_backtick",
        description: peg$descNames["sym_backtick"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 96) {
        s1 = peg$c519;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c520); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c2(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c550); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "sym_backtick",
        description: peg$descNames["sym_backtick"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "sym_backtick",
        description: peg$descNames["sym_backtick"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsesym_tilde() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "sym_tilde",
        description: peg$descNames["sym_tilde"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 126) {
        s1 = peg$c552;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c553); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c2(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c551); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "sym_tilde",
        description: peg$descNames["sym_tilde"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "sym_tilde",
        description: peg$descNames["sym_tilde"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsesym_plus() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "sym_plus",
        description: peg$descNames["sym_plus"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 43) {
        s1 = peg$c555;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c556); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c2(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c554); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "sym_plus",
        description: peg$descNames["sym_plus"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "sym_plus",
        description: peg$descNames["sym_plus"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsesym_minus() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "sym_minus",
        description: peg$descNames["sym_minus"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 45) {
        s1 = peg$c558;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c559); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c2(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c557); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "sym_minus",
        description: peg$descNames["sym_minus"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "sym_minus",
        description: peg$descNames["sym_minus"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsesym_equal() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "sym_equal",
        description: peg$descNames["sym_equal"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 61) {
        s1 = peg$c560;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c561); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c2(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c405); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "sym_equal",
        description: peg$descNames["sym_equal"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "sym_equal",
        description: peg$descNames["sym_equal"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsesym_amp() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "sym_amp",
        description: peg$descNames["sym_amp"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 38) {
        s1 = peg$c563;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c564); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c2(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c562); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "sym_amp",
        description: peg$descNames["sym_amp"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "sym_amp",
        description: peg$descNames["sym_amp"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsesym_pipe() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "sym_pipe",
        description: peg$descNames["sym_pipe"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 124) {
        s1 = peg$c566;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c567); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c2(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c565); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "sym_pipe",
        description: peg$descNames["sym_pipe"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "sym_pipe",
        description: peg$descNames["sym_pipe"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsesym_mod() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "sym_mod",
        description: peg$descNames["sym_mod"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 37) {
        s1 = peg$c568;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c569); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c2(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c396); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "sym_mod",
        description: peg$descNames["sym_mod"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "sym_mod",
        description: peg$descNames["sym_mod"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsesym_lt() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "sym_lt",
        description: peg$descNames["sym_lt"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 60) {
        s1 = peg$c570;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c571); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c2(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c401); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "sym_lt",
        description: peg$descNames["sym_lt"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "sym_lt",
        description: peg$descNames["sym_lt"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsesym_gt() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "sym_gt",
        description: peg$descNames["sym_gt"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 62) {
        s1 = peg$c572;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c573); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c2(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c402); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "sym_gt",
        description: peg$descNames["sym_gt"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "sym_gt",
        description: peg$descNames["sym_gt"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsesym_excl() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "sym_excl",
        description: peg$descNames["sym_excl"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 33) {
        s1 = peg$c575;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c576); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c2(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c574); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "sym_excl",
        description: peg$descNames["sym_excl"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "sym_excl",
        description: peg$descNames["sym_excl"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsesym_semi() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "sym_semi",
        description: peg$descNames["sym_semi"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 59) {
        s1 = peg$c578;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c579); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c2(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c577); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "sym_semi",
        description: peg$descNames["sym_semi"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "sym_semi",
        description: peg$descNames["sym_semi"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsesym_colon() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "sym_colon",
        description: peg$descNames["sym_colon"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 58) {
        s1 = peg$c104;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c105); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c2(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c580); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "sym_colon",
        description: peg$descNames["sym_colon"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "sym_colon",
        description: peg$descNames["sym_colon"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsesym_fslash() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "sym_fslash",
        description: peg$descNames["sym_fslash"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 47) {
        s1 = peg$c582;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c583); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c2(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c581); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "sym_fslash",
        description: peg$descNames["sym_fslash"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "sym_fslash",
        description: peg$descNames["sym_fslash"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsesym_bslash() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "sym_bslash",
        description: peg$descNames["sym_bslash"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 92) {
        s1 = peg$c585;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c586); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseo();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c2(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c584); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "sym_bslash",
        description: peg$descNames["sym_bslash"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "sym_bslash",
        description: peg$descNames["sym_bslash"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseABORT() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "ABORT",
        description: peg$descNames["ABORT"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 5).toLowerCase() === peg$c587) {
        s0 = input.substr(peg$currPos, 5);
        peg$currPos += 5;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c588); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "ABORT",
        description: peg$descNames["ABORT"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "ABORT",
        description: peg$descNames["ABORT"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseACTION() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "ACTION",
        description: peg$descNames["ACTION"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 6).toLowerCase() === peg$c589) {
        s0 = input.substr(peg$currPos, 6);
        peg$currPos += 6;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c590); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "ACTION",
        description: peg$descNames["ACTION"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "ACTION",
        description: peg$descNames["ACTION"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseADD() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "ADD",
        description: peg$descNames["ADD"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 3).toLowerCase() === peg$c591) {
        s0 = input.substr(peg$currPos, 3);
        peg$currPos += 3;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c592); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "ADD",
        description: peg$descNames["ADD"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "ADD",
        description: peg$descNames["ADD"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseAFTER() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "AFTER",
        description: peg$descNames["AFTER"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 5).toLowerCase() === peg$c593) {
        s0 = input.substr(peg$currPos, 5);
        peg$currPos += 5;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c594); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "AFTER",
        description: peg$descNames["AFTER"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "AFTER",
        description: peg$descNames["AFTER"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseALL() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "ALL",
        description: peg$descNames["ALL"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 3).toLowerCase() === peg$c595) {
        s0 = input.substr(peg$currPos, 3);
        peg$currPos += 3;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c596); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "ALL",
        description: peg$descNames["ALL"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "ALL",
        description: peg$descNames["ALL"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseALTER() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "ALTER",
        description: peg$descNames["ALTER"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 5).toLowerCase() === peg$c597) {
        s0 = input.substr(peg$currPos, 5);
        peg$currPos += 5;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c598); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "ALTER",
        description: peg$descNames["ALTER"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "ALTER",
        description: peg$descNames["ALTER"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseANALYZE() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "ANALYZE",
        description: peg$descNames["ANALYZE"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 7).toLowerCase() === peg$c599) {
        s0 = input.substr(peg$currPos, 7);
        peg$currPos += 7;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c600); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "ANALYZE",
        description: peg$descNames["ANALYZE"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "ANALYZE",
        description: peg$descNames["ANALYZE"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseAND() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "AND",
        description: peg$descNames["AND"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 3).toLowerCase() === peg$c601) {
        s0 = input.substr(peg$currPos, 3);
        peg$currPos += 3;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c602); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "AND",
        description: peg$descNames["AND"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "AND",
        description: peg$descNames["AND"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseAS() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "AS",
        description: peg$descNames["AS"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 2).toLowerCase() === peg$c603) {
        s0 = input.substr(peg$currPos, 2);
        peg$currPos += 2;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c604); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "AS",
        description: peg$descNames["AS"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "AS",
        description: peg$descNames["AS"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseASC() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "ASC",
        description: peg$descNames["ASC"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 3).toLowerCase() === peg$c605) {
        s0 = input.substr(peg$currPos, 3);
        peg$currPos += 3;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c606); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "ASC",
        description: peg$descNames["ASC"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "ASC",
        description: peg$descNames["ASC"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseATTACH() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "ATTACH",
        description: peg$descNames["ATTACH"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 6).toLowerCase() === peg$c607) {
        s0 = input.substr(peg$currPos, 6);
        peg$currPos += 6;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c608); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "ATTACH",
        description: peg$descNames["ATTACH"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "ATTACH",
        description: peg$descNames["ATTACH"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseAUTOINCREMENT() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "AUTOINCREMENT",
        description: peg$descNames["AUTOINCREMENT"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 13).toLowerCase() === peg$c609) {
        s0 = input.substr(peg$currPos, 13);
        peg$currPos += 13;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c610); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "AUTOINCREMENT",
        description: peg$descNames["AUTOINCREMENT"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "AUTOINCREMENT",
        description: peg$descNames["AUTOINCREMENT"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseBEFORE() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "BEFORE",
        description: peg$descNames["BEFORE"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 6).toLowerCase() === peg$c611) {
        s0 = input.substr(peg$currPos, 6);
        peg$currPos += 6;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c612); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "BEFORE",
        description: peg$descNames["BEFORE"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "BEFORE",
        description: peg$descNames["BEFORE"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseBEGIN() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "BEGIN",
        description: peg$descNames["BEGIN"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 5).toLowerCase() === peg$c613) {
        s0 = input.substr(peg$currPos, 5);
        peg$currPos += 5;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c614); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "BEGIN",
        description: peg$descNames["BEGIN"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "BEGIN",
        description: peg$descNames["BEGIN"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseBETWEEN() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "BETWEEN",
        description: peg$descNames["BETWEEN"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 7).toLowerCase() === peg$c615) {
        s0 = input.substr(peg$currPos, 7);
        peg$currPos += 7;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c616); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "BETWEEN",
        description: peg$descNames["BETWEEN"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "BETWEEN",
        description: peg$descNames["BETWEEN"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseBY() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "BY",
        description: peg$descNames["BY"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 2).toLowerCase() === peg$c617) {
        s0 = input.substr(peg$currPos, 2);
        peg$currPos += 2;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c618); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "BY",
        description: peg$descNames["BY"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "BY",
        description: peg$descNames["BY"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseCASCADE() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "CASCADE",
        description: peg$descNames["CASCADE"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 7).toLowerCase() === peg$c619) {
        s0 = input.substr(peg$currPos, 7);
        peg$currPos += 7;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c620); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "CASCADE",
        description: peg$descNames["CASCADE"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "CASCADE",
        description: peg$descNames["CASCADE"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseCASE() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "CASE",
        description: peg$descNames["CASE"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 4).toLowerCase() === peg$c621) {
        s0 = input.substr(peg$currPos, 4);
        peg$currPos += 4;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c622); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "CASE",
        description: peg$descNames["CASE"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "CASE",
        description: peg$descNames["CASE"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseCAST() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "CAST",
        description: peg$descNames["CAST"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 4).toLowerCase() === peg$c623) {
        s0 = input.substr(peg$currPos, 4);
        peg$currPos += 4;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c624); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "CAST",
        description: peg$descNames["CAST"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "CAST",
        description: peg$descNames["CAST"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseCHECK() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "CHECK",
        description: peg$descNames["CHECK"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 5).toLowerCase() === peg$c625) {
        s0 = input.substr(peg$currPos, 5);
        peg$currPos += 5;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c626); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "CHECK",
        description: peg$descNames["CHECK"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "CHECK",
        description: peg$descNames["CHECK"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseCOLLATE() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "COLLATE",
        description: peg$descNames["COLLATE"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 7).toLowerCase() === peg$c627) {
        s0 = input.substr(peg$currPos, 7);
        peg$currPos += 7;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c628); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "COLLATE",
        description: peg$descNames["COLLATE"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "COLLATE",
        description: peg$descNames["COLLATE"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseCOLUMN() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "COLUMN",
        description: peg$descNames["COLUMN"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 6).toLowerCase() === peg$c629) {
        s0 = input.substr(peg$currPos, 6);
        peg$currPos += 6;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c630); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "COLUMN",
        description: peg$descNames["COLUMN"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "COLUMN",
        description: peg$descNames["COLUMN"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseCOMMIT() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "COMMIT",
        description: peg$descNames["COMMIT"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 6).toLowerCase() === peg$c631) {
        s0 = input.substr(peg$currPos, 6);
        peg$currPos += 6;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c632); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "COMMIT",
        description: peg$descNames["COMMIT"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "COMMIT",
        description: peg$descNames["COMMIT"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseCONFLICT() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "CONFLICT",
        description: peg$descNames["CONFLICT"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 8).toLowerCase() === peg$c633) {
        s0 = input.substr(peg$currPos, 8);
        peg$currPos += 8;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c634); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "CONFLICT",
        description: peg$descNames["CONFLICT"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "CONFLICT",
        description: peg$descNames["CONFLICT"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseCONSTRAINT() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "CONSTRAINT",
        description: peg$descNames["CONSTRAINT"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 10).toLowerCase() === peg$c635) {
        s0 = input.substr(peg$currPos, 10);
        peg$currPos += 10;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c636); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "CONSTRAINT",
        description: peg$descNames["CONSTRAINT"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "CONSTRAINT",
        description: peg$descNames["CONSTRAINT"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseCREATE() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "CREATE",
        description: peg$descNames["CREATE"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 6).toLowerCase() === peg$c637) {
        s0 = input.substr(peg$currPos, 6);
        peg$currPos += 6;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c638); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "CREATE",
        description: peg$descNames["CREATE"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "CREATE",
        description: peg$descNames["CREATE"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseCROSS() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "CROSS",
        description: peg$descNames["CROSS"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 5).toLowerCase() === peg$c639) {
        s0 = input.substr(peg$currPos, 5);
        peg$currPos += 5;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c640); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "CROSS",
        description: peg$descNames["CROSS"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "CROSS",
        description: peg$descNames["CROSS"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseCURRENT_DATE() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "CURRENT_DATE",
        description: peg$descNames["CURRENT_DATE"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 12).toLowerCase() === peg$c641) {
        s0 = input.substr(peg$currPos, 12);
        peg$currPos += 12;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c642); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "CURRENT_DATE",
        description: peg$descNames["CURRENT_DATE"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "CURRENT_DATE",
        description: peg$descNames["CURRENT_DATE"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseCURRENT_TIME() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "CURRENT_TIME",
        description: peg$descNames["CURRENT_TIME"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 12).toLowerCase() === peg$c643) {
        s0 = input.substr(peg$currPos, 12);
        peg$currPos += 12;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c644); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "CURRENT_TIME",
        description: peg$descNames["CURRENT_TIME"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "CURRENT_TIME",
        description: peg$descNames["CURRENT_TIME"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseCURRENT_TIMESTAMP() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "CURRENT_TIMESTAMP",
        description: peg$descNames["CURRENT_TIMESTAMP"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 17).toLowerCase() === peg$c645) {
        s0 = input.substr(peg$currPos, 17);
        peg$currPos += 17;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c646); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "CURRENT_TIMESTAMP",
        description: peg$descNames["CURRENT_TIMESTAMP"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "CURRENT_TIMESTAMP",
        description: peg$descNames["CURRENT_TIMESTAMP"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseDATABASE() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "DATABASE",
        description: peg$descNames["DATABASE"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 8).toLowerCase() === peg$c647) {
        s0 = input.substr(peg$currPos, 8);
        peg$currPos += 8;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c648); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "DATABASE",
        description: peg$descNames["DATABASE"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "DATABASE",
        description: peg$descNames["DATABASE"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseDEFAULT() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "DEFAULT",
        description: peg$descNames["DEFAULT"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 7).toLowerCase() === peg$c649) {
        s0 = input.substr(peg$currPos, 7);
        peg$currPos += 7;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c650); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "DEFAULT",
        description: peg$descNames["DEFAULT"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "DEFAULT",
        description: peg$descNames["DEFAULT"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseDEFERRABLE() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "DEFERRABLE",
        description: peg$descNames["DEFERRABLE"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 10).toLowerCase() === peg$c651) {
        s0 = input.substr(peg$currPos, 10);
        peg$currPos += 10;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c652); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "DEFERRABLE",
        description: peg$descNames["DEFERRABLE"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "DEFERRABLE",
        description: peg$descNames["DEFERRABLE"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseDEFERRED() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "DEFERRED",
        description: peg$descNames["DEFERRED"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 8).toLowerCase() === peg$c653) {
        s0 = input.substr(peg$currPos, 8);
        peg$currPos += 8;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c654); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "DEFERRED",
        description: peg$descNames["DEFERRED"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "DEFERRED",
        description: peg$descNames["DEFERRED"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseDELETE() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "DELETE",
        description: peg$descNames["DELETE"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 6).toLowerCase() === peg$c655) {
        s0 = input.substr(peg$currPos, 6);
        peg$currPos += 6;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c656); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "DELETE",
        description: peg$descNames["DELETE"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "DELETE",
        description: peg$descNames["DELETE"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseDESC() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "DESC",
        description: peg$descNames["DESC"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 4).toLowerCase() === peg$c657) {
        s0 = input.substr(peg$currPos, 4);
        peg$currPos += 4;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c658); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "DESC",
        description: peg$descNames["DESC"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "DESC",
        description: peg$descNames["DESC"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseDETACH() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "DETACH",
        description: peg$descNames["DETACH"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 6).toLowerCase() === peg$c659) {
        s0 = input.substr(peg$currPos, 6);
        peg$currPos += 6;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c660); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "DETACH",
        description: peg$descNames["DETACH"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "DETACH",
        description: peg$descNames["DETACH"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseDISTINCT() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "DISTINCT",
        description: peg$descNames["DISTINCT"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 8).toLowerCase() === peg$c661) {
        s0 = input.substr(peg$currPos, 8);
        peg$currPos += 8;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c662); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "DISTINCT",
        description: peg$descNames["DISTINCT"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "DISTINCT",
        description: peg$descNames["DISTINCT"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseDROP() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "DROP",
        description: peg$descNames["DROP"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 4).toLowerCase() === peg$c663) {
        s0 = input.substr(peg$currPos, 4);
        peg$currPos += 4;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c664); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "DROP",
        description: peg$descNames["DROP"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "DROP",
        description: peg$descNames["DROP"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseEACH() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "EACH",
        description: peg$descNames["EACH"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 4).toLowerCase() === peg$c665) {
        s0 = input.substr(peg$currPos, 4);
        peg$currPos += 4;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c666); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "EACH",
        description: peg$descNames["EACH"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "EACH",
        description: peg$descNames["EACH"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseELSE() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "ELSE",
        description: peg$descNames["ELSE"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 4).toLowerCase() === peg$c667) {
        s0 = input.substr(peg$currPos, 4);
        peg$currPos += 4;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c668); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "ELSE",
        description: peg$descNames["ELSE"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "ELSE",
        description: peg$descNames["ELSE"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseEND() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "END",
        description: peg$descNames["END"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 3).toLowerCase() === peg$c669) {
        s0 = input.substr(peg$currPos, 3);
        peg$currPos += 3;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c670); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "END",
        description: peg$descNames["END"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "END",
        description: peg$descNames["END"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseESCAPE() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "ESCAPE",
        description: peg$descNames["ESCAPE"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 6).toLowerCase() === peg$c671) {
        s0 = input.substr(peg$currPos, 6);
        peg$currPos += 6;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c672); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "ESCAPE",
        description: peg$descNames["ESCAPE"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "ESCAPE",
        description: peg$descNames["ESCAPE"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseEXCEPT() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "EXCEPT",
        description: peg$descNames["EXCEPT"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 6).toLowerCase() === peg$c673) {
        s0 = input.substr(peg$currPos, 6);
        peg$currPos += 6;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c674); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "EXCEPT",
        description: peg$descNames["EXCEPT"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "EXCEPT",
        description: peg$descNames["EXCEPT"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseEXCLUSIVE() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "EXCLUSIVE",
        description: peg$descNames["EXCLUSIVE"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 9).toLowerCase() === peg$c675) {
        s0 = input.substr(peg$currPos, 9);
        peg$currPos += 9;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c676); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "EXCLUSIVE",
        description: peg$descNames["EXCLUSIVE"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "EXCLUSIVE",
        description: peg$descNames["EXCLUSIVE"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseEXISTS() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "EXISTS",
        description: peg$descNames["EXISTS"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 6).toLowerCase() === peg$c677) {
        s0 = input.substr(peg$currPos, 6);
        peg$currPos += 6;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c678); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "EXISTS",
        description: peg$descNames["EXISTS"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "EXISTS",
        description: peg$descNames["EXISTS"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseEXPLAIN() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "EXPLAIN",
        description: peg$descNames["EXPLAIN"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 7).toLowerCase() === peg$c679) {
        s0 = input.substr(peg$currPos, 7);
        peg$currPos += 7;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c680); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "EXPLAIN",
        description: peg$descNames["EXPLAIN"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "EXPLAIN",
        description: peg$descNames["EXPLAIN"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseFAIL() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "FAIL",
        description: peg$descNames["FAIL"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 4).toLowerCase() === peg$c681) {
        s0 = input.substr(peg$currPos, 4);
        peg$currPos += 4;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c682); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "FAIL",
        description: peg$descNames["FAIL"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "FAIL",
        description: peg$descNames["FAIL"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseFOR() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "FOR",
        description: peg$descNames["FOR"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 3).toLowerCase() === peg$c683) {
        s0 = input.substr(peg$currPos, 3);
        peg$currPos += 3;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c684); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "FOR",
        description: peg$descNames["FOR"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "FOR",
        description: peg$descNames["FOR"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseFOREIGN() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "FOREIGN",
        description: peg$descNames["FOREIGN"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 7).toLowerCase() === peg$c685) {
        s0 = input.substr(peg$currPos, 7);
        peg$currPos += 7;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c686); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "FOREIGN",
        description: peg$descNames["FOREIGN"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "FOREIGN",
        description: peg$descNames["FOREIGN"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseFROM() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "FROM",
        description: peg$descNames["FROM"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 4).toLowerCase() === peg$c687) {
        s0 = input.substr(peg$currPos, 4);
        peg$currPos += 4;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c688); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "FROM",
        description: peg$descNames["FROM"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "FROM",
        description: peg$descNames["FROM"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseFULL() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "FULL",
        description: peg$descNames["FULL"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 4).toLowerCase() === peg$c689) {
        s0 = input.substr(peg$currPos, 4);
        peg$currPos += 4;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c690); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "FULL",
        description: peg$descNames["FULL"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "FULL",
        description: peg$descNames["FULL"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseGLOB() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "GLOB",
        description: peg$descNames["GLOB"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 4).toLowerCase() === peg$c691) {
        s0 = input.substr(peg$currPos, 4);
        peg$currPos += 4;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c692); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "GLOB",
        description: peg$descNames["GLOB"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "GLOB",
        description: peg$descNames["GLOB"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseGROUP() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "GROUP",
        description: peg$descNames["GROUP"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 5).toLowerCase() === peg$c693) {
        s0 = input.substr(peg$currPos, 5);
        peg$currPos += 5;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c694); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "GROUP",
        description: peg$descNames["GROUP"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "GROUP",
        description: peg$descNames["GROUP"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseHAVING() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "HAVING",
        description: peg$descNames["HAVING"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 6).toLowerCase() === peg$c695) {
        s0 = input.substr(peg$currPos, 6);
        peg$currPos += 6;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c696); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "HAVING",
        description: peg$descNames["HAVING"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "HAVING",
        description: peg$descNames["HAVING"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseIF() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "IF",
        description: peg$descNames["IF"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 2).toLowerCase() === peg$c697) {
        s0 = input.substr(peg$currPos, 2);
        peg$currPos += 2;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c698); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "IF",
        description: peg$descNames["IF"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "IF",
        description: peg$descNames["IF"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseIGNORE() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "IGNORE",
        description: peg$descNames["IGNORE"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 6).toLowerCase() === peg$c699) {
        s0 = input.substr(peg$currPos, 6);
        peg$currPos += 6;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c700); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "IGNORE",
        description: peg$descNames["IGNORE"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "IGNORE",
        description: peg$descNames["IGNORE"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseIMMEDIATE() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "IMMEDIATE",
        description: peg$descNames["IMMEDIATE"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 9).toLowerCase() === peg$c701) {
        s0 = input.substr(peg$currPos, 9);
        peg$currPos += 9;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c702); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "IMMEDIATE",
        description: peg$descNames["IMMEDIATE"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "IMMEDIATE",
        description: peg$descNames["IMMEDIATE"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseIN() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "IN",
        description: peg$descNames["IN"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 2).toLowerCase() === peg$c703) {
        s0 = input.substr(peg$currPos, 2);
        peg$currPos += 2;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c704); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "IN",
        description: peg$descNames["IN"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "IN",
        description: peg$descNames["IN"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseINDEX() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "INDEX",
        description: peg$descNames["INDEX"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 5).toLowerCase() === peg$c705) {
        s0 = input.substr(peg$currPos, 5);
        peg$currPos += 5;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c706); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "INDEX",
        description: peg$descNames["INDEX"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "INDEX",
        description: peg$descNames["INDEX"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseINDEXED() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "INDEXED",
        description: peg$descNames["INDEXED"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 7).toLowerCase() === peg$c707) {
        s0 = input.substr(peg$currPos, 7);
        peg$currPos += 7;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c708); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "INDEXED",
        description: peg$descNames["INDEXED"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "INDEXED",
        description: peg$descNames["INDEXED"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseINITIALLY() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "INITIALLY",
        description: peg$descNames["INITIALLY"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 9).toLowerCase() === peg$c709) {
        s0 = input.substr(peg$currPos, 9);
        peg$currPos += 9;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c710); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "INITIALLY",
        description: peg$descNames["INITIALLY"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "INITIALLY",
        description: peg$descNames["INITIALLY"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseINNER() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "INNER",
        description: peg$descNames["INNER"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 5).toLowerCase() === peg$c711) {
        s0 = input.substr(peg$currPos, 5);
        peg$currPos += 5;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c712); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "INNER",
        description: peg$descNames["INNER"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "INNER",
        description: peg$descNames["INNER"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseINSERT() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "INSERT",
        description: peg$descNames["INSERT"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 6).toLowerCase() === peg$c713) {
        s0 = input.substr(peg$currPos, 6);
        peg$currPos += 6;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c714); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "INSERT",
        description: peg$descNames["INSERT"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "INSERT",
        description: peg$descNames["INSERT"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseINSTEAD() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "INSTEAD",
        description: peg$descNames["INSTEAD"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 7).toLowerCase() === peg$c715) {
        s0 = input.substr(peg$currPos, 7);
        peg$currPos += 7;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c716); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "INSTEAD",
        description: peg$descNames["INSTEAD"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "INSTEAD",
        description: peg$descNames["INSTEAD"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseINTERSECT() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "INTERSECT",
        description: peg$descNames["INTERSECT"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 9).toLowerCase() === peg$c717) {
        s0 = input.substr(peg$currPos, 9);
        peg$currPos += 9;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c718); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "INTERSECT",
        description: peg$descNames["INTERSECT"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "INTERSECT",
        description: peg$descNames["INTERSECT"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseINTO() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "INTO",
        description: peg$descNames["INTO"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 4).toLowerCase() === peg$c719) {
        s0 = input.substr(peg$currPos, 4);
        peg$currPos += 4;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c720); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "INTO",
        description: peg$descNames["INTO"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "INTO",
        description: peg$descNames["INTO"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseIS() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "IS",
        description: peg$descNames["IS"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 2).toLowerCase() === peg$c721) {
        s0 = input.substr(peg$currPos, 2);
        peg$currPos += 2;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c722); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "IS",
        description: peg$descNames["IS"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "IS",
        description: peg$descNames["IS"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseISNULL() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "ISNULL",
        description: peg$descNames["ISNULL"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 6).toLowerCase() === peg$c723) {
        s0 = input.substr(peg$currPos, 6);
        peg$currPos += 6;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c724); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "ISNULL",
        description: peg$descNames["ISNULL"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "ISNULL",
        description: peg$descNames["ISNULL"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseJOIN() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "JOIN",
        description: peg$descNames["JOIN"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 4).toLowerCase() === peg$c725) {
        s0 = input.substr(peg$currPos, 4);
        peg$currPos += 4;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c726); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "JOIN",
        description: peg$descNames["JOIN"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "JOIN",
        description: peg$descNames["JOIN"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseKEY() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "KEY",
        description: peg$descNames["KEY"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 3).toLowerCase() === peg$c727) {
        s0 = input.substr(peg$currPos, 3);
        peg$currPos += 3;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c728); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "KEY",
        description: peg$descNames["KEY"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "KEY",
        description: peg$descNames["KEY"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseLEFT() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "LEFT",
        description: peg$descNames["LEFT"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 4).toLowerCase() === peg$c729) {
        s0 = input.substr(peg$currPos, 4);
        peg$currPos += 4;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c730); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "LEFT",
        description: peg$descNames["LEFT"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "LEFT",
        description: peg$descNames["LEFT"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseLIKE() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "LIKE",
        description: peg$descNames["LIKE"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 4).toLowerCase() === peg$c731) {
        s0 = input.substr(peg$currPos, 4);
        peg$currPos += 4;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c732); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "LIKE",
        description: peg$descNames["LIKE"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "LIKE",
        description: peg$descNames["LIKE"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseLIMIT() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "LIMIT",
        description: peg$descNames["LIMIT"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 5).toLowerCase() === peg$c733) {
        s0 = input.substr(peg$currPos, 5);
        peg$currPos += 5;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c734); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "LIMIT",
        description: peg$descNames["LIMIT"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "LIMIT",
        description: peg$descNames["LIMIT"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseMATCH() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "MATCH",
        description: peg$descNames["MATCH"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 5).toLowerCase() === peg$c735) {
        s0 = input.substr(peg$currPos, 5);
        peg$currPos += 5;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c736); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "MATCH",
        description: peg$descNames["MATCH"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "MATCH",
        description: peg$descNames["MATCH"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseNATURAL() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "NATURAL",
        description: peg$descNames["NATURAL"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 7).toLowerCase() === peg$c737) {
        s0 = input.substr(peg$currPos, 7);
        peg$currPos += 7;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c738); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "NATURAL",
        description: peg$descNames["NATURAL"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "NATURAL",
        description: peg$descNames["NATURAL"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseNO() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "NO",
        description: peg$descNames["NO"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 2).toLowerCase() === peg$c739) {
        s0 = input.substr(peg$currPos, 2);
        peg$currPos += 2;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c740); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "NO",
        description: peg$descNames["NO"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "NO",
        description: peg$descNames["NO"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseNOT() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "NOT",
        description: peg$descNames["NOT"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 3).toLowerCase() === peg$c741) {
        s0 = input.substr(peg$currPos, 3);
        peg$currPos += 3;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c742); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "NOT",
        description: peg$descNames["NOT"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "NOT",
        description: peg$descNames["NOT"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseNOTNULL() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "NOTNULL",
        description: peg$descNames["NOTNULL"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 7).toLowerCase() === peg$c743) {
        s0 = input.substr(peg$currPos, 7);
        peg$currPos += 7;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c744); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "NOTNULL",
        description: peg$descNames["NOTNULL"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "NOTNULL",
        description: peg$descNames["NOTNULL"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseNULL() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "NULL",
        description: peg$descNames["NULL"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 4).toLowerCase() === peg$c745) {
        s0 = input.substr(peg$currPos, 4);
        peg$currPos += 4;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c746); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "NULL",
        description: peg$descNames["NULL"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "NULL",
        description: peg$descNames["NULL"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseOF() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "OF",
        description: peg$descNames["OF"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 2).toLowerCase() === peg$c747) {
        s0 = input.substr(peg$currPos, 2);
        peg$currPos += 2;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c748); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "OF",
        description: peg$descNames["OF"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "OF",
        description: peg$descNames["OF"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseOFFSET() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "OFFSET",
        description: peg$descNames["OFFSET"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 6).toLowerCase() === peg$c749) {
        s0 = input.substr(peg$currPos, 6);
        peg$currPos += 6;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c750); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "OFFSET",
        description: peg$descNames["OFFSET"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "OFFSET",
        description: peg$descNames["OFFSET"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseON() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "ON",
        description: peg$descNames["ON"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 2).toLowerCase() === peg$c751) {
        s0 = input.substr(peg$currPos, 2);
        peg$currPos += 2;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c752); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "ON",
        description: peg$descNames["ON"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "ON",
        description: peg$descNames["ON"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseOR() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "OR",
        description: peg$descNames["OR"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 2).toLowerCase() === peg$c753) {
        s0 = input.substr(peg$currPos, 2);
        peg$currPos += 2;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c754); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "OR",
        description: peg$descNames["OR"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "OR",
        description: peg$descNames["OR"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseORDER() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "ORDER",
        description: peg$descNames["ORDER"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 5).toLowerCase() === peg$c755) {
        s0 = input.substr(peg$currPos, 5);
        peg$currPos += 5;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c756); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "ORDER",
        description: peg$descNames["ORDER"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "ORDER",
        description: peg$descNames["ORDER"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseOUTER() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "OUTER",
        description: peg$descNames["OUTER"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 5).toLowerCase() === peg$c757) {
        s0 = input.substr(peg$currPos, 5);
        peg$currPos += 5;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c758); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "OUTER",
        description: peg$descNames["OUTER"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "OUTER",
        description: peg$descNames["OUTER"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsePLAN() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "PLAN",
        description: peg$descNames["PLAN"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 4).toLowerCase() === peg$c759) {
        s0 = input.substr(peg$currPos, 4);
        peg$currPos += 4;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c760); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "PLAN",
        description: peg$descNames["PLAN"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "PLAN",
        description: peg$descNames["PLAN"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsePRAGMA() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "PRAGMA",
        description: peg$descNames["PRAGMA"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 6).toLowerCase() === peg$c761) {
        s0 = input.substr(peg$currPos, 6);
        peg$currPos += 6;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c762); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "PRAGMA",
        description: peg$descNames["PRAGMA"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "PRAGMA",
        description: peg$descNames["PRAGMA"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsePRIMARY() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "PRIMARY",
        description: peg$descNames["PRIMARY"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 7).toLowerCase() === peg$c763) {
        s0 = input.substr(peg$currPos, 7);
        peg$currPos += 7;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c764); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "PRIMARY",
        description: peg$descNames["PRIMARY"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "PRIMARY",
        description: peg$descNames["PRIMARY"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseQUERY() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "QUERY",
        description: peg$descNames["QUERY"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 5).toLowerCase() === peg$c765) {
        s0 = input.substr(peg$currPos, 5);
        peg$currPos += 5;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c766); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "QUERY",
        description: peg$descNames["QUERY"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "QUERY",
        description: peg$descNames["QUERY"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseRAISE() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "RAISE",
        description: peg$descNames["RAISE"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 5).toLowerCase() === peg$c767) {
        s0 = input.substr(peg$currPos, 5);
        peg$currPos += 5;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c768); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "RAISE",
        description: peg$descNames["RAISE"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "RAISE",
        description: peg$descNames["RAISE"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseRECURSIVE() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "RECURSIVE",
        description: peg$descNames["RECURSIVE"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 9).toLowerCase() === peg$c769) {
        s0 = input.substr(peg$currPos, 9);
        peg$currPos += 9;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c770); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "RECURSIVE",
        description: peg$descNames["RECURSIVE"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "RECURSIVE",
        description: peg$descNames["RECURSIVE"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseREFERENCES() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "REFERENCES",
        description: peg$descNames["REFERENCES"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 10).toLowerCase() === peg$c771) {
        s0 = input.substr(peg$currPos, 10);
        peg$currPos += 10;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c772); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "REFERENCES",
        description: peg$descNames["REFERENCES"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "REFERENCES",
        description: peg$descNames["REFERENCES"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseREGEXP() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "REGEXP",
        description: peg$descNames["REGEXP"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 6).toLowerCase() === peg$c773) {
        s0 = input.substr(peg$currPos, 6);
        peg$currPos += 6;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c774); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "REGEXP",
        description: peg$descNames["REGEXP"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "REGEXP",
        description: peg$descNames["REGEXP"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseREINDEX() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "REINDEX",
        description: peg$descNames["REINDEX"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 7).toLowerCase() === peg$c775) {
        s0 = input.substr(peg$currPos, 7);
        peg$currPos += 7;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c776); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "REINDEX",
        description: peg$descNames["REINDEX"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "REINDEX",
        description: peg$descNames["REINDEX"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseRELEASE() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "RELEASE",
        description: peg$descNames["RELEASE"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 7).toLowerCase() === peg$c777) {
        s0 = input.substr(peg$currPos, 7);
        peg$currPos += 7;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c778); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "RELEASE",
        description: peg$descNames["RELEASE"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "RELEASE",
        description: peg$descNames["RELEASE"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseRENAME() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "RENAME",
        description: peg$descNames["RENAME"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 6).toLowerCase() === peg$c779) {
        s0 = input.substr(peg$currPos, 6);
        peg$currPos += 6;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c780); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "RENAME",
        description: peg$descNames["RENAME"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "RENAME",
        description: peg$descNames["RENAME"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseREPLACE() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "REPLACE",
        description: peg$descNames["REPLACE"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 7).toLowerCase() === peg$c781) {
        s0 = input.substr(peg$currPos, 7);
        peg$currPos += 7;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c782); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "REPLACE",
        description: peg$descNames["REPLACE"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "REPLACE",
        description: peg$descNames["REPLACE"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseRESTRICT() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "RESTRICT",
        description: peg$descNames["RESTRICT"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 8).toLowerCase() === peg$c783) {
        s0 = input.substr(peg$currPos, 8);
        peg$currPos += 8;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c784); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "RESTRICT",
        description: peg$descNames["RESTRICT"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "RESTRICT",
        description: peg$descNames["RESTRICT"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseRIGHT() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "RIGHT",
        description: peg$descNames["RIGHT"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 5).toLowerCase() === peg$c785) {
        s0 = input.substr(peg$currPos, 5);
        peg$currPos += 5;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c786); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "RIGHT",
        description: peg$descNames["RIGHT"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "RIGHT",
        description: peg$descNames["RIGHT"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseROLLBACK() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "ROLLBACK",
        description: peg$descNames["ROLLBACK"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 8).toLowerCase() === peg$c787) {
        s0 = input.substr(peg$currPos, 8);
        peg$currPos += 8;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c788); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "ROLLBACK",
        description: peg$descNames["ROLLBACK"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "ROLLBACK",
        description: peg$descNames["ROLLBACK"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseROW() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "ROW",
        description: peg$descNames["ROW"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 3).toLowerCase() === peg$c789) {
        s0 = input.substr(peg$currPos, 3);
        peg$currPos += 3;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c790); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "ROW",
        description: peg$descNames["ROW"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "ROW",
        description: peg$descNames["ROW"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseROWID() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "ROWID",
        description: peg$descNames["ROWID"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 5).toLowerCase() === peg$c791) {
        s0 = input.substr(peg$currPos, 5);
        peg$currPos += 5;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c792); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "ROWID",
        description: peg$descNames["ROWID"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "ROWID",
        description: peg$descNames["ROWID"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseSAVEPOINT() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "SAVEPOINT",
        description: peg$descNames["SAVEPOINT"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 9).toLowerCase() === peg$c793) {
        s0 = input.substr(peg$currPos, 9);
        peg$currPos += 9;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c794); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "SAVEPOINT",
        description: peg$descNames["SAVEPOINT"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "SAVEPOINT",
        description: peg$descNames["SAVEPOINT"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseSELECT() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "SELECT",
        description: peg$descNames["SELECT"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 6).toLowerCase() === peg$c795) {
        s0 = input.substr(peg$currPos, 6);
        peg$currPos += 6;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c796); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "SELECT",
        description: peg$descNames["SELECT"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "SELECT",
        description: peg$descNames["SELECT"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseSET() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "SET",
        description: peg$descNames["SET"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 3).toLowerCase() === peg$c797) {
        s0 = input.substr(peg$currPos, 3);
        peg$currPos += 3;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c798); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "SET",
        description: peg$descNames["SET"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "SET",
        description: peg$descNames["SET"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseTABLE() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "TABLE",
        description: peg$descNames["TABLE"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 5).toLowerCase() === peg$c799) {
        s0 = input.substr(peg$currPos, 5);
        peg$currPos += 5;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c800); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "TABLE",
        description: peg$descNames["TABLE"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "TABLE",
        description: peg$descNames["TABLE"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseTEMP() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "TEMP",
        description: peg$descNames["TEMP"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 4).toLowerCase() === peg$c801) {
        s0 = input.substr(peg$currPos, 4);
        peg$currPos += 4;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c802); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "TEMP",
        description: peg$descNames["TEMP"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "TEMP",
        description: peg$descNames["TEMP"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseTEMPORARY() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "TEMPORARY",
        description: peg$descNames["TEMPORARY"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 9).toLowerCase() === peg$c803) {
        s0 = input.substr(peg$currPos, 9);
        peg$currPos += 9;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c804); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "TEMPORARY",
        description: peg$descNames["TEMPORARY"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "TEMPORARY",
        description: peg$descNames["TEMPORARY"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseTHEN() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "THEN",
        description: peg$descNames["THEN"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 4).toLowerCase() === peg$c805) {
        s0 = input.substr(peg$currPos, 4);
        peg$currPos += 4;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c806); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "THEN",
        description: peg$descNames["THEN"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "THEN",
        description: peg$descNames["THEN"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseTO() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "TO",
        description: peg$descNames["TO"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 2).toLowerCase() === peg$c807) {
        s0 = input.substr(peg$currPos, 2);
        peg$currPos += 2;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c808); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "TO",
        description: peg$descNames["TO"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "TO",
        description: peg$descNames["TO"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseTRANSACTION() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "TRANSACTION",
        description: peg$descNames["TRANSACTION"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 11).toLowerCase() === peg$c809) {
        s0 = input.substr(peg$currPos, 11);
        peg$currPos += 11;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c810); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "TRANSACTION",
        description: peg$descNames["TRANSACTION"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "TRANSACTION",
        description: peg$descNames["TRANSACTION"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseTRIGGER() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "TRIGGER",
        description: peg$descNames["TRIGGER"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 7).toLowerCase() === peg$c811) {
        s0 = input.substr(peg$currPos, 7);
        peg$currPos += 7;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c812); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "TRIGGER",
        description: peg$descNames["TRIGGER"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "TRIGGER",
        description: peg$descNames["TRIGGER"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseUNION() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "UNION",
        description: peg$descNames["UNION"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 5).toLowerCase() === peg$c813) {
        s0 = input.substr(peg$currPos, 5);
        peg$currPos += 5;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c814); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "UNION",
        description: peg$descNames["UNION"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "UNION",
        description: peg$descNames["UNION"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseUNIQUE() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "UNIQUE",
        description: peg$descNames["UNIQUE"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 6).toLowerCase() === peg$c815) {
        s0 = input.substr(peg$currPos, 6);
        peg$currPos += 6;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c816); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "UNIQUE",
        description: peg$descNames["UNIQUE"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "UNIQUE",
        description: peg$descNames["UNIQUE"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseUPDATE() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "UPDATE",
        description: peg$descNames["UPDATE"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 6).toLowerCase() === peg$c817) {
        s0 = input.substr(peg$currPos, 6);
        peg$currPos += 6;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c818); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "UPDATE",
        description: peg$descNames["UPDATE"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "UPDATE",
        description: peg$descNames["UPDATE"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseUSING() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "USING",
        description: peg$descNames["USING"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 5).toLowerCase() === peg$c819) {
        s0 = input.substr(peg$currPos, 5);
        peg$currPos += 5;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c820); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "USING",
        description: peg$descNames["USING"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "USING",
        description: peg$descNames["USING"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseVACUUM() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "VACUUM",
        description: peg$descNames["VACUUM"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 6).toLowerCase() === peg$c821) {
        s0 = input.substr(peg$currPos, 6);
        peg$currPos += 6;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c822); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "VACUUM",
        description: peg$descNames["VACUUM"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "VACUUM",
        description: peg$descNames["VACUUM"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseVALUES() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "VALUES",
        description: peg$descNames["VALUES"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 6).toLowerCase() === peg$c823) {
        s0 = input.substr(peg$currPos, 6);
        peg$currPos += 6;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c824); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "VALUES",
        description: peg$descNames["VALUES"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "VALUES",
        description: peg$descNames["VALUES"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseVIEW() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "VIEW",
        description: peg$descNames["VIEW"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 4).toLowerCase() === peg$c825) {
        s0 = input.substr(peg$currPos, 4);
        peg$currPos += 4;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c826); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "VIEW",
        description: peg$descNames["VIEW"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "VIEW",
        description: peg$descNames["VIEW"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseVIRTUAL() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "VIRTUAL",
        description: peg$descNames["VIRTUAL"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 7).toLowerCase() === peg$c827) {
        s0 = input.substr(peg$currPos, 7);
        peg$currPos += 7;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c828); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "VIRTUAL",
        description: peg$descNames["VIRTUAL"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "VIRTUAL",
        description: peg$descNames["VIRTUAL"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseWHEN() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "WHEN",
        description: peg$descNames["WHEN"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 4).toLowerCase() === peg$c829) {
        s0 = input.substr(peg$currPos, 4);
        peg$currPos += 4;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c830); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "WHEN",
        description: peg$descNames["WHEN"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "WHEN",
        description: peg$descNames["WHEN"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseWHERE() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "WHERE",
        description: peg$descNames["WHERE"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 5).toLowerCase() === peg$c831) {
        s0 = input.substr(peg$currPos, 5);
        peg$currPos += 5;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c832); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "WHERE",
        description: peg$descNames["WHERE"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "WHERE",
        description: peg$descNames["WHERE"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseWITH() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "WITH",
        description: peg$descNames["WITH"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 4).toLowerCase() === peg$c833) {
        s0 = input.substr(peg$currPos, 4);
        peg$currPos += 4;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c834); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "WITH",
        description: peg$descNames["WITH"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "WITH",
        description: peg$descNames["WITH"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseWITHOUT() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "WITHOUT",
        description: peg$descNames["WITHOUT"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 7).toLowerCase() === peg$c835) {
        s0 = input.substr(peg$currPos, 7);
        peg$currPos += 7;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c836); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "WITHOUT",
        description: peg$descNames["WITHOUT"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "WITHOUT",
        description: peg$descNames["WITHOUT"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsereserved_words() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "reserved_words",
        description: peg$descNames["reserved_words"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsereserved_word_list();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c837(s1);
      }
      s0 = s1;

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "reserved_words",
        description: peg$descNames["reserved_words"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "reserved_words",
        description: peg$descNames["reserved_words"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsereserved_word_list() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "reserved_word_list",
        description: peg$descNames["reserved_word_list"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$parseABORT();
      if (s0 === peg$FAILED) {
        s0 = peg$parseACTION();
        if (s0 === peg$FAILED) {
          s0 = peg$parseADD();
          if (s0 === peg$FAILED) {
            s0 = peg$parseAFTER();
            if (s0 === peg$FAILED) {
              s0 = peg$parseALL();
              if (s0 === peg$FAILED) {
                s0 = peg$parseALTER();
                if (s0 === peg$FAILED) {
                  s0 = peg$parseANALYZE();
                  if (s0 === peg$FAILED) {
                    s0 = peg$parseAND();
                    if (s0 === peg$FAILED) {
                      s0 = peg$parseASC();
                      if (s0 === peg$FAILED) {
                        s0 = peg$parseATTACH();
                        if (s0 === peg$FAILED) {
                          s0 = peg$parseAUTOINCREMENT();
                          if (s0 === peg$FAILED) {
                            s0 = peg$parseBEFORE();
                            if (s0 === peg$FAILED) {
                              s0 = peg$parseBEGIN();
                              if (s0 === peg$FAILED) {
                                s0 = peg$parseBETWEEN();
                                if (s0 === peg$FAILED) {
                                  s0 = peg$parseBY();
                                  if (s0 === peg$FAILED) {
                                    s0 = peg$parseCASCADE();
                                    if (s0 === peg$FAILED) {
                                      s0 = peg$parseCASE();
                                      if (s0 === peg$FAILED) {
                                        s0 = peg$parseCAST();
                                        if (s0 === peg$FAILED) {
                                          s0 = peg$parseCHECK();
                                          if (s0 === peg$FAILED) {
                                            s0 = peg$parseCOLLATE();
                                            if (s0 === peg$FAILED) {
                                              s0 = peg$parseCOLUMN();
                                              if (s0 === peg$FAILED) {
                                                s0 = peg$parseCOMMIT();
                                                if (s0 === peg$FAILED) {
                                                  s0 = peg$parseCONFLICT();
                                                  if (s0 === peg$FAILED) {
                                                    s0 = peg$parseCONSTRAINT();
                                                    if (s0 === peg$FAILED) {
                                                      s0 = peg$parseCREATE();
                                                      if (s0 === peg$FAILED) {
                                                        s0 = peg$parseCROSS();
                                                        if (s0 === peg$FAILED) {
                                                          s0 = peg$parseCURRENT_DATE();
                                                          if (s0 === peg$FAILED) {
                                                            s0 = peg$parseCURRENT_TIME();
                                                            if (s0 === peg$FAILED) {
                                                              s0 = peg$parseCURRENT_TIMESTAMP();
                                                              if (s0 === peg$FAILED) {
                                                                s0 = peg$parseDATABASE();
                                                                if (s0 === peg$FAILED) {
                                                                  s0 = peg$parseDEFAULT();
                                                                  if (s0 === peg$FAILED) {
                                                                    s0 = peg$parseDEFERRABLE();
                                                                    if (s0 === peg$FAILED) {
                                                                      s0 = peg$parseDEFERRED();
                                                                      if (s0 === peg$FAILED) {
                                                                        s0 = peg$parseDELETE();
                                                                        if (s0 === peg$FAILED) {
                                                                          s0 = peg$parseDESC();
                                                                          if (s0 === peg$FAILED) {
                                                                            s0 = peg$parseDETACH();
                                                                            if (s0 === peg$FAILED) {
                                                                              s0 = peg$parseDISTINCT();
                                                                              if (s0 === peg$FAILED) {
                                                                                s0 = peg$parseDROP();
                                                                                if (s0 === peg$FAILED) {
                                                                                  s0 = peg$parseEACH();
                                                                                  if (s0 === peg$FAILED) {
                                                                                    s0 = peg$parseELSE();
                                                                                    if (s0 === peg$FAILED) {
                                                                                      s0 = peg$parseEND();
                                                                                      if (s0 === peg$FAILED) {
                                                                                        s0 = peg$parseESCAPE();
                                                                                        if (s0 === peg$FAILED) {
                                                                                          s0 = peg$parseEXCEPT();
                                                                                          if (s0 === peg$FAILED) {
                                                                                            s0 = peg$parseEXCLUSIVE();
                                                                                            if (s0 === peg$FAILED) {
                                                                                              s0 = peg$parseEXISTS();
                                                                                              if (s0 === peg$FAILED) {
                                                                                                s0 = peg$parseEXPLAIN();
                                                                                                if (s0 === peg$FAILED) {
                                                                                                  s0 = peg$parseFAIL();
                                                                                                  if (s0 === peg$FAILED) {
                                                                                                    s0 = peg$parseFOREIGN();
                                                                                                    if (s0 === peg$FAILED) {
                                                                                                      s0 = peg$parseFOR();
                                                                                                      if (s0 === peg$FAILED) {
                                                                                                        s0 = peg$parseFROM();
                                                                                                        if (s0 === peg$FAILED) {
                                                                                                          s0 = peg$parseFULL();
                                                                                                          if (s0 === peg$FAILED) {
                                                                                                            s0 = peg$parseGLOB();
                                                                                                            if (s0 === peg$FAILED) {
                                                                                                              s0 = peg$parseGROUP();
                                                                                                              if (s0 === peg$FAILED) {
                                                                                                                s0 = peg$parseHAVING();
                                                                                                                if (s0 === peg$FAILED) {
                                                                                                                  s0 = peg$parseIGNORE();
                                                                                                                  if (s0 === peg$FAILED) {
                                                                                                                    s0 = peg$parseIMMEDIATE();
                                                                                                                    if (s0 === peg$FAILED) {
                                                                                                                      s0 = peg$parseINDEXED();
                                                                                                                      if (s0 === peg$FAILED) {
                                                                                                                        s0 = peg$parseINDEX();
                                                                                                                        if (s0 === peg$FAILED) {
                                                                                                                          s0 = peg$parseINITIALLY();
                                                                                                                          if (s0 === peg$FAILED) {
                                                                                                                            s0 = peg$parseINNER();
                                                                                                                            if (s0 === peg$FAILED) {
                                                                                                                              s0 = peg$parseINSERT();
                                                                                                                              if (s0 === peg$FAILED) {
                                                                                                                                s0 = peg$parseINSTEAD();
                                                                                                                                if (s0 === peg$FAILED) {
                                                                                                                                  s0 = peg$parseINTERSECT();
                                                                                                                                  if (s0 === peg$FAILED) {
                                                                                                                                    s0 = peg$parseINTO();
                                                                                                                                    if (s0 === peg$FAILED) {
                                                                                                                                      s0 = peg$parseISNULL();
                                                                                                                                      if (s0 === peg$FAILED) {
                                                                                                                                        s0 = peg$parseJOIN();
                                                                                                                                        if (s0 === peg$FAILED) {
                                                                                                                                          s0 = peg$parseKEY();
                                                                                                                                          if (s0 === peg$FAILED) {
                                                                                                                                            s0 = peg$parseLEFT();
                                                                                                                                            if (s0 === peg$FAILED) {
                                                                                                                                              s0 = peg$parseLIKE();
                                                                                                                                              if (s0 === peg$FAILED) {
                                                                                                                                                s0 = peg$parseLIMIT();
                                                                                                                                                if (s0 === peg$FAILED) {
                                                                                                                                                  s0 = peg$parseMATCH();
                                                                                                                                                  if (s0 === peg$FAILED) {
                                                                                                                                                    s0 = peg$parseNATURAL();
                                                                                                                                                    if (s0 === peg$FAILED) {
                                                                                                                                                      s0 = peg$parseNOTNULL();
                                                                                                                                                      if (s0 === peg$FAILED) {
                                                                                                                                                        s0 = peg$parseOFFSET();
                                                                                                                                                        if (s0 === peg$FAILED) {
                                                                                                                                                          s0 = peg$parseORDER();
                                                                                                                                                          if (s0 === peg$FAILED) {
                                                                                                                                                            s0 = peg$parseOUTER();
                                                                                                                                                            if (s0 === peg$FAILED) {
                                                                                                                                                              s0 = peg$parsePLAN();
                                                                                                                                                              if (s0 === peg$FAILED) {
                                                                                                                                                                s0 = peg$parsePRAGMA();
                                                                                                                                                                if (s0 === peg$FAILED) {
                                                                                                                                                                  s0 = peg$parsePRIMARY();
                                                                                                                                                                  if (s0 === peg$FAILED) {
                                                                                                                                                                    s0 = peg$parseQUERY();
                                                                                                                                                                    if (s0 === peg$FAILED) {
                                                                                                                                                                      s0 = peg$parseRAISE();
                                                                                                                                                                      if (s0 === peg$FAILED) {
                                                                                                                                                                        s0 = peg$parseRECURSIVE();
                                                                                                                                                                        if (s0 === peg$FAILED) {
                                                                                                                                                                          s0 = peg$parseREFERENCES();
                                                                                                                                                                          if (s0 === peg$FAILED) {
                                                                                                                                                                            s0 = peg$parseREGEXP();
                                                                                                                                                                            if (s0 === peg$FAILED) {
                                                                                                                                                                              s0 = peg$parseREINDEX();
                                                                                                                                                                              if (s0 === peg$FAILED) {
                                                                                                                                                                                s0 = peg$parseRELEASE();
                                                                                                                                                                                if (s0 === peg$FAILED) {
                                                                                                                                                                                  s0 = peg$parseRENAME();
                                                                                                                                                                                  if (s0 === peg$FAILED) {
                                                                                                                                                                                    s0 = peg$parseREPLACE();
                                                                                                                                                                                    if (s0 === peg$FAILED) {
                                                                                                                                                                                      s0 = peg$parseRESTRICT();
                                                                                                                                                                                      if (s0 === peg$FAILED) {
                                                                                                                                                                                        s0 = peg$parseRIGHT();
                                                                                                                                                                                        if (s0 === peg$FAILED) {
                                                                                                                                                                                          s0 = peg$parseROLLBACK();
                                                                                                                                                                                          if (s0 === peg$FAILED) {
                                                                                                                                                                                            s0 = peg$parseROW();
                                                                                                                                                                                            if (s0 === peg$FAILED) {
                                                                                                                                                                                              s0 = peg$parseSAVEPOINT();
                                                                                                                                                                                              if (s0 === peg$FAILED) {
                                                                                                                                                                                                s0 = peg$parseSELECT();
                                                                                                                                                                                                if (s0 === peg$FAILED) {
                                                                                                                                                                                                  s0 = peg$parseSET();
                                                                                                                                                                                                  if (s0 === peg$FAILED) {
                                                                                                                                                                                                    s0 = peg$parseTABLE();
                                                                                                                                                                                                    if (s0 === peg$FAILED) {
                                                                                                                                                                                                      s0 = peg$parseTEMPORARY();
                                                                                                                                                                                                      if (s0 === peg$FAILED) {
                                                                                                                                                                                                        s0 = peg$parseTEMP();
                                                                                                                                                                                                        if (s0 === peg$FAILED) {
                                                                                                                                                                                                          s0 = peg$parseTHEN();
                                                                                                                                                                                                          if (s0 === peg$FAILED) {
                                                                                                                                                                                                            s0 = peg$parseTO();
                                                                                                                                                                                                            if (s0 === peg$FAILED) {
                                                                                                                                                                                                              s0 = peg$parseTRANSACTION();
                                                                                                                                                                                                              if (s0 === peg$FAILED) {
                                                                                                                                                                                                                s0 = peg$parseTRIGGER();
                                                                                                                                                                                                                if (s0 === peg$FAILED) {
                                                                                                                                                                                                                  s0 = peg$parseUNION();
                                                                                                                                                                                                                  if (s0 === peg$FAILED) {
                                                                                                                                                                                                                    s0 = peg$parseUNIQUE();
                                                                                                                                                                                                                    if (s0 === peg$FAILED) {
                                                                                                                                                                                                                      s0 = peg$parseUPDATE();
                                                                                                                                                                                                                      if (s0 === peg$FAILED) {
                                                                                                                                                                                                                        s0 = peg$parseUSING();
                                                                                                                                                                                                                        if (s0 === peg$FAILED) {
                                                                                                                                                                                                                          s0 = peg$parseVACUUM();
                                                                                                                                                                                                                          if (s0 === peg$FAILED) {
                                                                                                                                                                                                                            s0 = peg$parseVALUES();
                                                                                                                                                                                                                            if (s0 === peg$FAILED) {
                                                                                                                                                                                                                              s0 = peg$parseVIEW();
                                                                                                                                                                                                                              if (s0 === peg$FAILED) {
                                                                                                                                                                                                                                s0 = peg$parseVIRTUAL();
                                                                                                                                                                                                                                if (s0 === peg$FAILED) {
                                                                                                                                                                                                                                  s0 = peg$parseWHEN();
                                                                                                                                                                                                                                  if (s0 === peg$FAILED) {
                                                                                                                                                                                                                                    s0 = peg$parseWHERE();
                                                                                                                                                                                                                                    if (s0 === peg$FAILED) {
                                                                                                                                                                                                                                      s0 = peg$parseWITHOUT();
                                                                                                                                                                                                                                      if (s0 === peg$FAILED) {
                                                                                                                                                                                                                                        s0 = peg$parseWITH();
                                                                                                                                                                                                                                        if (s0 === peg$FAILED) {
                                                                                                                                                                                                                                          s0 = peg$parseNULL();
                                                                                                                                                                                                                                          if (s0 === peg$FAILED) {
                                                                                                                                                                                                                                            s0 = peg$parseNOT();
                                                                                                                                                                                                                                            if (s0 === peg$FAILED) {
                                                                                                                                                                                                                                              s0 = peg$parseIN();
                                                                                                                                                                                                                                              if (s0 === peg$FAILED) {
                                                                                                                                                                                                                                                s0 = peg$parseIF();
                                                                                                                                                                                                                                                if (s0 === peg$FAILED) {
                                                                                                                                                                                                                                                  s0 = peg$parseIS();
                                                                                                                                                                                                                                                  if (s0 === peg$FAILED) {
                                                                                                                                                                                                                                                    s0 = peg$parseOF();
                                                                                                                                                                                                                                                    if (s0 === peg$FAILED) {
                                                                                                                                                                                                                                                      s0 = peg$parseON();
                                                                                                                                                                                                                                                      if (s0 === peg$FAILED) {
                                                                                                                                                                                                                                                        s0 = peg$parseOR();
                                                                                                                                                                                                                                                        if (s0 === peg$FAILED) {
                                                                                                                                                                                                                                                          s0 = peg$parseNO();
                                                                                                                                                                                                                                                          if (s0 === peg$FAILED) {
                                                                                                                                                                                                                                                            s0 = peg$parseAS();
                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                              }
                                                                                                                                                                                                                            }
                                                                                                                                                                                                                          }
                                                                                                                                                                                                                        }
                                                                                                                                                                                                                      }
                                                                                                                                                                                                                    }
                                                                                                                                                                                                                  }
                                                                                                                                                                                                                }
                                                                                                                                                                                                              }
                                                                                                                                                                                                            }
                                                                                                                                                                                                          }
                                                                                                                                                                                                        }
                                                                                                                                                                                                      }
                                                                                                                                                                                                    }
                                                                                                                                                                                                  }
                                                                                                                                                                                                }
                                                                                                                                                                                              }
                                                                                                                                                                                            }
                                                                                                                                                                                          }
                                                                                                                                                                                        }
                                                                                                                                                                                      }
                                                                                                                                                                                    }
                                                                                                                                                                                  }
                                                                                                                                                                                }
                                                                                                                                                                              }
                                                                                                                                                                            }
                                                                                                                                                                          }
                                                                                                                                                                        }
                                                                                                                                                                      }
                                                                                                                                                                    }
                                                                                                                                                                  }
                                                                                                                                                                }
                                                                                                                                                              }
                                                                                                                                                            }
                                                                                                                                                          }
                                                                                                                                                        }
                                                                                                                                                      }
                                                                                                                                                    }
                                                                                                                                                  }
                                                                                                                                                }
                                                                                                                                              }
                                                                                                                                            }
                                                                                                                                          }
                                                                                                                                        }
                                                                                                                                      }
                                                                                                                                    }
                                                                                                                                  }
                                                                                                                                }
                                                                                                                              }
                                                                                                                            }
                                                                                                                          }
                                                                                                                        }
                                                                                                                      }
                                                                                                                    }
                                                                                                                  }
                                                                                                                }
                                                                                                              }
                                                                                                            }
                                                                                                          }
                                                                                                        }
                                                                                                      }
                                                                                                    }
                                                                                                  }
                                                                                                }
                                                                                              }
                                                                                            }
                                                                                          }
                                                                                        }
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "reserved_word_list",
        description: peg$descNames["reserved_word_list"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "reserved_word_list",
        description: peg$descNames["reserved_word_list"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecomment() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "comment",
        description: peg$descNames["comment"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$parsecomment_line();
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsecomment_block();
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c205();
        }
        s0 = s1;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "comment",
        description: peg$descNames["comment"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "comment",
        description: peg$descNames["comment"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecomment_line() {
      var s0, s1, s2, s3, s4, s5,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "comment_line",
        description: peg$descNames["comment_line"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsecomment_line_start();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$currPos;
        peg$silentFails++;
        s5 = peg$parsewhitespace_line();
        peg$silentFails--;
        if (s5 === peg$FAILED) {
          s4 = void 0;
        } else {
          peg$currPos = s4;
          s4 = peg$FAILED;
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parsematch_all();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$currPos;
          peg$silentFails++;
          s5 = peg$parsewhitespace_line();
          peg$silentFails--;
          if (s5 === peg$FAILED) {
            s4 = void 0;
          } else {
            peg$currPos = s4;
            s4 = peg$FAILED;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsematch_all();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c838); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "comment_line",
        description: peg$descNames["comment_line"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "comment_line",
        description: peg$descNames["comment_line"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecomment_line_start() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "comment_line_start",
        description: peg$descNames["comment_line_start"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 2) === peg$c839) {
        s0 = peg$c839;
        peg$currPos += 2;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c840); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "comment_line_start",
        description: peg$descNames["comment_line_start"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "comment_line_start",
        description: peg$descNames["comment_line_start"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecomment_block() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "comment_block",
        description: peg$descNames["comment_block"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsecomment_block_start();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsecomment_block_feed();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsecomment_block_end();
          if (s3 !== peg$FAILED) {
            s1 = [s1, s2, s3];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c841); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "comment_block",
        description: peg$descNames["comment_block"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "comment_block",
        description: peg$descNames["comment_block"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecomment_block_start() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "comment_block_start",
        description: peg$descNames["comment_block_start"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 2) === peg$c842) {
        s0 = peg$c842;
        peg$currPos += 2;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c843); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "comment_block_start",
        description: peg$descNames["comment_block_start"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "comment_block_start",
        description: peg$descNames["comment_block_start"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecomment_block_end() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "comment_block_end",
        description: peg$descNames["comment_block_end"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 2) === peg$c844) {
        s0 = peg$c844;
        peg$currPos += 2;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c845); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "comment_block_end",
        description: peg$descNames["comment_block_end"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "comment_block_end",
        description: peg$descNames["comment_block_end"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecomment_block_body() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "comment_block_body",
        description: peg$descNames["comment_block_body"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = [];
      s1 = peg$currPos;
      s2 = peg$currPos;
      peg$silentFails++;
      s3 = peg$parsecomment_block_end();
      if (s3 === peg$FAILED) {
        s3 = peg$parsecomment_block_start();
      }
      peg$silentFails--;
      if (s3 === peg$FAILED) {
        s2 = void 0;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsematch_all();
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        while (s1 !== peg$FAILED) {
          s0.push(s1);
          s1 = peg$currPos;
          s2 = peg$currPos;
          peg$silentFails++;
          s3 = peg$parsecomment_block_end();
          if (s3 === peg$FAILED) {
            s3 = peg$parsecomment_block_start();
          }
          peg$silentFails--;
          if (s3 === peg$FAILED) {
            s2 = void 0;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parsematch_all();
            if (s3 !== peg$FAILED) {
              s2 = [s2, s3];
              s1 = s2;
            } else {
              peg$currPos = s1;
              s1 = peg$FAILED;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        }
      } else {
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "comment_block_body",
        description: peg$descNames["comment_block_body"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "comment_block_body",
        description: peg$descNames["comment_block_body"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseblock_body_nodes() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "block_body_nodes",
        description: peg$descNames["block_body_nodes"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$parsecomment_block_body();
      if (s0 === peg$FAILED) {
        s0 = peg$parsecomment_block();
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "block_body_nodes",
        description: peg$descNames["block_body_nodes"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "block_body_nodes",
        description: peg$descNames["block_body_nodes"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecomment_block_feed() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "comment_block_feed",
        description: peg$descNames["comment_block_feed"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseblock_body_nodes();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsewhitespace();
        if (s3 === peg$FAILED) {
          s3 = peg$parseblock_body_nodes();
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsewhitespace();
          if (s3 === peg$FAILED) {
            s3 = peg$parseblock_body_nodes();
          }
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "comment_block_feed",
        description: peg$descNames["comment_block_feed"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "comment_block_feed",
        description: peg$descNames["comment_block_feed"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsematch_all() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "match_all",
        description: peg$descNames["match_all"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.length > peg$currPos) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c846); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "match_all",
        description: peg$descNames["match_all"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "match_all",
        description: peg$descNames["match_all"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseo() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "o",
        description: peg$descNames["o"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsewhitespace_nodes();
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parsewhitespace_nodes();
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c8(s1);
      }
      s0 = s1;

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "o",
        description: peg$descNames["o"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "o",
        description: peg$descNames["o"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsee() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "e",
        description: peg$descNames["e"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsewhitespace_nodes();
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parsewhitespace_nodes();
        }
      } else {
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c8(s1);
      }
      s0 = s1;

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "e",
        description: peg$descNames["e"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "e",
        description: peg$descNames["e"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsewhitespace_nodes() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "whitespace_nodes",
        description: peg$descNames["whitespace_nodes"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$parsewhitespace();
      if (s0 === peg$FAILED) {
        s0 = peg$parsecomment();
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "whitespace_nodes",
        description: peg$descNames["whitespace_nodes"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "whitespace_nodes",
        description: peg$descNames["whitespace_nodes"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsewhitespace() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "whitespace",
        description: peg$descNames["whitespace"],
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$parsewhitespace_space();
      if (s0 === peg$FAILED) {
        s0 = peg$parsewhitespace_line();
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "whitespace",
        description: peg$descNames["whitespace"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "whitespace",
        description: peg$descNames["whitespace"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsewhitespace_space() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "whitespace_space",
        description: peg$descNames["whitespace_space"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      if (peg$c848.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c849); }
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c847); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "whitespace_space",
        description: peg$descNames["whitespace_space"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "whitespace_space",
        description: peg$descNames["whitespace_space"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsewhitespace_line() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "whitespace_line",
        description: peg$descNames["whitespace_line"],
        location: peg$computeLocation(startPos, startPos)
      });

      peg$silentFails++;
      if (peg$c851.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c852); }
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c850); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "whitespace_line",
        description: peg$descNames["whitespace_line"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "whitespace_line",
        description: peg$descNames["whitespace_line"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parse_TODO_() {
      var s0,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "_TODO_",
        description: peg$descNames["_TODO_"],
        location: peg$computeLocation(startPos, startPos)
      });

      if (input.substr(peg$currPos, 8) === peg$c853) {
        s0 = peg$c853;
        peg$currPos += 8;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c854); }
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "_TODO_",
        description: peg$descNames["_TODO_"],
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "_TODO_",
        description: peg$descNames["_TODO_"],
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }


      var util = require('./parser-util');


    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: "end", description: "end of input" });
      }

      throw peg$buildException(
        null,
        peg$maxFailExpected,
        peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
        peg$maxFailPos < input.length
          ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
          : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
      );
    }
  }

  return {
    SyntaxError:   peg$SyntaxError,
    DefaultTracer: peg$DefaultTracer,
    parse:         peg$parse
  };
})();

},{"./parser-util":2}],4:[function(require,module,exports){
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
    this.whitespaceRule = /(^whitespace)|(char$)|(^[oe]$)/i;
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
        lastIndex = util.findLastIndex(this.events, {rule: event.rule});
        lastWsIndex = util.findLastIndex(this.events, function (e) {
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
          return e.description !== null &&
                  !that.whitespaceRule.test(e.rule);
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
        deep = true;
        return true;
      }
      return true;
    });

    if (chain.length) {
      location = bestNode.location;
      firstNode = util.findWhere(chain, function (elem) {
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
      util.extend(err, {
        'message': message,
        'location': location
      });
    }
    return err;
  };

  return Tracer;
})(parserUtils);

},{"./parser-util":2}]},{},[1]);
