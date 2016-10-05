-- original: orderby9.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

-- create a table with many entries
  CREATE TABLE t1(x);
  WITH RECURSIVE
     c(x) AS (VALUES(1) UNION ALL SELECT x+1 FROM c WHERE x<100)
  INSERT INTO t1 SELECT x FROM c
;SELECT random() AS y FROM t1 ORDER BY 1
;SELECT random() AS y FROM t1 ORDER BY random()
;SELECT random() AS y FROM t1 ORDER BY +random();