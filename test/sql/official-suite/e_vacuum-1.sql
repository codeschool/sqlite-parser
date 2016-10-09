-- original: e_vacuum.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA page_size = 1024
;CREATE TABLE t1(a PRIMARY KEY, b UNIQUE);
      INSERT INTO t1 VALUES(1, randomblob(400));
      INSERT INTO t1 SELECT a+1,  randomblob(400) FROM t1;
      INSERT INTO t1 SELECT a+2,  randomblob(400) FROM t1;
      INSERT INTO t1 SELECT a+4,  randomblob(400) FROM t1;
      INSERT INTO t1 SELECT a+8,  randomblob(400) FROM t1;
      INSERT INTO t1 SELECT a+16, randomblob(400) FROM t1;
      INSERT INTO t1 SELECT a+32, randomblob(400) FROM t1;
      INSERT INTO t1 SELECT a+64, randomblob(400) FROM t1;

      CREATE TABLE t2(a PRIMARY KEY, b UNIQUE);
      INSERT INTO t2 SELECT * FROM t1
;CREATE VIRTUAL TABLE temp.stat USING dbstat
;SELECT pageno FROM stat WHERE name = 't1' ORDER BY pageno
;DROP TABLE temp.stat
;VACUUM
;DELETE FROM t1 WHERE a%2;
    INSERT INTO t1 SELECT b, a FROM t2 WHERE a%2;
    UPDATE t1 SET b=randomblob(600) WHERE (a%2)==0
;VACUUM
;PRAGMA page_size ; PRAGMA auto_vacuum
;PRAGMA page_size = 2048
;PRAGMA auto_vacuum = NONE
;PRAGMA page_size ; PRAGMA auto_vacuum
;PRAGMA journal_mode = delete
;PRAGMA page_size = 2048
;PRAGMA auto_vacuum = NONE
;PRAGMA page_size ; PRAGMA auto_vacuum
;PRAGMA journal_mode = wal
;PRAGMA page_size ; PRAGMA auto_vacuum
;PRAGMA page_size = 1024
;PRAGMA auto_vacuum = FULL
;PRAGMA page_size ; PRAGMA auto_vacuum
;ATTACH 'test.db2' AS aux;
  PRAGMA aux.page_size = 1024;
  CREATE TABLE aux.t3 AS SELECT * FROM t1;
  DELETE FROM t3
;VACUUM
;VACUUM aux
;VACUUM 'test.db2'
;CREATE TABLE t4(x);
  INSERT INTO t4(x) VALUES('x');
  INSERT INTO t4(x) VALUES('y');
  INSERT INTO t4(x) VALUES('z');
  DELETE FROM t4 WHERE x = 'y';
  SELECT rowid, x FROM t4
;VACUUM;
  SELECT rowid, x FROM t4
;CREATE TABLE t5(x, y INTEGER PRIMARY KEY);
  INSERT INTO t5(x) VALUES('x');
  INSERT INTO t5(x) VALUES('y');
  INSERT INTO t5(x) VALUES('z');
  DELETE FROM t5 WHERE x = 'y';
  SELECT rowid, x FROM t5
;VACUUM;
  SELECT rowid, x FROM t5
;BEGIN
;COMMIT
;VACUUM
;SAVEPOINT x
;COMMIT
;VACUUM
;SELECT a FROM t1
;PRAGMA auto_vacuum
;DELETE FROM t1;
    DELETE FROM t2
;DELETE FROM t1;
    DELETE FROM t2;
    PRAGMA incremental_vacuum;