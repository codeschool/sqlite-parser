import {expect} from 'chai';
import {readFile, writeFile} from 'fs';
import _glob from 'glob';
import {all, each, promisify} from 'bluebird';
import { basename, relative } from 'path';
import _ from 'lodash';
import parser from '../index';
import prettyjson from 'prettyjson';

const read = promisify(readFile);
const write = promisify(writeFile);
const sqliteParser = promisify(parser);
const glob = promisify(_glob);

let format, broadcast,
    filePath,
    getTree, getTestJson, getTestFiles,
    assertOkTree, assertErrorTree, assertEqualsTree,
    assertGlobTree,
    isDefined = function (arg) { return arg != null; };

broadcast = function broadcast(args) {
  // Only broadcast when DEBUG=true is set in the environment
  var formatted;
  _.forEach((_.isArray(args) ? args : [args]), function (arg) {
    if (broadcast.should(arg)) {
      formatted = broadcast.ugly ? ( _.isString(arg) ? arg : JSON.stringify(arg) ) :
                                   ( prettyjson.render(arg, {}) );
      console.log('\n\n', formatted, '\n');
    }
  });
  return args;
};
(function (b, c, p) {
  b.debug = isDefined(p) && _.has(p.env, 'DEBUG');
  b.can = isDefined(c) && b.debug;
  b.should = function (msg) {
    return b.can && isDefined(msg);
  };
  b.ugly = b.should && _.has(p.env, 'UGLY');
})(broadcast, console, process);

filePath = function (that, ext, glob = false) {
  var testTitle = (that.test ? that.test : that).title.trim(),
      fileTitle = !glob ? _.kebabCase(testTitle) : testTitle,
      folderTitle = _.kebabCase((that.test ? that.test : that).parent.title.trim());
  return __dirname + '/' + ext + '/' + folderTitle + '/' + fileTitle + '.' + ext;
};

/**
Load the source file for the current test and then try and generate the AST from it.
@note Uses the name of the test to determine what test input to use such that `bees-test`
  looks for the file `beesTest.sql` in the `./test/sql/` directory.
@note Alternative arguments format to pass options object is: that, options, callback.
@param [Object] that
  The context of the running test
@param [Function] callback
  The function to call when sqliteParser has generated the AST or an error.
*/
getTree = function (that) {
  return read(filePath(that, 'sql'), 'utf8')
  .then(sqliteParser)
  .then(broadcast);
};

getTestJson = function (that) {
  return read(filePath(that, 'json'), 'utf8')
  .then(function (json) {
    return JSON.parse(json);
  });
};

getTestFiles = function (that) {
  var getFiles = function () {
    return all([getTree(that), getTestJson(that)]);
  };
  if (_.has(process.env, 'REWRITE')) {
    // REWRITE MODE: Save a new JSON file using parser tree result
    var writePath = filePath(that, 'json');
    return getTree(that)
    .then(function (tree) {
      return write(writePath, JSON.stringify(tree, null, 2), 'utf8');
    })
    .then(getFiles);
  } else {
    return getFiles();
  }
};

/**
Assert that the current file returns an AST without errors.
@note Alternative arguments format to pass options object is: that, options, done.
@param [Object] that
  The context of the running test
@param [Function] done
  The function to call when the test is completed
*/
assertOkTree = function (that, done) {
  return getTree(that)
  .then(function (tree) {
    return done();
  })
  .catch(done);
};

/**
Assert that the current file returns an error containing the properties and values in the
given object.
@note Alternative arguments format to pass options object is: obj, that, options, done.
@param [Object|String] obj
  The properties and values to assert within the error generated for the running test. If
  a string is given, then it is asserted that the error message contains the text provided.
@param [Object] that
  The context of the running test
@param [Function] done
  The function to call when the test is completed
*/
assertErrorTree = function (obj, that, done) {
  if (_.isUndefined(obj)) {
    obj = {};
  } else if (_.isString(obj)) {
    obj = { 'message': obj };
  }
  return getTree(that)
  .then(function () {
    return done(Error("Returned a tree instead of an error!"));
  })
  .catch(function (err) {
    _.forEach(obj, function (v, k) {
      expect(err).to.include.keys(k);
      expect(err[k]).to.equal(v);
    });
    done();
  })
  .catch(done);
};

/**
Assert that the current file returns an AST containing the properties and values in the
given corresponding JSON file.
@param [Object|String] obj
  The properties and values to assert within the AST generated for the running test.
@param [Object] that
  The context of the running test
@param [Function] done
  The function to call when the test is completed
*/
assertEqualsTree = function (that, done) {
  return getTestFiles(that)
  .then(function (files) {
    // Run the assertions as normal
    expect(files[0]).to.deep.equal(files[1]);
    done();
  })
  .catch(done);
};

export default {
  'get': getTree,
  'ok': assertOkTree,
  'error': assertErrorTree,
  'equals': assertEqualsTree,
  'glob': assertGlobTree,
  'broadcast': broadcast,
  'read': read,
  'write': write,
  'sqliteParser': sqliteParser,
  'glob': glob
};
