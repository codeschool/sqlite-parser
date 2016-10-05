-- original: fuzz3.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT md5sum(a, b, c) FROM t1
;SELECT md5sum(d, e, f) FROM t2
;BEGIN;
    CREATE TABLE t1(a, b, c);
    CREATE TABLE t2(d, e, f);
    CREATE INDEX i1 ON t1(a, b, c);
    CREATE INDEX i2 ON t2(d, e, f)
;INSERT INTO t1 VALUES([rvalue], [rvalue], [rvalue])
;INSERT INTO t2 VALUES([rvalue], [rvalue], [rvalue]);