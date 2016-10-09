-- original: vtabD.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a, b);
    CREATE INDEX i1 ON t1(a);
    CREATE INDEX i2 ON t1(b);
    CREATE VIRTUAL TABLE tv1 USING echo(t1)
;INSERT INTO t1 VALUES(sub_i, sub_i*sub_i)
;SELECT * FROM tv1 WHERE a = 1 OR b = 4
;SELECT * FROM tv1 WHERE a = 1 OR b = 1
;SELECT * FROM tv1 WHERE (a > 0 AND a < 5) OR (b > 15 AND b < 65)
;SELECT * FROM tv1 WHERE a < 500 OR b = 810000
;SELECT * FROM t1 WHERE a < 500;
  SELECT * FROM t1 WHERE b = 810000 AND NOT (a < 500)
;SELECT * FROM tv1 WHERE a < 90000 OR b = 8100000000
;SELECT * FROM t1 WHERE a < 90000;
  SELECT * FROM t1 WHERE b = 8100000000 AND NOT (a < 90000)
;SELECT * FROM tv1 WHERE a = 90001 OR b = 810000;