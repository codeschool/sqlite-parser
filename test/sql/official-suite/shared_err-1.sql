-- original: shared_err.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA read_uncommitted = 1;
    CREATE TABLE t1(a,b,c);
    BEGIN;
    SELECT * FROM sqlite_master
;pragma integrity_check
;PRAGMA read_uncommitted = 1;
    BEGIN;
    CREATE TABLE t1(a, b);
    INSERT INTO t1(oid) VALUES(NULL);
    INSERT INTO t1(oid) SELECT NULL FROM t1;
    INSERT INTO t1(oid) SELECT NULL FROM t1;
    INSERT INTO t1(oid) SELECT NULL FROM t1;
    INSERT INTO t1(oid) SELECT NULL FROM t1;
    INSERT INTO t1(oid) SELECT NULL FROM t1;
    INSERT INTO t1(oid) SELECT NULL FROM t1;
    INSERT INTO t1(oid) SELECT NULL FROM t1;
    INSERT INTO t1(oid) SELECT NULL FROM t1;
    INSERT INTO t1(oid) SELECT NULL FROM t1;
    INSERT INTO t1(oid) SELECT NULL FROM t1;
    UPDATE t1 set a = oid, b = 'abcdefghijklmnopqrstuvwxyz0123456789';
    CREATE INDEX i1 ON t1(a);
    COMMIT;
    BEGIN;
    SELECT * FROM sqlite_master
;DELETE FROM t1 WHERE 0 = (a % 2)
;BEGIN
;INSERT INTO t1 SELECT a+1, b FROM t1
;INSERT INTO t1 SELECT 'string' || a, b FROM t1 WHERE 0 = (a%7)
;COMMIT
;PRAGMA read_uncommitted = 1;
    PRAGMA cache_size = 10;
    BEGIN;
    CREATE TABLE t1(a, b, UNIQUE(a, b))
;INSERT INTO t1 VALUES(sub_a, sub_b)
;COMMIT
;BEGIN;
    INSERT INTO t1 VALUES('201.201.201.201.201', NULL);
    UPDATE t1 SET a = '202.202.202.202.202' WHERE a LIKE '201%';
    COMMIT
;PRAGMA read_uncommitted = 1;
    PRAGMA cache_size = 10;
    BEGIN;
    CREATE TABLE t1(a, b, UNIQUE(a, b))
;INSERT INTO t1 VALUES(sub_a, sub_b)
;COMMIT
;BEGIN;
    INSERT INTO t1 VALUES('201.201.201.201.201', NULL);
    UPDATE t1 SET a = '202.202.202.202.202' WHERE a LIKE '201%';
    COMMIT
;PRAGMA read_uncommitted = 1;
    BEGIN;
    CREATE TABLE t1(a, b, UNIQUE(a, b))
;INSERT INTO t1 VALUES(sub_a, sub_b)
;COMMIT
;INSERT INTO t1 VALUES(6, NULL)
;PRAGMA read_uncommitted = 1;
    BEGIN;
    CREATE TABLE t1(a, b, UNIQUE(a, b))
;INSERT INTO t1 VALUES(sub_a, sub_b)
;COMMIT
;BEGIN;
    INSERT INTO t1 VALUES(6, NULL);
    ROLLBACK
;CREATE TABLE abc(a, b, c);
    BEGIN;
    INSERT INTO abc VALUES(1, 2, 3);
    ROLLBACK
;SELECT * FROM sqlite_master
;BEGIN;
    CREATE TABLE abc(a, b, c)
;SELECT * FROM sqlite_master
;SELECT * FROM sqlite_master
;SELECT * FROM sqlite_master
;BEGIN;
    CREATE TABLE abc(a, b, c)
;SELECT * FROM sqlite_master
;SELECT * FROM sqlite_master;