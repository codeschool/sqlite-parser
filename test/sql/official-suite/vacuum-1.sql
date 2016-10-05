-- original: vacuum.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

BEGIN;
    CREATE TABLE t1(a INTEGER PRIMARY KEY, b, c);
    INSERT INTO t1 VALUES(NULL,randstr(10,100),randstr(5,50));
    INSERT INTO t1 VALUES(123456,randstr(10,100),randstr(5,50));
    INSERT INTO t1 SELECT NULL, b||'-'||rowid, c||'-'||rowid FROM t1;
    INSERT INTO t1 SELECT NULL, b||'-'||rowid, c||'-'||rowid FROM t1;
    INSERT INTO t1 SELECT NULL, b||'-'||rowid, c||'-'||rowid FROM t1;
    INSERT INTO t1 SELECT NULL, b||'-'||rowid, c||'-'||rowid FROM t1;
    INSERT INTO t1 SELECT NULL, b||'-'||rowid, c||'-'||rowid FROM t1;
    INSERT INTO t1 SELECT NULL, b||'-'||rowid, c||'-'||rowid FROM t1;
    INSERT INTO t1 SELECT NULL, b||'-'||rowid, c||'-'||rowid FROM t1;
    CREATE INDEX i1 ON t1(b,c);
    CREATE UNIQUE INDEX i2 ON t1(c,a);
    CREATE TABLE t2 AS SELECT * FROM t1;
    COMMIT;
    DROP TABLE t2
;VACUUM
;VACUUM
;COMMIT
;BEGIN;
    CREATE TABLE t4 AS SELECT * FROM t1;
    CREATE TABLE t5 AS SELECT * FROM t1;
    COMMIT;
    DROP TABLE t4;
    DROP TABLE t5
;SELECT count(*) FROM sqlite_master
;BEGIN;
    CREATE TABLE t6 AS SELECT * FROM t1;
    CREATE TABLE t7 AS SELECT * FROM t1;
    COMMIT
;-- The "SELECT * FROM sqlite_master" statement ensures that this test
    -- works when shared-cache is enabled. If shared-cache is enabled, then
    -- db3 shares a cache with db2 (but not db -it was opened as 
    -- "./test.db").
    SELECT * FROM sqlite_master;
    SELECT * FROM t7 LIMIT 1
;VACUUM
;INSERT INTO t7 VALUES(1234567890,'hello','world')
;SELECT * FROM t7 WHERE a=1234567890
;SELECT * FROM t7 WHERE a=1234567890
;INSERT INTO t7 SELECT * FROM t6;
    SELECT count(*) FROM t7
;DELETE FROM t7;
    SELECT count(*) FROM t7
;PRAGMA empty_result_callbacks=on;
    VACUUM
;CREATE TABLE "abc abc"(a, b, c);
    INSERT INTO "abc abc" VALUES(1, 2, 3);
    VACUUM
;select * from "abc abc"
;DELETE FROM "abc abc";
      INSERT INTO "abc abc" VALUES(X'00112233', NULL, NULL);
      VACUUM
;select count(*) from "abc abc" WHERE a = X'00112233'
;CREATE TABLE t1(t);
    VACUUM
;VACUUM;
    pragma integrity_check
;PRAGMA auto_vacuum
;PRAGMA auto_vacuum = 1
;PRAGMA auto_vacuum
;PRAGMA auto_vacuum = 1
;VACUUM
;PRAGMA auto_vacuum
;CREATE TABLE t1(t);
    VACUUM
;DROP TABLE 'abc abc';
      CREATE TABLE autoinc(a INTEGER PRIMARY KEY AUTOINCREMENT, b);
      INSERT INTO autoinc(b) VALUES('hi');
      INSERT INTO autoinc(b) VALUES('there');
      DELETE FROM autoinc
;VACUUM
;INSERT INTO autoinc(b) VALUES('one');
      INSERT INTO autoinc(b) VALUES('two')
;VACUUM
;CREATE TABLE t8(a, b);
    INSERT INTO t8 VALUES('a', 'b');
    INSERT INTO t8 VALUES('c', 'd');
    PRAGMA count_changes = 1;