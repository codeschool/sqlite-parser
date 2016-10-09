-- original: tabfunc01.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT *, '|' FROM generate_series WHERE start=1 AND stop=9 AND step=2
;SELECT *, '|' FROM generate_series LIMIT 5
;SELECT * FROM generate_series(1,9,2)
;SELECT * FROM generate_series(1,9)
;SELECT * FROM generate_series(1,10) WHERE step=3
;SELECT * FROM generate_series(0,32,5) ORDER BY rowid DESC
;SELECT rowid, * FROM generate_series(0,32,5) ORDER BY value DESC
;SELECT rowid, * FROM generate_series(0,32,5) ORDER BY +value DESC
;CREATE VIEW v1(a,b) AS VALUES(1,2),(3,4);
  SELECT * FROM v1
;CREATE VIEW v2(x) AS SELECT value FROM generate_series(1,5);
  SELECT * FROM v2
;CREATE TABLE t0(x);
  INSERT INTO t0(x) VALUES(123),(456),(789);
  SELECT * FROM t0 ORDER BY x
;CREATE TABLE t1(x);
  INSERT INTO t1(x) VALUES(2),(3);
  SELECT *, '|' FROM t1, generate_series(1,x) ORDER BY 1, 2
;SELECT *, '|' FROM (SELECT x FROM t1) AS y, generate_series(1,y.x)
  ORDER BY 1, 2
;SELECT * FROM generate_series() LIMIT 5
;SELECT DISTINCT value FROM generate_series(1,x), t1 ORDER BY 1
;SELECT * FROM main.generate_series(1,4);