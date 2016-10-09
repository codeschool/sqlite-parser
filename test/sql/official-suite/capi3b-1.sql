-- original: capi3b.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(x);
    INSERT INTO t1 VALUES(1);
    INSERT INTO t1 VALUES(2);
    SELECT * FROM t1
;SELECT * FROM t1
;BEGIN;
    SELECT * FROM t1
;SELECT * FROM t1
;SELECT * FROM t1
;SELECT * FROM t1;