-- original: tkt3810.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(x);
    INSERT INTO t1 VALUES(123);
    SELECT * FROM t1;
    CREATE TABLE t2(y);
    CREATE TABLE t3(z)
;SELECT * FROM t1
;DROP TABLE t1
;CREATE TEMP TRIGGER r1 AFTER INSERT ON t1 BEGIN
       INSERT INTO t2 VALUES(new.rowid);
     END
;SELECT name FROM sqlite_temp_master ORDER BY name
;CREATE TABLE t1(x)
;DROP TABLE t1
;SELECT name FROM sqlite_temp_master;