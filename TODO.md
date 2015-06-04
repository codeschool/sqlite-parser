# Milestones for sql-query-parser

- [ ] **[0.1.0]** In progress
  - [x] `SELECT`
    - [ ] Sub-queries `SELECT * FROM (SELECT * FROM b)`
    - [x] Functions, aggregation, etc... `SELECT COUNT(*) FROM apples`
    - [ ] Compound queries `SELECT * FROM a UNION SELECT * FROM b`
    - [ ] Aliases `SELECT * FROM apples AS a`
      - [x] `apples AS unquoted_name`
      - [x] `apples no_as`
      - [x] `apples containsWhereKeyword` and `apples AS floatDatatype`
        - [ ] **BUG**: Currently, paradoxically working for all keywords everything except `INT`, `INTEGER`, `INT2` but still working for `BIGINT`, `MEDIUMINT`...
        - [x] Do not allow **unquoted** alias as exact match for a keyword or datatype name `apples AS VARCHAR`, `apples AS Join`
      - [x] `apples AS [inBrackets]`
      - [x] ```apples AS `backticks````
      - [x] `apples AS "Double Quoted with Spaces"`
    - [ ] `JOIN` types `INNER`, `OUTER`, `LEFT`
    - [x] Query modifiers `WHERE`, `GROUP BY`, `HAVING`
      - [x] `WHERE`
      - [x] `FROM`
      - [x] `ORDER BY`
      - [x] `GROUP BY`
      - [x] `HAVING`
  - [x] `INSERT`
    - [x] `INSERT INTO ... VALUES (...), (...)`
    - [x] `INSERT INTO ... DEFAULT VALUES`
    - [x] `INSERT INTO ... SELECT * FROM apples`
  - [ ] `UPDATE`
  - [ ] `DELETE`
  - [ ] `DROP`
  - [ ] `CREATE`
  - [ ] Expressions `1 != 2`, `CAST banana AS INT`
    - **BUG**: Need to fix the grouping of expressions to allow for expressions to be logically organized.
      - Example: `WHERE 1 < 2 AND 3 < 4`

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
