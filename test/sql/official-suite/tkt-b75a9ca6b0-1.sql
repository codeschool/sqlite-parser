-- original: tkt-b75a9ca6b0.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1 (x, y);
  INSERT INTO t1 VALUES (1, 3); 
  INSERT INTO t1 VALUES (2, 2);
  INSERT INTO t1 VALUES (3, 1)
;CREATE INDEX i1 ON t1(x, y);