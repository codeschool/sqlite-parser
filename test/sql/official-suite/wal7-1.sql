-- original: wal7.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA page_size=1024;
    PRAGMA journal_mode=WAL;
    PRAGMA wal_autocheckpoint=50;  -- 50 pages
    CREATE TABLE t1(x, y UNIQUE);
    INSERT INTO t1 VALUES(1,2);
    INSERT INTO t1 VALUES(zeroblob(200000),4);
    CREATE TABLE t2(z);
    DELETE FROM t1;
    INSERT INTO t2 SELECT x FROM t1
;PRAGMA wal_checkpoint
;INSERT INTO t2 VALUES('hi')
;PRAGMA page_size=1024;
    PRAGMA journal_mode=WAL;
    PRAGMA wal_autocheckpoint=50;  -- 50 pages
    PRAGMA journal_size_limit=25000;
    CREATE TABLE t1(x, y UNIQUE);
    INSERT INTO t1 VALUES(1,2);
    INSERT INTO t1 VALUES(zeroblob(200000),4);
    CREATE TABLE t2(z);
    DELETE FROM t1;
    INSERT INTO t2 VALUES(1)
;PRAGMA page_size=1024;
    PRAGMA journal_mode=WAL;
    PRAGMA wal_autocheckpoint=50;  -- 50 pages
    PRAGMA journal_size_limit=0;
    CREATE TABLE t1(x, y UNIQUE);
    INSERT INTO t1 VALUES(1,2);
    INSERT INTO t1 VALUES(zeroblob(200000),4);
    CREATE TABLE t2(z);
    DELETE FROM t1;
    INSERT INTO t2 VALUES(1)
;PRAGMA page_size=1024;
    PRAGMA journal_size_limit=25000;
    PRAGMA journal_mode=WAL;
    PRAGMA wal_autocheckpoint=50;  -- 50 pages
    CREATE TABLE t1(x, y UNIQUE);
    INSERT INTO t1 VALUES(1,2);
    INSERT INTO t1 VALUES(zeroblob(200000),4);
    CREATE TABLE t2(z);
    DELETE FROM t1;
    INSERT INTO t2 VALUES(1);