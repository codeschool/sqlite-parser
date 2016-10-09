-- original: malloc7.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a,b,c,d);
  CREATE INDEX i1 ON t1(b,c);