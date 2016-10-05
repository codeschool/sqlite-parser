-- original: table.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE test1 (
      one varchar(10),
      two text
    )
;SELECT sql FROM sqlite_master WHERE type!='meta'
;SELECT name, tbl_name, type FROM sqlite_master WHERE type!='meta'
;SELECT name, tbl_name, type from sqlite_master WHERE type!='meta'
;DROP TABLE test1
;SELECT * FROM sqlite_master WHERE type!='meta'
;SELECT name FROM sqlite_master WHERE type!='meta'
;CREATE TABLE "create" (f1 int)
;SELECT name FROM sqlite_master WHERE type!='meta'
;DROP TABLE "create"
;SELECT name FROM "sqlite_master" WHERE type!='meta'
;CREATE TABLE test1("f1 ho" int)
;SELECT name as "X" FROM sqlite_master WHERE type!='meta'
;DROP TABLE "TEST1"
;SELECT name FROM "sqlite_master" WHERE type!='meta'
;CREATE TABLE TEST2(one text)
;DROP TABLE test2; SELECT name FROM sqlite_master WHERE type!='meta'
;CREATE TABLE test2(one text)
;CREATE INDEX test3 ON test2(one)
;SELECT name FROM sqlite_master WHERE type!='meta' ORDER BY name
;DROP INDEX test3
;SELECT name FROM sqlite_master WHERE type!='meta' ORDER BY name
;DROP TABLE test2; DROP TABLE test3
;SELECT name FROM sqlite_master WHERE type!='meta' ORDER BY name
;SELECT sql FROM sqlite_master WHERE type=='table'
;DROP TABLE big
;SELECT name FROM sqlite_master WHERE type!='meta'
;SELECT name FROM sqlite_master WHERE type!='meta' ORDER BY name
;SELECT name FROM sqlite_master WHERE type!='meta' ORDER BY name
;SELECT name FROM sqlite_master WHERE type!='meta' ORDER BY name
;SELECT name FROM sqlite_master WHERE type!='meta' ORDER BY name
;ANALYZE;
    DROP TABLE IF EXISTS sqlite_stat1;
    DROP TABLE IF EXISTS sqlite_stat2;
    DROP TABLE IF EXISTS sqlite_stat3;
    DROP TABLE IF EXISTS sqlite_stat4;
    SELECT name FROM sqlite_master WHERE name GLOB 'sqlite_stat*'
;CREATE TABLE t0(a,b);
    CREATE INDEX t ON t0(a);
    PRAGMA writable_schema=ON;
    UPDATE sqlite_master SET sql='CREATE TABLE a.b(a UNIQUE';
    BEGIN;
    CREATE TABLE t1(x);
    ROLLBACK;
    DROP TABLE IF EXISTS t99
;EXPLAIN CREATE TABLE test1(f1 int)
;SELECT name FROM sqlite_master WHERE type!='meta'
;CREATE TABLE test1(f1 int)
;EXPLAIN DROP TABLE test1
;SELECT name FROM sqlite_master WHERE type!='meta'
;INSERT INTO weird VALUES('a','b',9,0,'xyz','hi','y''all');
    SELECT * FROM weird
;CREATE TABLE savepoint(release);
    INSERT INTO savepoint(release) VALUES(10);
    UPDATE savepoint SET release = 5;
    SELECT release FROM savepoint
;SELECT sql FROM sqlite_master WHERE name='t2'
;CREATE TABLE "t3""xyz"(a,b,c);
    INSERT INTO [t3"xyz] VALUES(1,2,3);
    SELECT * FROM [t3"xyz]
;SELECT sql FROM sqlite_master WHERE name='t4"abc'
;CREATE TABLE t10("col.1" [char.3]);
    CREATE TABLE t11 AS SELECT * FROM t10;
    SELECT sql FROM sqlite_master WHERE name = 't11'
;CREATE TABLE t12(
      a INTEGER,
      b VARCHAR(10),
      c VARCHAR(1,10),
      d VARCHAR(+1,-10),
      e VARCHAR (+1,-10),
      f "VARCHAR (+1,-10, 5)",
      g BIG INTEGER
    );
    CREATE TABLE t13 AS SELECT * FROM t12;
    SELECT sql FROM sqlite_master WHERE name = 't13'
;CREATE TABLE t7(
       a integer primary key,
       b number(5,10),
       c character varying (8),
       d VARCHAR(9),
       e clob,
       f BLOB,
       g Text,
       h
    );
    INSERT INTO t7(a) VALUES(1);
    SELECT typeof(a), typeof(b), typeof(c), typeof(d),
           typeof(e), typeof(f), typeof(g), typeof(h)
    FROM t7 LIMIT 1
;SELECT typeof(a+b), typeof(a||b), typeof(c+d), typeof(c||d)
    FROM t7 LIMIT 1
;CREATE TABLE t8 AS SELECT b, h, a as i, (SELECT f FROM t7) as j FROM t7
;CREATE TABLE t8 AS SELECT b, h, a as i, f as j FROM t7
;SELECT sql FROM sqlite_master WHERE tbl_name = 't8'
;CREATE TABLE tablet8(
       a integer primary key,
       tm text DEFAULT CURRENT_TIME,
       dt text DEFAULT CURRENT_DATE,
       dttm text DEFAULT CURRENT_TIMESTAMP
    );
    SELECT * FROM tablet8
;ATTACH 'test2.db' as aux
;SELECT * FROM tablet8 LIMIT 1
;CREATE TABLE aux.t1(a, b, c)
;BEGIN
;CREATE TABLE tblsub_i (a, b, c)
;COMMIT
;BEGIN
;DROP TABLE tblsub_i
;COMMIT
;CREATE TABLE t16(x DEFAULT(max(1)));
  INSERT INTO t16(x) VALUES(123);
  SELECT rowid, x FROM t16
;DROP TABLE t16;
  CREATE TABLE t16(x DEFAULT(abs(1)));
  INSERT INTO t16(rowid) VALUES(4);
  SELECT rowid, x FROM t16
;DROP TABLE IF EXISTS t1;
  CREATE TABLE t1(a TEXT);
  INSERT INTO t1(a) VALUES(1),(2);
  DROP TABLE IF EXISTS t2;
  CREATE TABLE t2(x TEXT, y TEXT);
  INSERT INTO t2(x,y) VALUES(3,4);
  DROP TABLE IF EXISTS t3;
  CREATE TABLE t3 AS
    SELECT a AS p, coalesce(y,a) AS q FROM t1 LEFT JOIN t2 ON a=x;
  SELECT p, q, '|' FROM t3 ORDER BY p
;COMMIT;
  PRAGMA integrity_check
;CREATE TABLE t19 AS SELECT * FROM sqlite_master;
  SELECT name FROM t19 ORDER BY name;