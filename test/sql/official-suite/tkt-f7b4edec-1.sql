-- original: tkt-f7b4edec.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(x, y)
;INSERT INTO t1 VALUES(1, 2)
;BEGIN;
      DROP TABLE t1;
      CREATE TABLE t1(x, y);
    ROLLBACK
;INSERT INTO t1 VALUES(1, 2);