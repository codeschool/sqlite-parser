-- original: jrnlmode2.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA journal_mode = persist;
    CREATE TABLE t1(a, b);
    INSERT INTO t1 VALUES(1, 2)
;SELECT * FROM t1
;INSERT INTO t1 VALUES(3, 4)
;BEGIN;
    SELECT * FROM t1
;PRAGMA lock_status
;COMMIT
;PRAGMA journal_mode = truncate
;INSERT INTO t1 VALUES(5, 6);