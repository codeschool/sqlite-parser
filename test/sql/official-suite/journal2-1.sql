-- original: journal2.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a, b)
;PRAGMA journal_mode = truncate;
    INSERT INTO t1 VALUES(1, 2)
;INSERT INTO t1 VALUES(3, 4)
;SELECT * FROM t1
;PRAGMA journal_mode = delete
;SELECT * FROM t1
;PRAGMA journal_mode = truncate
;INSERT INTO t1 VALUES(5, 6)
;SELECT * FROM t1
;CREATE TABLE t2(a UNIQUE, b UNIQUE);
    INSERT INTO t2 VALUES(a_string(200), a_string(300));
    INSERT INTO t2 SELECT a_string(200), a_string(300) FROM t2;  --  2
    INSERT INTO t2 SELECT a_string(200), a_string(300) FROM t2;  --  4
    INSERT INTO t2 SELECT a_string(200), a_string(300) FROM t2;  --  8
    INSERT INTO t2 SELECT a_string(200), a_string(300) FROM t2;  -- 16
    INSERT INTO t2 SELECT a_string(200), a_string(300) FROM t2;  -- 32
    INSERT INTO t2 SELECT a_string(200), a_string(300) FROM t2;  -- 64
;PRAGMA cache_size = 10;
    BEGIN;
      INSERT INTO t2 SELECT randomblob(200), randomblob(300) FROM t2;  -- 128
;SELECT count(*) FROM t2;
    PRAGMA integrity_check
;PRAGMA journal_mode = persist
;CREATE TABLE t1(x);
      INSERT INTO t1 VALUES(3.14159)
;PRAGMA journal_mode = WAL;