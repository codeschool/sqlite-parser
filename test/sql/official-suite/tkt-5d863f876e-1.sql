-- original: tkt-5d863f876e.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a, b);
      CREATE INDEX i1 ON t1(a, b);
      INSERT INTO t1 VALUES(1, 2);
      INSERT INTO t1 VALUES(3, 4);
      PRAGMA journal_mode = WAL;
      VACUUM;
      PRAGMA journal_mode = DELETE
;SELECT * FROM t1
;INSERT INTO t1 VALUES(5, 6);
      PRAGMA journal_mode = WAL;
      VACUUM;
      PRAGMA journal_mode = DELETE
;PRAGMA integrity_check;