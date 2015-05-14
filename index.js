var sqlParser = require('./src/sql-parser'),
    toStr = function (f) {
      return Object.prototype.toString.call(f);
    };

function sqlQueryParser(source, callback) {
  var options = sqlQueryParser._options, func = callback;
  if (arguments.length > 2) {
    options = callback;
    func = arguments[2];
  }

  if (toStr(func) !== '[object Function]') {
    // Sync
    if (toStr(func) === '[object Object]') {
      options = func;
    }
    return sqlParser(source, options);
  }

  // Async
  setTimeout((function (ctx, s, o, f) {
    return function () {
      var ast, err;
      try {
        ast = sqlParser.parse(s, o);
      } catch (e) {
        err = e;
      }
      f.apply(ctx, [err, ast]);
    };
  })(this, source, options, func), 0);
};

sqlQueryParser.NAME = "sql-query-parser";
sqlQueryParser.VERSION = "0.0.1";
sqlQueryParser._options = {};

sqlQueryValidator.setOptions = function(options) {
  this._options = options != null ? options : {};
};

module.exports = sqlQueryValidator;
