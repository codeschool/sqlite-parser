function sqliteParser(source, callback) {
  var parser = require('./lib/parser');
  try {
    callback(null, parser.parse(source));
  } catch (e) {
    callback(e);
  }
}

sqliteParser['NAME'] = 'sqlite-parser';
sqliteParser['VERSION'] = '0.10.2';

module.exports = sqliteParser;
