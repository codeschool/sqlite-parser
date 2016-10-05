-- original: wal8.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA journal_mode = wal;
    CREATE TABLE t1(a, b);
    INSERT INTO t1 VALUES(1, 2)
;CREATE TABLE t1(a, b);
    INSERT INTO t1 VALUES(1, 2);
    PRAGMA journal_mode = wal
;PRAGMA journal_mode = wal;
    CREATE TABLE t1(a, b);
    INSERT INTO t1 VALUES(1, 2)
;PRAGMA page_size = 4096;
  SELECT name FROM sqlite_master;