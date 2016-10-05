-- original: superlock.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a, b);
  INSERT INTO t1 VALUES(1, 2);
  PRAGMA journal_mode = DELETE
;INSERT INTO t1 VALUES(3, 4);
  PRAGMA journal_mode = WAL
;INSERT INTO t1 VALUES(3, 4)
;PRAGMA wal_checkpoint
;COMMIT
;COMMIT
;COMMIT
;CREATE TABLE t1(a, b);
      PRAGMA journal_mode = WAL;
      INSERT INTO t1 VALUES(1, 2)
;BEGIN ; SELECT * FROM t1
;BEGIN ; INSERT INTO t1 VALUES(3, 4)
;BEGIN ; SELECT * FROM t1
;BEGIN ; SELECT * FROM t1
;BEGIN ; INSERT INTO t1 VALUES(5, 6)
;BEGIN ; SELECT * FROM t1
;SELECT * FROM t1
;SELECT * FROM t1
;SELECT * FROM t1
;SELECT * FROM t1
;SELECT * FROM t1
;ATTACH 'test.db2' AS aux;
  PRAGMA aux.journal_mode = wal;
  CREATE TABLE aux.t2(x, y);
  INSERT INTO aux.t2 VALUES('a', 'b');
  PRAGMA schema_version = 450;
  DETACH aux;

  PRAGMA main.journal_mode = wal;
  CREATE TABLE t1(a, b);
  INSERT INTO t1 VALUES(1, 2);
  INSERT INTO t1 VALUES(3, 4);
  SELECT * FROM t1
;PRAGMA wal_checkpoint
;PRAGMA journal_mode = delete;
  PRAGMA page_size = 512;
  VACUUM;
  PRAGMA journal_mode = wal;
  INSERT INTO t1 VALUES(5, 6);