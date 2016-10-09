-- original: pagerfault3.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA auto_vacuum = 0;
    PRAGMA page_size = 2048;
    CREATE TABLE t1(x);
    INSERT INTO t1 VALUES(randomblob(1200));
    PRAGMA page_count
;PRAGMA page_size = 1024;
    VACUUM;
    PRAGMA page_count
;PRAGMA page_size = 1024;
    VACUUM;