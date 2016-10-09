-- original: walhook.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA page_size = 1024;
    PRAGMA auto_vacuum = 0;
    PRAGMA journal_mode = wal;
    PRAGMA synchronous = normal;
    CREATE TABLE t1(i PRIMARY KEY, j)
;INSERT INTO t1 VALUES(1, 'one')
;PRAGMA wal_checkpoint
;INSERT INTO t1 VALUES(2, 'two')
;PRAGMA wal_checkpoint
;CREATE TABLE t2(a, b)
;PRAGMA wal_checkpoint
;CREATE TABLE t3(a PRIMARY KEY, b)
;PRAGMA synchronous = NORMAL
;PRAGMA wal_autocheckpoint
;PRAGMA wal_autocheckpoint = 10
;PRAGMA wal_autocheckpoint;