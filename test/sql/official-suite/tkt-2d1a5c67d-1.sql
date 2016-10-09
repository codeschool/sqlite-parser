-- original: tkt-2d1a5c67d.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA cache_size=sub_ii
;PRAGMA journal_mode=WAL;
      CREATE TABLE t1(a,b);
      CREATE INDEX t1b ON t1(b);
      CREATE TABLE t2(x,y UNIQUE);
      INSERT INTO t2 VALUES(3,4);
      BEGIN;
      INSERT INTO t1(a,b) VALUES(1,2);
      SELECT 'A', * FROM t2 WHERE y=4;
      SELECT 'B', * FROM t1;
      COMMIT;
      SELECT 'C', * FROM t1
;PRAGMA journal_mode=WAL;
  CREATE TABLE t1(a,b);
  CREATE INDEX t1b ON t1(b);
  CREATE TABLE t2(x,y);
  CREATE VIRTUAL TABLE nums USING wholenumber;
  INSERT INTO t2 SELECT value, randomblob(1000) FROM nums
                 WHERE value BETWEEN 1 AND 1000
;PRAGMA cache_size=sub_ii
;DELETE FROM t1;
      BEGIN;
      INSERT INTO t1(a,b) VALUES(1,2);
      SELECT sum(length(y)) FROM t2;
      COMMIT;
      SELECT * FROM t1
;PRAGMA cache_size = 10;
  CREATE TABLE t3(a INTEGER PRIMARY KEY, b);
  CREATE TABLE t4(a)
;INSERT INTO t3 VALUES(NULL, randomblob(500));
  INSERT INTO t3 SELECT NULL, b||b FROM t3;     -- 2
  INSERT INTO t3 SELECT NULL, b||b FROM t3;     -- 4
  INSERT INTO t3 SELECT NULL, b||b FROM t3;     -- 8
  INSERT INTO t3 SELECT NULL, b||b FROM t3;     -- 16
  INSERT INTO t3 SELECT NULL, b||b FROM t3;     -- 32
  INSERT INTO t3 SELECT NULL, b||b FROM t3;     -- 64
  INSERT INTO t3 SELECT NULL, b||b FROM t3;     -- 128
;BEGIN;
    INSERT INTO t4 VALUES('xyz')
;SELECT * FROM t4 WHERE a = 'xyz'
;SELECT * FROM t4 WHERE a = 'xyz'
;SELECT * FROM t4 WHERE a = 'xyz';