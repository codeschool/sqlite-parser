-- original: capi3.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE tablename(x)
;CREATE TABLE t1(a VARINT, b BLOB, c VARCHAR(16));
    INSERT INTO t1 VALUES(1, 2, 3);
    INSERT INTO t1 VALUES('one', 'two', NULL);
    INSERT INTO t1 VALUES(1.2, 1.3, 1.4)
;pragma encoding
;CREATE TABLE t1(a)
;PRAGMA writable_schema=ON;
      INSERT INTO sqlite_master VALUES(NULL,NULL,NULL,NULL,NULL)
;CREATE TABLE t1(a);
      PRAGMA writable_schema=ON;
      INSERT INTO sqlite_master VALUES('table',NULL,NULL,NULL,NULL)
;BEGIN;
    CREATE TABLE t1(a, b);
    INSERT INTO t1 VALUES(1, 'int');
    INSERT INTO t1 VALUES(2, 'notatype')
;PRAGMA lock_status
;CREATE TABLE t2(a);
    INSERT INTO t2 VALUES(1);
    INSERT INTO t2 VALUES(2);
    BEGIN;
    INSERT INTO t2 VALUES(3)
;SELECT a FROM t2
;SELECT a FROM t2
;BEGIN
;COMMIT;
    SELECT a FROM t1
;DELETE FROM t1
;SELECT * FROM t1
;CREATE TABLE t3(x)
;CREATE TABLE t4(x);
  INSERT INTO t4 VALUES('abcdefghij');