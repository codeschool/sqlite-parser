-- original: mallocH.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(x UNIQUE, y);
    INSERT INTO t1 VALUES(1,2)
;CREATE TABLE abc(a PRIMARY KEY, b, c)
;CREATE TABLE t1(a PRIMARY KEY, b UNIQUE);
   CREATE TABLE t2(x,y);
   INSERT INTO t1 VALUES(1,2);
   INSERT INTO t2 SELECT * FROM t1;