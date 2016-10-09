-- original: fkey4.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA foreign_keys = ON;
    CREATE TABLE t1(a PRIMARY KEY, b);
    CREATE TABLE t2(c REFERENCES t1 DEFERRABLE INITIALLY DEFERRED, d);
    INSERT INTO t1 VALUES(1,2);
    INSERT INTO t2 VALUES(1,3)
;SELECT * FROM t2;