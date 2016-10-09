-- original: e_totalchanges.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a, b);
  CREATE INDEX t1_b ON t1(b);
  CREATE TABLE t2(x, y, PRIMARY KEY(x, y)) WITHOUT ROWID;
  CREATE INDEX t2_y ON t2(y)
;DELETE FROM t1;
  DELETE FROM t2;