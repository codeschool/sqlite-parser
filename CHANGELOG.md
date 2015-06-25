# Change Log
All notable changes to this project will be documented in this file.

## [Unreleased][unreleased]

[unreleased]: https://github.com/codeschool/sqlite-parser

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

# Changed
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

[unreleased]: https://github.com/codeschool/sqlite-parser/compare/v0.3.0...HEAD
[v0.3.0]: https://github.com/codeschool/sqlite-parser/compare/v0.2.3...v0.3.0
[v0.2.3]: https://github.com/codeschool/sqlite-parser/compare/v0.2.2...v0.2.3
[v0.2.2]: https://github.com/codeschool/sqlite-parser/compare/v0.2.1...v0.2.2
[v0.2.1]: https://github.com/codeschool/sqlite-parser/compare/v0.2.0...v0.2.1
[v0.2.0]: https://github.com/codeschool/sqlite-parser/compare/v0.1.1...v0.2.0
[v0.1.1]: https://github.com/codeschool/sqlite-parser/compare/v0.1.0...v0.1.1
[v0.1.0]: https://github.com/codeschool/sqlite-parser/compare/v0.0.9...v0.1.0
[v0.0.9]: https://github.com/codeschool/sqlite-parser/compare/v0.0.8...v0.0.9
[v0.0.8]: https://github.com/codeschool/sqlite-parser/compare/v0.0.7...v0.0.8
[v0.0.7]: https://github.com/codeschool/sqlite-parser/commit/ba1f7af0af1c7c4c4462e8bd80835eaf62f2a9f6
