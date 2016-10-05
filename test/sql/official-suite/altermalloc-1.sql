-- original: altermalloc.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a, b VARCHAR, c INTEGER);
      CREATE VIRTUAL TABLE t1echo USING echo(t1);