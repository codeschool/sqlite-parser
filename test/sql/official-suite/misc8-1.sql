-- original: misc8.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a,b,c);
  INSERT INTO t1 VALUES(1,2,3),(4,5,6);
  SELECT quote(eval('SELECT * FROM t1 ORDER BY a','-abc-'))
;SELECT quote(eval('SELECT * FROM t1 ORDER BY a'))
;INSERT INTO t1 VALUES(7,null,9);
  SELECT eval('SELECT * FROM t1 ORDER BY a',',')
;CREATE TABLE t1(a INTEGER PRIMARY KEY, b INTEGER) WITHOUT ROWID;
  CREATE TABLE t2(c INTEGER PRIMARY KEY, d INTEGER, x BLOB);
  INSERT INTO t1 VALUES(0,0);
  INSERT INTO t1 VALUES(10,10);
  INSERT INTO t2 VALUES(1,1,zeroblob(200));
  INSERT INTO t2 VALUES(2,2,zeroblob(200));
  INSERT INTO t2 VALUES(3,3,zeroblob(200));
  INSERT INTO t2 VALUES(4,4,zeroblob(200));
  INSERT INTO t2 VALUES(5,5,zeroblob(200));
  INSERT INTO t2 VALUES(6,6,zeroblob(200));
  INSERT INTO t2 VALUES(7,7,zeroblob(200));
  INSERT INTO t2 VALUES(8,8,zeroblob(200));
  INSERT INTO t2 VALUES(9,9,zeroblob(200));
  INSERT INTO t2 VALUES(10,10,zeroblob(200));
  SELECT a, c, eval(
      printf('DELETE FROM t2 WHERE c=%d AND %d>5', a+c, a+c)
  ) FROM t1, t2;