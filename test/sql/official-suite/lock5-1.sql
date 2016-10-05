-- original: lock5.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

BEGIN;
    CREATE TABLE t1(a, b)
;INSERT INTO t1 VALUES('a', 'b');
    SELECT * FROM t1
;BEGIN;
    SELECT * FROM t1
;SELECT * FROM t1;
    ROLLBACK
;BEGIN EXCLUSIVE
;CREATE TABLE t1(a, b);
    BEGIN;
    INSERT INTO t1 VALUES(1, 2)
;SELECT * FROM t1
;PRAGMA mmap_size = 0
;BEGIN;
    INSERT INTO t1 VALUES(3, 4)
;SELECT * FROM t1
;SELECT * FROM t1
;BEGIN;
    SELECT * FROM t1
;SELECT * FROM t1
;SELECT * FROM t1;