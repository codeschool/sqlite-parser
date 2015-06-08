# Milestones for sql-query-parser

## **[0.1.0]** In progress
- [x] `SELECT` **TODO: Need tests**
  - [ ] Sub-queries

    ``` sql
    SELECT *
    FROM (
      SELECT *
      FROM b
    ) AS z
    ```

    - [ ] *Has spec*
  - [x] Functions `SUM()`, aggregation `*`, etc...

    ``` sql
    SELECT COUNT(*)
    FROM apples
    ```

    - [ ] *Has spec*
  - [ ] Compound queries

    ``` sql
    SELECT *
    FROM a
    UNION
    SELECT *
    FROM b
    ```

      - [ ] *Has spec*

  - [x] Alternate syntax

    ``` sql
    VALUES (1, 2, 'hat')
    ORDER BY id DESC
    ```

  - [x] `JOIN` types `INNER`, `OUTER`, `LEFT` **TODO: Need tests**
    - [x] Joins on tables and/or sub-queries
      - [ ] *Has spec*
    - [x] `USING`

      ``` sql
      SELECT *
      FROM bees
        JOIN inventory AS i USING i.name, i.type
      ```

      - [ ] *Has spec*

  - [x] Query modifiers `WHERE`, `GROUP BY`, `HAVING` **TODO: Need tests**
    - [x] `WHERE`
      - [ ] *Has spec*
    - [x] `FROM`
      - [ ] *Has spec*
    - [x] `ORDER BY`
      - [ ] *Has spec*
    - [x] `GROUP BY`
      - [ ] *Has spec*
    - [x] `HAVING`  
      - [ ] *Has spec*
    - [ ] `LIMIT`
      - [ ] *Has spec*
- [x] `INSERT` **TODO: Need tests**
  - [x] Basic

    ``` sql
    INSERT INTO bees (a, b, c)
    VALUES (1, 2, 'hey'), (2, 3, 'yo')
    ```

    - [ ] *Has spec*
  - [x] Default values

    ``` sql
    INSERT INTO apples (a, b, c)
    DEFAULT VALUES
    ```

    - [ ] *Has spec*
  - [x] Insert into select

    ``` sql
    INSERT INTO apples (a, b, c)
    SELECT * FROM apples
    ```

    - [ ] *Has spec*
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
    - [ ] *Has spec*
- [ ] `CREATE`
  - [x] Table format
    - [x] Basic format
      - [x] *Has spec*
      - [x] Table constraints **TODO: Need tests**
        - [x] `PRIMARY KEY`
          - [ ] *Has spec*
        - [x] `CHECK`
          - [ ] *Has spec*
        - [x] `FOREIGN KEY`
          - [ ] *Has spec*
      - [x] Column constraints **TODO: Need tests**
        - [x] `PRIMARY KEY`
          - [ ] *Has spec*  
        - [x] `NOT NULL`, `UNIQUE`
          - [ ] *Has spec*  
        - [x] `CHECK`
          - [ ] *Has spec*  
        - [x] `DEFAULT`
          - [ ] *Has spec*  
        - [x] `COLLATE`
          - [ ] *Has spec*  
        - [x] `FOREIGN KEY`
          - [ ] *Has spec*  
  - [ ] Create table `AS SELECT`
    - [ ] *Has spec*
  - [ ] Create `INDEX`
    - [ ] *Has spec*
  - [ ] Create `TRIGGER`
    - [ ] *Has spec*
  - [ ] Create `VIEW`
    - [ ] *Has spec*
  - [ ] Create `VIRTUAL` table
    - [ ] *Has spec*
- [ ] Indexed sources in queries

  ``` sql
  SELECT *
  FROM bees AS b INDEXED BY bees_index
  ```

- [ ] Aliases `SELECT * FROM apples AS a` **TODO: Need tests**
  - [x] `apples AS unquoted_name`
    - [x] *Has spec*
  - [x] `apples no_as`
    - [x] *Has spec*
  - [x] `apples containsWhereKeyword` and `apples AS floatDatatype`
    - [x] *Has spec*
    - [ ] **BUG**: Currently, paradoxically working for all keywords everything except `INT`, `INTEGER`, `INT2` but still working for `BIGINT`, `MEDIUMINT`...
    - [x] Do not allow **unquoted** alias as exact match for a keyword or datatype name `apples AS VARCHAR`, `apples AS Join`
  - [x] `apples AS [inBrackets]`
    - [x] *Has spec*
  - [x] ```apples AS `backticks````
    - [x] *Has spec*
  - [x] `apples AS "Double Quoted with Spaces"`
    - [x] *Has spec*
- [ ] Expressions  **TODO: Need tests**
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
  - [ ] Unary

    ``` sql
    SELECT NOT bees AS [b]
    FROM hats
    ```

    - [ ] *Has spec*
  - [ ] `RAISE`

    ``` sql
    RAISE (ROLLBACK, 'hey there!')
    ```

    - [ ] *Has spec*
  - [ ] `COLLATE`

    ``` sql
    bees COLLATE bees_collation
    ```

    - [ ] *Has spec*
  - [ ] `LIKE`

    ``` sql
    SELECT *
    FROM hats
    WHERE bees LIKE '%somebees%'
    ```

    - [ ] *Has spec*
  - [ ] `ESCAPE`

    ``` sql
    SELECT ESCAPE expr
    FROM hats
    ```

    - [ ] *Has spec*
  - [ ] Binary `IS`, `IS NOT`

    ``` sql
    SELECT *
    FROM hats
    WHERE ham IS NOT NULL
    ```

    - [ ] *Has spec*
  - [ ] `BETWEEN`

    ``` sql
    SELECT *
    FROM hats
    WHERE x BETWEEN 2 AND 3
    ```

    - [ ] *Has spec*
  - [x] Expression lists

    ``` sql
    SELECT expr1, expr2, expr3
    FROM hats
    ```

    - [x] *Has spec*
  - [ ] Binary operation

    ``` sql
    SELECT *
    FROM hats
    WHERE 2 != 3
    ```

    - [ ] *Has spec*
  - [ ] Functions

    ``` sql
    SELECT MYFUNC(col, 1.2, 'str')
    ```
    - [ ] *Has spec*
  - [ ] Table expressions

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

      - [ ] *Has spec*

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
- [ ] Literals
  - [ ] `'string'`
  - [ ] Decimal, Hex, Exponent `12`, `1.2`, `1E-9`, `0xe1e3`
  - [ ] Signed number `-2.001`
- [ ] Bind parameters
  - [ ] Numbered `?`, `?12`
  - [ ] Named `@bees`
  - [ ] TCL `$hey "Hey There"`
- [ ] BLOB `X'stuff'`
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

  - [ ] **BUG: AST should output normalized (lowercased) values for case-insentive data (e.g.: datatypes, keywords, etc...)**
  - [ ] **ISSUE:** Need to normalize format across all statement types (e.g.: `CREATE TABLE`, `SELECT`)
    - [ ] Normalize `CREATE`, `SELECT`, `INSERT`, `UPDATE`, `DROP`, `DELETE`
    - [ ] Constraint versus Clause versus Condition (Table Constraint, Column Constraint, etc...)
- [ ] Datatypes
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

  - [ ] PostgreSQL

    | Name                        | Aliases            |
    |:--------------------------- | ------------------:|
    | bigint                      | int8	             |
    | bigserial	                  | serial8	           |
    | bit [ (n) ]	 	              |                    |
    | bit varying [ (n) ]	        | varbit	           |
    | boolean	                    | bool	             |
    | box	 	                      |                    |
    | bytea	 	                    |                    |
    | character [ (n) ]	          | char [ (n) ]       |
    | character varying [ (n) ]   |	varchar [ (n) ]    |
    | cidr                        |                    |
    | circle                      |                    |
    | date                        |                    |
    | double precision	          | float8             |
    | inet	 	                    |                    |
    | integer	                    | int, int4	         |
    | interval [ fields ] [ (p) ] |                    |
    | json                        |                    |
    | line	 	                    |                    |
    | lseg	                      |                    |
    | macaddr	                    |                    |
    | money	                      |                    |
    | numeric [ (p, s) ]          | decimal [ (p, s) ] |
    | path                        |                    |
    | point                       |                    |
    | polygon	                    |                    |
    | real	                      | float4             |
    | smallint                    | int2               |
    | smallserial	                | serial2            |
    | serial                      | serial4            |
    | text                        |                    |
    | time [ (p) ] 	              | timetz             |
    | timestamp [ (p) ]           | timestamptz	      |
    | tsquery                     |                    |
    | tsvector                    |                    |
    | txid_snapshot	              |                    |
    | uuid                        |                    |
    | xml                         |                    |
