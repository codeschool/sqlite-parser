-- original: corruptH.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA page_size=1024;

  CREATE TABLE t1(a INTEGER PRIMARY KEY, b);
  INSERT INTO t1 VALUES(1, 'one');
  INSERT INTO t1 VALUES(2, 'two');

  CREATE TABLE t2(x);
  INSERT INTO t2 VALUES(randomblob(200));
  INSERT INTO t2 SELECT randomblob(200) FROM t2;
  INSERT INTO t2 SELECT randomblob(200) FROM t2;
  INSERT INTO t2 SELECT randomblob(200) FROM t2;
  INSERT INTO t2 SELECT randomblob(200) FROM t2;
  INSERT INTO t2 SELECT randomblob(200) FROM t2;
  INSERT INTO t2 SELECT randomblob(200) FROM t2
;SELECT name, rootpage FROM sqlite_master
;PRAGMA secure_delete=1
;PRAGMA auto_vacuum=0;
  PRAGMA page_size=1024;

  CREATE TABLE t1(a INTEGER PRIMARY KEY, b);
  INSERT INTO t1 VALUES(1, 'one');
  INSERT INTO t1 VALUES(2, 'two');

  CREATE TABLE t3(x);

  CREATE TABLE t2(x PRIMARY KEY) WITHOUT ROWID;
  INSERT INTO t2 VALUES(randomblob(100));

  DROP TABLE t3
;SELECT name, rootpage FROM sqlite_master
;SELECT * FROM t1 WHERE a IN (1, 2)
;INSERT INTO t2 SELECT randomblob(100) FROM t2;
      INSERT INTO t2 SELECT randomblob(100) FROM t2;
      INSERT INTO t2 SELECT randomblob(100) FROM t2;
      INSERT INTO t2 SELECT randomblob(100) FROM t2;
      INSERT INTO t2 SELECT randomblob(100) FROM t2
;PRAGMA page_size=1024;

  CREATE TABLE t1(a INTEGER PRIMARY KEY, b);
  INSERT INTO t1 VALUES(1, 'one');
  INSERT INTO t1 VALUES(2, 'two');

  CREATE TABLE t2(c INTEGER PRAGMA KEY, d);
  INSERT INTO t2 VALUES(1, randomblob(1100))
;SELECT name, rootpage FROM sqlite_master;