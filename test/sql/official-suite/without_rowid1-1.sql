-- original: without_rowid1.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a,b,c,d, PRIMARY KEY(c,a)) WITHOUT ROWID;
  CREATE INDEX t1bd ON t1(b, d);
  INSERT INTO t1 VALUES('journal','sherman','ammonia','helena');
  INSERT INTO t1 VALUES('dynamic','juliet','flipper','command');
  INSERT INTO t1 VALUES('journal','sherman','gamma','patriot');
  INSERT INTO t1 VALUES('arctic','sleep','ammonia','helena');
  SELECT *, '|' FROM t1 ORDER BY c, a
;SELECT *, '|' FROM t1 ORDER BY +c, a
;SELECT *, '|' FROM t1 ORDER BY c DESC, a DESC
;SELECT *, '|' FROM t1 ORDER BY b, d
;SELECT *, '|' FROM t1 ORDER BY +b, d
;REPLACE INTO t1 VALUES('dynamic','phone','flipper','harvard');
  SELECT *, '|' FROM t1 ORDER BY c, a
;SELECT *, '|' FROM t1 ORDER BY b, d
;UPDATE t1 SET d=3.1415926 WHERE a='journal';
  SELECT *, '|' FROM t1 ORDER BY c, a
;SELECT *, '|' FROM t1 ORDER BY b, d
;UPDATE t1 SET a=1250 WHERE b='phone';
  SELECT *, '|' FROM t1 ORDER BY c, a
;SELECT *, '|' FROM t1 ORDER BY b, d
;VACUUM;
  SELECT *, '|' FROM t1 ORDER BY b, d
;ANALYZE;
  SELECT * FROM sqlite_stat1 ORDER BY idx
;SELECT DISTINCT tbl, idx FROM sqlite_stat3 ORDER BY idx
;SELECT DISTINCT tbl, idx FROM sqlite_stat4 ORDER BY idx
;CREATE TABLE t4 (a COLLATE nocase PRIMARY KEY, b) WITHOUT ROWID;
  INSERT INTO t4 VALUES('abc', 'def');
  SELECT * FROM t4
;UPDATE t4 SET a = 'ABC';
  SELECT * FROM t4
;DROP TABLE t4;
  CREATE TABLE t4 (b, a COLLATE nocase PRIMARY KEY) WITHOUT ROWID;
  INSERT INTO t4(a, b) VALUES('abc', 'def');
  SELECT * FROM t4
;UPDATE t4 SET a = 'ABC', b = 'xyz';
  SELECT * FROM t4
;CREATE TABLE t5 (a, b, PRIMARY KEY(b, a)) WITHOUT ROWID;
  INSERT INTO t5(a, b) VALUES('abc', 'def');
  UPDATE t5 SET a='abc', b='def'
;CREATE TABLE t6 (
    a COLLATE nocase, b, c UNIQUE, PRIMARY KEY(b, a)
  ) WITHOUT ROWID;

  INSERT INTO t6(a, b, c) VALUES('abc', 'def', 'ghi');
  UPDATE t6 SET a='ABC', c='ghi'
;SELECT * FROM t6 ORDER BY b, a;
  SELECT * FROM t6 ORDER BY c
;CREATE TABLE t1(a, b, PRIMARY KEY(a)) WITHOUT ROWID;
  CREATE UNIQUE INDEX i1 ON t1(b);

  CREATE TABLE t2(a, b, PRIMARY KEY(a)) WITHOUT ROWID;
  CREATE UNIQUE INDEX i2 ON t2(b);

  INSERT INTO t1 VALUES('one', 'two');
  INSERT INTO t2 VALUES('three', 'two')
;INSERT OR REPLACE INTO t1 SELECT * FROM t2;
  SELECT * FROM t1
;DELETE FROM t1;
  INSERT INTO t1 SELECT * FROM t2;
  SELECT * FROM t1
;CREATE TABLE t3(a PRIMARY KEY);
  CREATE TABLE t4(a PRIMARY KEY);

  INSERT INTO t4 VALUES('i');
  INSERT INTO t4 VALUES('ii');
  INSERT INTO t4 VALUES('iii');

  INSERT INTO t3 SELECT * FROM t4;
  SELECT * FROM t3
;CREATE TABLE t41(a PRIMARY KEY) WITHOUT ROWID;
  INSERT INTO t41 VALUES('abc');
  CREATE TABLE t42(x);
  INSERT INTO t42 VALUES('xyz');
  SELECT t42.rowid FROM t41, t42
;SELECT t42.rowid FROM t42, t41
;CREATE TABLE t45(a PRIMARY KEY, b, c) WITHOUT ROWID;
  CREATE INDEX i45 ON t45(b);

  INSERT INTO t45 VALUES(2, 'one', 'x');
  INSERT INTO t45 VALUES(4, 'one', 'x');
  INSERT INTO t45 VALUES(6, 'one', 'x');
  INSERT INTO t45 VALUES(8, 'one', 'x');
  INSERT INTO t45 VALUES(10, 'one', 'x');

  INSERT INTO t45 VALUES(1, 'two', 'x');
  INSERT INTO t45 VALUES(3, 'two', 'x');
  INSERT INTO t45 VALUES(5, 'two', 'x');
  INSERT INTO t45 VALUES(7, 'two', 'x');
  INSERT INTO t45 VALUES(9, 'two', 'x')
;SELECT * FROM t45 WHERE b=? AND a>?
;SELECT * FROM t45 WHERE b='two' AND a>4
;SELECT * FROM t45 WHERE b='one' AND a<8
;CREATE TABLE t46(a, b, c, d, PRIMARY KEY(a, b)) WITHOUT ROWID;
  WITH r(x) AS (
    SELECT 1 UNION ALL SELECT x+1 FROM r WHERE x<100
  )
  INSERT INTO t46 SELECT x / 20, x % 20, x % 10, x FROM r
;CREATE INDEX i46 ON t46(c)
;CREATE TABLE t47(a, b UNIQUE PRIMARY KEY) WITHOUT ROWID;
  CREATE INDEX i47 ON t47(a);
  INSERT INTO t47 VALUES(1, 2);
  INSERT INTO t47 VALUES(2, 4);
  INSERT INTO t47 VALUES(3, 6);
  INSERT INTO t47 VALUES(4, 8);

  VACUUM;
  PRAGMA integrity_check;
  SELECT name FROM sqlite_master WHERE tbl_name = 't47'
;CREATE TABLE t48(
    a UNIQUE UNIQUE, 
    b UNIQUE, 
    PRIMARY KEY(a), 
    UNIQUE(a)
  ) WITHOUT ROWID;
  INSERT INTO t48 VALUES('a', 'b'), ('c', 'd'), ('e', 'f');
  VACUUM;
  PRAGMA integrity_check;
  SELECT name FROM sqlite_master WHERE tbl_name = 't48'
;CREATE TABLE t70a(
     a INT CHECK( rowid!=33 ),
     b TEXT PRIMARY KEY
  );
  INSERT INTO t70a(a,b) VALUES(99,'hello');