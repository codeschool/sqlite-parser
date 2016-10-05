-- original: ioerr6.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a, b);
    CREATE INDEX i1 ON t1(a, b);
    INSERT INTO t1 VALUES(1, 2);
    INSERT INTO t1 VALUES(2, 4);
    INSERT INTO t1 VALUES(3, 6);
    INSERT INTO t1 VALUES(4, 8)
;PRAGMA integrity_check
;CREATE TABLE t1(x PRIMARY KEY);
    INSERT INTO t1 VALUES('abc')
;CREATE TABLE t1(x);
    CREATE TABLE t2(x)
;CREATE TABLE t3(x);