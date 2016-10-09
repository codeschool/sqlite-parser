-- original: tkt-c48d99d690.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a, b);
    CREATE TABLE t2(a, b);
    INSERT INTO t1 VALUES('one'  , 1);
    INSERT INTO t1 VALUES('two'  , 5);
    INSERT INTO t1 VALUES('two'  , 2);
    INSERT INTO t1 VALUES('three', 3);
    PRAGMA count_changes = 1
;INSERT INTO t2 SELECT * FROM t1;