var sqlParser = require('./sql-parser');

function sqlQueryParser(source, callback) {
  if (Object.prototype.toString.call(callback) !== '[object Function]') {
    return sqlParser(source, sqlQueryParser._options);
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
  })(this, source, sqlQueryParser._options, callback), 0);
};

sqlQueryParser.NAME = "sql-query-parser";
sqlQueryParser.VERSION = "0.0.1";
sqlQueryParser._options = {};

module.exports = sqlQueryParser;
