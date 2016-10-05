-- original: stmt.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a integer primary key, b INTEGER NOT NULL)
;PRAGMA temp_store = file;
    BEGIN;
      INSERT INTO t1 VALUES(1, 1)
;INSERT INTO t1 SELECT a+1, b+1 FROM t1
;BEGIN;
      INSERT INTO t1 SELECT a+2, b+2 FROM t1
;INSERT INTO t1 SELECT a+4, b+4 FROM t1
;CREATE INDEX i1 ON t1(b);