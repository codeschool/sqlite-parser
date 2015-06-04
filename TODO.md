# Milestones for sql-query-parser

- [ ] **[0.1.0]** In progress
  - [x] `SELECT`
    - [ ] Sub-queries `SELECT * FROM (SELECT * FROM b)`
    - [x] Functions, aggregation, etc... `SELECT COUNT(*) FROM apples`
    - [ ] Compound queries `SELECT * FROM a UNION SELECT * FROM b`
    - [x] Aliases `SELECT * FROM apples AS a`
    - [ ] `JOIN` types `INNER`, `OUTER`, `LEFT`
    - [x] Query modifiers `WHERE`, `GROUP BY`, `HAVING`
      - [x] `WHERE`
      - [x] `FROM`
      - [x] `ORDER BY`
      - [x] `GROUP BY`
      - [x] `HAVING`
  - [ ] `INSERT`
  - [ ] `UPDATE`
  - [ ] `DELETE`
  - [ ] `DROP`
  - [ ] `CREATE`
  - [ ] Expressions `1 != 2`, `CAST banana AS INT`
    - Need to fix the grouping of expressions to allow for expressions to be logically organized.
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
