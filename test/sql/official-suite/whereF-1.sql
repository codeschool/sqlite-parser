-- original: whereF.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA automatic_index = 0;
  CREATE TABLE t1(a, b, c);
  CREATE TABLE t2(d, e, f);
  CREATE UNIQUE INDEX i1 ON t1(a);
  CREATE UNIQUE INDEX i2 ON t2(d)
;DROP TABLE t1;
  DROP TABLE t2;
  CREATE TABLE t1(a, b, c);
  CREATE TABLE t2(d, e, f);

  CREATE UNIQUE INDEX i1 ON t1(a);
  CREATE UNIQUE INDEX i2 ON t1(b);
  CREATE UNIQUE INDEX i3 ON t2(d)
;DROP TABLE t1;
  DROP TABLE t2;
  CREATE TABLE t1(a, b, c);
  CREATE TABLE t2(d, e, f);

  CREATE UNIQUE INDEX i1 ON t1(a, b);
  CREATE INDEX i2 ON t2(d)
;CREATE TABLE t4(a,b,c,d,e, PRIMARY KEY(a,b,c));
  CREATE INDEX t4adc ON t4(a,d,c);
  CREATE UNIQUE INDEX t4aebc ON t4(a,e,b,c);
  EXPLAIN QUERY PLAN SELECT rowid FROM t4 WHERE a=? AND b=?;