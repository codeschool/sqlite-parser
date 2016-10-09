-- original: mallocJ.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

DROP TABLE IF EXISTS t1;
    CREATE TABLE t1(x int, y int);
    INSERT INTO t1 VALUES(1,1);
    INSERT INTO t1 VALUES(1,2);
    INSERT INTO t1 VALUES(1,2);
    INSERT INTO t1 VALUES(2,1);
    INSERT INTO t1 VALUES(2,2);
    INSERT INTO t1 VALUES(2,3)
;CREATE TABLE t1(a,b);
  INSERT INTO t1 VALUES(1,2);
  PRAGMA vdbe_trace=ON
;CREATE TABLE t1(a,b,c);
  CREATE TABLE t2(x,y,z)
;CREATE TABLE t1(["a"]);