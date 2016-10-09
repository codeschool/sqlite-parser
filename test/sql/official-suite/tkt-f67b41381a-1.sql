-- original: tkt-f67b41381a.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a);
  INSERT INTO t1 VALUES(1);
  ALTER TABLE t1 ADD COLUMN b DEFAULT 2;
  CREATE TABLE t2(a, b);
  INSERT INTO t2 SELECT * FROM t1;
  SELECT * FROM t2
;DROP TABLE t1; DROP TABLE t2
;EXPLAIN INSERT INTO t1 SELECT * FROM t2;