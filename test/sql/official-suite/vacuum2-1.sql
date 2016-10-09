-- original: vacuum2.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(x INTEGER PRIMARY KEY AUTOINCREMENT, y);
    DROP TABLE t1;
    VACUUM
;CREATE TABLE t1(x);
    CREATE TABLE t2(y);
    INSERT INTO t1 VALUES(1)
;VACUUM
;pragma page_size
;INSERT INTO t1 VALUES('hello');
    INSERT INTO t2 VALUES('out there')
;PRAGMA auto_vacuum=FULL;
      VACUUM
;PRAGMA integrity_check
;PRAGMA integrity_check
;PRAGMA auto_vacuum=NONE;
    VACUUM
;PRAGMA integrity_check
;PRAGMA integrity_check
;pragma auto_vacuum=1;
      create table t(a, b);
      insert into t values(1, 2);
      insert into t values(1, 2);
      pragma auto_vacuum=0;
      vacuum;
      pragma auto_vacuum
;pragma auto_vacuum=1;
      vacuum;
      pragma auto_vacuum
;pragma integrity_check
;pragma auto_vacuum
;pragma auto_vacuum=2;
      vacuum;
      pragma auto_vacuum
;pragma integrity_check
;pragma auto_vacuum
;CREATE TABLE t1(a PRIMARY KEY, b UNIQUE);
  INSERT INTO t1 VALUES(1, randomblob(500));
  INSERT INTO t1 SELECT a+1, randomblob(500) FROM t1;      -- 2
  INSERT INTO t1 SELECT a+2, randomblob(500) FROM t1;      -- 4 
  INSERT INTO t1 SELECT a+4, randomblob(500) FROM t1;      -- 8 
  INSERT INTO t1 SELECT a+8, randomblob(500) FROM t1;      -- 16
;SELECT a, b FROM t1 WHERE a<=10
;CREATE TABLE t6(x PRIMARY KEY COLLATE cmp, y) WITHOUT ROWID;
  CREATE INDEX t6y ON t6(y);
  INSERT INTO t6 VALUES('i', 'one');
  INSERT INTO t6 VALUES('ii', 'one');
  INSERT INTO t6 VALUES('iii', 'one');