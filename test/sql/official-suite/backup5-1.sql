-- original: backup5.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a, b);
  CREATE TABLE t2(a, b);
  INSERT INTO t2 VALUES(1, 1);
  INSERT INTO t2 VALUES(2, 2);
  INSERT INTO t2 VALUES(3, 3)
;DROP TABLE t2;
    INSERT INTO t1 VALUES(zeroblob(1000), zeroblob(1000));
    INSERT INTO t1 VALUES(randomblob(1000), randomblob(1000));