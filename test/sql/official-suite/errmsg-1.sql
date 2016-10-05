-- original: errmsg.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a PRIMARY KEY, b UNIQUE);
  INSERT INTO t1 VALUES('abc', 'def')
;CREATE TABLE t2(a PRIMARY KEY, b UNIQUE);
  INSERT INTO t2 VALUES('abc', 'def')
;CREATE TABLE t2(a PRIMARY KEY, b UNIQUE);
  INSERT INTO t2 VALUES('abc', 'def');