-- original: attachmalloc.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a, b, c);
    CREATE INDEX i1 ON t1(a, b)
;SELECT * FROM sqlite_master
;DETACH three;