-- original: vtabI.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a, b, c, d, e);
  CREATE VIRTUAL TABLE e1 USING echo(t1)
;CREATE VIRTUAL TABLE e2 USING echo(t2);