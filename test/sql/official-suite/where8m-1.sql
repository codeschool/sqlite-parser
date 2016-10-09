-- original: where8m.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a, b, c);
  CREATE INDEX i1 ON t1(a);
  CREATE INDEX i2 ON t1(b)
;BEGIN;
    CREATE TABLE t1(a, b, c);
    CREATE INDEX i1 ON t1(a);
    CREATE INDEX i2 ON t1(b)
;INSERT INTO t1 VALUES(sub_i, sub_ii, sub_iii);