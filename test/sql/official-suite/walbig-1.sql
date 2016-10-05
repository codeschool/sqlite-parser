-- original: walbig.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA journal_mode = WAL;
    CREATE TABLE t1(a PRIMARY KEY, b UNIQUE);
    INSERT INTO t1 VALUES(a_string(300), a_string(500));
    INSERT INTO t1 SELECT a_string(300), a_string(500) FROM t1;
    INSERT INTO t1 SELECT a_string(300), a_string(500) FROM t1;
    INSERT INTO t1 SELECT a_string(300), a_string(500) FROM t1
;INSERT INTO t1 SELECT a_string(300), a_string(500) FROM t1
;SELECT a FROM t1 ORDER BY a
;SELECT a FROM t1 ORDER BY rowid
;SELECT b FROM t1 ORDER BY b
;SELECT b FROM t1 ORDER BY rowid;