-- original: tkt1873.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(x, y);
    ATTACH 'test2.db' AS aux;
    CREATE TABLE aux.t2(x, y);
    INSERT INTO t1 VALUES(1, 2);
    INSERT INTO t1 VALUES(3, 4);
    INSERT INTO t2 VALUES(5, 6);
    INSERT INTO t2 VALUES(7, 8);