-- original: wal9.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA page_size = 1024;
  PRAGMA journal_mode = WAL;
  PRAGMA wal_autocheckpoint = 0;
  CREATE TABLE t(x)
;SELECT * FROM t
;BEGIN;
    INSERT INTO t VALUES(randomblob(100));
    INSERT INTO t SELECT randomblob(100) FROM t;
    INSERT INTO t SELECT randomblob(100) FROM t;
    INSERT INTO t SELECT randomblob(100) FROM t;
    INSERT INTO t SELECT randomblob(100) FROM t;
    INSERT INTO t SELECT randomblob(100) FROM t;
    INSERT INTO t SELECT randomblob(100) FROM t;
    INSERT INTO t SELECT randomblob(100) FROM t;

    INSERT INTO t SELECT randomblob(100) FROM t;
    INSERT INTO t SELECT randomblob(100) FROM t;
    INSERT INTO t SELECT randomblob(100) FROM t;
    INSERT INTO t SELECT randomblob(100) FROM t;
    INSERT INTO t SELECT randomblob(100) FROM t;
    INSERT INTO t SELECT randomblob(100) FROM t;
    INSERT INTO t SELECT randomblob(100) FROM t;
    INSERT INTO t SELECT randomblob(100) FROM t;

    INSERT INTO t SELECT randomblob(100) FROM t;
    INSERT INTO t SELECT randomblob(100) FROM t;
  COMMIT
;PRAGMA wal_checkpoint
;BEGIN;
      INSERT INTO t VALUES('hello');
    ROLLBACK;