-- original: selectD.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

ATTACH ':memory:' AS aux1;
      CREATE TABLE t1(a,b); INSERT INTO t1 VALUES(111,'x1');
      CREATE TABLE t2(a,b); INSERT INTO t2 VALUES(222,'x2');
      CREATE TEMP TABLE t3(a,b); INSERT INTO t3 VALUES(333,'x3');
      CREATE TABLE main.t4(a,b); INSERT INTO main.t4 VALUES(444,'x4');
      CREATE TABLE aux1.t4(a,b); INSERT INTO aux1.t4 VALUES(555,'x5')
;SELECT *
        FROM (t1), (t2), (t3), (t4)
       WHERE t4.a=t3.a+111 
         AND t3.a=t2.a+111
         AND t2.a=t1.a+111
;SELECT *
        FROM t1 JOIN (t2 JOIN (t3 JOIN t4 ON t4.a=t3.a+111)
                              ON t3.a=t2.a+111)
                     ON t2.a=t1.a+111
;SELECT t3.a
        FROM t1 JOIN (t2 JOIN (t3 JOIN t4 ON t4.a=t3.a+111)
                              ON t3.a=t2.a+111)
                     ON t2.a=t1.a+111
;SELECT t3.*
        FROM t1 JOIN (t2 JOIN (t3 JOIN t4 ON t4.a=t3.a+111)
                              ON t3.a=t2.a+111)
                     ON t2.a=t1.a+111
;SELECT t3.*, t2.*
        FROM t1 JOIN (t2 JOIN (t3 JOIN t4 ON t4.a=t3.a+111)
                              ON t3.a=t2.a+111)
                     ON t2.a=t1.a+111
;SELECT *
        FROM t1 JOIN (t2 JOIN (main.t4 JOIN aux1.t4 ON aux1.t4.a=main.t4.a+111)
                              ON main.t4.a=t2.a+222)
                     ON t2.a=t1.a+111
;SELECT *
        FROM t1 JOIN (t2 JOIN (main.t4 AS x JOIN aux1.t4 ON aux1.t4.a=x.a+111)
                              ON x.a=t2.a+222)
                     ON t2.a=t1.a+111
;SELECT x.a, y.b
        FROM t1 JOIN (t2 JOIN (main.t4 x JOIN aux1.t4 y ON y.a=x.a+111)
                              ON x.a=t2.a+222)
                     ON t2.a=t1.a+111
;UPDATE t2 SET a=111;
      UPDATE t3 SET a=111;
      UPDATE t4 SET a=111;
      SELECT *
        FROM t1 JOIN (t2 JOIN (t3 JOIN t4 USING(a)) USING (a)) USING (a)
;UPDATE t2 SET a=111;
      UPDATE t3 SET a=111;
      UPDATE t4 SET a=111;
      SELECT *
        FROM t1 LEFT JOIN (t2 LEFT JOIN (t3 LEFT JOIN t4 USING(a))
                                        USING (a))
                           USING (a)
;UPDATE t3 SET a=222;
      UPDATE t4 SET a=222;
      SELECT *
        FROM (t1 LEFT JOIN t2 USING(a)) JOIN (t3 LEFT JOIN t4 USING(a))
             ON t1.a=t3.a-111
;UPDATE t4 SET a=333;
      SELECT *
        FROM (t1 LEFT JOIN t2 USING(a)) JOIN (t3 LEFT JOIN t4 USING(a))
             ON t1.a=t3.a-111
;SELECT t1.*, t2.*, t3.*, t4.b
        FROM (t1 LEFT JOIN t2 USING(a)) JOIN (t3 LEFT JOIN t4 USING(a))
             ON t1.a=t3.a-111
;CREATE TABLE t41(a INTEGER PRIMARY KEY, b INTEGER);
  CREATE TABLE t42(d INTEGER PRIMARY KEY, e INTEGER);
  CREATE TABLE t43(f INTEGER PRIMARY KEY, g INTEGER);
  EXPLAIN QUERY PLAN
  SELECT * 
   FROM t41
   LEFT JOIN (SELECT count(*) AS cnt, x1.d
                FROM (t42 INNER JOIN t43 ON d=g) AS x1
               WHERE x1.d>5
               GROUP BY x1.d) AS x2
                  ON t41.b=x2.d;