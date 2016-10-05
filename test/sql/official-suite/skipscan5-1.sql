-- original: skipscan5.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a INT, b INT, c INT);
  CREATE INDEX i1 ON t1(a, b)
;INSERT INTO t1 VALUES(sub_a, sub_b, NULL)
;INSERT INTO t2 VALUES(sub_a, sub_b, sub_c, sub_d)
;CREATE TABLE t3(a, b, c);
  CREATE INDEX i3 ON t3(a, b)
;INSERT INTO t3 VALUES(sub_c % 2, sub_v, sub_c);