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
  = s:( stmt )*
  {
    return {
      'statement': s
    };
  }

/**
 * Expression definition reworked without left recursion for pegjs
 * {@link https://www.sqlite.org/lang_expr.html}
 */
expression "Expression"
  = expression_value
  / ( sym_popen expression_node sym_pclose )
  / expression_node

expression_value
  = literal_value
  / bind_parameter
  / id_column
  / function_call
  / expression_unary
  / expression_cast
  / expression_exists
  / expression_case
  / expression_raise

expression_unary
  = operator_unary expression

expression_cast
  = CAST sym_popen expression AS name_type sym_pclose

expression_exists
  = ( ( NOT )? EXISTS )? stmt_select

expression_case
  = CASE ( expression )? ( WHEN expression THEN expression )+ ( ELSE expression )? END

expression_raise
  = RAISE sym_popen ( IGNORE / ( ( ROLLBACK / ABORT / FAIL ) sym_comma error_message ) ) sym_pclose

/* Expression Nodes */
expression_node
  = expression_collate
  / expression_compare
  / expression_null
  / expression_is
  / expression_between
  / expression_in
  / operation_binary

/** @note Removed expression on left-hand-side to remove recursion */
expression_collate
  = expression_value COLLATE name_collation

/** @note Removed expression on left-hand-side to remove recursion */
expression_compare
  = expression_value ( NOT )? ( LIKE / GLOB / REGEXP / MATCH ) expression ( ESCAPE expression )?

/** @note Removed expression on left-hand-side to remove recursion */
expression_null
  = expression_value ( ISNULL / NOTNULL / ( NOT NULL ) )

/** @note Removed expression on left-hand-side to remove recursion */
expression_is
  = expression_value IS ( NOT )? expression

/** @note Removed expression on left-hand-side to remove recursion */
expression_between
  = expression_value ( NOT )? BETWEEN expression AND expression

/** @note Removed expression on left-hand-side to remove recursion */
expression_in
  = expression_value ( NOT )? IN ( ( sym_popen ( stmt_select / expression_list ) sym_pclose ) / ( id_table ) )

/**
 * Literal value definition
 * {@link https://www.sqlite.org/syntax/literal-value.html}
 */
literal_value "Literal Value"
  = literal_number
  / literal_string
  / literal_blob
  / NULL
  / ( CURRENT_DATE / CURRENT_TIMESTAMP / CURRENT_TIME )

/**
 * Notes:
 *    1) SQL uses single quotes for string literals.
 *    2) Value is an identier or a string literal based on context.
 * {@link https://www.sqlite.org/lang_keywords.html}
 */
literal_string
  = literal_string_single

literal_string_single
  = sym_sglquote s:( literal_string_schar )* sym_sglquote
  { return _u.textNode(s); }

literal_string_schar
  = ( "''" ) / ( [^\'] )

literal_blob
  = [x]i literal_string_single

literal_number
  = literal_number_decimal
  / literal_number_hex

literal_number_decimal
  = ( ( ( number_digit )* ( sym_dot ( number_digit )* )? ) / ( sym_dot ( number_digit )+ ) ) ( "E" ( [\+\-] )? ( number_digit )+ )?

literal_number_hex
  = "0x"i ( number_hex )*

number_hex
  = [0-9a-f]i

number_digit
  = [0-9]

/**
 * Bind Parameters have several syntax variations:
 * 1) "?" ( [0-9]+ )?
 * 2) [\$\@\:] name_char+
 * {@link https://www.sqlite.org/c3ref/bind_parameter_name.html}
 */
bind_parameter "Bind Parameter"
  = bind_parameter_numbered
  / bind_parameter_named
  / bind_parameter_tcl

/**
 * Bind parameters start at index 1 instead of 0.
 */
bind_parameter_numbered
  = sym_quest id:( [1-9] [0-9]* )? o
  {
    return {
      'type': 'variable',
      'format': 'numbered',
      'suffix': null,
      'name': ( _u.isOkay(id) ? parseInt(_u.textNode(id), 10) : null )
    };
  }

bind_parameter_named
  = [\:\@] name:( name_char )+ o
  {
    return {
      'type': 'variable',
      'format': 'named',
      'suffix': null,
      'name': _u.textNode(name)
    };
  }

bind_parameter_tcl
  = "$" name:( name_char / [\:] )+ o suffix:( bind_parameter_named_suffix )?
  {
    return {
      'type': 'variable',
      'format': 'tcl',
      'suffix': suffix,
      'name': _u.textNode(name)
    };
  }

bind_parameter_named_suffix
  = sym_dblquote n:( !sym_dblquote any )* sym_dblquote
  { return _u.textNode(n); }

/** @note Removed expression on left-hand-side to remove recursion */
operation_binary
  = expression_value operator_binary expression

expression_list "Expression List"
  = expression ( sym_comma expression )*

function_call
  = name_function sym_popen ( ( ( DISTINCT )? expression_list ) / ( select_star ) )? sym_pclose

error_message "Error Message"
  = s:( literal_string )
  { return _u.textNode(s); }

stmt "Statement"
  = stmt_crud
  / stmt_create
  / stmt_drop

stmt_crud
  = clause_with? stmt_crud_types

clause_with "WITH Clause"
  = WITH ( RECURSIVE )? expression_table ( sym_comma expression_table )*

expression_table "Table Expression"
  = name_table ( sym_popen name_column ( sym_comma name_column )* sym_pclose )? AS stmt_select

stmt_crud_types
  = stmt_select
  / stmt_insert
  / stmt_update
  / stmt_delete

/** {@link https://www.sqlite.org/lang_select.html} */
stmt_select "SELECT Statement"
  = select_loop
  ( ORDER BY select_order )?
  ( LIMIT expression ( ( OFFSET / sym_comma ) expression )? )?

select_loop
  = select_parts operator_compound

select_parts
  = select_parts_core
  / select_parts_values

operator_compound "Compound Operator"
  = ( UNION ( ALL )? )
  / INTERSECT
  / EXCEPT

operator_unary "Unary Operator"
  = sym_tilde
  / sym_minus
  / sym_plus
  / NOT

operator_binary "Binary Operator"
  = binary_concat
  / ( binary_multiply / binary_mod )
  / ( binary_plus / binary_minus )
  / ( binary_left / binary_right / binary_and / binary_or )
  / ( binary_lt / binary_lte / binary_gt / binary_gte )
  / ( binary_assign / binary_equal / binary_notequal / ( IS ( NOT )? ) / IN / LIKE / GLOB / MATCH / REGEXP )
  / AND
  / OR

binary_concat "Or"
  = sym_pipe sym_pipe

binary_plus "Add"
  = sym_plus

binary_minus "Subtract"
  = sym_minus

binary_multiply "Multiply"
  = sym_star

binary_mod "Modulo"
  = sym_mod

binary_left "Shift Left"
  = binary_lt binary_lt

binary_right "Shift Right"
  = binary_gt binary_gt

binary_and "Logical AND"
  = sym_amp

binary_or "Logical OR"
  = sym_pipe

binary_lt "Less Than"
  = sym_lt

binary_gt "Greater Than"
  = sym_gt

binary_lte "Less Than Or Equal"
  = binary_lt sym_equal

binary_gte "Greater Than Or Equal"
  = binary_gt sym_equal

binary_assign "Assignment"
  = sym_equal

binary_equal "Equal"
  = binary_assign binary_assign

binary_notequal "Not Equal"
  = ( sym_excl binary_equal )
  / ( binary_lt binary_gt )

select_parts_core
  = SELECT ( DISTINCT / ALL )? select_target
  ( FROM select_source )?
  ( WHERE expression )?
  ( GROUP BY expression ( HAVING expression )? )?

select_target
  = select_node ( sym_comma select_node )*

select_node
  = ( ( name_table sym_dot )? select_star )
  / ( expression ( alias )? )

select_source
  = select_source_loop
  / select_join_loop

select_source_loop
  = table_or_sub ( sym_comma table_or_sub )*

table_or_sub
  = ( ( id_table ( alias )? ) ( table_or_sub_index )? )
  / ( sym_popen ( select_source_loop / select_join_loop ) sym_pclose )

table_or_sub_index
  = ( INDEXED BY name_index )
  / ( NOT INDEXED )

alias
  = AS name

select_join_loop
  = table_or_sub ( select_join_clause )*

select_join_clause
  = join_operator table_or_sub ( join_condition )?

join_operator
  = ( NATURAL )? ( ( LEFT ( OUTER )? ) / INNER / CROSS )? JOIN

join_condition
  = ( ON expression )
  / ( USING name_column ( sym_comma name_column )* )

select_parts_values
  = VALUES sym_popen expression_list sym_pclose

select_order
  = expression ( COLLATE id_collation )? (ASC / DESC)?

select_star "All Columns"
  = sym_star

id_database
  = name_database

id_table
  = ( id_database sym_dot )? name_table

id_column
  = ( id_table sym_dot )? name_column

id_collation
  = name_collation

/* TODO: FIX all name_* symbols */
name_database "Database Name"
  = name

name_table "Table Name"
  = name

name_column "Column Name"
  = name

name_collation "Collation Name"
  = name

name_index "Index Name"
  = name

name_function "Function Name"
  = name

name_type "Type Name"
  = name

/** {@link https://www.sqlite.org/lang_insert.html} */
stmt_insert "INSERT Statement"
  = ( ( INSERT ( OR ( REPLACE / ROLLBACK / ABORT / FAIL / IGNORE ) )? ) / REPLACE )
  ( INTO ( id_table ) ( sym_popen name_column ( sym_comma name_column )* sym_pclose )? )
  insert_parts

/* TODO: LEFT OFF HERE */
insert_parts
  = ( VALUES sym_popen expression_list sym_pclose)
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

/* Naming rules */

/* TODO: Replace me! */
name_char
  = [a-z0-9\-\_]i

name
  = name_bracketed
  / name_backticked
  / name_dblquoted
  / name_unquoted

name_unquoted
  = n:( ( name_char+ ) ! reserved_words )
  { return _u.textNode(n); }

/** @note Non-standard legacy format */
name_bracketed
  = sym_bopen o n:( name_unquoted ) o sym_bclose
  { return n; }

name_dblquoted
  = sym_dblquote n:( !sym_dblquote name_char )+ sym_dblquote
  { return _u.textNode(n); }

/** @note Non-standard legacy format */
name_backticked
  = sym_backtick n:( !sym_backtick name_char ) sym_backtick
  { return _u.textNode(n); }

/* Symbols */

sym_bopen "Open Bracket"
  = "[" o
sym_bclose "Close Bracket"
  = "]" o
sym_popen "Open Parenthesis"
  = "(" o
sym_pclose "Close Parenthesis"
  = ")" o
sym_comma "Comma"
  = "," o
sym_dot "Period"
  = "." o
sym_star "Asterisk"
  = "*" o
sym_quest "Question Mark"
  = "?" o
sym_sglquote "Single Quote"
  = "'" o
sym_dblquote "Double Quote"
  = '"' o
sym_backtick "Backtick"
  = "`" o
sym_tilde "Tilde"
  = "~" o
sym_plus "Plus"
  = "+" o
sym_minus "Minus"
  = "-" o
sym_equal "Equal"
  = "=" o
sym_amp "Ampersand"
  = "&" o
sym_pipe "Pipe"
  = "|" o
sym_mod "Modulo"
  = "%" o
sym_lt "Less Than"
  = "<" o
sym_gt "Greater Than"
  = ">" o
sym_excl "Exclamation"
  = "!" o

/* Keywords */

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

reserved_words
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

/* Generic rules */

any "Anything"
  = .

o "Optional Whitespace"
  = _*

e "Enforced Whitespace"
  = _+

_ "Whitespace"
  = [ \f\n\r\t\v]

/* TODO: Everything with this symbol */
_TODO_
  = "TODO" e
