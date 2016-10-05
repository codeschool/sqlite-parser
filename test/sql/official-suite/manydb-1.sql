-- original: manydb.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a,b);
       BEGIN;
       INSERT INTO t1 VALUES(1,2)
;COMMIT;
       SELECT * FROM t1;