/* Helper Functions */
{
      // Parser utilities
  var _u = require('./sql-parser-util'),
      esc = _u.escape,
      // Codex of tag and attribute names
      codex = require('./sql-grammar-codex')(options);

  // Set error encoding
  _u.setFormat(codex);
}

/* Start Grammar */
start
  = s:(stmt)*
  {
    return {
      'statement': s
    };
  }

expression
  = _TODO_

expression_list
  = expression ( comma expression )*

stmt "Statement"
  = stmt_crud
  / stmt_create
  / stmt_drop

stmt_crud
  = clause_with? stmt_crud_types

clause_with "WITH Clause"
  = WITH ( RECUSRIVE )? table_expression ( comma expression_table )*

expression_table
  = name_table ( paren_open name_column ( comma name_column )* paren_close )? AS stmt_select

stmt_crud_types
  = stmt_select
  / stmt_insert
  / stmt_update
  / stmt_delete

/** {@link https://www.sqlite.org/lang_select.html} */
stmt_select "SELECT Statement"
  = select_loop
  ( ORDER BY select_order )?
  ( LIMIT expression ( ( OFFSET / comma ) expression )? )?

select_loop
  = select_parts operator_compound

select_parts
  = select_parts_core
  / select_parts_values

operator_compound
  = ( UNION ( ALL )? )
  / INTERSECT
  / EXCEPT

select_parts_core
  = SELECT ( DISTINCT / ALL )? select_target
  ( FROM select_source )?
  ( WHERE expression )?
  ( GROUP BY expression ( HAVING expression )? )?

select_target
  = _TODO_

select_source
  = select_source_loop
  / select_source_join

select_source_loop
  = table_or_sub ( comma table_or_sub )*

table_or_sub
  = table
  / subquery

table
  = _TODO_

subquery
  = _TODO_

select_source_join
  = table_or_sub ( join_operator table_or_sub ( join_condition )? )?

join_operator
  = ( NATURAL )? ( ( LEFT ( OUTER )? ) / INNER / CROSS )? JOIN

join_condition
  = ( ON expression )
  / ( USING name_column ( comma name_column )* )

select_parts_values
  = VALUES paren_open expression_list paren_close

select_order
  = expression ( COLLATE id_collation )? (ASC / DESC)?

id_database
  = name_database

id_table
  = ( id_database dot)? name_table

id_column
  = ( id_table dot)? name_column

id_collation
  = name_collation

/* TODO: FIX all name_* symbols */
name_database
  = name

name_table
  = name

name_column
  = name

name_collation
  = name

/** {@link https://www.sqlite.org/lang_insert.html} */
stmt_insert "INSERT Statement"
  = ( ( INSERT ( OR ( REPLACE / ROLLBACK / ABORT / FAIL / IGNORE ) )? ) / REPLACE )
  ( INTO ( id_database / id_table ) ( open_paren name_column ( comma column_name )* close_paren )? )
  insert_parts

insert_parts
  = ( VALUES paren_open expression_list paren_close)
  / ( stmt_select )
  / ( DEFAULT VALUES )

/* TODO: Complete */
stmt_update "UPDATE Statement"
  = any

/* TODO: Complete */
stmt_delete "DELETE Statement"
  = any

/* TODO: Complete */
stmt_create "CREATE Statement"
  = any

/* TODO: Complete */
stmt_drop "DROP Statement"
  = any

/* Symbols */
paren_open "Open Parenthesis"
  = "(" o
paren_close "Close Parenthesis"
  = ")" o
comma "Comma"
  = "," o
dot "Period"
  = "."

/* Keywords */
keywords
  = ABORT / ACTION / ADD / AFTER / ALL / ALTER / ANALYZE / AND / AS / ASC /
  ATTACH / AUTOINCREMENT / BEFORE / BEGIN / BETWEEN / BY / CASCADE / CASE /
  CAST / CHECK / COLLATE / COLUMN / COMMIT / CONFLICT / CONSTRAINT / CREATE /
  CROSS / CURRENT_DATE / CURRENT_TIME / CURRENT_TIMESTAMP / DATABASE / DEFAULT /
  DEFERRABLE / DEFERRED / DELETE / DESC / DETACH / DISTINCT / DROP / EACH /
  ELSE / END / ESCAPE / EXCEPT / EXCLUSIVE / EXISTS / EXPLAIN / FAIL / FOR /
  FOREIGN / FROM / FULL / GLOB / GROUP / HAVING / IF / IGNORE / IMMEDIATE / IN /
  INDEX / INDEXED / INITIALLY / INNER / INSERT / INSTEAD / INTERSECT / INTO /
  IS / ISNULL / JOIN / KEY / LEFT / LIKE / LIMIT / MATCH / NATURAL / NO / NOT /
  NOTNULL / NULL / OF / OFFSET / ON / OR / ORDER / OUTER / PLAN / PRAGMA /
  PRIMARY / QUERY / RAISE / RECURSIVE / REFERENCES / REGEXP / REINDEX /
  RELEASE / RENAME / REPLACE / RESTRICT / RIGHT / ROLLBACK / ROW / SAVEPOINT /
  SELECT / SET / TABLE / TEMP / TEMPORARY / THEN / TO / TRANSACTION / TRIGGER /
  UNION / UNIQUE / UPDATE / USING / VACUUM / VALUES / VIEW / VIRTUAL / WHEN /
  WHERE / WITH / WITHOUT

ABORT "ABORT Keyword"
  = "ABORT" e
ACTION "ACTION Keyword"
  = "ACTION" e
ADD "ADD Keyword"
  = "ADD" e
AFTER "AFTER Keyword"
  = "AFTER" e
ALL "ALL Keyword"
  = "ALL" e
ALTER "ALTER Keyword"
  = "ALTER" e
ANALYZE "ANALYZE Keyword"
  = "ANALYZE" e
AND "AND Keyword"
  = "AND" e
AS "AS Keyword"
  = "AS" e
ASC "ASC Keyword"
  = "ASC" e
ATTACH "ATTACH Keyword"
  = "ATTACH" e
AUTOINCREMENT "AUTOINCREMENT Keyword"
  = "AUTOINCREMENT" e
BEFORE "BEFORE Keyword"
  = "BEFORE" e
BEGIN "BEGIN Keyword"
  = "BEGIN" e
BETWEEN "BETWEEN Keyword"
  = "BETWEEN" e
BY "BY Keyword"
  = "BY" e
CASCADE "CASCADE Keyword"
  = "CASCADE" e
CASE "CASE Keyword"
  = "CASE" e
CAST "CAST Keyword"
  = "CAST" e
CHECK "CHECK Keyword"
  = "CHECK" e
COLLATE "COLLATE Keyword"
  = "COLLATE" e
COLUMN "COLUMN Keyword"
  = "COLUMN" e
COMMIT "COMMIT Keyword"
  = "COMMIT" e
CONFLICT "CONFLICT Keyword"
  = "CONFLICT" e
CONSTRAINT "CONSTRAINT Keyword"
  = "CONSTRAINT" e
CREATE "CREATE Keyword"
  = "CREATE" e
CROSS "CROSS Keyword"
  = "CROSS" e
CURRENT_DATE "CURRENT_DATE Keyword"
  = "CURRENT_DATE" e
CURRENT_TIME "CURRENT_TIME Keyword"
  = "CURRENT_TIME" e
CURRENT_TIMESTAMP "CURRENT_TIMESTAMP Keyword"
  = "CURRENT_TIMESTAMP" e
DATABASE "DATABASE Keyword"
  = "DATABASE" e
DEFAULT "DEFAULT Keyword"
  = "DEFAULT" e
DEFERRABLE "DEFERRABLE Keyword"
  = "DEFERRABLE" e
DEFERRED "DEFERRED Keyword"
  = "DEFERRED" e
DELETE "DELETE Keyword"
  = "DELETE" e
DESC "DESC Keyword"
  = "DESC" e
DETACH "DETACH Keyword"
  = "DETACH" e
DISTINCT "DISTINCT Keyword"
  = "DISTINCT" e
DROP "DROP Keyword"
  = "DROP" e
EACH "EACH Keyword"
  = "EACH" e
ELSE "ELSE Keyword"
  = "ELSE" e
END "END Keyword"
  = "END" e
ESCAPE "ESCAPE Keyword"
  = "ESCAPE" e
EXCEPT "EXCEPT Keyword"
  = "EXCEPT" e
EXCLUSIVE "EXCLUSIVE Keyword"
  = "EXCLUSIVE" e
EXISTS "EXISTS Keyword"
  = "EXISTS" e
EXPLAIN "EXPLAIN Keyword"
  = "EXPLAIN" e
FAIL "FAIL Keyword"
  = "FAIL" e
FOR "FOR Keyword"
  = "FOR" e
FOREIGN "FOREIGN Keyword"
  = "FOREIGN" e
FROM "FROM Keyword"
  = "FROM" e
FULL "FULL Keyword"
  = "FULL" e
GLOB "GLOB Keyword"
  = "GLOB" e
GROUP "GROUP Keyword"
  = "GROUP" e
HAVING "HAVING Keyword"
  = "HAVING" e
IF "IF Keyword"
  = "IF" e
IGNORE "IGNORE Keyword"
  = "IGNORE" e
IMMEDIATE "IMMEDIATE Keyword"
  = "IMMEDIATE" e
IN "IN Keyword"
  = "IN" e
INDEX "INDEX Keyword"
  = "INDEX" e
INDEXED "INDEXED Keyword"
  = "INDEXED" e
INITIALLY "INITIALLY Keyword"
  = "INITIALLY" e
INNER "INNER Keyword"
  = "INNER" e
INSERT "INSERT Keyword"
  = "INSERT" e
INSTEAD "INSTEAD Keyword"
  = "INSTEAD" e
INTERSECT "INTERSECT Keyword"
  = "INTERSECT" e
INTO "INTO Keyword"
  = "INTO" e
IS "IS Keyword"
  = "IS" e
ISNULL "ISNULL Keyword"
  = "ISNULL" e
JOIN "JOIN Keyword"
  = "JOIN" e
KEY "KEY Keyword"
  = "KEY" e
LEFT "LEFT Keyword"
  = "LEFT" e
LIKE "LIKE Keyword"
  = "LIKE" e
LIMIT "LIMIT Keyword"
  = "LIMIT" e
MATCH "MATCH Keyword"
  = "MATCH" e
NATURAL "NATURAL Keyword"
  = "NATURAL" e
NO "NO Keyword"
  = "NO" e
NOT "NOT Keyword"
  = "NOT" e
NOTNULL "NOTNULL Keyword"
  = "NOTNULL" e
NULL "NULL Keyword"
  = "NULL" e
OF "OF Keyword"
  = "OF" e
OFFSET "OFFSET Keyword"
  = "OFFSET" e
ON "ON Keyword"
  = "ON" e
OR "OR Keyword"
  = "OR" e
ORDER "ORDER Keyword"
  = "ORDER" e
OUTER "OUTER Keyword"
  = "OUTER" e
PLAN "PLAN Keyword"
  = "PLAN" e
PRAGMA "PRAGMA Keyword"
  = "PRAGMA" e
PRIMARY "PRIMARY Keyword"
  = "PRIMARY" e
QUERY "QUERY Keyword"
  = "QUERY" e
RAISE "RAISE Keyword"
  = "RAISE" e
RECURSIVE "RECURSIVE Keyword"
  = "RECURSIVE" e
REFERENCES "REFERENCES Keyword"
  = "REFERENCES" e
REGEXP "REGEXP Keyword"
  = "REGEXP" e
REINDEX "REINDEX Keyword"
  = "REINDEX" e
RELEASE "RELEASE Keyword"
  = "RELEASE" e
RENAME "RENAME Keyword"
  = "RENAME" e
REPLACE "REPLACE Keyword"
  = "REPLACE" e
RESTRICT "RESTRICT Keyword"
  = "RESTRICT" e
RIGHT "RIGHT Keyword"
  = "RIGHT" e
ROLLBACK "ROLLBACK Keyword"
  = "ROLLBACK" e
ROW "ROW Keyword"
  = "ROW" e
SAVEPOINT "SAVEPOINT Keyword"
  = "SAVEPOINT" e
SELECT "SELECT Keyword"
  = "SELECT" e
SET "SET Keyword"
  = "SET" e
TABLE "TABLE Keyword"
  = "TABLE" e
TEMP "TEMP Keyword"
  = "TEMP" e
TEMPORARY "TEMPORARY Keyword"
  = "TEMPORARY" e
THEN "THEN Keyword"
  = "THEN" e
TO "TO Keyword"
  = "TO" e
TRANSACTION "TRANSACTION Keyword"
  = "TRANSACTION" e
TRIGGER "TRIGGER Keyword"
  = "TRIGGER" e
UNION "UNION Keyword"
  = "UNION" e
UNIQUE "UNIQUE Keyword"
  = "UNIQUE" e
UPDATE "UPDATE Keyword"
  = "UPDATE" e
USING "USING Keyword"
  = "USING" e
VACUUM "VACUUM Keyword"
  = "VACUUM" e
VALUES "VALUES Keyword"
  = "VALUES" e
VIEW "VIEW Keyword"
  = "VIEW" e
VIRTUAL "VIRTUAL Keyword"
  = "VIRTUAL" e
WHEN "WHEN Keyword"
  = "WHEN" e
WHERE "WHERE Keyword"
  = "WHERE" e
WITH "WITH Keyword"
  = "WITH" e
WITHOUT "WITHOUT Keyword"
  = "WITHOUT" e

/* Generic rules */

any "Anything"
  = .

/* TODO: Replace me! */
name
  = n:( name_char )+
  ! keywords
  { return textNode(n); }

o "Optional Whitespace"
  = _*

e "Enforced Whitespace"
  = _+

_ "Whitespace"
  = [ \f\n\r\t\v]

/* TODO: Everything with this symbol */
_TODO_
  = "TODO" e
