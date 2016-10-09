-- original: walnoshm.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(x, y);
  INSERT INTO t1 VALUES(1, 2)
;PRAGMA journal_mode = WAL;
  SELECT * FROM t1
;PRAGMA locking_mode = exclusive;
  PRAGMA journal_mode = WAL;
  SELECT * FROM t1
;INSERT INTO t1 VALUES(3, 4)
;PRAGMA locking_mode = normal
;PRAGMA journal_mode = delete;
  PRAGMA main.locking_mode
;PRAGMA locking_mode = normal
;SELECT * FROM t1
;CREATE TABLE t2(x, y);
  INSERT INTO t2 VALUES('a', 'b');
  INSERT INTO t2 VALUES('c', 'd')
;PRAGMA locking_mode = exclusive;
  PRAGMA journal_mode = WAL;
  INSERT INTO t2 VALUES('e', 'f');
  INSERT INTO t2 VALUES('g', 'h')
;PRAGMA locking_mode = exclusive; 
    PRAGMA journal_mode = delete;
    SELECT * FROM t2
;SELECT * FROM t2
;PRAGMA locking_mode = exclusive
;SELECT * FROM t2
;SELECT * FROM t2
;SELECT * FROM t2
;SELECT * FROM t1;
    PRAGMA locking_mode = EXCLUSIVE;
    INSERT INTO t1 VALUES(5, 6);
    PRAGMA locking_mode = NORMAL;
    INSERT INTO t1 VALUES(7, 8)
;SELECT * FROM t1
;PRAGMA locking_mode = EXCLUSIVE;
    INSERT INTO t1 VALUES(9, 10);
    PRAGMA locking_mode = NORMAL;
    INSERT INTO t1 VALUES(11, 12);