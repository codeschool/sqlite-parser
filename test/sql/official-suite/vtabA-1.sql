-- original: vtabA.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA table_info(sub_table)
;CREATE TABLE t1(a, b HIDDEN VARCHAR, c INTEGER)
;CREATE VIRTUAL TABLE t1e USING echo(t1)
;PRAGMA table_info(t1e)
;SELECT a, b, c FROM t1e
;SELECT * FROM t1e
;DELETE FROM t1e;
  INSERT INTO t1e SELECT 'abc','def'
;INSERT INTO t1e VALUES('ghi','jkl'),('mno','pqr'),('stu','vwx')
;SELECT a,b,c, '|' FROM t1e ORDER BY 1
;INSERT INTO t1e SELECT * FROM t1e
;SELECT * FROM t1e ORDER BY 1
;DROP TABLE IF EXISTS t1e
;DROP TABLE IF EXISTS t1
;CREATE VIRTUAL TABLE t1e USING echo(t1)
;DROP TABLE IF EXISTS t1;
    DROP TABLE IF EXISTS t2;
    CREATE TABLE t1(a,b);
    INSERT INTO t1 VALUES(1,2);
    CREATE TABLE t2(x,y);
    INSERT INTO t2 VALUES(3,4);
    CREATE VIRTUAL TABLE vt1 USING echo(t1);
    CREATE VIRTUAL TABLE vt2 USING echo(t2);
    UPDATE vt2 SET x=(SELECT a FROM vt1 WHERE b=2) WHERE y=4;
    SELECT * FROM t2;