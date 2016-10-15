var SqliteParserTransform = require('./lib/streaming').SqliteParserTransform;
var parser = new SqliteParserTransform();
// var fileName = './test/sql/official-suite/randexpr1-1.sql';
var fileName = './test/sql/parse-errors/parse-error-1.sql';
var read = require('fs').createReadStream(fileName);

read.pipe(parser);
parser.pipe(process.stdout);

function exit(err) {
  console.log(err);
  process.exit(1);
}

read.on('error', exit);

parser.on('error', exit);

parser.on('finish', function () {
  process.exit(0);
});
