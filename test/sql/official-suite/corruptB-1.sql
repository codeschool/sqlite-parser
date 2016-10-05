-- original: corruptB.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA auto_vacuum = 1;
    CREATE TABLE t1(x);
    INSERT INTO t1 VALUES(randomblob(200));
    INSERT INTO t1 SELECT randomblob(200) FROM t1;
    INSERT INTO t1 SELECT randomblob(200) FROM t1;
    INSERT INTO t1 SELECT randomblob(200) FROM t1;
    INSERT INTO t1 SELECT randomblob(200) FROM t1;
    INSERT INTO t1 SELECT randomblob(200) FROM t1
;SELECT rootpage FROM sqlite_master
;INSERT INTO t1 SELECT randomblob(200) FROM t1;
    INSERT INTO t1 SELECT randomblob(200) FROM t1;
    INSERT INTO t1 SELECT randomblob(200) FROM t1;
    INSERT INTO t1 SELECT randomblob(200) FROM t1;
    INSERT INTO t1 SELECT randomblob(200) FROM t1;
    INSERT INTO t1 SELECT randomblob(200) FROM t1;
    INSERT INTO t1 SELECT randomblob(200) FROM t1
;CREATE TABLE t2(a);
    INSERT INTO t2 VALUES(sub_v)
;SELECT rootpage FROM sqlite_master WHERE name = 't2';