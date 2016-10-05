-- original: mallocI.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a,b,c,d);
  CREATE VIEW v1 AS SELECT a*b, c*d FROM t1 ORDER BY b-d
;CREATE TABLE t1(a,b,c)
;CREATE TABLE t1(a, b, c);
    CREATE TABLE t2(a, b, c);