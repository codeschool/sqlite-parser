-- original: tableapi.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

DROP TABLE IF EXISTS t1;
    CREATE TABLE t1(a,b);
    INSERT INTO t1 VALUES(1,2);
    INSERT INTO t1 VALUES(3,4);
    INSERT INTO t1 SELECT a+4, b+4 FROM t1;
    INSERT INTO t1 SELECT a+8, b+8 FROM t1;