-- original: vacuum3.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA auto_vacuum=OFF;
    PRAGMA page_size = 1024;
    CREATE TABLE t1(a, b, c);
    INSERT INTO t1 VALUES(1, 2, 3)
;PRAGMA page_size
;PRAGMA page_size
;SELECT * FROM t1
;PRAGMA page_size = 1024;
    VACUUM;
    ALTER TABLE t1 ADD COLUMN d;
    UPDATE t1 SET d = randomblob(1000)
;PRAGMA page_size
;PRAGMA page_size
;SELECT * FROM t1
;SELECT count(*), md5sum(a), md5sum(b), md5sum(c) FROM abc
;PRAGMA page_size
;PRAGMA page_size
;PRAGMA page_size=1024;
    CREATE TABLE abc(a, b, c);
    INSERT INTO abc VALUES(1, 2, 3);
    INSERT INTO abc VALUES(4, 5, 6)
;SELECT * FROM abc
;SELECT * FROM abc
;PRAGMA page_size = 2048;
    VACUUM
;SELECT * FROM abc
;SELECT * FROM abc
;PRAGMA page_size=16384;
    VACUUM
;SELECT * FROM abc
;PRAGMA page_size=1024;
    VACUUM
;SELECT * FROM abc
;CREATE TABLE t1(x);
    INSERT INTO t1 VALUES(1234);
    PRAGMA page_size=4096;
    VACUUM;
    SELECT * FROM t1
;PRAGMA page_size
;PRAGMA page_size = 2048;
    BEGIN; 
    CREATE TABLE t1(a, b, c); 
    INSERT INTO t1 VALUES(1, randstr(50,50), randstr(50,50)); 
    INSERT INTO t1 SELECT a+2, b||'-'||rowid, c||'-'||rowid FROM t1; 
    INSERT INTO t1 SELECT a+4, b||'-'||rowid, c||'-'||rowid FROM t1;
    INSERT INTO t1 SELECT a+8, b||'-'||rowid, c||'-'||rowid FROM t1;
    INSERT INTO t1 SELECT a+16, b||'-'||rowid, c||'-'||rowid FROM t1;
    INSERT INTO t1 SELECT a+32, b||'-'||rowid, c||'-'||rowid FROM t1;
    INSERT INTO t1 SELECT a+64, b||'-'||rowid, c||'-'||rowid FROM t1;
    INSERT INTO t1 SELECT a+128, b||'-'||rowid, c||'-'||rowid FROM t1;
    INSERT INTO t1 VALUES(1, randstr(600,600), randstr(600,600));
    CREATE TABLE t2 AS SELECT * FROM t1;
    CREATE TABLE t3 AS SELECT * FROM t1;
    COMMIT;
    DROP TABLE t2
;PRAGMA encoding=UTF16;
    CREATE TABLE t1(a, b, c);
    INSERT INTO t1 VALUES(1, 2, 3);
    CREATE TABLE t2(x,y,z);
    INSERT INTO t2 SELECT * FROM t1;