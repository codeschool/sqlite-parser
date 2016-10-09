-- original: tkt1667.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA auto_vacuum = 1;
    BEGIN;
    CREATE TABLE t1(a, b)
;INSERT INTO t1 VALUES(sub_i, randstr(1000, 2000))
;COMMIT
;DELETE FROM t1 WHERE a = sub_i
;BEGIN
;INSERT INTO t1 VALUES(sub_i, randstr(1000, 2000))
;COMMIT
;DELETE FROM t1;