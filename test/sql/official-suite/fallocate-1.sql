-- original: fallocate.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA page_size = 1024;
    PRAGMA auto_vacuum = 1;
    CREATE TABLE t1(a, b)
;INSERT INTO t1 VALUES(1, zeroblob(1024*900))
;INSERT INTO t1 VALUES(2, zeroblob(1024*900))
;DELETE FROM t1 WHERE a = 1
;DELETE FROM t1 WHERE a = 2
;BEGIN; INSERT INTO t1 VALUES(1, 2)
;COMMIT
;PRAGMA page_size = 1024;
      PRAGMA journal_mode = WAL;
      CREATE TABLE t1(a, b)
;INSERT INTO t1 VALUES(1, zeroblob(35*1024))
;PRAGMA wal_checkpoint
;DELETE FROM t1
;VACUUM
;PRAGMA wal_checkpoint
;INSERT INTO t1 VALUES(2, randomblob(35*1024));
      PRAGMA wal_checkpoint;
      INSERT INTO t1 VALUES(3, randomblob(128));
      DELETE FROM t1 WHERE a = 2;
      VACUUM
;BEGIN ; SELECT count(a) FROM t1
;INSERT INTO t1 VALUES(4, randomblob(128));
      PRAGMA wal_checkpoint
;SELECT count(b) FROM t1
;COMMIT
;PRAGMA wal_checkpoint;