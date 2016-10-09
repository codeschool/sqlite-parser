-- original: tkt35xx.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA auto_vacuum = 0;
    PRAGMA page_size = 1024
;PRAGMA auto_vacuum = 0;
    CREATE TABLE t1(a,b,c);
    CREATE INDEX i1 ON t1(c);
    INSERT INTO t1 VALUES(0, 0, zeroblob(676));
    INSERT INTO t1 VALUES(1, 1, zeroblob(676));
    DELETE FROM t1;
    BEGIN;
    INSERT INTO t1 VALUES(0, 0, zeroblob(676));
    INSERT INTO t1 VALUES(1, 1, zeroblob(676));
    ROLLBACK;
    INSERT INTO t1 VALUES(0, 0, zeroblob(676))
;INSERT INTO t1 VALUES(1, 1, zeroblob(676))
;PRAGMA auto_vacuum = 0;
    PRAGMA page_size = 1024;
    CREATE TABLE t3(a INTEGER PRIMARY KEY, b);
    INSERT INTO t3 VALUES(1, sub_big);
    INSERT INTO t3 VALUES(2, sub_big);
    INSERT INTO t3 VALUES(3, sub_big);
    INSERT INTO t3 VALUES(4, sub_big);
    CREATE TABLE t4(c, d);
    INSERT INTO t4 VALUES(5, sub_big);
    INSERT INTO t4 VALUES(1, sub_big)
;SELECT count(*) FROM t3
;INSERT INTO t3 VALUES(5, sub_big);
    COMMIT
;SELECT count(*) FROM t3;