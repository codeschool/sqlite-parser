-- original: update.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT * FROM test1 WHERE f2==89 ORDER BY f1,f2
;SELECT * FROM test1 WHERE f2==88 ORDER BY f1,f2
;UPDATE test1 SET f1=f1+1 WHERE f2==128
;SELECT * FROM test1 ORDER BY f1,f2
;SELECT * FROM test1 WHERE f1==78 ORDER BY f1,f2
;SELECT * FROM test1 WHERE f1==778 ORDER BY f1,f2
;SELECT * FROM test1 WHERE f1==8 ORDER BY f1,f2
;UPDATE test1 SET f1=f1-1 WHERE f1>100 and f2==128
;SELECT * FROM test1 ORDER BY f1,f2
;SELECT * FROM test1 WHERE f1==78 ORDER BY f1,f2
;SELECT * FROM test1 WHERE f1==778 ORDER BY f1,f2
;SELECT * FROM test1 WHERE f1==777 ORDER BY f1,f2
;SELECT * FROM test1 WHERE f1==8 ORDER BY f1,f2
;UPDATE test1 SET f1=f1-1 WHERE f1<=100 and f2==128
;SELECT * FROM test1 ORDER BY f1,f2
;SELECT * FROM test1 WHERE f1==77 ORDER BY f1,f2
;SELECT * FROM test1 WHERE f1==778 ORDER BY f1,f2
;SELECT * FROM test1 WHERE f1==777 ORDER BY f1,f2
;SELECT * FROM test1 WHERE f1==8 ORDER BY f1,f2
;DROP TABLE test1;
    CREATE TABLE t1(
       a integer primary key,
       b UNIQUE, 
       c, d,
       e, f,
       UNIQUE(c,d)
    );
    INSERT INTO t1 VALUES(1,2,3,4,5,6);
    INSERT INTO t1 VALUES(2,3,4,4,6,7);
    SELECT * FROM t1
;UPDATE t1 SET e=e+1 WHERE b IN (SELECT b FROM t1);
      SELECT b,e FROM t1
;UPDATE t1 SET e=e+1 WHERE a IN (SELECT a FROM t1);
      SELECT a,e FROM t1
;BEGIN;
    CREATE TABLE t2(a);
    INSERT INTO t2 VALUES(1);
    INSERT INTO t2 VALUES(2);
    INSERT INTO t2 SELECT a+2 FROM t2;
    INSERT INTO t2 SELECT a+4 FROM t2;
    INSERT INTO t2 SELECT a+8 FROM t2;
    INSERT INTO t2 SELECT a+16 FROM t2;
    INSERT INTO t2 SELECT a+32 FROM t2;
    INSERT INTO t2 SELECT a+64 FROM t2;
    INSERT INTO t2 SELECT a+128 FROM t2;
    INSERT INTO t2 SELECT a+256 FROM t2;
    INSERT INTO t2 SELECT a+512 FROM t2;
    INSERT INTO t2 SELECT a+1024 FROM t2;
    COMMIT;
    SELECT count(*) FROM t2
;SELECT count(*) FROM t2 WHERE a=rowid
;UPDATE t2 SET rowid=rowid-1;
    SELECT count(*) FROM t2 WHERE a=rowid+1
;UPDATE t2 SET rowid=rowid+10000;
    UPDATE t2 SET rowid=rowid-9999;
    SELECT count(*) FROM t2 WHERE a=rowid
;BEGIN;
    INSERT INTO t2 SELECT a+2048 FROM t2;
    INSERT INTO t2 SELECT a+4096 FROM t2;
    INSERT INTO t2 SELECT a+8192 FROM t2;
    SELECT count(*) FROM t2 WHERE a=rowid;
    COMMIT
;UPDATE t2 SET rowid=rowid-1;
    SELECT count(*) FROM t2 WHERE a=rowid+1
;CREATE TABLE t3(a,b,c);
    CREATE TRIGGER t3r1 BEFORE UPDATE on t3 WHEN nosuchcol BEGIN
      SELECT 'illegal WHEN clause';
    END
;CREATE TABLE t4(a,b,c);
    CREATE TRIGGER t4r1 AFTER UPDATE on t4 WHEN nosuchcol BEGIN
      SELECT 'illegal WHEN clause';
    END
;CREATE TABLE t15(a INTEGER PRIMARY KEY, b);
  INSERT INTO t15(a,b) VALUES(10,'abc'),(20,'def'),(30,'ghi');
  ALTER TABLE t15 ADD COLUMN c;
  CREATE INDEX t15c ON t15(c);
  INSERT INTO t15(a,b)
   VALUES(5,'zyx'),(15,'wvu'),(25,'tsr'),(35,'qpo');
  UPDATE t15 SET c=printf("y%d",a) WHERE c IS NULL;
  SELECT a,b,c,'|' FROM t15 ORDER BY a;