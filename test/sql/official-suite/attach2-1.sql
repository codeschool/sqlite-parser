-- original: attach2.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a,b);
    CREATE INDEX x1 ON t1(a)
;CREATE TABLE t1(a,b);
    CREATE INDEX x1 ON t1(a)
;DETACH t2
;BEGIN
;UPDATE t1 SET a = 0 WHERE 0
;COMMIT
;UPDATE t1 SET a = 0 WHERE 0
;SELECT * FROM t1
;rollback
;SELECT * FROM t1
;PRAGMA lock_status
;ATTACH 'test2.db' as file2
;ATTACH 'test2.db' as file2
;BEGIN
;SELECT * FROM t1
;SELECT * FROM t1
;BEGIN
;INSERT INTO file2.t1 VALUES(1, 2)
;SELECT * FROM t1
;SELECT * FROM file2.t1
;INSERT INTO t1 VALUES(1, 2)
;SELECT * FROM t1
;ATTACH 'test.db2' AS aux
;BEGIN;
    CREATE TABLE tbl(a, b, c);
    CREATE TABLE aux.tbl(a, b, c);
    COMMIT
;BEGIN;
    DROP TABLE aux.tbl;
    DROP TABLE tbl;
    ROLLBACK
;BEGIN
;COMMIT;
    DETACH aux;