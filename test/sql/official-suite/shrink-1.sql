-- original: shrink.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA cache_size = 2000;
    CREATE TABLE t1(x,y);
    INSERT INTO t1 VALUES(randomblob(1000000),1)
;UPDATE t1 SET y=y+1
;PRAGMA shrink_memory;