-- original: mallocA.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a COLLATE NOCASE,b,c);
  INSERT INTO t1 VALUES(1,2,3);
  INSERT INTO t1 VALUES(1,2,4);
  INSERT INTO t1 VALUES(2,3,4);
  CREATE INDEX t1i1 ON t1(a);
  CREATE INDEX t1i2 ON t1(b,c);
  CREATE TABLE t2(x,y,z)
;CREATE TABLE t1(a, b);
  CREATE INDEX i1 ON t1(a, b);
  INSERT INTO t1 VALUES('abc', 'w'); -- rowid=1
  INSERT INTO t1 VALUES('abc', 'x'); -- rowid=2
  INSERT INTO t1 VALUES('abc', 'y'); -- rowid=3
  INSERT INTO t1 VALUES('abc', 'z'); -- rowid=4

  INSERT INTO t1 VALUES('def', 'w'); -- rowid=5
  INSERT INTO t1 VALUES('def', 'x'); -- rowid=6
  INSERT INTO t1 VALUES('def', 'y'); -- rowid=7
  INSERT INTO t1 VALUES('def', 'z'); -- rowid=8

  ANALYZE
;SELECT rowid FROM t1 WHERE a='abc' AND b='x'
;SELECT rowid FROM t1 WHERE a='abc' AND b<'y'
;PRAGMA writable_schema = 1;
      CREATE TABLE sqlite_stat4 AS 
      SELECT tbl, idx, neq, nlt, ndlt, sqlite_record(sample) AS sample 
      FROM sqlite_stat3
;ANALYZE sqlite_master;
      SELECT rowid FROM t1 WHERE a='abc' AND b<'y'
;PRAGMA cache_size = 5
;WITH r(x,y) AS (
      SELECT 1, randomblob(100)
      UNION ALL
      SELECT x+1, randomblob(100) FROM r
      LIMIT 1000
    )
    SELECT count(x), length(y) FROM r GROUP BY (x%5);