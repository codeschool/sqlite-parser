-- original: ovfl.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA cache_size = 10;
    CREATE TABLE t1(c1 TEXT, c2 TEXT);
    BEGIN
;INSERT INTO t1 VALUES(sub_c1, sub_c2)
;SELECT sum(length(c2)) FROM t1;