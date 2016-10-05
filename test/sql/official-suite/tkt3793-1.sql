-- original: tkt3793.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

BEGIN;
    CREATE TABLE t1(a, b);
    CREATE TABLE t2(a PRIMARY KEY, b);
    INSERT INTO t1 VALUES(randstr(50,50), randstr(50,50));
    INSERT INTO t1 SELECT randstr(50,50), randstr(50,50) FROM t1;
    INSERT INTO t1 SELECT randstr(50,50), randstr(50,50) FROM t1;
    INSERT INTO t1 SELECT randstr(50,50), randstr(50,50) FROM t1;
    INSERT INTO t1 SELECT randstr(50,50), randstr(50,50) FROM t1;
    INSERT INTO t1 SELECT randstr(50,50), randstr(50,50) FROM t1;
    INSERT INTO t1 SELECT randstr(50,50), randstr(50,50) FROM t1;
    INSERT INTO t1 SELECT randstr(50,50), randstr(50,50) FROM t1;
    INSERT INTO t1 SELECT randstr(50,50), randstr(50,50) FROM t1;
    INSERT INTO t1 SELECT randstr(50,50), randstr(50,50) FROM t1;
    INSERT INTO t1 SELECT randstr(50,50), randstr(50,50) FROM t1;
    INSERT INTO t2 SELECT * FROM t1;
    COMMIT
;BEGIN;
    SELECT count(*) FROM t1
;PRAGMA cache_size = 10;
    BEGIN;
    UPDATE t1 SET b = randstr(50,50)
;SELECT * FROM t2 ORDER BY a LIMIT 20
;SELECT count(*) FROM t2;