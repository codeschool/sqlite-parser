-- original: corruptD.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA auto_vacuum = 0;
    PRAGMA page_size = 1024;
    CREATE TABLE t1(a, b);
    CREATE INDEX i1 ON t1(a, b)
;INSERT INTO t1 VALUES(sub_ii, sub_ii * sub_ii)
;DELETE FROM t1 WHERE a = 10;
    DELETE FROM t1 WHERE a = 20;
    DELETE FROM t1 WHERE a = 30;
    DELETE FROM t1 WHERE a = 40;