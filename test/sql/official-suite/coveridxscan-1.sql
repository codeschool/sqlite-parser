-- original: coveridxscan.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a,b,c);
    INSERT INTO t1 VALUES(5,4,3), (4,8,2), (3,2,1);
    CREATE INDEX t1ab ON t1(a,b);
    CREATE INDEX t1b ON t1(b);
    SELECT a FROM t1
;SELECT a, c FROM t1
;SELECT b FROM t1
;SELECT a FROM t1
;SELECT a, c FROM t1
;SELECT b FROM t1
;SELECT a FROM t1
;SELECT a, c FROM t1
;SELECT b FROM t1
;SELECT a FROM t1
;SELECT a, c FROM t1
;SELECT b FROM t1;