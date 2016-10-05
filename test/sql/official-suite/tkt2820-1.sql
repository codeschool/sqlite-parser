-- original: tkt2820.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT name FROM sqlite_master ORDER BY 1
;CREATE TABLE t1(a INTEGER PRIMARY KEY);
    INSERT INTO t1 VALUES(1);
    INSERT INTO t1 VALUES(2)
;SELECT name FROM sqlite_master
;INSERT INTO t1 SELECT a+1 FROM t1 ORDER BY a DESC
;SELECT a FROM t1 ORDER BY a;