-- original: symlink.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(x, y)
;CREATE TABLE t1(x)
;BEGIN;
      INSERT INTO t1 VALUES(1)
;COMMIT;
    PRAGMA journal_mode = wal;
    INSERT INTO t1 VALUES(2)
;SELECT * FROM t1;