-- original: rollback2.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT int2hex(0), int2hex(100), int2hex(255)
;CREATE TABLE t1(i, h);
  CREATE INDEX i1 ON t1(h);
  WITH data(a, b) AS (
    SELECT 1, int2hex(1)
      UNION ALL
    SELECT a+1, int2hex(a+1) FROM data WHERE a<40
  )
  INSERT INTO t1 SELECT * FROM data
;SELECT i FROM t1 WHERE (i%2)==0 ORDER BY h DESC
;UPDATE t1 SET h = sub_leader || h
;SELECT i FROM t1 WHERE (i%2)==0 ORDER BY h ASC;