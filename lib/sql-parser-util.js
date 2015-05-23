// Utility Functions
var slice = [].slice;

function makeArray(arr) {
  return !isArray(arr) ? [ arr ] : arr;
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
  return Array.isArray ? Array.isArray(obj) : ( typed(obj) === "[object Array]" );
}

function isOkay(obj) {
  return obj != null;
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

function compose(args, glue) {
  var conc = isArray(glue), res;
  if ( !isOkay(glue) ) { glue = ' '; }
  res = args.reduce(function (prev, cur) {
    return conc ? ( isOkay(cur) ? prev.concat(cur) : cur ) :
                  ( prev + ( isOkay(cur) ? textNode(cur) + glue : '' ) );
  }, ( conc ? [] : '' ));
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

function extend() {
  var first = arguments[0],
      rest = slice.call(arguments, 1);

  rest.forEach(function (next) {
    if ( isOkay(next) && isPlain(next) ) {
      var key;
      for ( key in next ) {
        if ( next.hasOwnProperty(key) ) {
          first[key] = next[key];
        }
      }
    }
  });

  return first;
}

module.exports = {
  // Array methods
  'stack': 								stack,
  'collapse': 						collapse,
  'compose':              compose,
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
  'extend':               extend,
  'makeArray':            makeArray
};
