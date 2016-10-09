-- original: wal64k.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA journal_mode = WAL;
  CREATE TABLE t1(x);
  CREATE INDEX i1 ON t1(x)
;INSERT INTO t1 VALUES( randstr(900,1100) );