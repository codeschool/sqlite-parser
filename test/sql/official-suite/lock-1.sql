-- original: lock.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT name FROM sqlite_master WHERE type='table' ORDER BY name
;SELECT name FROM sqlite_master WHERE type='table' ORDER BY name
;CREATE TABLE t1(a int, b int)
;SELECT name FROM sqlite_master WHERE type='table' ORDER BY name
;INSERT INTO t1 VALUES(1,2)
;SELECT * FROM t1
;UPDATE t1 SET a=b, b=a
;SELECT * FROM t1
;SELECT * FROM t1
;BEGIN TRANSACTION
;UPDATE t1 SET a = 0 WHERE 0
;SELECT * FROM t1
;ROLLBACK
;CREATE TABLE t2(x int, y int)
;INSERT INTO t2 VALUES(8,9)
;SELECT * FROM t2
;SELECT * FROM t1
;SELECT * FROM t1
;SELECT * FROM t1
;SELECT * FROM t2
;SELECT * FROM t1
;SELECT * FROM t2
;SELECT * FROM t1
;SELECT * FROM t1
;BEGIN TRANSACTION
;UPDATE t1 SET a = 0 WHERE 0
;BEGIN TRANSACTION
;ROLLBACK
;BEGIN; SELECT rowid FROM sqlite_master LIMIT 1
;ROLLBACK
;BEGIN; SELECT rowid FROM sqlite_master LIMIT 1
;ROLLBACK
;ROLLBACK
;UPDATE t1 SET a = 0 WHERE 0
;PRAGMA busy_timeout
;PRAGMA busy_timeout
;PRAGMA busy_timeout(400)
;UPDATE t1 SET a = 0 WHERE 0
;PRAGMA busy_timeout
;PRAGMA busy_timeout(0)
;PRAGMA busy_timeout
;BEGIN TRANSACTION
;ROLLBACK
;UPDATE t1 SET a=0 WHERE 0
;ROLLBACK
;SELECT * FROM t1
;CREATE TEMP TABLE t3(x);
      SELECT * FROM t3
;SELECT * FROM t3
;SELECT * FROM t1
;SELECT * FROM t3
;CREATE TABLE t4(a PRIMARY KEY, b);
    INSERT INTO t4 VALUES(1, 'one');
    INSERT INTO t4 VALUES(2, 'two');
    INSERT INTO t4 VALUES(3, 'three')
;DELETE FROM t4
;SELECT * FROM sqlite_master
;SELECT * FROM t4
;BEGIN;
    INSERT INTO t4 VALUES(1, 'one');
    INSERT INTO t4 VALUES(2, 'two');
    INSERT INTO t4 VALUES(3, 'three');
    COMMIT
;SELECT * FROM t4
;SELECT a FROM t4 ORDER BY a
;PRAGMA integrity_check
;PRAGMA lock_status
;PRAGMA journal_mode = truncate;
    BEGIN;
    UPDATE t4 SET a = 10 WHERE 0;
    COMMIT
;PRAGMA lock_status;