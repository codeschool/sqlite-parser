-- original: corruptI.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA page_size=1024;
  PRAGMA auto_vacuum=0;
  CREATE TABLE t1(a);
  CREATE INDEX i1 ON t1(a);
  INSERT INTO t1 VALUES('abcdefghijklmnop')
;CREATE TABLE r(x);
    INSERT INTO r VALUES('ABCDEFGHIJK');
    CREATE INDEX r1 ON r(x)
;PRAGMA auto_vacuum=0;
     PRAGMA page_size = 512;
     CREATE TABLE t1(a INTEGER PRIMARY KEY, b);
     WITH s(a, b) AS (
       SELECT 2, 'abcdefghij'
       UNION ALL
       SELECT a+2, b FROM s WHERe a < 40
     )
     INSERT INTO t1 SELECT * FROM s
;INSERT INTO t1 VALUES(5, 'klmnopqrst')
;INSERT INTO t1 VALUES(7, 'klmnopqrst')
;PRAGMA page_size = 65536;
  PRAGMA autovacuum = 0;
  CREATE TABLE t1(a INTEGER PRIMARY KEY, b);
  INSERT INTO t1 VALUES(-1, 'abcdefghij');
  INSERT INTO t1 VALUES(0, 'abcdefghij')
;PRAGMA page_size = 512;
    PRAGMA auto_vacuum = 2
;CREATE TABLE tsub_i(x)
;CREATE TABLE t100(x);
    DROP TABLE t100
;PRAGMA page_count
;PRAGMA page_size = 512;
  PRAGMA auto_vacuum=0;
  CREATE TABLE t1(x);
  INSERT INTO t1 VALUES(zeroblob(300));
  INSERT INTO t1 VALUES(zeroblob(600))
;DELETE FROM t1 WHERE rowid=2
;PRAGMA auto_vacuum=0;
  CREATE TABLE t1(x PRIMARY KEY, y);
  INSERT INTO t1 VALUES('a', 'A');
  INSERT INTO t1 VALUES('b', 'A');
  INSERT INTO t1 VALUES('c', 'A');
  SELECT name FROM sqlite_master
;PRAGMA writable_schema = 1;
  DELETE FROM sqlite_master WHERE name = 'sqlite_autoindex_t1_1'
;PRAGMA auto_vacuum=0;
  CREATE TABLE t1(x);
  INSERT INTO t1 VALUES(zeroblob(300));
  INSERT INTO t1 VALUES(zeroblob(300));
  INSERT INTO t1 VALUES(zeroblob(300));
  INSERT INTO t1 VALUES(zeroblob(300))
;PRAGMA integrity_check;