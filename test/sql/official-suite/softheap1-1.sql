-- original: softheap1.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA soft_heap_limit
;PRAGMA soft_heap_limit=123456; PRAGMA soft_heap_limit
;PRAGMA soft_heap_limit(-1); PRAGMA soft_heap_limit
;PRAGMA soft_heap_limit(0); PRAGMA soft_heap_limit
;PRAGMA soft_heap_limit
;PRAGMA auto_vacuum=1;
    CREATE TABLE t1(x);
    INSERT INTO t1 VALUES(hex(randomblob(1000)));
    BEGIN
;CREATE TABLE t2 AS SELECT * FROM t1
;ROLLBACK
;PRAGMA integrity_check;