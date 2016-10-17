# Milestones for sqlite-parser

## **[1.0.0]** In progress
- [x] **[In Progress]** Finish standardizing AST format across all types of statements
  - [x] `ORDER BY`
  - [x] `LIMIT`
  - [x] `name` property across node types
- [x] **[In Progress]** Organize tests and SQL test queries by type and split out into different files/directories.

## **[0.10.0]** Finished

- [x] Set proper rules for identifier names, e.g.: `[a-z0-9\_\-]+`

- [x] Interactive demo editor showing SQL and corresponding AST

- [x] Missing specs
  - [x] Basic Drop Table
  - [x] Basic Drop Trigger
  - [x] Basic Function  
  - [x] Basic Subquery  
  - [x] Basic Union  
  - [x] Create Check 1
  - [x] Create Check 2
  - [x] Create Foreign Key 1
  - [x] Create Foreign Key 2
  - [x] Create Primary Key 1
  - [x] Create Table Alt Syntax
  - [x] Expression Like  
  - [x] Expression Table 1
  - [x] Expression Unary 1
  - [x] Function Mixed Args
  - [x] Insert Into Default
  - [x] Join Types 1
  - [x] Join Types 2
  - [x] Select Parts 1
  - [x] Select Qualified Table 1
  - [x] Transaction Rollback  

- [x] Expression grouping issues
  - [x] Grouping with unary and binary expressions

    ``` sql
    `anger` != null AND NOT `happiness`
    ```

    ``` sql
    `happiness` NOT NULL AND `anger` > 0
    ```

    ``` sql
    `happiness` IS NOT NULL AND `anger` > 0
    ```

    ``` sql
    `happiness` ISNULL AND `anger` >
    ```

    ``` sql
    `anger` > 0 AND `happiness` IS NOT NULL
    ```

    ``` sql
    NOT `happiness` AND `anger` > 0
    ```

    ``` sql
    NOT `happiness` OR ~`ANGER` AND `anger` IS NOT 0
    ```

  - [x] Grouping with parenthesis

    ``` sql
    SELECT *
    FROM hats
    WHERE
      (1 != 2 OR 3 != 4) AND ( 3 == 3 )
    ```

    ``` sql
    SELECT *
    FROM hats
    WHERE
      hat OR (shirt AND (shoes OR wig) AND pants)
    ```

- [x] Remove `modifier` key from all parts of AST and standardize as `conditions`

- [x] Create `INDEX`
  - [x] *Has spec*
- [x] Create `TRIGGER`
  - [x] *Has spec*
- [x] Create `VIEW`
  - [x] *Has spec*
- [x] Create `VIRTUAL` table
  - [x] *Has spec*
  - [x] This currently only works with expression arguments and does not support passing column definitions and/or table constraint definitions as is allowed in the SQLite spec for virtual table module arguments.
    - **FIXED: fixed by checking for a column name followed by a type definition or column constraint before assuming the type is an expression list, if these things are found, then treat the arguments as a set of source definitions as in a creation statement for a table**
    - See: [Virtual Tables](https://www.sqlite.org/lang_createvtab.html)

- [x] Need to display correct error location when there are multiple statements in the input SQL
- [x] `comment` rules should not use `sym_*` rules since you should not be able to put a space between the two symbols at the start and/or end of a comment.

  ```
  SELECT * - - not valid but is being accepted
  ```

## **[0.1.0]** Finished
- [x] `SELECT`
  - [x] Sub-queries

    ``` sql
    SELECT *
    FROM (
      SELECT *
      FROM b
    ) AS z
    ```

    - [x] *Has spec*
  - [x] Functions `SUM()`, aggregation `*`, etc...

    ``` sql
    SELECT COUNT(*)
    FROM apples
    ```

    - [x] *Has spec*
  - [x] Compound queries

    ``` sql
    SELECT *
    FROM a
    UNION
    SELECT *
    FROM b
    ```

      - [x] *Has spec*

  - [x] Alternate syntax

    ``` sql
    VALUES (1, 2, 'hat')
    ORDER BY id DESC
    ```

      - [x] *Has spec*

  - [x] `JOIN` types `INNER`, `OUTER`, `LEFT`
    - [x] Joins on tables and/or sub-queries
      - [x] *Has spec*
    - [x] `USING`

      ``` sql
      SELECT *
      FROM bees
        JOIN inventory AS i USING i.name, i.type
      ```

      - [x] *Has spec*

  - [x] Query modifiers `WHERE`, `GROUP BY`, `HAVING`
    - [x] `WHERE`
      - [x] *Has spec*
    - [x] `FROM`
      - [x] *Has spec*
    - [x] `ORDER BY`
      - [x] *Has spec*
    - [x] `GROUP BY`
      - [x] *Has spec*
    - [x] `HAVING`  
      - [x] *Has spec*
    - [x] `LIMIT`
      - [x] *Has spec*
- [x] `INSERT`
  - [x] Basic

    ``` sql
    INSERT INTO bees (a, b, c)
    VALUES (1, 2, 'hey'), (2, 3, 'yo')
    ```

    - [x] *Has spec*
  - [x] Default values

    ``` sql
    INSERT INTO apples (a, b, c)
    DEFAULT VALUES
    ```

    - [x] *Has spec*
  - [x] Insert into select

    ``` sql
    INSERT INTO apples (a, b, c)
    SELECT * FROM apples
    ```

    - [x] *Has spec*
- [x] `UPDATE`
  - [x] Basic format
    - [x] *Has spec*
  - [x] Limit update format
    - [x] *Has spec*
- [x] `DELETE`
  - [x] Basic format
    - [x] *Has spec*
  - [x] Limit update format
    - [x] *Has spec*
- [x] `DROP`
    - [x] *Has spec*
- [x] `CREATE`
  - [x] Table format
    - [x] Basic format
      - [x] *Has spec*
      - [x] Table constraints
        - [x] `PRIMARY KEY`
          - [x] *Has spec*
        - [x] `CHECK`
          - [x] *Has spec*
        - [x] `FOREIGN KEY`
          - [x] *Has spec*
      - [x] Column constraints
        - [x] `PRIMARY KEY`
          - [x] *Has spec*  
        - [x] `NOT NULL`, `UNIQUE`
          - [x] *Has spec*  
        - [x] `CHECK`
          - [x] *Has spec*  
        - [x] `DEFAULT`
          - [x] *Has spec*  
        - [x] `COLLATE`
          - [x] *Has spec*  
        - [x] `FOREIGN KEY`
          - [x] *Has spec*  
  - [x] Create table `AS SELECT`
    - [x] *Has spec*
- [x] `ALTER TABLE`
  - [x] *Has spec*
- [x] Transaction statement types

  ``` sql
  BEGIN IMMEDIATE TRANSACTION
  CREATE TABLE foods (
    id int PRIMARY KEY,
    item varchar(50),
    size varchar(15),
    price int
  );

  INSERT INTO foods (item, size, id, price)
    SELECT 'banana', size, null, price
    FROM bananas
    WHERE color != 'red'

  COMMIT
  ```

  - [x] `BEGIN`
    - [x] *Has spec*
  - [x] `COMMIT`, `END`
    - [x] *Has spec*
  - [x] `ROLLBACK`
    - [x] *Has spec*
- [x] Query plan `EXPLAIN QUERY PLAN stmt`
  - [x] *Has spec*
- [x] Multiple queries in batch

  ``` sql
  CREATE TABLE Actors (
    name varchar(50),
    country varchar(50),
    salary integer
  );

  INSERT INTO Actors (name, country, salary) VALUES
    ('Vivien Leigh', 'IN', 150000),
    ('Clark Gable', 'USA', 120000),
    ('Olivia de Havilland', 'Japan', 30000),
    ('Hattie McDaniel', 'USA', 45000);
  ```

  - [x] Full-featured (multiple, related statements) tests *(have: 2)*

- [x] Indexed sources in queries

  ``` sql
  SELECT *
  FROM bees AS b INDEXED BY bees_index
  ```

  - [x] *Has spec*

- [x] Comments
  - [x] Line comments

    ``` sql
    SELECT *
    FROM hats --happy table
    WHERE color = 'black'
    ```

    - [x] *Has spec*
  - [x] Block comments

    ``` sql
    /*
     * This is a /* nested */
     * C-style block comment as allowed
     * in SQL spec
     */
    SELECT *
    FROM hats
    WHERE color = 'black'
    ```

    - [x] *Has spec*

- [x] Aliases `SELECT * FROM apples AS a`
  - [x] `apples AS unquoted_name`
    - [x] *Has spec*
  - [x] `apples no_as`
    - [x] *Has spec*
  - [x] `apples containsWhereKeyword` and `apples AS floatDatatype`
    - [x] *Has spec*
    - [x] **BUG**: Currently, paradoxically working for all keywords everything except `INT`, `INTEGER`, `INT2` but still working for `BIGINT`, `MEDIUMINT`...
      - **FIXED: fixed by changing order of reserved_nodes rule symbols**
    - [x] Do not allow **unquoted** alias as exact match for a keyword or datatype name `apples AS VARCHAR`, `apples AS Join`
  - [x] `apples AS [inBrackets]`
    - [x] *Has spec*
  - [x] ```apples AS `backticks````
    - [x] *Has spec*
  - [x] `apples AS "Double Quoted with Spaces"`
    - [x] *Has spec*
  - [x] **Single-quoted aliases are invalid in most SQL dialects**

    ``` sql
    SELECT hat AS 'The Hat'
    FROM dinosaurs
    ```

- [x] Expressions  
  - [x] `CAST banana AS INT`
    - [x] *Has spec*
  - [x] `CASE`

    ``` sql
    SELECT CASE WHEN apple > 1 THEN 'YES' ELSE 'NO' END
    FROM apples
    ```

    - [x] *Has spec*
  - [x] Binary `IN`

    ``` sql  
    SELECT *
    FROM hats
    WHERE bees NOT IN (SELECT * FROM apples)
    ```

    - [x] *Has spec*
  - [x] Unary

    ``` sql
    SELECT NOT bees AS [b]
    FROM hats
    ```

    - [x] *Has spec*
  - [x] `RAISE`

    ``` sql
    RAISE (ROLLBACK, 'hey there!')
    ```

    - [x] *Has spec*
  - [x] `COLLATE`

    ``` sql
    bees COLLATE bees_collation
    ```

    - [x] *Has spec*
  - [x] `LIKE`

    ``` sql
    SELECT *
    FROM hats
    WHERE bees LIKE '%somebees%'
    ```

    - [x] *Has spec*
  - [x] `ESCAPE`

    ``` sql
    SELECT bees NOT LIKE '%hive' ESCAPE hat > 1
    FROM hats
    ```

    - [x] *Has spec*
  - [x] Binary `IS`, `IS NOT`

    ``` sql
    SELECT *
    FROM hats
    WHERE ham IS NOT NULL
    ```

    - [x] *Has spec*
  - [x] `BETWEEN`

    ``` sql
    SELECT *
    FROM hats
    WHERE x BETWEEN 2 AND 3
    ```

    - [x] *Has spec*
  - [x] Expression lists

    ``` sql
    SELECT expr1, expr2, expr3
    FROM hats
    ```

    - [x] *Has spec*
  - [x] Binary operation

    ``` sql
    SELECT *
    FROM hats
    WHERE 2 != 3
    ```

    - [x] *Has spec*
  - [x] Functions

    ``` sql
    SELECT MYFUNC(col, 1.2, 'str')
    ```
    - [x] *Has spec*
  - [x] Table expressions

    ``` sql
    WITH ham AS (
      SELECT type
      FROM hams
    )
    SELECT *
    FROM inventory
      INNER JOIN ham
        ON inventory.variety = ham.type
    ```

      - [x] *Has spec*
  - [x] Logical grouping `1 == 2 AND 2 == 3`
    - [x] *Has spec*
    - [x] **BUG**: Need to fix the grouping of expressions to allow for expressions to be logically organized.
      - Example:

        ``` sql
        SELECT *
        FROM bees
        WHERE 1 < 2 AND 3 < 4
        ```

        > ```
        >
        >           AND                            <
        >       /         \         versus     /       \
        >      <           <                  1        AND
        >   /     \     /     \                      /     \
        >  1       2   3       4                    2       <
        >                                                /     \
        >                                               3       4
        > ```

      - **FIXED: now grouping correctly when using binary AND / OR**
- [x] Literals
  - [x] `'string'`
  - [x] Decimal, Hex, Exponent `12`, `1.2`, `1E-9`, `0xe1e3`
  - [x] Signed number `-2.001`
- [x] Bind parameters
  - [x] Numbered `?`, `?12`
  - [x] Named `@bees`
  - [x] TCL `$hey "Hey There"`
- [x] BLOB `X'stuff'`
- AST
  - [x] Initial AST Format

    ``` json
    {
      "statement": [
        {
          "type": "statement",
          "variant": "select"
        },
        {
          "type": "statement",
          "variant": "create"
        }
      ]
    }
    ```

  - [x] **BUG: AST should output normalized (lowercased) values for case-insentive data (e.g.: datatypes, keywords, etc...)**
  - [x] **ISSUE:** Need to normalize format across all statement types (e.g.: `CREATE TABLE`, `SELECT`)
    - [x] Normalize `CREATE`, `SELECT`, `INSERT`, `UPDATE`, `DROP`, `DELETE`
    - [x] Constraint versus Clause versus Condition (Table Constraint, Column Constraint, etc...)
- [x] Datatypes
  - [x] SQLite

    | Expression                  | Resulting Affinity |
    |:--------------------------- | ------------------:|
    | INT                         | INTEGER            |
    | INTEGER                     | INTEGER            |
    | TINYINT                     | INTEGER            |
    | SMALLINT                    | INTEGER            |
    | MEDIUMINT                   | INTEGER            |
    | BIGINT                      | INTEGER            |
    | UNSIGNED BIG                | INTEGER            |
    | INT2                        | INTEGER            |
    | INT8	                      | INTEGER            |
    | CHARACTER(20)               | TEXT               |
    | VARCHAR(255)                | TEXT               |
    | VARYING CHARACTER(255)      | TEXT               |
    | NCHAR(55)                   | TEXT               |
    | NATIVE CHARACTER(70)        | TEXT               |
    | NVARCHAR(100)               | TEXT               |
    | TEXT                        | TEXT               |
    | CLOB	                      | TEXT               |
    | BLOB                        | NONE               |
    | no datatype specified	      | NONE               |
    | REAL                        | REAL               |
    | DOUBLE                      | REAL               |
    | DOUBLE PRECISION            | REAL               |
    | FLOAT	                      | REAL               |
    | NUMERIC                     | NUMERIC            |
    | DECIMAL(10,5)               | NUMERIC            |
    | BOOLEAN                     | NUMERIC            |
    | DATE                        | NUMERIC            |
    | DATETIME	                  | NUMERIC            |
