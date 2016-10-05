-- original: minmax4.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(p,q);
    SELECT p, max(q) FROM t1
;SELECT p, min(q) FROM t1
;INSERT INTO t1 VALUES(1,2);
    SELECT p, max(q) FROM t1
;SELECT p, min(q) FROM t1
;INSERT INTO t1 VALUES(3,4);
    SELECT p, max(q) FROM t1
;SELECT p, min(q) FROM t1;
    SELECT p FROM (SELECT p, min(q) FROM t1)
;INSERT INTO t1 VALUES(5,0);
    SELECT p, max(q) FROM t1;
    SELECT p FROM (SELECT max(q), p FROM t1)
;SELECT p, min(q) FROM t1
;INSERT INTO t1 VALUES(6,1);
    SELECT p, max(q) FROM t1;
    SELECT p FROM (SELECT max(q), p FROM t1)
;SELECT p, min(q) FROM t1
;INSERT INTO t1 VALUES(7,NULL);
    SELECT p, max(q) FROM t1
;SELECT p, min(q) FROM t1
;DELETE FROM t1 WHERE q IS NOT NULL;
    SELECT p, max(q) FROM t1
;SELECT p, min(q) FROM t1
;CREATE TABLE t2(a,b,c);
    INSERT INTO t2 VALUES
         (1,null,2),
         (1,2,3),
         (1,1,4),
         (2,3,5);
    SELECT a, max(b), c FROM t2 GROUP BY a ORDER BY a
;SELECT a, min(b), c FROM t2 GROUP BY a ORDER BY a
;SELECT a, min(b), avg(b), count(b), c FROM t2 GROUP BY a ORDER BY a DESC
;SELECT a, min(b), max(b), c FROM t2 GROUP BY a ORDER BY a
;SELECT a, max(b), min(b), c FROM t2 GROUP BY a ORDER BY a
;SELECT a, max(b), b, max(c), c FROM t2 GROUP BY a ORDER BY a
;SELECT a, min(b), b, min(c), c FROM t2 GROUP BY a ORDER BY a;