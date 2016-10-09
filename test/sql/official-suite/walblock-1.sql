-- original: walblock.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(x, y);
  INSERT INTO t1 VALUES(1, 2);
  INSERT INTO t1 VALUES(3, 4);
  INSERT INTO t1 VALUES(5, 6);
  PRAGMA journal_mode = wal;
  INSERT INTO t1 VALUES(7, 8)
;SELECT * FROM t1
;SELECT * FROM t1
;BEGIN;
    INSERT INTO t1 VALUES(9, 10)
;SELECT * FROM t1;