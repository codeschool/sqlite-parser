-- original: dbstatus2.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA page_size = 1024;
  PRAGMA auto_vacuum = 0;

  CREATE TABLE t1(a PRIMARY KEY, b);
  INSERT INTO t1 VALUES(1, randomblob(600));
  INSERT INTO t1 VALUES(2, randomblob(600));
  INSERT INTO t1 VALUES(3, randomblob(600))
;PRAGMA mmap_size = 0
;SELECT b FROM t1 WHERE a=2
;SELECT b FROM t1 WHERE a=2
;SELECT b FROM t1 WHERE a=2
;INSERT INTO t1 VALUES(4, randomblob(600))
;PRAGMA journal_mode = WAL
;INSERT INTO t1 VALUES(5, randomblob(600));