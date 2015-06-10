var expect            = require('chai').expect,
    fs                = require('fs'),
    Promise           = require('promise'),
    read              = Promise.denodeify(fs.readFile),
    _                 = require('lodash'),
    sqlQueryParser    = require('../lib/index'),
    prettyjson        = require('prettyjson'),
    format, broadcast, getTree, assertOkTree, assertErrorTree,
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

/**
Load the source file for the current test and then try and generate the AST from it.
@note Uses the name of the test to determine what test input to use such that `bees-test`
  looks for the file `beesTest.sql` in the `./test/sql/` directory.
@note Alternative arguments format to pass options object is: that, options, callback.
@param [Object] that
  The context of the running test
@param [Function] callback
  The function to call when sqlQueryParser has generated the AST or an error.
*/
getTree = function (that) {
  var fileTitle = _.camelCase(that.test.title.trim()),
      filePath = __dirname + '/sql/' + fileTitle + '.sql';
  return read(filePath, "utf8")
  .then(sqlQueryParser)
  .then(broadcast);
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
  return getTree(that)
  .then(function () {
    return done(Error("Returned a tree instead of an error!"));
  })
  .catch(function (err) {
    if (_.isUndefined(obj)) {
      obj = {};
    } else if (_.isString(obj)) {
      obj = { 'message': obj };
    }
    _.forEach(obj, function (v, k) {
      expect(err).to.include.keys(k);
      expect(err[k]).to.equal(v);
    });
    return done();
  })
  .catch(done);
};

/**
Assert that the current file returns an AST containing the properties and values in the
given object.
@note Alternative arguments format to pass options object is: obj, that, options, done.
@param [Object|String] obj
  The properties and values to assert within the AST generated for the running test.
@param [Object] that
  The context of the running test
@param [Function] done
  The function to call when the test is completed
*/
assertEqualsTree = function (obj, that, done) {
  return getTree(that)
  .then(function (tree) {
    if (_.isUndefined(obj)) {
      obj = {};
    }
    if (_.isString(obj)) {
      obj = JSON.parse(obj);
    }
    expect(tree).to.deep.equal(obj);
    return done();
  })
  .catch(done);
};

module.exports = {
  'get': getTree,
  'ok': assertOkTree,
  'error': assertErrorTree,
  'equals': assertEqualsTree,
  'broadcast': broadcast
};
