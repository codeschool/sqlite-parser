-- original: analyze3.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

BEGIN;
    CREATE TABLE t1(x INTEGER, y);
    CREATE INDEX i1 ON t1(x)
;INSERT INTO t1 VALUES(sub_i+100, sub_i)
;COMMIT;
    ANALYZE
;SELECT count(*)>0 FROM sqlite_stat4
;SELECT count(*)>0 FROM sqlite_stat3
;SELECT count(*) FROM t1 WHERE x>200 AND x<300;
  SELECT count(*) FROM t1 WHERE x>0 AND x<1100
;SELECT sum(y) FROM t1 WHERE x>200 AND x<300
;SELECT sum(y) FROM t1 WHERE x>0 AND x<1100
;SELECT sum(y) FROM t1 WHERE x>200 AND x<300
;SELECT sum(y) FROM t1 WHERE x>sub_l AND x<sub_u
;SELECT sum(y) FROM t1 WHERE x>sub_l AND x<sub_u
;SELECT sum(y) FROM t1 WHERE x>0 AND x<1100
;SELECT sum(y) FROM t1 WHERE x>sub_l AND x<sub_u
;SELECT sum(y) FROM t1 WHERE x>sub_l AND x<sub_u
;BEGIN;
      CREATE TABLE t2(x TEXT, y);
      INSERT INTO t2 SELECT * FROM t1;
      CREATE INDEX i2 ON t2(x);
    COMMIT;
    ANALYZE
;SELECT count(*) FROM t2 WHERE x>1 AND x<2;
  SELECT count(*) FROM t2 WHERE x>0 AND x<99
;SELECT sum(y) FROM t2 WHERE x>1 AND x<2
;SELECT sum(y) FROM t2 WHERE x>0 AND x<99
;SELECT sum(y) FROM t2 WHERE x>12 AND x<20
;SELECT typeof(sub_l), typeof(sub_u), sum(y) FROM t2 WHERE x>sub_l AND x<sub_u
;SELECT typeof(sub_l), typeof(sub_u), sum(y) FROM t2 WHERE x>sub_l AND x<sub_u
;SELECT sum(y) FROM t2 WHERE x>0 AND x<99
;SELECT typeof(sub_l), typeof(sub_u), sum(y) FROM t2 WHERE x>sub_l AND x<sub_u
;SELECT typeof(sub_l), typeof(sub_u), sum(y) FROM t2 WHERE x>sub_l AND x<sub_u
;BEGIN;
      CREATE TABLE t3(y TEXT, x INTEGER);
      INSERT INTO t3 SELECT y, x FROM t1;
      CREATE INDEX i3 ON t3(x);
    COMMIT;
    ANALYZE
;SELECT count(*) FROM t3 WHERE x>200 AND x<300;
  SELECT count(*) FROM t3 WHERE x>0 AND x<1100
;SELECT sum(y) FROM t3 WHERE x>200 AND x<300
;SELECT sum(y) FROM t3 WHERE x>0 AND x<1100
;SELECT sum(y) FROM t3 WHERE x>200 AND x<300
;SELECT sum(y) FROM t3 WHERE x>sub_l AND x<sub_u
;SELECT sum(y) FROM t3 WHERE x>sub_l AND x<sub_u
;SELECT sum(y) FROM t3 WHERE x>0 AND x<1100
;SELECT sum(y) FROM t3 WHERE x>sub_l AND x<sub_u
;SELECT sum(y) FROM t3 WHERE x>sub_l AND x<sub_u
;PRAGMA case_sensitive_like=off;
    BEGIN;
    CREATE TABLE t1(a, b TEXT COLLATE nocase);
    CREATE INDEX i1 ON t1(b)
;INSERT INTO t1 VALUES(sub_i, sub_t)
;SELECT count(a) FROM t1 WHERE b LIKE 'a%'
;SELECT count(a) FROM t1 WHERE b LIKE '%a'
;SELECT count(*) FROM t1 WHERE b LIKE 'a%'
;SELECT count(*) FROM t1 WHERE b LIKE '%a'
;SELECT count(*) FROM t1 WHERE b LIKE sub_like
;SELECT count(*) FROM t1 WHERE b LIKE sub_like
;SELECT count(*) FROM t1 WHERE b LIKE sub_like
;SELECT count(*) FROM t1 WHERE b LIKE sub_like
;SELECT count(*) FROM t1 WHERE b LIKE sub_like
;SELECT count(*) FROM t1 WHERE b LIKE sub_like
;BEGIN;
    CREATE TABLE t1(a, b, c);
    CREATE INDEX i1 ON t1(b)
;INSERT INTO t1 VALUES(sub_i, sub_i, sub_i)
;CREATE TABLE t4(x, y TEXT COLLATE NOCASE);
    CREATE INDEX i4 ON t4(y)
;DROP TABLE t1
;BEGIN;
    CREATE TABLE t1(a, b, c);
    CREATE INDEX i1 ON t1(b)
;INSERT INTO t1 VALUES(sub_i, sub_i, sub_i)
;CREATE TABLE t2(d, e, f)
;CREATE TABLE t1(x TEXT COLLATE NOCASE);
    CREATE INDEX i1 ON t1(x);
    INSERT INTO t1 VALUES('aaa');
    INSERT INTO t1 VALUES('abb');
    INSERT INTO t1 VALUES('acc');
    INSERT INTO t1 VALUES('baa');
    INSERT INTO t1 VALUES('bbb');
    INSERT INTO t1 VALUES('bcc')
;DROP TABLE IF EXISTS t1
;CREATE TABLE t1(a, b, c)
;CREATE INDEX i1 ON t1(a, b);
    CREATE INDEX i2 ON t1(c)
;SELECT * FROM t1 WHERE a = 5 AND c = 13
;SELECT * FROM t1 WHERE a = 5 AND b > 'w' AND c = 13
;DROP TABLE IF EXISTS t1;
  CREATE TABLE t1(a INTEGER PRIMARY KEY, b, c);
  INSERT INTO t1 VALUES(1,1,'0000');
  CREATE INDEX t0b ON t1(b);
  ANALYZE;
  SELECT c FROM t1 WHERE b=3 AND a BETWEEN 30 AND hex(1)
;CREATE TABLE t1(a,b,c);
  CREATE INDEX t1a ON t1(a);
  ANALYZE;
  SELECT * FROM sqlite_stat1;
  INSERT INTO sqlite_stat1(tbl,idx,stat) VALUES('t1','t1a','12000');
  INSERT INTO sqlite_stat1(tbl,idx,stat) VALUES('t1','t1a','12000');
  ANALYZE sqlite_master;