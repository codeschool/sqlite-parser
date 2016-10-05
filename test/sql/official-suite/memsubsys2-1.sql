-- original: memsubsys2.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(x, y);
    CREATE TABLE t2(a, b);
    CREATE INDEX i1 ON t1(x,y);
    INSERT INTO t1 VALUES(1, 100);
    INSERT INTO t1 VALUES(2, 200)
;INSERT INTO t2 SELECT * FROM t1
;INSERT INTO t1 SELECT a+sub_i, a+b*100 FROM t2
;DELETE FROM t2
;SELECT count(*) FROM t1;