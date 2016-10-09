-- original: analyze9.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT * FROM t1 WHERE d IS NOT NULL AND a=0 AND b=10 AND c=10
;SELECT * FROM t1 WHERE d IS NOT NULL AND a=0 AND b=0 AND c=10
;CREATE TABLE t1(a, b);
    CREATE INDEX i1 ON t1(a, b)
;INSERT INTO t1 VALUES(sub_i, 0);
      INSERT INTO t1 VALUES(sub_i, 0);
      INSERT INTO t1 VALUES(sub_i, 0);
      INSERT INTO t1 VALUES(sub_i, 0);
      INSERT INTO t1 VALUES(sub_i, 0);
      INSERT INTO t1 VALUES(sub_i, 0);
      INSERT INTO t1 VALUES(sub_i, 0);
      INSERT INTO t1 VALUES(sub_i, 0);
      INSERT INTO t1 VALUES(sub_i, 0);
      INSERT INTO t1 VALUES(sub_i, 0);
      INSERT INTO t1 VALUES(sub_i, 0);
      INSERT INTO t1 VALUES(sub_i, 0);
      INSERT INTO t1 VALUES(sub_i, 0);
      INSERT INTO t1 VALUES(sub_i, 0);
      INSERT INTO t1 VALUES(sub_i, 0)
;SELECT count(*) FROM sqlite_stat4
;CREATE TABLE t1(x, y);
      CREATE INDEX i1 ON t1(x, y);
      CREATE VIEW v1 AS SELECT * FROM t1;
      ANALYZE
;CREATE TABLE t1(x, y);
      CREATE VIEW v1 AS SELECT * FROM t1
;CREATE TABLE t1(a,b,c,d);
    CREATE INDEX i1 ON t1(a,b,c,d)
;INSERT INTO t1 VALUES(sub_i, r(), r(), r());
      INSERT INTO t1 VALUES(sub_i, sub_i,  r(), r());
      INSERT INTO t1 VALUES(sub_i, sub_i,  sub_i,  r());
      INSERT INTO t1 VALUES(sub_i, sub_i,  sub_i,  sub_i);
      INSERT INTO t1 VALUES(sub_i, sub_i,  sub_i,  sub_i);
      INSERT INTO t1 VALUES(sub_i, sub_i,  sub_i,  r());
      INSERT INTO t1 VALUES(sub_i, sub_i,  r(), r());
      INSERT INTO t1 VALUES(sub_i, r(), r(), r())
;ANALYZE
;CREATE TABLE t2(a, b);
  CREATE INDEX i2 ON t2(a)
;INSERT INTO t2 VALUES(CASE WHEN sub_i < 80 THEN 'one' ELSE 'two' END, sub_i)
;SELECT * FROM t2 WHERE a='one' AND rowid < 10
;SELECT * FROM t2 WHERE a='one' AND rowid < 50
;CREATE TABLE t3(a, b, c, d, PRIMARY KEY(a, b)) WITHOUT ROWID
;WITH r(x) AS (
    SELECT 1
    UNION ALL
    SELECT x+1 FROM r WHERE x<=100
  )

  INSERT INTO t3 SELECT
    CASE WHEN (x>45 AND x<96) THEN 'B' ELSE 'A' END,  /* Column "a" */
    x,                                                /* Column "b" */
    CASE WHEN (x<51) THEN 'one' ELSE 'two' END,       /* Column "c" */
    x                                                 /* Column "d" */
  FROM r;

  CREATE INDEX i3 ON t3(c);
  CREATE INDEX i4 ON t3(d);
  ANALYZE
;CREATE TABLE t4(
    a COLLATE nocase, b, c, 
    d, e, f, 
    PRIMARY KEY(c, b, a)
  ) WITHOUT ROWID;
  CREATE INDEX i41 ON t4(e);
  CREATE INDEX i42 ON t4(f);

  WITH data(a, b, c, d, e, f) AS (
    SELECT int_to_char(0), 'xyz', 'zyx', '*', 0, 0
    UNION ALL
    SELECT 
      int_to_char(f+1), b, c, d, (e+1) % 2, f+1
    FROM data WHERE f<1024
  )
  INSERT INTO t4 SELECT a, b, c, d, e, f FROM data;
  ANALYZE
;SELECT * FROM t4 WHERE 
    (e=1 AND b='xyz' AND c='zyx' AND a<'AEA') AND f<300
;SELECT * FROM t4 WHERE 
    (e=1 AND b='xyz' AND c='zyx' AND a<'JJJ') AND f<300
;CREATE TABLE t5(c, d, b, e, a, PRIMARY KEY(a, b, c)) WITHOUT ROWID;
  WITH data(a, b, c, d, e) AS (
    SELECT 'z', 'y', 0, 0, 0
    UNION ALL
    SELECT 
      a, CASE WHEN b='y' THEN 'n' ELSE 'y' END, c+1, e/250, e+1 
    FROM data
    WHERE e<1000
  )
  INSERT INTO t5(a, b, c, d, e) SELECT * FROM data;
  CREATE INDEX t5d ON t5(d);
  CREATE INDEX t5e ON t5(e);
  ANALYZE
;CREATE TABLE t6(a, b);
    WITH ints(i,j) AS (
      SELECT 1,1 UNION ALL SELECT i+1,j+1 FROM ints WHERE i<100
    ) INSERT INTO t6 SELECT * FROM ints;
    CREATE INDEX aa ON t6(a);
    CREATE INDEX bb ON t6(b);
    ANALYZE
;SELECT * FROM t6 WHERE a<30 AND b<?
;SELECT * FROM t6 WHERE a<20 AND b<?
;SELECT * FROM t6 WHERE a BETWEEN 5 AND 10 AND b BETWEEN ? AND ?
;SELECT * FROM t6 WHERE a < 10 AND (b BETWEEN ? AND 60)
;SELECT * FROM t6 WHERE a < 20 AND (b BETWEEN ? AND 60)
;CREATE TABLE t1(x, y, z);
      CREATE INDEX t1xy ON t1(x, y);
      CREATE INDEX t1z ON t1(z)
;INSERT INTO t1(x, y) VALUES(sub_i, sub_i)
;WITH cnt(x) AS (SELECT 1 UNION ALL SELECT x+1 FROM cnt WHERE x<100)
        INSERT INTO t1(x, y) SELECT 10000+sub_i, x FROM cnt;
        INSERT INTO t1(x, y) SELECT 10000+sub_i, 100
;UPDATE t1 SET z = rowid / 20;
      ANALYZE
;SELECT count(*) FROM t1 WHERE x = 10000 AND y < 50
;SELECT count(*) FROM t1 WHERE z = 444
;SELECT * FROM t1 WHERE x = 10000 AND y < 50 AND z = 444
;BEGIN;
    CREATE TABLE t1(x, y, z);
    CREATE INDEX i1 ON t1(x, y);
    CREATE INDEX i2 ON t1(z);
  
    WITH 
    cnt(y) AS (SELECT 0 UNION ALL SELECT y+1 FROM cnt WHERE y<99),
    letters(x) AS (
      SELECT 'A' UNION SELECT 'B' UNION SELECT 'C' UNION SELECT 'D'
    )
    INSERT INTO t1(x, y) SELECT x, y FROM letters, cnt;
  
    WITH
    letters(x) AS (
      SELECT 'A' UNION SELECT 'B' UNION SELECT 'C' UNION SELECT 'D'
    )
    INSERT INTO t1(x, y) SELECT x, 70 FROM letters;
  
    WITH
    cnt(i) AS (SELECT 0 UNION ALL SELECT i+1 FROM cnt WHERE i<9999)
    INSERT INTO t1(x, y) SELECT i, i FROM cnt;
  
    UPDATE t1 SET z = (rowid / 95);
    ANALYZE;
  COMMIT
;SELECT * FROM t1 WHERE x='B' AND y>25 AND z=?;