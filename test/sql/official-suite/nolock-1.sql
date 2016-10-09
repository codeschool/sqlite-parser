-- original: nolock.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a,b,c); INSERT INTO t1 VALUES(1,2,3)
;CREATE TABLE t1(a,b,c); INSERT INTO t1 VALUES(1,2,3)
;CREATE TABLE t1(a,b,c); INSERT INTO t1 VALUES(1,2,3)
;SELECT * FROM t1
;SELECT * FROM t1
;CREATE TABLE t1(a,b);
     INSERT INTO t1 VALUES('hello','world');
     CREATE TABLE t2(x,y);
     INSERT INTO t2 VALUES(12345,67890);
     SELECT * FROM t1, t2
;SELECT * FROM t1, t2
;SELECT * FROM t1, t2
;SELECT * FROM t1, t2
;SELECT * FROM t1, t2
;SELECT * FROM t1, t2
;SELECT * FROM t1, t2;