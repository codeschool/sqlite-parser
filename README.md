# sqlite-parser

This library takes SQL queries, provided as a string, and generates an
AST. An error will be generated describing what is malformed in the source query
code if the AST cannot be generated.

**This parser is written against the [SQLite 3 spec](https://www.sqlite.org/lang.html).**

Note: this project is work-in-progress and is **not fully spec-compliant**.

The parser implements the basic components of the SQLite 3 spec, such as:
- Basic query types `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `DROP`, `CREATE`, etc...
- Sub-queries `SELECT FROM (SELECT * FROM b)`
- Aliases `SELECT * FROM apples AS a`
- `JOIN` types `INNER`, `OUTER`, `LEFT`
- Query modifiers `WHERE`, `GROUP BY`, `HAVING`

## Demo

There interactive demo of the parser hosted
[at this location](http://codeschool.github.io/sqlite-parser/demo/). The source
for the interactive demo exists in the `demo/` folder of this repository. You
can serve a LiveReload version of the demo on your local machine by running
`grunt interactive`.

## Install

```
npm install sqlite-parser
```

## Usage

The library exposes a function that accepts a single argument: a string
containing SQL to parse. The method returns a `Promise` that resolves to the
AST object generated from the source string.

``` javascript
var sqliteParser  = require('sqlite-parser'),
    sampleSQL     = "SELECT type, quantity FROM apples WHERE amount > 1";

sqliteParser(sampleSQL)
.then(function (tree) {
  // AST generated
  console.log(tree);
}, function (err) {
  // Parse error thrown
  console.log(err);
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
      "explain": false,
      "type": "statement",
      "variant": "select",
      "from": [
        {
          "type": "identifier",
          "variant": "table",
          "name": "BeeHive",
          "alias": null,
          "index": null
        }
      ],
      "where": null,
      "group": null,
      "result": [
        {
          "type": "function",
          "name": "MIN",
          "distinct": false,
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
          "name": "MAX",
          "distinct": false,
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
      "distinct": false,
      "all": false,
      "order": null,
      "limit": null
    }
  ]
}
```

## Contributing

Once the dependencies are installed, start development with the following command:

`grunt test`

which will automatically compile the parser and run the tests in `test/index-spec.js`.

Optionally, run `grunt debug` to get extended output and start a file watcher.

Finally, you should run `grunt release` before creating any PR to run all tests
and rebuild the `dist/` and `demo/` folders.

### Writing tests

Tests refer to a SQL test file in `test/sql/` and the test name is a
reference to the filename of the test file. For example `super test 2`
as a test name points to the file `test/sql/superTest2.sql`.

There are three options for the test helpers exposed by `tree`:
- `tree.ok(this, done)` to assert that the test file successfully generates an AST
- `tree.equals(ast, this, done)` to assert that the test file generates an AST that exactly matches `ast`
- `tree.error()` to assert that a test throws an error
  - `tree.error("This is the error message", this, done)` assert an error `message`
  - `tree.error({'line': 2}, this, done)` assert an object of properties that each exist in the error

``` javascript
var tree = require('./helpers');

describe('sqlite-parser', function() {
  // uses: test/sql/basicSelect.sql
  it('basic select', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"bananas","alias":null,"index":null}],"where":[{"type":"expression","format":"binary","variant":"operation","operation":"=","left":{"type":"identifier","variant":"column","name":"color"},"right":{"type":"literal","variant":"string","value":"red"}}],"group":null,"result":[{"type":"identifier","variant":"star","name":"*"}],"distinct":false,"all":false,"order":null,"limit":null}]}';
    tree.equals(resultTree, this, done);
  });

  // uses: test/sql/parseError1.sql
  it('parse error 1', function(done) {
    tree.error({
      'message': 'There is a syntax error near FROM Clause [Table Identifier]'
    }, this, done);
  });
});
```
