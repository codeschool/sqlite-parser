-- original: ioerr.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT * FROM sqlite_master
;pragma auto_vacuum
;BEGIN; 
    CREATE TABLE t1(a, b, c); 
    INSERT INTO t1 VALUES(1, randstr(50,50), randstr(50,50)); 
    INSERT INTO t1 SELECT a+2, b||'-'||rowid, c||'-'||rowid FROM t1; 
    INSERT INTO t1 SELECT a+4, b||'-'||rowid, c||'-'||rowid FROM t1;
    INSERT INTO t1 SELECT a+8, b||'-'||rowid, c||'-'||rowid FROM t1;
    INSERT INTO t1 SELECT a+16, b||'-'||rowid, c||'-'||rowid FROM t1;
    INSERT INTO t1 SELECT a+32, b||'-'||rowid, c||'-'||rowid FROM t1;
    INSERT INTO t1 SELECT a+64, b||'-'||rowid, c||'-'||rowid FROM t1;
    INSERT INTO t1 SELECT a+128, b||'-'||rowid, c||'-'||rowid FROM t1;
    INSERT INTO t1 VALUES(1, randstr(600,600), randstr(600,600));
    CREATE TABLE t2 AS SELECT * FROM t1;
    CREATE TABLE t3 AS SELECT * FROM t1;
    COMMIT;
    DROP TABLE t2
;pragma auto_vacuum
;PRAGMA cache_size = 10;
    BEGIN;
    CREATE TABLE abc(a);
    INSERT INTO abc VALUES(randstr(1500,1500)); -- Page 4 is overflow
;INSERT INTO abc VALUES(randstr(100,100))
;INSERT INTO abc (a1) VALUES(NULL)
;pragma auto_vacuum
;ATTACH 'test2.db' AS test2
;ATTACH 'test2.db' as aux;
        CREATE TABLE tx(a, b);
        CREATE TABLE aux.ty(a, b)
;PRAGMA synchronous = 0;
      CREATE TABLE t1(a, b);
      INSERT INTO t1 VALUES(1, 2);
      BEGIN;
      INSERT INTO t1 VALUES(3, 4)
;SELECT * FROM t1
;CREATE TABLE t1(a,b,c);
    INSERT INTO t1 VALUES(randstr(200,200), randstr(1000,1000), 2)
;CREATE TABLE t1(a,b,c);
      INSERT INTO t1 VALUES(randstr(200,200), randstr(1000,1000), 2);
      BEGIN;
      INSERT INTO t1 VALUES(randstr(200,200), randstr(1000,1000), 2)
;COMMIT
;BEGIN;
    CREATE TABLE t1(a PRIMARY KEY, b)
;INSERT INTO t1 VALUES(:i, 'hello world')
;COMMIT
;BEGIN;
    INSERT INTO t1 VALUES('abc', 123);
    INSERT INTO t1 VALUES('def', 123);
    INSERT INTO t1 VALUES('ghi', 123);
    INSERT INTO t1 SELECT (a+500)%900, 'good string' FROM t1
;CREATE TABLE A(Id INTEGER, Name TEXT);
   INSERT INTO A(Id, Name) VALUES(1, 'Name')
;BEGIN;
    CREATE TABLE t1(a, b, c);
    INSERT INTO t1 VALUES(randstr(50,50), randstr(100,100), randstr(10,10));
    INSERT INTO t1 SELECT randstr(50,50), randstr(9,9), randstr(90,90) FROM t1;
    INSERT INTO t1 SELECT randstr(50,50), randstr(9,9), randstr(90,90) FROM t1;
    INSERT INTO t1 SELECT randstr(50,50), randstr(9,9), randstr(90,90) FROM t1;
    INSERT INTO t1 SELECT randstr(50,50), randstr(9,9), randstr(90,90) FROM t1;
    INSERT INTO t1 SELECT randstr(50,50), randstr(9,9), randstr(90,90) FROM t1
;PRAGMA page_size = 512;
     PRAGMA auto_vacuum = incremental;
     CREATE TABLE t1(x);
     INSERT INTO t1 VALUES( randomblob(1   * (512-4)) );
     INSERT INTO t1 VALUES( randomblob(110 * (512-4)) );
     INSERT INTO t1 VALUES( randomblob(2   * (512-4)) );
     INSERT INTO t1 VALUES( randomblob(110 * (512-4)) );
     INSERT INTO t1 VALUES( randomblob(3 * (512-4)) );
     DELETE FROM t1 WHERE rowid = 3;
     PRAGMA incremental_vacuum = 2;
     DELETE FROM t1 WHERE rowid = 1
;PRAGMA page_size = 1024
;CREATE TABLE t1(x)
;INSERT INTO t1 VALUES(randomblob(1100))
;INSERT INTO t1 VALUES(randomblob(2000))
;PRAGMA auto_vacuum = incremental;
  CREATE TABLE t1(x);
  CREATE TABLE t2(x);
  INSERT INTO t2 VALUES(randomblob(1500));
  INSERT INTO t2 SELECT randomblob(1500) FROM t2;
  INSERT INTO t2 SELECT randomblob(1500) FROM t2;
  INSERT INTO t2 SELECT randomblob(1500) FROM t2;
  INSERT INTO t2 SELECT randomblob(1500) FROM t2;
  INSERT INTO t2 SELECT randomblob(1500) FROM t2;
  INSERT INTO t2 SELECT randomblob(1500) FROM t2;
  INSERT INTO t2 SELECT randomblob(1500) FROM t2;
  INSERT INTO t2 SELECT randomblob(1500) FROM t2;
  INSERT INTO t1 VALUES(randomblob(20));
  INSERT INTO t1 SELECT x FROM t1;
  INSERT INTO t1 SELECT x FROM t1;
  INSERT INTO t1 SELECT x FROM t1;
  INSERT INTO t1 SELECT x FROM t1;
  INSERT INTO t1 SELECT x FROM t1;
  INSERT INTO t1 SELECT x FROM t1;             /* 64 entries in t1 */
  INSERT INTO t1 SELECT x FROM t1 LIMIT 14;    /* 78 entries in t1 */
  DELETE FROM t2 WHERE rowid = 3
;PRAGMA auto_vacuum = incremental;
  CREATE TABLE t1(x);
  CREATE TABLE t2(x);
  INSERT INTO t2 VALUES(randomblob(1500));
  INSERT INTO t2 SELECT randomblob(1500) FROM t2;
  INSERT INTO t2 SELECT randomblob(1500) FROM t2;
  INSERT INTO t2 SELECT randomblob(1500) FROM t2;
  INSERT INTO t2 SELECT randomblob(1500) FROM t2;
  INSERT INTO t2 SELECT randomblob(1500) FROM t2;
  INSERT INTO t2 SELECT randomblob(1500) FROM t2;
  INSERT INTO t2 SELECT randomblob(1500) FROM t2;
  INSERT INTO t2 SELECT randomblob(1500) FROM t2;

  -- This statement inserts a row into t1 with an overflow page at the
  -- end of the file. A long way from its parent (the root of t1).
  INSERT INTO t1 VALUES(randomblob(1500));
  DELETE FROM t2 WHERE rowid<10
;BEGIN;
    PRAGMA cache_size = 10;
    CREATE TABLE t1(a);
    CREATE INDEX i1 ON t1(a);
    CREATE TABLE t2(a)
;INSERT INTO t1 VALUES(sub_v)
;DELETE FROM t1 WHERE oid > 85;
    COMMIT
;PRAGMA auto_vacuum=INCREMENTAL;
    PRAGMA page_size=1024;
    BEGIN;
    CREATE TABLE t1(x);
    INSERT INTO t1 VALUES(zeroblob(900));
    INSERT INTO t1 VALUES(zeroblob(900));
    INSERT INTO t1 SELECT x FROM t1;
    INSERT INTO t1 SELECT x FROM t1;
    INSERT INTO t1 SELECT x FROM t1;
    INSERT INTO t1 SELECT x FROM t1;
    INSERT INTO t1 SELECT x FROM t1;
    INSERT INTO t1 SELECT x FROM t1;
    INSERT INTO t1 SELECT x FROM t1;
    DELETE FROM t1 WHERE rowid>202;
    COMMIT;
    VACUUM;
    PRAGMA cache_size = 10;
    BEGIN;
    DELETE FROM t1 WHERE rowid IN (10,11,12) ;