-- original: savepoint2.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT count(*), md5sum(x) FROM t3
;PRAGMA cache_size=10;
    BEGIN;
    CREATE TABLE t3(x TEXT);
    INSERT INTO t3 VALUES(randstr(10,400));
    INSERT INTO t3 VALUES(randstr(10,400));
    INSERT INTO t3 SELECT randstr(10,400) FROM t3;
    INSERT INTO t3 SELECT randstr(10,400) FROM t3;
    INSERT INTO t3 SELECT randstr(10,400) FROM t3;
    INSERT INTO t3 SELECT randstr(10,400) FROM t3;
    INSERT INTO t3 SELECT randstr(10,400) FROM t3;
    INSERT INTO t3 SELECT randstr(10,400) FROM t3;
    INSERT INTO t3 SELECT randstr(10,400) FROM t3;
    INSERT INTO t3 SELECT randstr(10,400) FROM t3;
    INSERT INTO t3 SELECT randstr(10,400) FROM t3;
    COMMIT;
    SELECT count(*) FROM t3
;SAVEPOINT one
;ROLLBACK to one
;SAVEPOINT two
;ROLLBACK to two
;SAVEPOINT three
;RELEASE three
;ROLLBACK to one;