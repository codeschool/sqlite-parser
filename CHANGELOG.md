# Change Log
All notable changes to this project will be documented in this file.

## [Unreleased][unreleased]

## [v0.10.2] - 2015-07-09
### Changed
- lots of clean up to organize tests by category, split out tests to different files and directories by type, and created `mocha.opts` to run tests directory recursively.
- force update README for npm website

## [v0.10.1] - 2015-07-09
### Changed
- the following things no longer have an `identifier` node in the `name` property, as it is too redundant: column constraints, table constrains, column definitions. the parent node provides plenty of context itself for what you will find in its `name` property.

## [v0.10.0] - 2015-07-09
### Added
- rules and AST for missing transaction-related statement types: `RELEASE` and `SAVEPOINT`
- rules and AST for missing SQLite-specific statement types: `PRAGMA`, `DETACH`, `VACUUM`, `ANALYZE`, and `REINDEX`
- new specs for SQLite-specific statement types
- new specs for missing transaction-related statement types
- new specs for `WITH` clause with recursive table expressions
- added new methods in `parser-util.js` to reduce repeated code: `keyify()`, `textMerge()`, and `listify()`

### Changed
- **removing Tracer class from sqlite-parser until a faster solution is developed**
  - Tracer is causing a **14x performance hit** to the sqlite-parser specs when it is enabled
  - might consider having two different builds: one _smart error_ build with Tracer and another _performance_ build for speed
- fixed rules for `WITH` clause prepended to CRUD-type statements to make sure the `with` property is added to the correct nodes
- changed the AST for `WITH` clause to no longer have a node of `type` `"with"`

  ``` json
  "with": [
    {
      "type": "expression",
      "format": "table",
      "name": "bees",
      "expression": {
        "type": "statement",
        "variant": "select",
        "from": [],
        "where": null,
        "group": null,
        "result": [],
        "distinct": false,
        "all": false,
        "order": null,
        "limit": null
      },
      "columns": null,
      "recursive": false
    }
  ]
  ```

- `DROP` statement now gives correct `variant` to the `type:'identifier'` node in the `target` property
- now, in a `ROLLBACK` statement, the savepoint exists on the `to` property
- fixed bind parameter rules and AST so that a named tcl parameter can still have an alias
- changed the format for `INSERT`, `WITH`, and `FOREIGN KEY` when using a table name versus a table expression name with a column list. for example, `INSERT INTO cats (a, b, c)` versus `INSERT INTO cats` now have the following differences in formats

  ``` json
  {
    "into": {
      "type": "identifier",
      "variant": "expression",
      "format": "table",
      "name": "cats",
      "columns": [
        {
          "type": "identifier",
          "variant": "column",
          "name": "a"
        },
        {
          "type": "identifier",
          "variant": "column",
          "name": "b"
        },
        {
          "type": "identifier",
          "variant": "column",
          "name": "c"
        }
      ]
    }
  }
  ```

  ``` json
  {
    "into": {
      "type": "identifier",
      "variant": "table",
      "name": "cats",
    }
  }
  ```

- `JOIN` rules so that `USING` clause can be followed by column names enclosed in parenthesis as the previous rule was not the correct behavior
- `JOIN` AST modified to have a `constraint` property, instead of `on` and `using`, as a join can only have one of these constraints at a time.
- many places in the AST that previously had a string value in the `name` property, such as the `into` property of an `INSERT` statement, now instead have a node of `type` `'identifier'`
- `FOREIGN KEY` constraints now have a `references` property that contains an `'expression'` identifier or a `'table'` identifier depending on the query instead of the `target`, `columns`, and `name` properties.
- several property values are now being normalized to lowercased strings instead of being passed unmodified to the AST. for example, the `action` property of `action` node now contains a lowercased value.
- removed redundant rules that pointed to `name` rule, such as `name_function`, `name_view`, and `name_trigger`.
- unquoted identifiers are now normalized to lowercased strings as per the SQL-92 standard. quoted identifiers are not normalized.
- SQLite functions are now normalized to lowercase strings in the output AST.
- now preventing FOUC when first loading the demo page. also allowing cursor focus on "Syntax Tree" editor so that the contents can be selected and copied to the clipboard.

## [v0.9.8] - 2015-07-06
### Added
- new specs for `CREATE TRIGGER` and datatypes

### Changed
- added a bunch of missing descriptions for grammar rules in `grammar.pegjs`
- make sure that a `description` is not repeated in smart error message
- `comment` rules no longer allow you to put a space between the two symbols at the start and/or end of a comment.

  ```
  SELECT * - - not valid but is being accepted
  ```

- added some extra helper rules to `CREATE` statement rules to help the tracer avoid traversing the wrong create statement type
- allowed characters in identifiers now includes dollar sign `$` and no longer includes dash `-` for unquoted values
- Since `SQLite` itself is tolerant of this behavior, although it is non-standard, parser allows single-quoted string literals to be interpreted as aliases.

  ``` sql
  select
    'hat'.*,
    COUNT(*) as 'pants'
  from
    hats 'hat'
  ```

- removed `grunt-string-replace` from `devDependencies`
- no longer building demo on top of source in `demo/` folder. `grunt live` now puts assets for interactive demo into `.tmp/` folder and then `grunt demo` creates a min bundle in the `demo/` folder
- raw source for interactive demo now exists in `src/demo/` folder
- now using `grunt-contrib-cssmin` to create single css bundle file for demo

### Notes
- there is way too much magic/nonsense in the `smartError()` method of `Tracer`. need to come up with an alternative approach to getting the right information for syntax errors.

## [v0.9.1] - 2015-07-05
### Changed
- removed `private` flag in `package.json` ahead of first published release
- pulled out last remnants of `promise` from core `sqlite-parser` lib

## [v0.9.0] - 2015-07-05
### Changed
- `sqlite-parser` is now completely **free of runtime dependencies** as `promise` has been removed as a dependency. you can still use the library as a promise-based module, but you have to include and `require('promise')` manually.

  ``` javascript
  // Promise-based usage
  var Promise         = require('promise'),
      sqliteParser    = Promise.denodeify(require('sqlite-parser'));
  sqliteParser("SELECT * FROM bees")
  .then(function (res) {
    // Result AST
    console.log(res);
  }, function (err) {
    // Error
    console.log(err);
  });
  ```

  ``` javascript
  // Standard usage
  var sqliteParser    = require('sqlite-parser');
  sqliteParser("SELECT * FROM bees", function (err, res) {
    if (err) {
      // Error
      console.log(err);
    } else {
      // Result AST
      console.log(res);
    }
  });
  ```

- forked `pegjs` repository as `nwronski/pegjs` to get the changes into `pegjs` core into version control so they are not accidentally overwritten
- getting closer to displaying correct error location when there are multiple statements in the input SQL

### Notes
- Even though the `Tracer` is now pretty good at pinpointing where a SyntaxError occurred, it is still removing `CREATE TABLE` node when there is a failure in the statement, even though that information should be part of the error message.

## [v0.8.0] - 2015-07-04
### Added
- added several array methods (e.g.: `findLast()`, `takeRight()`, `pluck()`) so that I could remove `lodash` as a dependency of the "smart error" `Tracer` class

### Changed
- removed `lodash` dependency in core `Tracer`. `lodash` is now only a `devDependency` again!

### Notes
- considering removing the `promise` dependency from the core `sqlite-parser` library before `v1.0.0`, as well, so that the parser can be dependency free as a standalone library. people could choose to "promisify" the parser or just use it synchronously instead of being forced to bundle the `promise` dependency when bundling this package for use in the browser. It actually looks like all the evergreen browsers except IE currently support a native `Promise` implementation, so having a non-native `Promise` implementation as a dependency will probably be obsolete pretty soon.

## [v0.7.0] - 2015-07-02
### Added
- additional rule descriptions in `grammar.pegjs`

### Changed
- cleaned up css in the interactive demo

### Fixed
- fixed error reporting when there is more than one statement in the input SQL.
  - still need to make sure previous tree is not used if a subsequent statement has an error at the highest level

  ``` sql
  SELECT *
  FROM cats;
  SELECT * d
  ```

### Notes  
- to support the "smart errors" changes were made to the `pegjs` library code in `lib/compiler/passes/generate-javascript.js`. this was done to allow `Tracer` to get the `description` names for the rules that are referenced in the error messages. will need to fork `pegjs` to get the changes to `pegjs` core into version control so they are not accidentally overwritten.

do not show parenthesis in error message for syntax error when thereis nothing to put inside them. fixes for css in demo

demo layout off by 1px when at smallest resolution

did a lot of cleanup on demo styles, responsive layout, error notification. changed error message format for smart errors

fixed rules for double-quoted, backticked, and bracketed identifiers to allow for escapes, leading or trailing spaces, and the full character set that is legal for quoted identifiers, where allowed. fixed datatype names that did not display correctly in generated AST. fixed string literal definition to allow all possible input

fixed value format for direction key in PRIMARY KEY table contrainsts cleaned up CSS for demo.

## [v0.6.0] - 2015-07-01
### Changed
- updated grammar to remove all dependence on `modifier` clause as it was being used as a catch-all clause for stray parts of statements
- created `defer` clause
- normalized format for common clauses and nodes across different statement types
- removed `range` variant that was part of `BETWEEN` expressions
- renamed several clauses to match the SQL keywords and/or SQLite manual descriptions used to define them
  - for `WITHOUT ROWID` in `CREATE TABLE`: `modifier` -> `optimization`
  - for `IF NOT EXISTS` in all places: `modifier`: `condition`

## [v0.5.1] - 2015-06-30
### Fixed
- accidentally repeating first `description` in the error thrown from the `smartError()` method of `Tracer`

  > There is a syntax error near **FROM Clause** [**FROM Clause**, Table Identifier]

## [v0.5.0] - 2015-06-30
### Added
- turned tracer/smart error code into a `Tracer` class located at `tracer.js` in `src/`

  ``` javascript
  var t = Tracer();
  return new Promise(function(resolve, reject) {
    resolve(parser.parse(source, {
      'tracer': t
    }));
  })
  .catch(function (err) {
    t.smartError(err);
  });
  ```

### Changed
- cleaned up smart error code to follow the most relevant error path of the `pegjs` trace output

### Notes
- need to remove the `lodash` dependency from `Tracer` before v1.0.0

## [v0.4.1] - 2015-06-30
### Added
- smarter error messages using rule descriptions and tracer functionality in newest `pegjs`

### Changed
- `parseError1.sql` spec updated for new smarter error syntax

## [v0.4.0] - 2015-06-27
### Added
- `sqlite-parser` demo
  - `demo/` folder containing interactive demo of parser. demo JavaScript is all in a self-contained, browserified package
  - `browserify` task added to `Gruntfile.js` for creating `sqlite-parser-demo.js` in `demo/` as `grunt demo` and a watcher/livereload version as `grunt interactive`
  - `CodeMirror` dependency into `devDependencies`
  - updated `TODO.md` and `.npmignore` for new Interactive demo
- `sqlite-parser` distributable
  - `browserify` task added to `Gruntfile.js` for creating `sqlite-parser-dist.js` in `dist/` as `grunt dist`
  - attaches a single function to `window` as `sqliteParser`
- some missing names for grammar rules

### Changed
- renamed `parse.jsr` and `util.js` files in `src/` and `lib/` folders
- pointing to latest `pegjs` master to get latest `SyntaxError` format

## [v0.3.1] - 2015-06-25
### Added
- `LICENSE` file added
- `.npmignore` file added

### Changed
- updated package dependencies
- `index.js` file moved to file root, duplicate copies in `lib/` and `src/` removed
- going to try and keep (most significant) version numbers synchronized between `sqlite-parser` and `sqlite-tree` to avoid confusion going forward

## [v0.3.0] - 2015-06-25
### Added
- allow subquery in parenthesis within `FROM` clause

- New specs: Basic Drop Table, Basic Drop Trigger, Basic Function, Basic Subquery, Basic Union, Create Check 1, Create Check 2, Create Foreign Key 1, Create Foreign Key 2, Create Primary Key 1, Create Table Alt Syntax, Expression Like, Expression Table 1, Expression Unary 1, Function Mixed Args, Insert Into Default, Join Types 1, Join Types 2, Select Parts 1, Select Qualified Table 1, Transaction Rollback

### Changed
- allow multiple expressions for `GROUP BY` clause

  ``` sql
  SELECT color, type, name
  FROM hats
  GROUP BY type, color
  ```

- changed AST for create table, constraints, joins, select parts, transactions, unions, triggers to pass new specs
- `INSERT` statement `VALUES` clause AST normalized for value lists and `DEFAULT VALUES`

  ``` json
  {
    "type": "values",
    "variant": "list",
    "values": []
  },
  {
    "type": "values",
    "variant": "default",
    "values": null
  }
  ```

- normalized AST across all column constraints and table constraints. all table constraints are `{"type": "definition", "variant": "constraint"}` and contain a `definition` array that contains the constraint. the constraint in `definitions` has the same format as the column constraint definition.

## [v0.2.3] - 2015-06-24
### Fixed
- allow for nested parenthesis
- allow multiple binary expressions and concatenation operators within parenthesis

  ``` sql
  SELECT *
  FROM hats
  WHERE
    hat OR (shirt AND (shoes OR wig) AND pants)
  ```

## [v0.2.2] - 2015-06-24
### Fixed
- The `CREATE VIRTUAL TABLE` statement previously only worked with expression arguments. Fixed by checking for a column name followed by a type definition or column constraint before assuming the type is an expression list, if these things are found, then treat the arguments as a set of source definitions as in a creation statement for a table.

  ``` sql
  CREATE VIRTUAL TABLE happy_table
  USING happy_module(...);

    id int -- treat as definitions for CREATE TABLE
    x != 2 -- treat as an expression list
  ```

## [v0.2.1] - 2015-06-23
### Added
- `CREATE VIEW` syntax and AST
- specs for `CREATE VIEW` statement
- `CREATE VIRTUAL TABLE` syntax and AST
- specs for `CREATE VIRTUAL TABLE` statement

### Notes
- `CREATE VIRTUAL TABLE` currently only works with expression arguments and does not support passing column definitions and/or table constraint definitions as is allowed in the SQLite spec for virtual table module arguments.

  ``` sql
  CREATE VIRTUAL TABLE vtrl_ads
  USING tbl_creator(
    id int PRIMARY KEY,
    name varchar(50),
    category varchar(15),
    cost int);
  ```

## [v0.2.0] - 2015-06-23
### Added
- `CREATE TRIGGER` syntax and AST
- specs for `CREATE TRIGGER` statement
- specs for some expression grouping issues that were experienced when using binary and unary expressions along with `AND`, `OR`

  ``` sql
  CREATE INDEX `bees`.`hive_state`
  ON `hive` (`happiness` ASC, `anger` DESC)
  WHERE
    `happiness` ISNULL AND `anger` > 0
  ```

### Changed
- updated rules and specs to remove use of `modifier` property in AST

## [v0.1.1] - 2015-06-22
### Added
- rules for `CREATE INDEX`
- specs for `CREATE INDEX` statement

### Fixed
- some grouping errors for unary operators, unary null and binary concatenation

## [v0.1.0] - 2015-06-19
### Added
- rules line and block comments
- specs for comment types

  ``` sql
  -- Line comment
  /*
   * Block comment /* nested comment */
   */
  ```

## [v0.0.9] - 2015-06-18
### Added
- rules and AST for `RAISE`, compound queries `UNION` types, `ESCAPE`

### Fixed
- failing specs for missing columns key and incorrect AST for `SELECT` statements

## [v0.0.8] - 2015-06-17
### Added
- massive cleanup of parser rules
- allow select statement as expression

### Changed
- `FOREIGN KEY` column constraint rules
- definition for AST and rules for `FOREIGN KEY` and `PRIMARY KEY` table constraints

### Fixed
- `ORDER BY` as binary concat operation bug
- needed missing type attribute on `CHECK` and `FOREIGN KEY`
- missing index key in table `FROM` sources

## [v0.0.7] - 2015-06-15
### Added
- First working version of sqlite-parser

[unreleased]: https://github.com/codeschool/sqlite-parser/compare/v0.10.2...HEAD
[v0.10.2]: https://github.com/codeschool/sqlite-parser/compare/v0.9.8...v0.10.2
[v0.9.8]: https://github.com/codeschool/sqlite-parser/compare/v0.9.1...v0.9.8
[v0.9.1]: https://github.com/codeschool/sqlite-parser/compare/v0.8.0...v0.9.1
[v0.8.0]: https://github.com/codeschool/sqlite-parser/compare/v0.6.0...v0.8.0
[v0.6.0]: https://github.com/codeschool/sqlite-parser/compare/v0.3.1...v0.6.0
[v0.3.1]: https://github.com/codeschool/sqlite-parser/compare/6388118d601a89d011ecd6f5c215bbc9763444db...v0.3.1
[v0.1.1]: https://github.com/codeschool/sqlite-parser/commit/6388118d601a89d011ecd6f5c215bbc9763444db
