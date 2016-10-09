-- original: tkt-313723c356.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA page_size = 1024;
  PRAGMA journal_mode = WAL;
  CREATE TABLE t1(a, b);
  CREATE INDEX i1 ON t1(a, b);
  INSERT INTO t1 VALUES(randomblob(400), randomblob(400));
  INSERT INTO t1 SELECT randomblob(400), randomblob(400) FROM t1;
  INSERT INTO t1 SELECT randomblob(400), randomblob(400) FROM t1;
  INSERT INTO t1 SELECT randomblob(400), randomblob(400) FROM t1;
  INSERT INTO t1 SELECT randomblob(400), randomblob(400) FROM t1
;SELECT * FROM t1
;UPDATE t1 SET a = randomblob(399)
;SELECT min(rowid) FROM t1;