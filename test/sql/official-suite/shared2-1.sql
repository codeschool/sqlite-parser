-- original: shared2.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

BEGIN;
    CREATE TABLE numbers(a PRIMARY KEY, b);
    INSERT INTO numbers(oid) VALUES(NULL);
    INSERT INTO numbers(oid) SELECT NULL FROM numbers;
    INSERT INTO numbers(oid) SELECT NULL FROM numbers;
    INSERT INTO numbers(oid) SELECT NULL FROM numbers;
    INSERT INTO numbers(oid) SELECT NULL FROM numbers;
    INSERT INTO numbers(oid) SELECT NULL FROM numbers;
    INSERT INTO numbers(oid) SELECT NULL FROM numbers;
    UPDATE numbers set a = oid, b = 'abcdefghijklmnopqrstuvwxyz0123456789';
    COMMIT
;pragma read_uncommitted = 1
;SELECT count(*) FROM numbers
;SELECT a FROM numbers ORDER BY oid
;BEGIN;
        DELETE FROM numbers
;ROLLBACK
;SELECT count(*) FROM numbers
;SELECT a, b FROM numbers ORDER BY a
;DELETE FROM numbers
;CREATE TABLE t0(a, b);
    CREATE TABLE t1(a, b DEFAULT 'hello world')
;SELECT a, b FROM t0
;INSERT INTO t1(a) VALUES(1)
;CREATE TABLE t2(a, b, c)
;CREATE INDEX i1 ON t2(a)
;CREATE TABLE t1(a, b)
;CREATE TABLE t2(a, b)
;SELECT * FROM t2
;SELECT * FROM t1;