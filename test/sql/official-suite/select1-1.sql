-- original: select1.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE test1(f1 int, f2 int)
;INSERT INTO test1(f1,f2) VALUES(11,22)
;SELECT f1 FROM test1
;SELECT f2 FROM test1
;SELECT f2, f1 FROM test1
;SELECT f1, f2 FROM test1
;SELECT * FROM test1
;SELECT *, * FROM test1
;SELECT *, min(f1,f2), max(f1,f2) FROM test1
;SELECT 'one', *, 'two', * FROM test1
;CREATE TABLE test2(r1 real, r2 real)
;INSERT INTO test2(r1,r2) VALUES(1.1,2.2)
;SELECT * FROM test1, test2
;SELECT *, 'hi' FROM test1, test2
;SELECT 'one', *, 'two', * FROM test1, test2
;SELECT test1.f1, test2.r1 FROM test1, test2
;SELECT test1.f1, test2.r1 FROM test2, test1
;SELECT * FROM test2, test1
;SELECT * FROM test1 AS a, test1 AS b
;SELECT max(test1.f1,test2.r1), min(test1.f2,test2.r2)
           FROM test2, test1
;SELECT min(test1.f1,test2.r1), max(test1.f2,test2.r2)
           FROM test1, test2
;SELECT count(*),count(a),count(b) FROM t3
;SELECT count(*),count(a),count(b) FROM t4
;SELECT count(*),count(a),count(b) FROM t4 WHERE b=5
;SELECT coalesce(min(a),'xyzzy') FROM t3
;SELECT min(coalesce(a,'xyzzy')) FROM t3
;SELECT min(b), min(b) FROM t4
;SELECT coalesce(max(a),'xyzzy') FROM t3
;SELECT max(coalesce(a,'xyzzy')) FROM t3
;SELECT sum(a) FROM t3
;CREATE TABLE tkt2526(a,b,c PRIMARY KEY);
    INSERT INTO tkt2526 VALUES('x','y',NULL);
    INSERT INTO tkt2526 VALUES('x','z',NULL)
;SELECT f1 FROM test1 ORDER BY 8.4
;SELECT f1 FROM test1 ORDER BY '8.4'
;CREATE TABLE t5(a,b);
    INSERT INTO t5 VALUES(1,10);
    INSERT INTO t5 VALUES(2,9);
    SELECT * FROM t5 ORDER BY 1
;SELECT * FROM t5 ORDER BY 2
;SELECT * FROM t5 ORDER BY +2
;INSERT INTO t5 VALUES(3,10);
    SELECT * FROM t5 ORDER BY 2, 1 DESC
;SELECT * FROM t5 ORDER BY 1 DESC, b
;SELECT * FROM t5 ORDER BY b DESC, 1
;CREATE TABLE test2(t1 text, t2 text)
;INSERT INTO test2 VALUES('abc','xyz')
;PRAGMA full_column_names=on
;PRAGMA full_column_names=off
;PRAGMA short_column_names=OFF;
     PRAGMA full_column_names=OFF
;PRAGMA short_column_names=OFF;
     PRAGMA full_column_names=ON
;PRAGMA short_column_names=OFF;
     PRAGMA full_column_names=ON
;PRAGMA short_column_names=ON;
     PRAGMA full_column_names=ON
;PRAGMA short_column_names=ON;
     PRAGMA full_column_names=OFF
;PRAGMA short_column_names=OFF;
     PRAGMA full_column_names=ON
;PRAGMA short_column_names=ON;
  PRAGMA full_column_names=OFF
;CREATE TABLE t6(a TEXT, b TEXT);
     INSERT INTO t6 VALUES('a','0');
     INSERT INTO t6 VALUES('b','1');
     INSERT INTO t6 VALUES('c','2');
     INSERT INTO t6 VALUES('d','3');
     SELECT a FROM t6 WHERE b IN 
        (SELECT b FROM t6 WHERE a<='b' UNION SELECT '3' AS x
                 ORDER BY 1 LIMIT 1)
;SELECT a FROM t6 WHERE b IN 
        (SELECT b FROM t6 WHERE a<='b' UNION SELECT '3' AS x
                 ORDER BY 1 DESC LIMIT 1)
;SELECT a FROM t6 WHERE b IN 
        (SELECT b FROM t6 WHERE a<='b' UNION SELECT '3' AS x
                 ORDER BY b LIMIT 2)
     ORDER BY a
;SELECT a FROM t6 WHERE b IN 
        (SELECT b FROM t6 WHERE a<='b' UNION SELECT '3' AS x
                 ORDER BY x DESC LIMIT 2)
     ORDER BY a
;SELECT f1 FROM test1 WHERE 4.3+2.4 OR 1 ORDER BY f1
;SELECT f1 FROM test1 WHERE ('x' || f1) BETWEEN 'x10' AND 'x20'
    ORDER BY f1
;SELECT f1 FROM test1 WHERE 5-3==2
    ORDER BY f1
;SELECT coalesce(f1/(f1-11),'x'),
           coalesce(min(f1/(f1-11),5),'y'),
           coalesce(max(f1/(f1-33),6),'z')
    FROM test1 ORDER BY f1
;SELECT min(1,2,3), -max(1,2,3)
    FROM test1 ORDER BY f1
;PRAGMA empty_result_callbacks=on
;SELECT * FROM test1 WHERE f1<0
;SELECT * FROM test1 WHERE f1<(select count(*) from test2)
;SELECT * FROM test1 ORDER BY f1
;SELECT * FROM test1 WHERE f1<0 ORDER BY f1
;SELECT f1 AS x FROM test1 ORDER BY x
;SELECT f1 AS x FROM test1 ORDER BY -x
;SELECT f1-23 AS x FROM test1 ORDER BY abs(x)
;SELECT f1-23 AS x FROM test1 ORDER BY -abs(x)
;SELECT f1-22 AS x, f2-22 as y FROM test1
;SELECT f1-22 AS x, f2-22 as y FROM test1 WHERE x>0 AND y<50
;SELECT f1 COLLATE nocase AS x FROM test1 ORDER BY x
;DELETE FROM t3;
    DELETE FROM t4;
    INSERT INTO t3 VALUES(1,2);
    INSERT INTO t4 VALUES(3,4);
    SELECT * FROM t3, t4
;SELECT * FROM t3, t4
;SELECT t3.*, t4.b FROM t3, t4
;SELECT "t3".*, t4.b FROM t3, t4
;SELECT t3.b, t4.* FROM t3, t4
;DELETE FROM t3;
    INSERT INTO t3 VALUES(1,2)
;SELECT * FROM t3 UNION SELECT 3 AS 'a', 4 ORDER BY a
;SELECT 3, 4 UNION SELECT * FROM t3
;SELECT * FROM t3 WHERE a=(SELECT 1)
;SELECT * FROM t3 WHERE a=(SELECT 2)
;BEGIN;
      create TABLE abc(a, b, c, PRIMARY KEY(a, b));
      INSERT INTO abc VALUES(1, 1, 1)
;INSERT INTO abc SELECT a+(select max(a) FROM abc), 
            b+(select max(a) FROM abc), c+(select max(a) FROM abc) FROM abc
;COMMIT
;SELECT count(
        (SELECT a FROM abc WHERE a = NULL AND b >= upper.c) 
      ) FROM abc AS upper
;SELECT name FROM sqlite_master WHERE type = 'table'
;DROP TABLE sub_tab
;SELECT * FROM sqlite_master WHERE rowid>10; 
    SELECT * FROM sqlite_master WHERE rowid=10;
    SELECT * FROM sqlite_master WHERE rowid<10;
    SELECT * FROM sqlite_master WHERE rowid<=10;
    SELECT * FROM sqlite_master WHERE rowid>=10;
    SELECT * FROM sqlite_master
;SELECT 10 IN (SELECT rowid FROM sqlite_master)
;CREATE TABLE t1(a);
      CREATE INDEX i1 ON t1(a);
      INSERT INTO t1 VALUES(1);
      INSERT INTO t1 VALUES(2);
      INSERT INTO t1 VALUES(3)
;DROP INDEX i1
;SELECT 2 IN (SELECT a FROM t1);