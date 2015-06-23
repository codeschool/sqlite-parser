# Change Log
All notable changes to this project will be documented in this file.

## [Unreleased][unreleased]

[unreleased]: https://github.com/codeschool/sqlite-parser

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

[unreleased]: https://github.com/codeschool/sqlite-parser/compare/v0.2.1...HEAD
[v0.2.1]: https://github.com/codeschool/sqlite-parser/compare/v0.2.0...v0.2.1
[v0.2.0]: https://github.com/codeschool/sqlite-parser/compare/v0.1.1...v0.2.0
[v0.1.1]: https://github.com/codeschool/sqlite-parser/compare/v0.1.0...v0.1.1
[v0.1.0]: https://github.com/codeschool/sqlite-parser/compare/v0.0.9...v0.1.0
[v0.0.9]: https://github.com/codeschool/sqlite-parser/compare/v0.0.8...v0.0.9
[v0.0.8]: https://github.com/codeschool/sqlite-parser/compare/v0.0.7...v0.0.8
[v0.0.7]: https://github.com/codeschool/sqlite-parser/commit/ba1f7af0af1c7c4c4462e8bd80835eaf62f2a9f6
