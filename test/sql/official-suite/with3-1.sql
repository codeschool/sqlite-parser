-- original: with3.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

WITH
  x1 AS (SELECT 10),
  x2 AS (SELECT 11),
  x3 AS (
    SELECT * FROM x1 UNION ALL SELECT * FROM x2
  ),
  x4 AS (
    WITH
    x1 AS (SELECT 12),
    x2 AS (SELECT 13)
    SELECT * FROM x3
  )
  SELECT * FROM x4
;CREATE TABLE t1(x);
  WITH
    x1(a) AS (values(100))
  INSERT INTO t1(x)
    SELECT * FROM (WITH x2(y) AS (SELECT * FROM x1) SELECT y+a FROM x1, x2);
  SELECT * FROM t1;