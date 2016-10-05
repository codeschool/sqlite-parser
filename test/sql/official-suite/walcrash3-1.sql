-- original: walcrash3.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA page_size = 1024;
  PRAGMA journal_mode = WAL;
  PRAGMA wal_autocheckpoint = 128;
  PRAGMA journal_size_limit = 16384;

  CREATE TABLE t1(a BLOB, b BLOB, UNIQUE(a, b));
  INSERT INTO t1 VALUES(randomblob(10), randomblob(1000))
;PRAGMA integrity_check
;SELECT count(*) FROM t1
;PRAGMA page_size = 512;
    PRAGMA journal_mode = WAL;
    PRAGMA wal_autocheckpoint = 128;
    CREATE TABLE t1(a PRIMARY KEY, b);
    INSERT INTO t1 VALUES(randomblob(25), randomblob(200))
;INSERT INTO t1 VALUES(randomblob(25), randomblob(200))
;PRAGMA integrity_check;