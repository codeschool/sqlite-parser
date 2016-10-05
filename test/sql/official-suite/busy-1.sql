-- original: busy.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(x);
    INSERT INTO t1 VALUES(1);
    SELECT * FROM t1
;BEGIN EXCLUSIVE
;COMMIT
;BEGIN; INSERT INTO t1 VALUES(5)
;BEGIN; SELECT * FROM t1;