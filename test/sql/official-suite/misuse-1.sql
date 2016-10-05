-- original: misuse.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a,b);
    INSERT INTO t1 VALUES(1,2)
;SELECT * FROM t1
;SELECT * FROM t1
;SELECT * FROM t1
;SELECT * FROM t1;