-- original: cffault.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a PRIMARY KEY, b);
  CREATE INDEX i1 ON t1(b);
  INSERT INTO t1 VALUES(1, 2);
  INSERT INTO t1 VALUES(3, 4);
  INSERT INTO t1 VALUES(5, 6);
  INSERT INTO t1 VALUES(7, 8)
;BEGIN;
      UPDATE t1 SET b=b+1
;BEGIN;
      UPDATE t1 SET b=b+1
;SELECT * FROM t1
;CREATE TABLE t1(a PRIMARY KEY, b, c);
  CREATE INDEX i1 ON t1(b);
  CREATE INDEX i2 ON t1(c, b);
  INSERT INTO t1 VALUES(1, 2,  randomblob(600));
  INSERT INTO t1 VALUES(3, 4,  randomblob(600));
  INSERT INTO t1 VALUES(5, 6,  randomblob(600));
  INSERT INTO t1 VALUES(7, 8,  randomblob(600));
  INSERT INTO t1 VALUES(9, 10, randomblob(600))
;BEGIN;
      UPDATE t1 SET b=b+1
;SELECT * FROM t1
;INSERT INTO t1 VALUES(11, 12, randomblob(600))
;BEGIN;
      UPDATE t1 SET b=b+1
;SELECT * FROM t1
;BEGIN;
      UPDATE t1 SET b=b-1
;INSERT INTO t1 VALUES(11, 12, randomblob(600))
;BEGIN;
      UPDATE t1 SET b=b-1
;SELECT a, b FROM t1;