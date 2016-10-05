-- original: corrupt4.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA auto_vacuum=OFF;
    PRAGMA page_size=1024;
    CREATE TABLE t1(x);
    INSERT INTO t1 VALUES(sub_bigstring);
    CREATE TABLE t2(y);
    INSERT INTO t2 VALUES(1);
    DROP TABLE t1;