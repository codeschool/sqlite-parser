-- original: snapshot_fault.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a, b UNIQUE, c UNIQUE);
    INSERT INTO t1 VALUES(1, randomblob(500), randomblob(500));
    INSERT INTO t1 VALUES(2, randomblob(500), randomblob(500));
    PRAGMA journal_mode = wal;
    INSERT INTO t1 VALUES(3, randomblob(500), randomblob(500));
    BEGIN;
      SELECT a FROM t1
;UPDATE t1 SET b=randomblob(501), c=randomblob(501) WHERE a=1;
    INSERT INTO t1 VALUES(4, randomblob(500), randomblob(500));
    INSERT INTO t1 VALUES(5, randomblob(500), randomblob(500));
    INSERT INTO t1 VALUES(6, randomblob(500), randomblob(500))
;PRAGMA wal_checkpoint
;SELECT a FROM t1;
      PRAGMA integrity_check
;CREATE TABLE t1(a, b UNIQUE, c UNIQUE);
    INSERT INTO t1 VALUES(1, randomblob(500), randomblob(500));
    INSERT INTO t1 VALUES(2, randomblob(500), randomblob(500));
    PRAGMA journal_mode = wal;
    INSERT INTO t1 VALUES(3, randomblob(500), randomblob(500));
    BEGIN;
      SELECT a FROM t1
;UPDATE t1 SET b=randomblob(501), c=randomblob(501) WHERE a=1;
    INSERT INTO t1 VALUES(4, randomblob(500), randomblob(500));
    INSERT INTO t1 VALUES(5, randomblob(500), randomblob(500));
    INSERT INTO t1 VALUES(6, randomblob(500), randomblob(500))
;PRAGMA wal_checkpoint
;SELECT * FROM t1
;SELECT a FROM t1;
      PRAGMA integrity_check
;CREATE TABLE t1(a, b UNIQUE, c UNIQUE);
    INSERT INTO t1 VALUES(1, randomblob(500), randomblob(500));
    INSERT INTO t1 VALUES(2, randomblob(500), randomblob(500));
    PRAGMA journal_mode = wal;
    INSERT INTO t1 VALUES(3, randomblob(500), randomblob(500));
    BEGIN;
      SELECT a FROM t1
;UPDATE t1 SET b=randomblob(501), c=randomblob(501) WHERE a=1;
    INSERT INTO t1 VALUES(4, randomblob(500), randomblob(500));
    INSERT INTO t1 VALUES(5, randomblob(500), randomblob(500));
    INSERT INTO t1 VALUES(6, randomblob(500), randomblob(500));
    BEGIN
;SELECT a FROM t1;
      PRAGMA integrity_check;