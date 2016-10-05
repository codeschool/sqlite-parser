-- original: pagesize.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA page_size
;EXPLAIN PRAGMA page_size
;CREATE TABLE t1(a);
    PRAGMA page_size=2048;
    PRAGMA page_size
;PRAGMA page_size=511;
    PRAGMA page_size
;PRAGMA page_size=512;
    PRAGMA page_size
;PRAGMA page_size=8192;
      PRAGMA page_size
;PRAGMA page_size=65537;
      PRAGMA page_size
;PRAGMA page_size=1234;
      PRAGMA page_size
;PRAGMA page_size=sub_PGSZ
;PRAGMA page_size
;CREATE TABLE t1(x UNIQUE, y UNIQUE, z UNIQUE)
;PRAGMA page_size
;INSERT INTO t1 VALUES(1,2,3);
        INSERT INTO t1 VALUES(2,3,4);
        SELECT * FROM t1
;PRAGMA page_size=sub_PGSZ
;CREATE TABLE t1(x);
      PRAGMA page_size
;PRAGMA page_size
;VACUUM
;PRAGMA page_size
;INSERT INTO t1 VALUES(randstr(10,9000));
      INSERT INTO t1 VALUES(randstr(10,9000));
      INSERT INTO t1 VALUES(randstr(10,9000));
      BEGIN;
      INSERT INTO t1 SELECT x||x FROM t1;
      INSERT INTO t1 SELECT x||x FROM t1;
      INSERT INTO t1 SELECT x||x FROM t1;
      INSERT INTO t1 SELECT x||x FROM t1;
      SELECT count(*) FROM t1
;ROLLBACK;
      SELECT count(*) FROM t1
;PRAGMA page_size
;INSERT INTO t1 SELECT x||x FROM t1;
      INSERT INTO t1 SELECT x||x FROM t1;
      INSERT INTO t1 SELECT x||x FROM t1;
      INSERT INTO t1 SELECT x||x FROM t1;
      INSERT INTO t1 SELECT x||x FROM t1;
      INSERT INTO t1 SELECT x||x FROM t1;
      SELECT count(*) FROM t1
;BEGIN;
      DELETE FROM t1 WHERE rowid%5!=0;
      SELECT count(*) FROM t1
;ROLLBACK;
      SELECT count(*) FROM t1
;DELETE FROM t1 WHERE rowid%5!=0
;SELECT count(*) FROM t1
;DROP TABLE t1
;BEGIN;
  SELECT * FROM sqlite_master;
  PRAGMA page_size=2048;
  PRAGMA main.page_size
;CREATE TABLE t1(x);
  COMMIT
;BEGIN;
    PRAGMA page_size = 2048;
  COMMIT;
  PRAGMA main.page_size;