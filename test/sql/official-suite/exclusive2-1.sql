-- original: exclusive2.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT count(*), md5sum(a) FROM t1
;BEGIN;
    CREATE TABLE t1(a, b);
    INSERT INTO t1(a) VALUES(randstr(10, 400));
    INSERT INTO t1(a) VALUES(randstr(10, 400));
    INSERT INTO t1(a) SELECT randstr(10, 400) FROM t1;
    INSERT INTO t1(a) SELECT randstr(10, 400) FROM t1;
    INSERT INTO t1(a) SELECT randstr(10, 400) FROM t1;
    INSERT INTO t1(a) SELECT randstr(10, 400) FROM t1;
    INSERT INTO t1(a) SELECT randstr(10, 400) FROM t1;
    COMMIT;
    SELECT count(*) FROM t1
;PRAGMA cache_size = sub_nPage
;PRAGMA cache_size
;UPDATE t1 SET b=a, a=NULL
;PRAGMA cache_size=1000
;PRAGMA locking_mode = exclusive
;BEGIN;
    DELETE FROM t1;
    INSERT INTO t1(a) VALUES(randstr(10, 400));
    INSERT INTO t1(a) VALUES(randstr(10, 400));
    INSERT INTO t1(a) SELECT randstr(10, 400) FROM t1;
    INSERT INTO t1(a) SELECT randstr(10, 400) FROM t1;
    INSERT INTO t1(a) SELECT randstr(10, 400) FROM t1;
    INSERT INTO t1(a) SELECT randstr(10, 400) FROM t1;
    INSERT INTO t1(a) SELECT randstr(10, 400) FROM t1;
    COMMIT;
    SELECT count(*) FROM t1
;PRAGMA cache_size = sub_nPage
;PRAGMA cache_size
;PRAGMA locking_mode = normal
;BEGIN;
    CREATE TABLE t1(a UNIQUE);
    INSERT INTO t1 VALUES(randstr(200, 200));
    INSERT INTO t1 VALUES(randstr(200, 200));
    COMMIT
;INSERT INTO t1 VALUES(randstr(200, 200))
;INSERT INTO t1 VALUES(randstr(200, 200))
;PRAGMA locking_mode = exclusive;
    INSERT INTO t1 VALUES(randstr(200, 200))
;INSERT INTO t1 VALUES(randstr(200, 200))
;PRAGMA locking_mode = normal;
    INSERT INTO t1 VALUES(randstr(200, 200))
;INSERT INTO t1 VALUES(randstr(200, 200));