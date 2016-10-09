-- original: where4.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(w, x, y);
    CREATE INDEX i1wxy ON t1(w,x,y);
    INSERT INTO t1 VALUES(1,2,3);
    INSERT INTO t1 VALUES(1,NULL,3);
    INSERT INTO t1 VALUES('a','b','c');
    INSERT INTO t1 VALUES('a',NULL,'c');
    INSERT INTO t1 VALUES(X'78',x'79',x'7a');
    INSERT INTO t1 VALUES(X'78',NULL,X'7A');
    INSERT INTO t1 VALUES(NULL,NULL,NULL);
    SELECT count(*) FROM t1
;SELECT rowid FROM t1 ORDER BY w, x, y
;SELECT rowid FROM t1 ORDER BY w DESC, x, y
;SELECT rowid FROM t1 ORDER BY w, x DESC, y
;CREATE TABLE t2(a);
    INSERT INTO t2 VALUES(1);
    INSERT INTO t2 VALUES(2);
    INSERT INTO t2 VALUES(3);
    CREATE TABLE t3(x,y,UNIQUE("x",'y' ASC)); -- Goofy syntax allowed
    INSERT INTO t3 VALUES(1,11);
    INSERT INTO t3 VALUES(2,NULL);
 
    SELECT * FROM t2 LEFT JOIN t3 ON a=x WHERE +y IS NULL
;SELECT * FROM t2 LEFT JOIN t3 ON a=x WHERE y IS NULL
;SELECT * FROM t2 LEFT JOIN t3 ON a=x WHERE NULL is y
;SELECT * FROM t2 LEFT JOIN t3 ON a=x WHERE y IS sub_null
;CREATE TABLE test(col1 TEXT PRIMARY KEY);
    INSERT INTO test(col1) values('a');
    INSERT INTO test(col1) values('b');
    INSERT INTO test(col1) values('c');
    CREATE TABLE test2(col1 TEXT PRIMARY KEY);
    INSERT INTO test2(col1) values('a');
    INSERT INTO test2(col1) values('b');
    INSERT INTO test2(col1) values('c');
    SELECT * FROM test t1 LEFT OUTER JOIN test2 t2 ON t1.col1 = t2.col1
      WHERE +t2.col1 IS NULL
;SELECT * FROM test t1 LEFT OUTER JOIN test2 t2 ON t1.col1 = t2.col1
      WHERE t2.col1 IS NULL
;SELECT * FROM test t1 LEFT OUTER JOIN test2 t2 ON t1.col1 = t2.col1
      WHERE +t1.col1 IS NULL
;SELECT * FROM test t1 LEFT OUTER JOIN test2 t2 ON t1.col1 = t2.col1
      WHERE t1.col1 IS NULL
;-- Allow the 'x' syntax for backwards compatibility
    CREATE TABLE t4(x,y,z,PRIMARY KEY('x' ASC, "y" ASC))
;SELECT *
      FROM t2 LEFT JOIN t4 b1
              LEFT JOIN t4 b2 ON b2.x=b1.x AND b2.y IN (b1.y)
;INSERT INTO t4 VALUES(1,1,11);
    INSERT INTO t4 VALUES(1,2,12);
    INSERT INTO t4 VALUES(1,3,13);
    INSERT INTO t4 VALUES(2,2,22);
    SELECT rowid FROM t4 WHERE x IN (1,9,2,5) AND y IN (1,3,NULL,2) AND z!=13
;SELECT rowid FROM t4 WHERE x IN (1,9,NULL,2) AND y IN (1,3,2) AND z!=13
;CREATE TABLE t5(a,b,c,d,e,f,UNIQUE(a,b,c,d,e,f));
    INSERT INTO t5 VALUES(1,1,1,1,1,11111);
    INSERT INTO t5 VALUES(2,2,2,2,2,22222);
    INSERT INTO t5 VALUES(1,2,3,4,5,12345);
    INSERT INTO t5 VALUES(2,3,4,5,6,23456)
;SELECT rowid FROM t5
     WHERE a IN (1,9,2) AND b=2 AND c IN (1,2,3,4) AND d>0
;SELECT rowid FROM t5
     WHERE a IN (1,NULL,2) AND b=2 AND c IN (1,2,3,4) AND d>0
;CREATE TABLE t6(y,z,PRIMARY KEY(y,z))
;SELECT * FROM t6 WHERE y=NULL AND z IN ('hello')
;BEGIN;
    CREATE TABLE t8(a, b, c, d);
    CREATE INDEX t8_i ON t8(a, b, c);
    CREATE TABLE t7(i);

    INSERT INTO t7 VALUES(1);
    INSERT INTO t7 SELECT i*2 FROM t7;
    INSERT INTO t7 SELECT i*2 FROM t7;
    INSERT INTO t7 SELECT i*2 FROM t7;
    INSERT INTO t7 SELECT i*2 FROM t7;
    INSERT INTO t7 SELECT i*2 FROM t7;
    INSERT INTO t7 SELECT i*2 FROM t7;

    COMMIT
;SELECT sum((
      SELECT d FROM t8 WHERE a = i AND b = i AND c < NULL
    )) FROM t7
;CREATE TABLE u9(a UNIQUE, b);
  INSERT INTO u9 VALUES(NULL, 1);
  INSERT INTO u9 VALUES(NULL, 2)
;SELECT * FROM u9 WHERE a IS NULL
;SELECT * FROM u9 WHERE a IS sub_null;