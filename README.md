# sqlite-parser

[![NPM Version Image](https://img.shields.io/npm/v/sqlite-parser.svg)](https://www.npmjs.com/package/sqlite-parser)
[![dependencies Status Image](https://img.shields.io/david/codeschool/sqlite-parser.svg)](https://github.com/codeschool/sqlite-parser/)
[![devDependencies Status Image](https://img.shields.io/david/dev/codeschool/sqlite-parser.svg)](https://github.com/codeschool/sqlite-parser/)
[![License Type Image](https://img.shields.io/github/license/codeschool/sqlite-parser.svg)](https://github.com/codeschool/sqlite-parser/blob/master/LICENSE)

## This branch is a work-in-progress
_Note: There is a currently a significant performance penalty (14x) to using this branch for the smart-error functionality._

This library parses SQLite queries, using JavaScript, and generates
_abstract syntax tree_ (AST) representations of the input strings. A
syntax error is produced if an AST cannot be generated.

**This parser is written against the [SQLite 3 spec](https://www.sqlite.org/lang.html).**

## Install

**IMPORTANT: If you want intelligent error messages for syntax errors, then use the `v0.11.3` release. If you want the fastest possible version of the parser, with the tradeoff of poor syntax error feedback, use the `v0.12.3` release.**

```
npm install sqlite-parser
```

## Demo

There is an interactive demo of the parser hosted
[at this location](http://codeschool.github.io/sqlite-parser/demo/). The source
for the interactive demo exists in the `demo/` folder of this repository. You
can serve up a LiveReload version of the demo on your local machine by running
`grunt live`.

## Usage

The library exposes a function that accepts two arguments: a string
containing SQL to parse and a callback function. The function will invoke
the callback function with the AST object generated from the source string.

``` javascript
// Standard usage
var sqliteParser    = require('sqlite-parser'),
    sampleSQL       = "SELECT type, quantity FROM apples WHERE amount > 1";

sqliteParser(sampleSQL, function (err, res) {
  if (err) {
    // Error
    console.log(err);
  } else {
    // Result AST
    console.log(res);
  }
});
```

## Syntax Errors

This parser uses the `--trace` flag exposed in `pegjs` to create "smart" error
messages. The parser includes a `Trace` class that keeps track of which grammar
rules were being traversed just prior to the error and uses that information
to improve the error message and location information.

## AST

**NOTE: The SQLite AST is a work-in-progress and subject to change.**

### Example

You can provide one or more SQL statements at a time. The resulting AST object
has, at the highest level, a `statement` key that consists of an array containing
the parsed statements.

#### Input SQL

``` sql
SELECT
 MIN(honey) AS "Min Honey",
 MAX(honey) AS "Max Honey"
FROM
 BeeHive
```

#### Result AST

``` json
{
  "statement": [
    {
      "type": "statement",
      "variant": "select",
      "result": [
        {
          "type": "function",
          "name": "min",
          "args": [
            {
              "type": "identifier",
              "variant": "column",
              "name": "honey"
            }
          ],
          "alias": "Min Honey"
        },
        {
          "type": "function",
          "name": "max",
          "args": [
            {
              "type": "identifier",
              "variant": "column",
              "name": "honey"
            }
          ],
          "alias": "Max Honey"
        }
      ],
      "from": [
        {
          "type": "identifier",
          "variant": "table",
          "name": "beehive"
        }
      ]
    }
  ]
}
```

## Contributing

Once the dependencies are installed, start development with the following command:

`grunt test`

which will automatically compile the parser and run the tests in `test/core/**/*-spec.js`.

Optionally, run `grunt debug` to get extended output and start a file watcher.

Finally, you should run `grunt release`, before creating any PR, to run all tests
and rebuild the `dist/` and `demo/` folders.

### Writing tests

Tests refer to a SQL test file in `test/sql/` and the test name is a
reference to the filename of the test file. For example `super test 2` as a test name in an `it()` block within a `describe()` block with title `parent block` points to the file `test/sql/parent-block/super-test-2.sql`.

The expected AST that should be generated from `super-test-2.sql` should
be located in a JSON file in the following location:
`test/json/super-test-2.json`.

There are three options for the test helpers exposed by `tree`:
- `tree.ok(this, done)` to assert that the test file successfully generates an AST
- `tree.equals(this, done)` to assert that the test file generates an AST that exactly matches the expected output JSON file
- `tree.error()` to assert that a test throws an error
  - `tree.error("This is the error message", this, done)` assert an error `message`
  - `tree.error({'line': 2}, this, done)` assert an object of properties that each exist in the error

Use `grunt rewrite-json` generate new JSON files for each of the specs in
`test/core/**/*-spec.js` and save them in `test/json/`. Example:
the AST for `test/sql/parent-block/it-block.sql` will be re-parsed and the
results will overwrite the existing `json/parent block/it-block.json` file.

``` javascript
var tree = require('./helpers');

describe('sqlite-parser', function() {
  // Test SQL: test/sql/select/basic-select.sql
  // Expected JSON: test/json/select/basic-select.json
  it('basic select', function(done) {
    tree.equals(this, done);
  });

  // uses: test/sql/parseError1.sql
  it('parse error 1', function(done) {
    tree.error({
      'message': 'There is a syntax error near FROM Clause [Table Identifier]'
    }, this, done);
  });
});
```
