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
