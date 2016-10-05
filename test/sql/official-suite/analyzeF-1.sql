-- original: analyzeF.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(x INTEGER, y INTEGER);
  WITH data(i) AS (
    SELECT 1 UNION ALL SELECT i+1 FROM data
  )
  INSERT INTO t1 SELECT isqrt(i), isqrt(i) FROM data LIMIT 400;
  CREATE INDEX t1x ON t1(x);
  CREATE INDEX t1y ON t1(y);
  ANALYZE
;DELETE FROM t1;