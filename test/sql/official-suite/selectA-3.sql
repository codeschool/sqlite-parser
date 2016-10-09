-- original: selectA.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

WITH RECURSIVE
    xyz(n) AS (
      SELECT upper((SELECT x FROM (
        SELECT x,y,z FROM t2
        INTERSECT SELECT a,b,c FROM t3
        EXCEPT SELECT c,b,a FROM t1
        UNION SELECT a,b,c FROM t3
        INTERSECT SELECT a,b,c FROM t3
        EXCEPT SELECT c,b,a FROM t1
        UNION SELECT a,b,c FROM t3
        ORDER BY y COLLATE NOCASE DESC,x,z)))
      UNION ALL
      SELECT n || '+' FROM xyz WHERE length(n)<5
    )
  SELECT n FROM xyz ORDER BY +n
;CREATE TABLE t4(a, b);
  CREATE TABLE t5(c, d);

  INSERT INTO t5 VALUES(1, 'x');
  INSERT INTO t5 VALUES(2, 'x');
  INSERT INTO t4 VALUES(3, 'x');
  INSERT INTO t4 VALUES(4, 'x');

  CREATE INDEX i1 ON t4(a);
  CREATE INDEX i2 ON t5(c)
;SELECT c, d FROM t5 
  UNION ALL
  SELECT a, b FROM t4 WHERE f()==f()
  ORDER BY 1,2
;SELECT c, d FROM t5 
  UNION ALL
  SELECT a, b FROM t4 WHERE f()==f()
  ORDER BY 1,2
;CREATE TABLE t6(a, b);
  CREATE TABLE t7(c, d);

  INSERT INTO t7 VALUES(2, 9);
  INSERT INTO t6 VALUES(3, 0);
  INSERT INTO t6 VALUES(4, 1);
  INSERT INTO t7 VALUES(5, 6);
  INSERT INTO t6 VALUES(6, 0);
  INSERT INTO t7 VALUES(7, 6);

  CREATE INDEX i6 ON t6(a);
  CREATE INDEX i7 ON t7(c)
;SELECT c, f(d,c,d,c,d) FROM t7
  UNION ALL
  SELECT a, b FROM t6 
  ORDER BY 1,2
;CREATE TABLE t8(a, b);
  CREATE TABLE t9(c, d);