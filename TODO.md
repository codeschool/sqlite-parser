# Milestones for sqlite-parser

## **[1.0.0]** In progress

- [ ] Missing specs

- [ ] Expression grouping issues
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

- [ ] Remove `modifier` key from all parts of AST and standardize as `conditions`

- [x] Create `INDEX`
  - [x] *Has spec*
- [x] Create `TRIGGER`
  - [x] *Has spec*
- [ ] Create `VIEW`
  - [ ] *Has spec*
- [ ] Create `VIRTUAL` table
  - [ ] *Has spec*

## **[0.1.0]** Finished (needs tests)
- [x] `SELECT` **TODO: Need tests**
  - [x] Sub-queries

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
  - [x] Compound queries

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
    - [x] `LIMIT`
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
- [x] `CREATE`
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
  - [x] Create table `AS SELECT`
    - [ ] *Has spec*
- [x] `ALTER TABLE` **TODO: Need tests**
  - [ ] *Has spec*
- [x] Transaction statement types **TODO: Need tests**

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
    - [ ] *Has spec*
- [x] Query plan `EXPLAIN QUERY PLAN stmt` **TODO: Need tests**
  - [ ] *Has spec*
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

  - [ ] *Has spec*

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
  - [x] Unary

    ``` sql
    SELECT NOT bees AS [b]
    FROM hats
    ```

    - [ ] *Has spec*
  - [x] `RAISE`

    ``` sql
    RAISE (ROLLBACK, 'hey there!')
    ```

    - [ ] *Has spec*
  - [x] `COLLATE`

    ``` sql
    bees COLLATE bees_collation
    ```

    - [ ] *Has spec*
  - [x] `LIKE`

    ``` sql
    SELECT *
    FROM hats
    WHERE bees LIKE '%somebees%'
    ```

    - [ ] *Has spec*
  - [x] `ESCAPE`

    ``` sql
    SELECT bees NOT LIKE '%hive' ESCAPE hat > 1
    FROM hats
    ```

    - [ ] *Has spec*
  - [x] Binary `IS`, `IS NOT`

    ``` sql
    SELECT *
    FROM hats
    WHERE ham IS NOT NULL
    ```

    - [ ] *Has spec*
  - [x] `BETWEEN`

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
  - [x] Binary operation

    ``` sql
    SELECT *
    FROM hats
    WHERE 2 != 3
    ```

    - [ ] *Has spec*
  - [x] Functions

    ``` sql
    SELECT MYFUNC(col, 1.2, 'str')
    ```
    - [ ] *Has spec*
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
- [x] Literals
  - [x] `'string'`
      - [ ] *Has spec*
  - [x] Decimal, Hex, Exponent `12`, `1.2`, `1E-9`, `0xe1e3`
      - [ ] *Has spec*
  - [x] Signed number `-2.001`
      - [ ] *Has spec*
- [x] Bind parameters
  - [x] Numbered `?`, `?12`
      - [ ] *Has spec*
  - [x] Named `@bees`
      - [ ] *Has spec*
  - [x] TCL `$hey "Hey There"`
      - [ ] *Has spec*
- [x] BLOB `X'stuff'`
    - [ ] *Has spec*
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
    - [x] Constraint versus Clause versus Condition (Table Constraint, Column Constraint, etc...)
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


- [ ] PostgreSQL datatypes **probably should make this a plugin or fork since it is not SQLite**

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
  | timestamp [ (p) ]           | timestamptz	       |
  | tsquery                     |                    |
  | tsvector                    |                    |
  | txid_snapshot	              |                    |
  | uuid                        |                    |
  | xml                         |                    |
