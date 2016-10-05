-- original: tkt-31338dca7e.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(x);
    CREATE TABLE t2(y);
    INSERT INTO t1 VALUES(111);
    INSERT INTO t1 VALUES(222);
    INSERT INTO t2 VALUES(333);
    INSERT INTO t2 VALUES(444);
    SELECT * FROM t1, t2
     WHERE (x=111 AND y!=444) OR x=222
     ORDER BY x, y
;CREATE INDEX t1x ON t1(x);
    SELECT * FROM t1, t2
     WHERE (x=111 AND y!=444) OR x=222
     ORDER BY x, y
;CREATE TABLE t3(v,w);
    CREATE TABLE t4(x,y);
    CREATE TABLE t5(z);
    INSERT INTO t3 VALUES(111,222);
    INSERT INTO t3 VALUES(333,444);
    INSERT INTO t4 VALUES(222,333);
    INSERT INTO t4 VALUES(444,555);
    INSERT INTO t5 VALUES(888);
    INSERT INTO t5 VALUES(999);
    
    SELECT * FROM t3, t4, t5
     WHERE (v=111 AND x=w AND z!=999) OR (v=333 AND x=444)
     ORDER BY v, w, x, y, z
;CREATE INDEX t3v ON t3(v);
   CREATE INDEX t4x ON t4(x);
    SELECT * FROM t3, t4, t5
     WHERE (v=111 AND x=w AND z!=999) OR (v=333 AND x=444)
     ORDER BY v, w, x, y, z
;SELECT name FROM sqlite_master WHERE type='table'
;DROP TABLE sub_x
;CREATE TABLE t1(a,b,c,d);
    CREATE TABLE t2(e,f);
    INSERT INTO t1 VALUES(1,2,3,4);
    INSERT INTO t2 VALUES(10,-8);
    CREATE INDEX t1a ON t1(a);
    CREATE INDEX t1b ON t1(b);
    CREATE TABLE t3(g);
    INSERT INTO t3 VALUES(4);
    CREATE TABLE t4(h);
    INSERT INTO t4 VALUES(5);

    SELECT * FROM t3 LEFT JOIN t1 ON d=g LEFT JOIN t4 ON c=h
     WHERE (a=1 AND h=4)
         OR (b IN (
               SELECT x FROM (SELECT e+f AS x, e FROM t2 ORDER BY 1 LIMIT 2)
               GROUP BY e
            ))
;SELECT * FROM t3 LEFT JOIN t1 ON d=g LEFT JOIN t4 ON c=h
     WHERE (a=1 AND h=4)
         OR (b=2 AND b NOT IN (
               SELECT x+1 FROM (SELECT e+f AS x, e FROM t2 ORDER BY 1 LIMIT 2)
               GROUP BY e
            ))
;SELECT * FROM t3 LEFT JOIN t1 ON d=g LEFT JOIN t4 ON c=h
     WHERE (+a=1 AND h=4)
         OR (b IN (
               SELECT x FROM (SELECT e+f AS x, e FROM t2 ORDER BY 1 LIMIT 2)
               GROUP BY e
            ))
;SELECT * FROM t3 LEFT JOIN t1 ON d=g LEFT JOIN t4 ON c=h
     WHERE (a=1 AND h=4)
         OR (+b IN (
               SELECT x FROM (SELECT e+f AS x, e FROM t2 ORDER BY 1 LIMIT 2)
               GROUP BY e
            ))
;CREATE TABLE t5(a,b,c,d,e,f);
    CREATE TABLE t6(g,h);
    CREATE TRIGGER t6r AFTER INSERT ON t6 BEGIN
      INSERT INTO t5    
        SELECT * FROM t3 LEFT JOIN t1 ON d=g LEFT JOIN t4 ON c=h
         WHERE (a=1 AND h=4)
            OR (b IN (
               SELECT x FROM (SELECT e+f AS x, e FROM t2 ORDER BY 1 LIMIT 2)
               GROUP BY e
            ));
    END;
    INSERT INTO t6 VALUES(88,99);
    SELECT * FROM t5
;INSERT INTO t1 VALUES(2,4,3,4);
    INSERT INTO t1 VALUES(99,101,3,4);
    INSERT INTO t1 VALUES(98,97,3,4);
    SELECT * FROM t3 LEFT JOIN t1 ON d=g LEFT JOIN t4 ON c=h
     WHERE (a=1 AND h=4)
         OR (b IN (
               SELECT x+a FROM (SELECT e+f AS x, e FROM t2 ORDER BY 1 LIMIT 2)
               GROUP BY e
            ))
;SELECT * FROM t3 LEFT JOIN t1 ON d=g LEFT JOIN t4 ON c=h
     WHERE (a=1 AND h=4)
         OR (b IN (
               SELECT x FROM (SELECT e+f+a AS x, e FROM t2 ORDER BY 1 LIMIT 2)
               GROUP BY e
            ));