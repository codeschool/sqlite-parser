-- original: trans3.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(x);
    INSERT INTO t1 VALUES(1);
    INSERT INTO t1 VALUES(2);
    INSERT INTO t1 VALUES(3);
    SELECT * FROM t1
;INSERT INTO t1 VALUES(4)
;SELECT * FROM t1
;BEGIN; CREATE TABLE xyzzy(abc)
;INSERT INTO t1 VALUES(5)
;SELECT * FROM t1;