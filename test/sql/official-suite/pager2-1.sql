-- original: pager2.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA cache_size = 10;
      CREATE TABLE t1(i INTEGER PRIMARY KEY, j blob)
;COMMIT ; BEGIN
;SELECT COALESCE(max(i), 0) FROM t1;
          PRAGMA integrity_check
;ROLLBACK TO sp_sub_x
;DELETE FROM t1 WHERE i>sub_x
;SAVEPOINT sp_sub_k
;INSERT INTO t1(j) VALUES(randomblob(1500))
;CREATE TABLE t1(a, b);
    PRAGMA journal_mode = off;
    BEGIN;
      INSERT INTO t1 VALUES(1, 2);
    ROLLBACK;
    SELECT * FROM t1
;PRAGMA auto_vacuum = incremental;
    PRAGMA page_size = 1024;
    PRAGMA journal_mode = off;
    CREATE TABLE t1(a, b);
    INSERT INTO t1 VALUES(zeroblob(5000), zeroblob(5000));
    DELETE FROM t1;
    PRAGMA incremental_vacuum
;CREATE TABLE t1(a, b)
;INSERT INTO t1 VALUES(1, 2);