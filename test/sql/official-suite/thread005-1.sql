-- original: thread005.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a, b)
;ATTACH 'test2.db' AS aux
;CREATE TABLE aux.t1(a INTEGER PRIMARY KEY, b UNIQUE);
    INSERT INTO t1 VALUES(1, 1);
    INSERT INTO t1 VALUES(2, 2)
;ATTACH 'test2.db' AS aux
;ATTACH 'test2.db' AS aux
;SELECT count(*) FROM t1 WHERE b IS NULL;