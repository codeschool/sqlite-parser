// Utility Functions
var slice = [].slice;

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
  return Array.isArray ? Array.isArray(obj) : (typed(obj) === "[object Array]");
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

module.exports = {
  // Array methods
  'stack': 								stack,
  'collapse': 						collapse,
  'findWhere': 						findWhere,
  // String methods
  'nodeToString':					nodeToString,
  'textNode':							textNode,
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
  'has': 									has
};
