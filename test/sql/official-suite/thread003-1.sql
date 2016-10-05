-- original: thread003.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

BEGIN;
    CREATE TABLE t1(a, b, c)
;INSERT INTO t1 VALUES(sub_ii, randomblob(200), randomblob(200))
;CREATE INDEX i1 ON t1(a, b); 
    COMMIT
;BEGIN;
    CREATE TABLE t1(a, b, c)
;INSERT INTO t1 VALUES(sub_ii, randomblob(200), randomblob(200))
;CREATE INDEX i1 ON t1(a, b); 
    COMMIT
;PRAGMA cache_size = 15
;SELECT * FROM t1 WHERE a = sub_iQuery
;PRAGMA cache_size = 15
;SELECT * FROM t1 WHERE a = sub_iQuery
;PRAGMA cache_size = 15
;SELECT * FROM t1 WHERE a = sub_iQuery;