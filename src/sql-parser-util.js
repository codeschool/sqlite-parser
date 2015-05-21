// Utility Functions
var slice = [].slice;

var _lookups = {
  'format': {
    // Render as plain text
    'plain':      _plainify,
    // Render as escaped HTML
    'html':       _htmlify,
    // Render as markdown
    'markdown':   _markdownify
  }
};

function safe(obj) {
  // If it is not a string or array, is it not safe
  return ((isArray(obj) || isString(obj)) ? obj : []);
}

function typed(obj) {
  return Object.prototype.toString.call(obj);
}

function isPlain(obj) {
  return typed(obj) === "[object Object]";
}

function isPattern(obj) {
  return typed(obj) === "[object RegExp]";
}

function isFunc(obj) {
  return typed(obj) === "[object Function]";
}

function isString(obj) {
  return typed(obj) === "[object String]";
}

function isArray(obj) {
  if (Array.isArray) {
    return Array.isArray(obj);
  }
  return typed(obj) === "[object Array]";
}

function isOkay(obj) {
  return obj != null;
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
    // thing is an object
    if (isPlain(item)) {
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

function stack(arr) {
  return (isArray(arr) ?
    arr.map(function (elem) {
      return elem[1];
    }) : []);
}

function collapse(arr) {
  if (isArray(arr) && arr.length) {
    var i, len, n, obj, ref, v;
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

function mergeOptions(base, user, merge) {
  var k, v, k2, v2;
  for (k in user) {
    v = user[k];
    if (k === '_') {
      // special magic to apply _ to all things at current level
      for (k2 in base) {
        v2 = base[k2];
        base[k2] = mergeOptions(v2, v, merge);
      }
    } else if (isPlain(v)) {
      if (!has(base, k)) {
        base[k] = {};
      }
      base[k] = mergeOptions(base[k], v, merge);
    } else {
      if (merge) {
        // Merge options
        if (!has(base, k)) {
          base[k] = [];
        }
        if (!isArray(base[k])) {
          base[k] = [base[k]];
        }
        if (isArray(v)) {
          base[k] = slice.call(base[k]).concat(slice.call(v));
        } else {
          base[k].push(v);
        }
      } else {
        // Replace options
        base[k] = v;
      }
    }
  }
  return base;
}

function desugar(base, root, branch) {
  var k, v, pattern, regexSugar = /[\*\+]/g, regexEscape = /[\-\[\]\(\)]/g;
  for (k in base) {
    v = base[k];
    if (isPlain(v)) {
      base[k] = desugar(v, root, branch);
    } else {
      if (!isArray(v)) {
        v = [v];
      }
      base[k] = v.map(function (elem) {
        var path;
        if (isString(elem)) {
          // Try to resolve as a location
          if (/(^[_$]$)|([\S]\/[\S])/.test(elem)) {
            path = resolve(elem.toLowerCase().replace(branch + '/', ''), root);
            if (path !== false) {
              return path;
            }
          } else if (regexSugar.test(elem)) {
            // Convert to regular expression
            pattern = '^' + elem.replace(regexSugar, '.$&').replace(regexEscape, '\\$&') + '$';
            return new RegExp(pattern, 'i');
          }
        }
        return elem;
      }).reduceRight(function(a, b) {
          return a.concat(b);
      }, []);
    }
  }
  return base;
}

function resolve(path, root) {
  var base = root,
      paths = path.split('/'),
      i, len, chunk;
  if (!isPlain(base) || paths.length === 0) { return false; }
  for (i = 0, len = paths.length; i < len; i++) {
    chunk = paths[i];
    if (has(base, chunk)) {
      base = base[chunk];
    } else {
      return false;
    }
  }
  return base;
}

function option(path, sequence, base) {
  var resolved = resolve(path, base),
      i, len, chunk, found = false;
  if (sequence != null) {
    if (!isArray(sequence)) { sequence = [sequence]; }
    for (i = 0, len = sequence.length; i < len; i++) {
      if (has(resolved, sequence[i])) {
        resolved = resolve(sequence[i], resolved);
        found = true;
        break;
      }
    }
    if (!found) { return null; }
  }
  return resolved !== false ? resolved : null;
}

function find(arr, predicate) {
  if (arr == null) {
    throw new TypeError('find() called on null or undefined');
  }
  if (!isFunc(predicate)) {
    throw new TypeError('find() predicate must be a function');
  }
  var list = Object(arr),
      length = list.length >>> 0,
      thisArg = arguments[2],
      value;

  for (var i = 0; i < length; i++) {
    value = list[i];
    if (predicate.call(thisArg, value, i, list)) {
      return value;
    }
  }
  return undefined;
}

function countWhere(arr, props) {
  var count, i, len, val;
  count = 0;
  for (i = 0, len = arr.length; i < len; i++) {
    val = arr[i];
    if (has(val, props)) {
      count += 1;
    }
  }
  return count;
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

function nodeToString(node) {
  var elem = safe(node);
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
  return nodeToString(elem).replace(/^\s+|\s+$/g, '');
}

// Escaping error messages

function escapeAttr(str) {
  return _format(str, 'attribute');
}

function escapeVal(str) {
  return _format(str, 'value');
}

function escapeId(str) {
  return _format(str, 'name');
}

function setFormat(codx) {
  var frmt = option('settings', 'format', codx);
  if (isPlain(frmt)) {
    // TODO: allow for custom func for each formatting function
  } else if (!has(_lookups['format'], frmt)) {
    // String name not found for format options, use 'plain'
    frmt = 'plain';
  }
  _format._func = _lookups['format'][frmt];
}

function _format(str, type) {
  /*
   * Format an identifier for an error message based on the current
   * setting for output
   */
  return _format._func(str, type);
}
// TODO: Need to move this out of util library
_format._func = null;

function escape(str) {
  return _format(str, 'name');
}

escape.value      = escape.val  = escapeVal;
escape.name       = escape.id   = escapeId;
escape.attribute  = escape.attr = escapeAttr;

function _plainify(elem, type) {
  return _plainify._rules[type](nodeToString(elem));
}

_plainify._rules = {
 'name': function ($1) { return $1.toLowerCase(); },
 'attribute': function ($1) { return $1.toLowerCase(); },
 'value': function ($1) { return  $1; }
};

function _htmlify(elem, type) {
  return _htmlify._rules[type](nodeToString(elem))
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

_htmlify._rules = {
 'name': function ($1) { return '<' + $1.toUpperCase() + '>'; },
 'attribute': function ($1) { return $1.toLowerCase(); },
 'value': function ($1) { return '"' + $1 + '"'; }
};

function _markdownify(elem, type) {
  return _markdownify._rules[type](nodeToString(elem));
}

_markdownify._rules = {
  'name': function ($1) { return '`' + $1.toLowerCase() + '`'; },
  'attribute': function ($1) { return '`' + $1.toLowerCase() + '`'; },
  'value': function ($1) { return '"' + $1 + '"'; }
};

module.exports = {
  // Array methods
  'stack': 								stack,
  'collapse': 						collapse,
  'find': 								find,
  'findWhere': 						findWhere,
  'countWhere': 					countWhere,
  // String methods
  'nodeToString':					nodeToString,
  'textNode':							textNode,
  // Error rendering string methods
  'setFormat':            setFormat,
  'escape':               escape,
  // Type detection
  'typed': 								typed,
  'isPlain': 							isPlain,
  'isPattern': 						isPattern,
  'isFunc': 							isFunc,
  'isString': 						isString,
  'isArray': 							isArray,
  'isOkay':								isOkay,
  // Misc methods
  'safe': 								safe,
  'has': 									has,
  'mergeOptions': 				mergeOptions,
  'desugar': 							desugar,
  'resolve': 							resolve,
  'option':	 							option
};
