-- original: misc1.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT x99 FROM manycol
;SELECT x0, x10, x25, x50, x75 FROM manycol
;SELECT x50 FROM manycol ORDER BY x80+0
;SELECT x50 FROM manycol ORDER BY x80
;SELECT x75 FROM manycol WHERE x50=350
;SELECT x50 FROM manycol WHERE x99=599
;CREATE INDEX manycol_idx1 ON manycol(x99)
;SELECT x50 FROM manycol WHERE x99=899
;SELECT count(*) FROM manycol
;DELETE FROM manycol WHERE x98=1234
;SELECT count(*) FROM manycol
;DELETE FROM manycol WHERE x98=998
;SELECT count(*) FROM manycol
;DELETE FROM manycol WHERE x99=500
;SELECT count(*) FROM manycol
;DELETE FROM manycol WHERE x99=599
;SELECT count(*) FROM manycol
;BEGIN TRANSACTION;
    CREATE TABLE agger(one text, two text, three text, four text);
    INSERT INTO agger VALUES(1, 'one', 'hello', 'yes');
    INSERT INTO agger VALUES(2, 'two', 'howdy', 'no');
    INSERT INTO agger VALUES(3, 'thr', 'howareya', 'yes');
    INSERT INTO agger VALUES(4, 'two', 'lothere', 'yes');
    INSERT INTO agger VALUES(5, 'one', 'atcha', 'yes');
    INSERT INTO agger VALUES(6, 'two', 'hello', 'no');
    COMMIT
;SELECT count(*) FROM agger
;SELECT sum(one), two, four FROM agger
           GROUP BY two, four ORDER BY sum(one) desc
;SELECT sum((one)), (two), (four) FROM agger
           GROUP BY (two), (four) ORDER BY sum(one) desc
;CREATE TABLE t1(a);
    INSERT INTO t1 VALUES('hi');
    PRAGMA full_column_names=on;
    SELECT rowid, * FROM t1
;BEGIN;
    CREATE TABLE t2(a);
    INSERT INTO t2 VALUES('This is a long string to use up a lot of disk -');
    UPDATE t2 SET a=a||a||a||a;
    INSERT INTO t2 SELECT '1 -' || a FROM t2;
    INSERT INTO t2 SELECT '2 -' || a FROM t2;
    INSERT INTO t2 SELECT '3 -' || a FROM t2;
    INSERT INTO t2 SELECT '4 -' || a FROM t2;
    INSERT INTO t2 SELECT '5 -' || a FROM t2;
    INSERT INTO t2 SELECT '6 -' || a FROM t2;
    COMMIT;
    SELECT count(*) FROM t2
;SELECT * FROM t3 ORDER BY a
;SELECT * FROM t4
;SELECT abort+asc,max(key,pragma,temp) FROM t4
;CREATE TABLE t5(a,b,c,PRIMARY KEY(a,b));
    INSERT INTO t5 VALUES(1,2,3);
    SELECT * FROM t5 ORDER BY a
;SELECT * FROM t5 ORDER BY a
;DROP TABLE t1;
  DROP TABLE t2;
  DROP TABLE t3;
  DROP TABLE t4
;SELECT count(*) FROM manycol
;SELECT count(*) FROM manycol
;SELECT x1 FROM manycol WHERE x0=100
;SELECT x1 FROM manycol WHERE x0=100
;SELECT x1 FROM manycol WHERE x0=100
;BEGIN
;UPDATE t1 SET a=0 WHERE 0
;COMMIT
;SELECT '0'=='0.0'
;SELECT '0'==0.0
;SELECT '12345678901234567890'=='12345678901234567891'
;CREATE TABLE t6(a INT UNIQUE, b TEXT UNIQUE);
    INSERT INTO t6 VALUES('0','0.0');
    SELECT * FROM t6
;INSERT OR IGNORE INTO t6 VALUES(0.0,'x');
      SELECT * FROM t6
;INSERT OR IGNORE INTO t6 VALUES('y',0);
      SELECT * FROM t6
;CREATE TABLE t7(x INTEGER, y TEXT, z);
    INSERT INTO t7 VALUES(0,0,1);
    INSERT INTO t7 VALUES(0.0,0,2);
    INSERT INTO t7 VALUES(0,0.0,3);
    INSERT INTO t7 VALUES(0.0,0.0,4);
    SELECT DISTINCT x, y FROM t7 ORDER BY z
;SELECT min(z), max(z), count(z) FROM t7 GROUP BY x ORDER BY 1
;SELECT min(z), max(z), count(z) FROM t7 GROUP BY y ORDER BY 1
;CREATE TABLE t8(x TEXT COLLATE numeric, y INTEGER COLLATE text, z);
    INSERT INTO t8 VALUES(0,0,1);
    INSERT INTO t8 VALUES(0.0,0,2);
    INSERT INTO t8 VALUES(0,0.0,3);
    INSERT INTO t8 VALUES(0.0,0.0,4);
    SELECT DISTINCT x, y FROM t8 ORDER BY z
;SELECT min(z), max(z), count(z) FROM t8 GROUP BY x ORDER BY 1
;SELECT min(z), max(z), count(z) FROM t8 GROUP BY y ORDER BY 1
;CREATE TABLE t9(x,y);
       INSERT INTO t9 VALUES('one',1);
       INSERT INTO t9 VALUES('two',2);
       INSERT INTO t9 VALUES('three',3);
       INSERT INTO t9 VALUES('four',4);
       INSERT INTO t9 VALUES('five',5);
       INSERT INTO t9 VALUES('six',6);
       INSERT INTO t9 VALUES('seven',7);
       INSERT INTO t9 VALUES('eight',8);
       INSERT INTO t9 VALUES('nine',9);
       INSERT INTO t9 VALUES('ten',10);
       INSERT INTO t9 VALUES('eleven',11);
       SELECT y FROM t9
       WHERE x=(SELECT x FROM t9 WHERE y=1)
          OR x=(SELECT x FROM t9 WHERE y=2)
          OR x=(SELECT x FROM t9 WHERE y=3)
          OR x=(SELECT x FROM t9 WHERE y=4)
          OR x=(SELECT x FROM t9 WHERE y=5)
          OR x=(SELECT x FROM t9 WHERE y=6)
          OR x=(SELECT x FROM t9 WHERE y=7)
          OR x=(SELECT x FROM t9 WHERE y=8)
          OR x=(SELECT x FROM t9 WHERE y=9)
          OR x=(SELECT x FROM t9 WHERE y=10)
          OR x=(SELECT x FROM t9 WHERE y=11)
          OR x=(SELECT x FROM t9 WHERE y=12)
          OR x=(SELECT x FROM t9 WHERE y=13)
          OR x=(SELECT x FROM t9 WHERE y=14)
       
;BEGIN
;UPDATE t1 SET a=a||'x' WHERE 0
;UPDATE t1 SET a=a||'y' WHERE 1
;COMMIT
;INSERT INTO test VALUES(1);
    SELECT rowid, a FROM test
;INSERT INTO test VALUES(5);
    SELECT rowid, a FROM test
;INSERT INTO test VALUES(NULL);
    SELECT rowid, a FROM test
;BEGIN;
    CREATE TABLE RealTable(TestID INTEGER PRIMARY KEY, TestString TEXT);
    CREATE TEMP TABLE TempTable(TestID INTEGER PRIMARY KEY, TestString TEXT);
    CREATE TEMP TRIGGER trigTest_1 AFTER UPDATE ON TempTable BEGIN
      INSERT INTO RealTable(TestString) 
         SELECT new.TestString FROM TempTable LIMIT 1;
    END;
    INSERT INTO TempTable(TestString) VALUES ('1');
    INSERT INTO TempTable(TestString) VALUES ('2');
    UPDATE TempTable SET TestString = TestString + 1 WHERE TestID=1 OR TestId=2;
    COMMIT;
    SELECT TestString FROM RealTable ORDER BY 1
;CREATE TABLE t19 AS SELECT 1, 2 AS '', 3;
  SELECT * FROM t19
;CREATE TABLE t19b AS SELECT 4 AS '', 5 AS '',  6 AS '';
  SELECT * FROM t19b
;CREATE TABLE t19c(x TEXT);
  CREATE TABLE t19d AS SELECT * FROM t19c UNION ALL SELECT 1234;
  SELECT x, typeof(x) FROM t19d
;CREATE TABLE t0(x INTEGER DEFAULT(0==0) NOT NULL);
  REPLACE INTO t0(x) VALUES('');
  SELECT rowid, quote(x) FROM t0
;SELECT ""+3 FROM (SELECT ""+5)
;CREATE TABLE t1(x);
  PRAGMA writable_schema=ON;
  UPDATE sqlite_master SET sql='CREATE table t(d CHECK(T(#0)';
  BEGIN;
  CREATE TABLE t2(y);
  ROLLBACK;
  DROP TABLE IF EXISTS t3;