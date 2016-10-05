-- original: insert2.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE d1(n int, log int)
;INSERT INTO d1 VALUES(sub_i,sub_j)
;SELECT * FROM d1 ORDER BY n
;CREATE TABLE t1(log int, cnt int);
    PRAGMA count_changes=on
;EXPLAIN INSERT INTO t1 SELECT log, count(*) FROM d1 GROUP BY log
;INSERT INTO t1 SELECT log, count(*) FROM d1 GROUP BY log
;SELECT * FROM t1 ORDER BY log
;DROP TABLE t1
;CREATE TABLE t1(log int, cnt int);
    INSERT INTO t1 
       SELECT log, count(*) FROM d1 GROUP BY log
       EXCEPT SELECT n-1,log FROM d1
;SELECT * FROM t1 ORDER BY log
;DROP TABLE t1
;CREATE TABLE t1(log int, cnt int);
    PRAGMA count_changes=off;
    INSERT INTO t1 
       SELECT log, count(*) FROM d1 GROUP BY log
       INTERSECT SELECT n-1,log FROM d1
;SELECT * FROM t1 ORDER BY log
;PRAGMA count_changes=off
;DROP TABLE t1
;CREATE TABLE t1(log int, cnt int);
    CREATE INDEX i1 ON t1(log);
    CREATE INDEX i2 ON t1(cnt);
    INSERT INTO t1 SELECT log, count() FROM d1 GROUP BY log;
    SELECT * FROM t1 ORDER BY log
;SELECT cnt FROM t1 WHERE log=3
;SELECT log FROM t1 WHERE cnt=4 ORDER BY log
;CREATE TABLE t3(a,b,c);
    CREATE TABLE t4(x,y);
    INSERT INTO t4 VALUES(1,2);
    SELECT * FROM t4
;INSERT INTO t3(a,c) SELECT * FROM t4;
    SELECT * FROM t3
;DELETE FROM t3;
    INSERT INTO t3(c,b) SELECT * FROM t4;
    SELECT * FROM t3
;DELETE FROM t3;
    INSERT INTO t3(c,a,b) SELECT x, 'hi', y FROM t4;
    SELECT * FROM t3
;SELECT * from t4
;BEGIN;
    INSERT INTO t4 VALUES(2,4);
    INSERT INTO t4 VALUES(3,6);
    INSERT INTO t4 VALUES(4,8);
    INSERT INTO t4 VALUES(5,10);
    INSERT INTO t4 VALUES(6,12);
    INSERT INTO t4 VALUES(7,14);
    INSERT INTO t4 VALUES(8,16);
    INSERT INTO t4 VALUES(9,18);
    INSERT INTO t4 VALUES(10,20);
    COMMIT
;SELECT count(*) FROM t4
;BEGIN;
      INSERT INTO t4 SELECT x+(SELECT max(x) FROM t4),y FROM t4;
      INSERT INTO t4 SELECT x+(SELECT max(x) FROM t4),y FROM t4;
      INSERT INTO t4 SELECT x+(SELECT max(x) FROM t4),y FROM t4;
      INSERT INTO t4 SELECT x+(SELECT max(x) FROM t4),y FROM t4;
      COMMIT;
      SELECT count(*) FROM t4
;SELECT max(x) FROM t4
;BEGIN;
      INSERT INTO t4 SELECT x+max_x_t4() ,y FROM t4;
      INSERT INTO t4 SELECT x+max_x_t4() ,y FROM t4;
      INSERT INTO t4 SELECT x+max_x_t4() ,y FROM t4;
      INSERT INTO t4 SELECT x+max_x_t4() ,y FROM t4;
      COMMIT;
      SELECT count(*) FROM t4
;BEGIN;
    UPDATE t4 SET y='lots of data for the row where x=' || x
                     || ' and y=' || y || ' -even more data to fill space';
    COMMIT;
    SELECT count(*) FROM t4
;BEGIN;
      INSERT INTO t4 SELECT x+(SELECT max(x)+1 FROM t4),y FROM t4;
      SELECT count(*) from t4;
      ROLLBACK
;BEGIN;
      INSERT INTO t4 SELECT x+max_x_t4()+1,y FROM t4;
      SELECT count(*) from t4;
      ROLLBACK
;SELECT count(*) FROM t4
;BEGIN;
    DELETE FROM t4 WHERE x!=123;
    SELECT count(*) FROM t4;
    ROLLBACK
;CREATE TABLE Dependencies(depId integer primary key,
        class integer, name str, flag str);
      CREATE TEMPORARY TABLE DepCheck(troveId INT, depNum INT,
        flagCount INT, isProvides BOOL, class INTEGER, name STRING,
        flag STRING);
      INSERT INTO DepCheck 
         VALUES(-1, 0, 1, 0, 2, 'libc.so.6', 'GLIBC_2.0');
      INSERT INTO Dependencies 
         SELECT DISTINCT 
             NULL, 
             DepCheck.class, 
             DepCheck.name, 
             DepCheck.flag 
         FROM DepCheck LEFT OUTER JOIN Dependencies ON 
             DepCheck.class == Dependencies.class AND 
             DepCheck.name == Dependencies.name AND 
             DepCheck.flag == Dependencies.flag 
         WHERE 
             Dependencies.depId is NULL
;CREATE TABLE t2(a, b);
    INSERT INTO t2 VALUES(1, 2);
    CREATE INDEX t2i1 ON t2(a);
    INSERT INTO t2 SELECT a, 3 FROM t2 WHERE a = 1;
    SELECT * FROM t2
;INSERT INTO t2 SELECT (SELECT a FROM t2), 4;
      SELECT * FROM t2
;CREATE TABLE t5(a, b, c DEFAULT 'c', d)
;INSERT INTO t5(a) SELECT 456 UNION ALL SELECT 123 ORDER BY 1;
  SELECT * FROM t5 ORDER BY rowid
;CREATE VIRTUAL TABLE t0 USING fts4(a)
;INSERT INTO t0 SELECT 0 UNION SELECT 0 AS 'x' ORDER BY x;
    SELECT * FROM t0;