-- original: win32lock.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA mmap_size=0
;PRAGMA cache_size=10;
    CREATE TABLE t1(x,y);
    INSERT INTO t1 VALUES(1,randomblob(100000));
    INSERT INTO t1 VALUES(2,randomblob(50000));
    INSERT INTO t1 VALUES(3,randomblob(25000));
    INSERT INTO t1 VALUES(4,randomblob(12500));
    SELECT x, length(y) FROM t1 ORDER BY rowid
;CREATE TABLE t1(x);
    INSERT INTO t1 VALUES(1);
    INSERT INTO t1 VALUES(2);
    INSERT INTO t1 VALUES(3)
;BEGIN EXCLUSIVE;
    INSERT INTO t1 VALUES(4)
;COMMIT;