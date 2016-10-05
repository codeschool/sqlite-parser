-- original: e_blobwrite.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a INTEGER PRIMARY KEY, t TEXT);
  INSERT INTO t1 VALUES(-1, sub_dots);
  INSERT INTO t1 VALUES(-2, sub_dots);
  INSERT INTO t1 VALUES(-3, sub_dots);
  INSERT INTO t1 VALUES(-4, sub_dots);
  INSERT INTO t1 VALUES(-5, sub_dots);
  INSERT INTO t1 VALUES(-6, sub_dots)
;CREATE TABLE t2(a TEXT, b INTEGER PRIMARY KEY);
  INSERT INTO t2 VALUES(sub_dots, 43);
  INSERT INTO t2 VALUES(sub_dots, 44);
  INSERT INTO t2 VALUES(sub_dots, 45)
;DELETE FROM t2 WHERE b=43
;SELECT 1, 2, 3
;CREATE TABLE t3(i INTEGER PRIMARY KEY, j TEXT, k TEXT);
  INSERT INTO t3 VALUES(1, sub_dots, sub_dots);
  INSERT INTO t3 VALUES(2, sub_dots, sub_dots);
  SELECT * FROM t3 WHERE i=1
;UPDATE t3 SET k = 'xyz' WHERE i=1;
  SELECT * FROM t3 WHERE i=1
;SELECT * FROM t3 WHERE i=1
;UPDATE t3 SET j = 'xyz' WHERE i=2;
  SELECT * FROM t3 WHERE i=2
;SELECT * FROM t3 WHERE i=2;