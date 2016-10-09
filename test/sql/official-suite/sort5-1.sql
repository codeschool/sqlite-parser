-- original: sort5.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA mmap_size = 10000000;
  PRAGMA cache_size = 10;
  CREATE TABLE t1(a, b)
;INSERT INTO t1 VALUES(sub_i, randomblob(2000))
;CREATE INDEX i1 ON t1(b);