# Contributing to sqlite-parser

Thank you for your interest in contributing! This guide explains the flow for
making contributions to this repository.

## Demo

You can run a copy of the parser's interactive demo on your local machine
(at `http://localhost:8080/`) by cloning this repository and then using the
command `grunt live`.

## Getting started

After cloning the repository, run `npm install` to install the development
dependencies. Once the dependencies are installed, start development with the
following command:

```
grunt testwatch
```

which will automatically compile the parser and run the tests in each time a
change is made to the tests and/or the source code.

Optionally, run `grunt debug` to write the ASTs from each to test to `stdout` in
addition to live reloading.

## Writing tests

Each test refers to a SQL input file in `test/sql/` and an expected output
JSON AST file.

For example a `describe()` block with the title `parent block` that contains an
`it()` block named `super test 2` will look for the SQL input at
`test/sql/parent-block/super-test-2.sql` and the JSON AST at
`test/json/parent-block/super-test-2.json`.

There are three options for the test helpers exposed by `tree`:
- Assert that the test file successfully generates _any_ valid AST
  ``` javascript
  tree.ok(this, done);
  ```

- Assert that the test file generates an AST that exactly matches the expected output JSON file
  ``` javascript
  tree.equals(this, done);
  ```

- Assert that a test throws an error
  - Assert that any error was thrown
    ``` javascript
    tree.error({}, this, done);
    ```

  - Assert a specific error `message` for the thrown error
    ``` javascript
    tree.error('My error message.', this, done);
    ```

  - Assert an object of properties that all exist in the thrown error object
    ``` javascript
    tree.error({
      message: 'You forgot to add a boop to the beep.',
      location: {
        start: { offset: 0, line: 1, column: 1 },
        end: { offset: 0, line: 1, column: 1 }
      }
    }, this, done)
    ```

``` javascript
/* All the helper functions in `/test/helpers.js` are already available
 * and do not need to be explicitly imported.
 */
describe('select', function () {
  /* Test SQL: test/sql/select/basic-select.sql
   * Expected JSON AST: test/json/select/basic-select.json
   */
  it('basic select', function (done) {
    tree.equals(this, done);
  });
});

describe('parse errors', function (done) {
  /* Test SQL: test/sql/parse-errors/parse-error-1.sql
   * Expected JSON AST: test/json/parse-errors/parse-error-1.json
   */
  it('parse error 1', function(done) {
    tree.error({
      'message': 'Syntax error found near Column Identifier (WHERE Clause)'
    }, this, done);
  });
});
```

## Submitting a PR

**Do not** change the version number in the `package.json` within a pull
request submitted to this repository.

The last step before committing your changes and creating the pull request is
to run the release command and stage any changes that are generated:

```
grunt release
```

## Available development commands

- Create new build of the parser in `.tmp/` folder
  ```
  grunt build
  ```

- Create new `lib/` folder containing the release version of the parser
  ```
  grunt dist
  ```

- Create minified browserified bundle of parser at `dist/sqlite-parser.js`
  ```
  grunt browser
  ```

- Create new version of command line utility at `bin/sqlite-parser`
  ```
  grunt bin
  ```

- Build parser to `.tmp/` and run tests
  ```
  grunt test
  ```

- Build parser to `.tmp/` and run extended test suite
  ```
  grunt testall
  ```

- Watch the parser and then build to `.tmp/` and run tests on changes
  ```
  grunt testwatch
  ```

- Is `testwatch` but also logs the generated ASTs as formatted JSON objects in the test output
  ```
  grunt debug
  ```

- Build the parser to `.tmp/` and run tests, but take the output from the parser use it to overwrite the existing test JSON files in `test/json/`
  ```
  grunt rewritejson
  ```

- Rebuild the interactive demo site to `.tmp/`
  ```
  grunt interactive
  ```

- Watch the parser and demo files and then build parser and interactive demo to `.tmp/` on changes
  ```
  grunt live
  ```

- Build the interactive demo as a `index.html` and one minified CSS and one minified JS bundle to the `demo/` folder
  ```
  grunt demo
  ```

- Create new command line parser at `bin/sqlite-parser`, create release version of the parser in `lib/` and then create a new copy of the release version of the interactive demo in `demo/`
  ```
  grunt release
  ```
