import { resolve, basename, relative, dirname } from 'path';
import { all } from 'bluebird';
import { expect } from 'chai';
import { read, write, glob, sqliteParser, mkdirSafe } from '../helpers';

// Note: You must add ALL_TESTS=true to the environment to run these.
if (process.env['ALL_TESTS'] === 'true') {
  describe('official suite', function () {
  const globPath = resolve(__dirname, '../sql/official-suite/*.sql');
  return glob(globPath)
  .then((paths) => {
    paths.forEach(function (sqlFile) {
      describe(basename(sqlFile), function () {
        it('correctly parses the input', function (done) {
          const jsonFile = sqlFile.replace(/(\.|test\/)sql/ig, '$1json');
          const sqlFileRel = relative('.', sqlFile);
          const parsedSql = read(sqlFile, 'utf8').then(sqliteParser);
          let jsonProm = Promise.resolve();
          if (process.env['REWRITE'] != null) {
            // REWRITE MODE: Save a new JSON file using parser tree result
            jsonProm = mkdirSafe(dirname(jsonFile))
            .then(() => parsedSql)
            .then((parsed) => {
              return write(jsonFile, JSON.stringify(parsed, null, 2), 'utf8');
            });
          }
          all([
            parsedSql,
            jsonProm.then(() => {
              return read(jsonFile, 'utf8').then((json) => JSON.parse(json));
            })
          ])
          .then(([ sql, json ]) => {
            expect(sql).to.deep.equal(json);
          })
          .then(() => done())
          .catch((err) => {
            done(err);
          });
        });
      });

    });
  });
  });
}
