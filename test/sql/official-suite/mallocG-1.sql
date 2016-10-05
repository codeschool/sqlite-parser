-- original: mallocG.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(x, y);
  CREATE TABLE t2(x INTEGER PRIMARY KEY)
;CREATE TABLE t1(x UNIQUE);
  INSERT INTO t1 VALUES ('hello');
  INSERT INTO t1 VALUES ('out there');