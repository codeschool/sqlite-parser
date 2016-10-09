-- original: shared7.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(x)
;ATTACH 'test2.db' AS test2;
    CREATE TABLE test2.t2(y);