-- original: tkt-d635236375.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(id1 INTEGER PRIMARY KEY);
    INSERT INTO t1 VALUES(9999);
    CREATE TABLE t2(id2 INTEGER PRIMARY KEY);
    INSERT INTO t2 VALUES(12345);
    INSERT INTO t2 VALUES(54321);
    SELECT DISTINCT id1 AS x, id1 AS y FROM t1, t2
;SELECT count(*) FROM t1, t2 GROUP BY id1, id1;