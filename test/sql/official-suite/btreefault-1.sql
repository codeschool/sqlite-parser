-- original: btreefault.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA auto_vacuum = incremental;
    PRAGMA journal_mode = DELETE;
    CREATE TABLE t1(a PRIMARY KEY, b);
    INSERT INTO t1 VALUES(randomblob(1000), randomblob(100));
    INSERT INTO t1 SELECT randomblob(1000), randomblob(1000) FROM t1;
    INSERT INTO t1 SELECT randomblob(1000), randomblob(1000) FROM t1;
    INSERT INTO t1 SELECT randomblob(1000), randomblob(1000) FROM t1;
    INSERT INTO t1 SELECT randomblob(1000), randomblob(1000) FROM t1;
    DELETE FROM t1 WHERE rowid%2
;PRAGMA incremental_vacuum = 10;