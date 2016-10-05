-- original: sharedA.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(x);
    INSERT INTO t1 VALUES(randomblob(100));
    INSERT INTO t1 SELECT randomblob(100) FROM t1;
    INSERT INTO t1 SELECT randomblob(100) FROM t1;
    INSERT INTO t1 SELECT randomblob(100) FROM t1;
    INSERT INTO t1 SELECT randomblob(100) FROM t1;
    INSERT INTO t1 SELECT randomblob(100) FROM t1;
    INSERT INTO t1 SELECT randomblob(100) FROM t1;
    CREATE INDEX i1 ON t1(x)
;BEGIN;
    DROP INDEX i1
;INSERT INTO t1 SELECT randomblob(100) FROM t1;
    ROLLBACK;
    PRAGMA integrity_check
;CREATE TABLE t1(x);
    INSERT INTO t1 VALUES(123)
;SELECT * FROM t1;
    CREATE INDEX i1 ON t1(x)
;SELECT * FROM t1 ORDER BY x
;BEGIN; DROP INDEX i1
;SELECT * FROM t1 ORDER BY x
;ATTACH 'test.db2' AS two
;CREATE TABLE t1(x);
    INSERT INTO t1 VALUES(1);
    INSERT INTO t1 VALUES(2);
    INSERT INTO t1 VALUES(3);
    CREATE TABLE two.t2(x);
    INSERT INTO t2 SELECT * FROM t1
;SELECT * FROM t1
;BEGIN;
      CREATE INDEX i1 ON t1(x);
      INSERT INTO t2 VALUES('value!');