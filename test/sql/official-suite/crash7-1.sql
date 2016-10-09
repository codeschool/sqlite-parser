-- original: crash7.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT count(*), md5sum(a), md5sum(b), md5sum(c) FROM abc
;CREATE TABLE t1(a, b, UNIQUE(a, b));
  INSERT INTO t1 VALUES(randomblob(100), randomblob(100));
  INSERT INTO t1 SELECT randomblob(100), randomblob(100) FROM t1;
  INSERT INTO t1 SELECT randomblob(100), randomblob(100) FROM t1;
  INSERT INTO t1 SELECT randomblob(100), randomblob(100) FROM t1;
  INSERT INTO t1 SELECT randomblob(100), randomblob(100) FROM t1;
  INSERT INTO t1 SELECT randomblob(100), randomblob(100) FROM t1;
  INSERT INTO t1 SELECT randomblob(100), randomblob(100) FROM t1;
  INSERT INTO t1 SELECT randomblob(100), randomblob(100) FROM t1;
  INSERT INTO t1 SELECT randomblob(100), randomblob(100) FROM t1;
  INSERT INTO t1 SELECT randomblob(100), randomblob(100) FROM t1;
  INSERT INTO t1 SELECT randomblob(100), randomblob(100) FROM t1;
  INSERT INTO t1 SELECT randomblob(100), randomblob(100) FROM t1;
  INSERT INTO t1 SELECT randomblob(100), randomblob(100) FROM t1;
  INSERT INTO t1 SELECT randomblob(100), randomblob(100) FROM t1;
  INSERT INTO t1 SELECT randomblob(100), randomblob(100) FROM t1;
  DELETE FROM t1 WHERE rowid%2;