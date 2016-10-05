-- original: walpersist.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA journal_mode=WAL;
    CREATE TABLE t1(a);
    INSERT INTO t1 VALUES(randomblob(5000))
;SELECT length(a) FROM t1
;PRAGMA journal_mode=WAL;
    PRAGMA wal_autocheckpoint=OFF;
    PRAGMA journal_size_limit=12000;
    CREATE TABLE t1(x);
    INSERT INTO t1 VALUES(randomblob(50000));
    UPDATE t1 SET x=randomblob(50000)
;PRAGMA integrity_check
;PRAGMA page_size = 1024;
    PRAGMA journal_mode = WAL;
    PRAGMA wal_autocheckpoint=128;
    PRAGMA journal_size_limit=16384;
    CREATE TABLE t1(a, b, PRIMARY KEY(a, b))
;INSERT INTO t1 VALUES(randomblob(500), randomblob(500))
;PRAGMA integrity_check;