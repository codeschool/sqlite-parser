-- original: index5.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA auto_vacuum = 0
;PRAGMA page_size = 1024;
    CREATE TABLE t1(x);
    BEGIN
;INSERT INTO t1 VALUES(randstr(100,100))
;CREATE INDEX i1 ON t1(x);
    DROP INDEX I1;
    PRAGMA main.page_size
;CREATE INDEX i1 ON t1(x);