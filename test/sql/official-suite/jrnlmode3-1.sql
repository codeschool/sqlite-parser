-- original: jrnlmode3.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA journal_mode=OFF;
    PRAGMA locking_mode=EXCLUSIVE;
    CREATE TABLE t1(x);
    INSERT INTO t1 VALUES(1);
    SELECT * FROM t1
;BEGIN;
    INSERT INTO t1 VALUES(2);
    ROLLBACK;
    SELECT * FROM t1
;PRAGMA locking_mode=EXCLUSIVE;
    PRAGMA journal_mode=OFF;
    CREATE TABLE t1(x);
    INSERT INTO t1 VALUES(1);
    SELECT * FROM t1
;BEGIN;
    INSERT INTO t1 VALUES(2);
    ROLLBACK;
    SELECT * FROM t1
;PRAGMA main.journal_mode
;CREATE TABLE t1(x);
        BEGIN;
        INSERT INTO t1 VALUES(sub_cnt)
;PRAGMA journal_mode=sub_tojmode
;ROLLBACK;
        SELECT * FROM t1
;PRAGMA journal_mode=sub_tojmode
;DROP TABLE IF EXISTS t1;
        CREATE TABLE t1(x);
        BEGIN;
        INSERT INTO t1 VALUES(1)
;SELECT * FROM t1;