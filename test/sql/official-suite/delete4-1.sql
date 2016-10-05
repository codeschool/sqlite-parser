-- original: delete4.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(x INTEGER PRIMARY KEY, y);
  INSERT INTO t1 VALUES(1, 0);
  INSERT INTO t1 VALUES(2, 1);
  INSERT INTO t1 VALUES(3, 0);
  INSERT INTO t1 VALUES(4, 1);
  INSERT INTO t1 VALUES(5, 0);
  INSERT INTO t1 VALUES(6, 1);
  INSERT INTO t1 VALUES(7, 0);
  INSERT INTO t1 VALUES(8, 1)
;DELETE FROM t1 WHERE y=1
;SELECT x FROM t1
;CREATE TABLE t1(x INTEGER PRIMARY KEY, y, z);
  INSERT INTO t1 VALUES(1, 0, randomblob(200));
  INSERT INTO t1 VALUES(2, 1, randomblob(200));
  INSERT INTO t1 VALUES(3, 0, randomblob(200));
  INSERT INTO t1 VALUES(4, 1, randomblob(200));
  INSERT INTO t1 VALUES(5, 0, randomblob(200));
  INSERT INTO t1 VALUES(6, 1, randomblob(200));
  INSERT INTO t1 VALUES(7, 0, randomblob(200));
  INSERT INTO t1 VALUES(8, 1, randomblob(200))
;DELETE FROM t1 WHERE y=1
;SELECT x FROM t1
;CREATE TABLE t1(a, b, PRIMARY KEY(a, b)) WITHOUT ROWID;
  INSERT INTO t1 VALUES(1, 2);
  INSERT INTO t1 VALUES(2, 4);
  INSERT INTO t1 VALUES(1, 5);
  DELETE FROM t1 WHERE a=1;
  SELECT * FROM t1
;CREATE TABLE t1(i INTEGER PRIMARY KEY, a, b);
  CREATE INDEX i1a ON t1(a);
  CREATE INDEX i1b ON t1(b);
  INSERT INTO t1 VALUES(1, 'one', 'i');
  INSERT INTO t1 VALUES(2, 'two', 'ii');
  INSERT INTO t1 VALUES(3, 'three', 'iii');
  INSERT INTO t1 VALUES(4, 'four', 'iv');
  INSERT INTO t1 VALUES(5, 'one', 'i');
  INSERT INTO t1 VALUES(6, 'two', 'ii');
  INSERT INTO t1 VALUES(7, 'three', 'iii');
  INSERT INTO t1 VALUES(8, 'four', 'iv')
;DELETE FROM t1 WHERE a='two' OR b='iv'
;SELECT i FROM t1 ORDER BY i
;PRAGMA integrity_check
;DROP TABLE IF EXISTS t4;
  CREATE TABLE t4(col0, col1);
  INSERT INTO "t4" VALUES(14, 'abcde');
  CREATE INDEX idx_t4_0 ON t4 (col1, col0);
  CREATE INDEX idx_t4_3 ON t4 (col0);
  DELETE FROM t4 WHERE col0=69 OR col0>7;
  PRAGMA integrity_check
;DROP TABLE IF EXISTS t4;
  CREATE TABLE t4(col0, col1);
  INSERT INTO "t4" VALUES(14, 'abcde');
  CREATE INDEX idx_t4_3 ON t4 (col0);
  CREATE INDEX idx_t4_0 ON t4 (col1, col0);
  DELETE FROM t4 WHERE col0=69 OR col0>7;
  PRAGMA integrity_check
;DROP TABLE IF EXISTS t4;
  CREATE TABLE t4(col0, col1, pk PRIMARY KEY) WITHOUT ROWID;
  INSERT INTO t4 VALUES(14, 'abcde','xyzzy');
  CREATE INDEX idx_t4_0 ON t4 (col1, col0);
  CREATE INDEX idx_t4_3 ON t4 (col0);
  DELETE FROM t4 WHERE col0=69 OR col0>7;
  PRAGMA integrity_check
;DROP TABLE IF EXISTS t4;
  CREATE TABLE t4(col0, col1, pk PRIMARY KEY) WITHOUT ROWID;
  INSERT INTO t4 VALUES(14, 'abcde','xyzzy');
  CREATE INDEX idx_t4_3 ON t4 (col0);
  CREATE INDEX idx_t4_0 ON t4 (col1, col0);
  DELETE FROM t4 WHERE col0=69 OR col0>7;
  PRAGMA integrity_check;