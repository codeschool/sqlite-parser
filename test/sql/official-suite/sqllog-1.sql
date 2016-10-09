-- original: sqllog.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(x, y);
  INSERT INTO t1 VALUES(1, 2);
  INSERT INTO t1 VALUES(sub_a, sub_b);
  SELECT * FROM t1
;INSERT INTO t1 VALUES(4, 5);
  SELECT * FROM t1
;INSERT INTO t1 VALUES(6, 7);
  SELECT * FROM t1;