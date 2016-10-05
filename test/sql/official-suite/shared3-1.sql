-- original: shared3.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA encoding=UTF16;
    CREATE TABLE t1(x,y);
    INSERT INTO t1 VALUES('abc','This is a test string')
;SELECT * FROM t1
;SELECT y FROM t1 WHERE x='abc'
;PRAGMA main.cache_size = 10
;PRAGMA main.cache_size
;PRAGMA main.cache_size
;PRAGMA main.cache_size
;PRAGMA main.cache_size
;BEGIN;
    INSERT INTO t1 VALUES(10, randomblob(5000))
;INSERT INTO t1 VALUES(10, randomblob(10000))
;PRAGMA auto_vacuum = 2;
  CREATE TABLE t1(x, y);
  INSERT INTO t1 VALUES(randomblob(500), randomblob(500));
  INSERT INTO t1 SELECT randomblob(500), randomblob(500) FROM t1;
  INSERT INTO t1 SELECT randomblob(500), randomblob(500) FROM t1;
  INSERT INTO t1 SELECT randomblob(500), randomblob(500) FROM t1;
  INSERT INTO t1 SELECT randomblob(500), randomblob(500) FROM t1;
  INSERT INTO t1 SELECT randomblob(500), randomblob(500) FROM t1;
  INSERT INTO t1 SELECT randomblob(500), randomblob(500) FROM t1;
  INSERT INTO t1 SELECT randomblob(500), randomblob(500) FROM t1
;SELECT count(*) FROM sqlite_master
;BEGIN;
    DELETE FROM t1 WHERE 1;
    PRAGMA incremental_vacuum
;SELECT count(*) FROM sqlite_master
;COMMIT;