-- original: incrblob.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE blobs(k PRIMARY KEY, v BLOB);
    INSERT INTO blobs VALUES('one', X'0102030405060708090A');
    INSERT INTO blobs VALUES('two', X'0A090807060504030201')
;SELECT v FROM blobs WHERE rowid = 1
;INSERT INTO blobs(rowid, k, v) VALUES(3, 'three', sub_str)
;PRAGMA mmap_size = 0
;PRAGMA auto_vacuum = sub_AutoVacuumMode
;BEGIN;
      CREATE TABLE blobs(k PRIMARY KEY, v BLOB, i INTEGER);
      DELETE FROM blobs;
      INSERT INTO blobs VALUES('one', sub_str || randstr(500,500), 45);
      COMMIT
;PRAGMA auto_vacuum
;PRAGMA mmap_size = 0
;PRAGMA mmap_size = 0
;PRAGMA mmap_size = 0
;SELECT i FROM blobs
;INSERT INTO blobs(k, v, i) VALUES(123, 567.765, NULL)
;INSERT INTO blobs(k, v, i) VALUES(X'010203040506070809', 'hello', 'world')
;CREATE TABLE t3(a INTEGER PRIMARY KEY, b);
    INSERT INTO t3 VALUES(1, 2)
;CREATE VIEW blobs_view AS SELECT k, v, i FROM blobs
;CREATE VIRTUAL TABLE blobs_echo USING echo(blobs)
;ATTACH 'test2.db' AS aux;
      CREATE TABLE aux.files(name, text);
      INSERT INTO aux.files VALUES('this one', zeroblob(sub_size))
;BEGIN;
      INSERT INTO blobs(k, v, i) VALUES('a', 'different', 'connection')
;SELECT rowid FROM blobs ORDER BY rowid
;SELECT * FROM blobs WHERE rowid = 4
;SELECT * FROM blobs WHERE rowid = 4
;BEGIN;
    DROP TABLE blobs;
    CREATE TABLE t1 (a, b, c, d BLOB);
    INSERT INTO t1(a, b, c, d) VALUES(1, 2, 3, 4);
    COMMIT
;UPDATE t1 SET d = zeroblob(10000)
;UPDATE t1 SET d = 15
;SELECT d FROM t1
;SELECT d FROM t1
;PRAGMA auto_vacuum = "incremental";
    CREATE TABLE t1(a INTEGER PRIMARY KEY, b);        -- root@page3
    INSERT INTO t1 VALUES(123, sub_data)
;CREATE TABLE t2(a INTEGER PRIMARY KEY, b);        -- root@page4
;SELECT rootpage FROM sqlite_master
;INSERT INTO t2 VALUES(456, sub_otherdata)
;DELETE FROM t1 WHERE a = 123;
    PRAGMA INCREMENTAL_VACUUM(0)
;INSERT INTO t1 VALUES(314159, 'sqlite')
;SELECT b FROM t1 WHERE a = 314159
;SELECT b FROM t1 WHERE a = 314159;