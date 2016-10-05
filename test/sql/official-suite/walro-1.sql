-- original: walro.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA auto_vacuum = 0;
      PRAGMA journal_mode = WAL;
      CREATE TABLE t1(x, y);
      INSERT INTO t1 VALUES('a', 'b')
;SELECT * FROM t1
;INSERT INTO t1 VALUES('c', 'd')
;SELECT * FROM t1
;INSERT INTO t1 VALUES('e', 'f')
;SELECT * FROM t1
;INSERT INTO t1 VALUES('g', 'h');
      PRAGMA wal_checkpoint
;SELECT * FROM t1
;INSERT INTO t1 VALUES('i', 'j')
;SELECT * FROM t1
;SELECT * FROM t1
;SELECT * FROM t1
;PRAGMA wal_checkpoint;
      INSERT INTO t1 VALUES('k', 'l')
;SELECT * FROM t1;