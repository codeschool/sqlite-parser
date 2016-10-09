-- original: aggerror.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a);
    INSERT INTO t1 VALUES(1);
    INSERT INTO t1 VALUES(2);
    INSERT INTO t1 SELECT a+2 FROM t1;
    INSERT INTO t1 SELECT a+4 FROM t1;
    INSERT INTO t1 SELECT a+8 FROM t1;
    INSERT INTO t1 SELECT a+16 FROM t1;
    INSERT INTO t1 SELECT a+32 FROM t1 ORDER BY a LIMIT 7;
    SELECT x_count(*) FROM t1
;INSERT INTO t1 VALUES(40);
    SELECT x_count(*) FROM t1
;UPDATE t1 SET a=41 WHERE a=40
;SELECT x_count(*) FROM t1
;INSERT INTO t1 VALUES(40);
    INSERT INTO t1 VALUES(42);