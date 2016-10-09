/* Scans every file found by the input glob path for SQL queries and
 * then for each file it combines all queries found into a single *.sql
 * file that is placed in the output directory provided:
 * node ./process-tests ./raw/*.test ./sql/official-suite/
 */
const _glob = require('glob');
const args = process.argv.slice(2);
const { readFileSync, writeFileSync, stat, mkdir } = require('fs');
const { basename, sep, normalize } = require('path');
const { promisify, each } = require('bluebird');
const glob = promisify(_glob);
const parse = require('./test-parser').parse;

const creditUrl = 'http://www.sqlite.org/src/tree?ci=trunk&name=test';
const sourceDir = args[0];
const destDir = normalize(args[1] || '../sql/official-suite/');

let qCount = 0, fCount = 0;

// Make sure destination directory exists first
(function (dirPath) {
  // Make sure destination exists
  return new Promise(function (acc, rej) {
    function mkdirCallback(err) {
      if (err) {
        return rej(err);
      }
      acc();
    };
    function statCallback(err, stats) {
      if (err) {
        return mkdir(dirPath, mkdirCallback);
      }
      acc();
    }
    stat(dirPath, statCallback);
  });
})(destDir)
.then(() => glob(sourceDir))
.then(function (paths) {
  fCount = paths.length;
  return each(paths, function (path) {
    const file = readFileSync(path, 'utf8');
    const queries = parse(file);
    if (queries && queries.length !== 0) {
      qCount += queries.length;
      const curName = basename(path, `.${path.split('.').slice(-1)}`);
      function writeOne(q, num = '') {
        writeFileSync(
          normalize(`./${destDir}${sep}${curName}${num}.sql`),
          `-- original: ${basename(path)}\n-- credit:   ${creditUrl}\n\n` +
          q.join('\n;') + ';'
        );
      }
      let cursor = 0;
      let fileNum = 0;
      while (cursor < queries.length) {
        writeOne(queries.slice(cursor, cursor + 100), `-${++fileNum}`);
        cursor += 100;
      }
      return true;
    }
    return false;
  });
})
.then(() => {
  console.log(`\nSuccessfully processed ${fCount} file${fCount !== 1 ? 's' : ''} containing ${qCount} query group${qCount !== 1 ? 's' : ''}`);
  process.exit(0);
})
.catch((err) => {
  console.error(`\nEncountered an error: ${err.message}`);
  process.exit(1);
});
