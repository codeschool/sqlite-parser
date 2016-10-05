-- original: tkt2409.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA cache_size=10;
    CREATE TABLE t1(x TEXT UNIQUE NOT NULL, y BLOB)
;PRAGMA cache_size = sub_iCache
;PRAGMA cache_size=10;
    DELETE FROM t1
;PRAGMA cache_size=20;
    DROP TABLE t1;
    CREATE TABLE t1 (x TEXT UNIQUE NOT NULL);