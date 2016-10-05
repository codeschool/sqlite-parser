-- original: corrupt7.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA auto_vacuum=OFF;
    PRAGMA page_size=1024;
    CREATE TABLE t1(x);
    INSERT INTO t1(x) VALUES(1);
    INSERT INTO t1(x) VALUES(2);
    INSERT INTO t1(x) SELECT x+2 FROM t1;
    INSERT INTO t1(x) SELECT x+4 FROM t1;
    INSERT INTO t1(x) SELECT x+8 FROM t1
;PRAGMA integrity_check(1)
;PRAGMA integrity_check(1);