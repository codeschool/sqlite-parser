-- original: walthread.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA integrity_check
;PRAGMA integrity_check
;SELECT randomblob(sub_E(pid)*5)
;PRAGMA journal_mode = WAL;
    CREATE TABLE t1(x PRIMARY KEY);
    PRAGMA lock_status;
    INSERT INTO t1 VALUES(randomblob(100));
    INSERT INTO t1 VALUES(randomblob(100));
    INSERT INTO t1 SELECT md5sum(x) FROM t1
;BEGIN;
        PRAGMA integrity_check;
        SELECT md5sum(x) FROM t1 WHERE rowid != (SELECT max(rowid) FROM t1);
        SELECT x FROM t1 WHERE rowid = (SELECT max(rowid) FROM t1);
        SELECT md5sum(x) FROM t1 WHERE rowid != (SELECT max(rowid) FROM t1);
      COMMIT
;BEGIN;
        INSERT INTO t1 VALUES(randomblob(101 +sub_E(pid)));
        INSERT INTO t1 VALUES(randomblob(101 +sub_E(pid)));
        INSERT INTO t1 SELECT md5sum(x) FROM t1;
      COMMIT
;PRAGMA wal_autocheckpoint = 0
;PRAGMA wal_checkpoint
;CREATE TABLE t1(x INTEGER PRIMARY KEY, y UNIQUE)
;SELECT * FROM sqlite_master
;PRAGMA journal_mode = DELETE
;BEGIN;
      INSERT INTO t1 VALUES(NULL, randomblob(100+sub_E(pid)))
;SELECT * FROM sqlite_master
;PRAGMA journal_mode = WAL
;BEGIN;
      INSERT INTO t1 VALUES(NULL, randomblob(110+sub_E(pid)))
;PRAGMA journal_mode = WAL;
    CREATE TABLE t1(cnt PRIMARY KEY, sum1, sum2);
    CREATE INDEX i1 ON t1(sum1);
    CREATE INDEX i2 ON t1(sum2);
    INSERT INTO t1 VALUES(0, 0, 0)
;SELECT max(cnt) FROM t1
;SELECT sum(cnt) FROM t1
;SELECT sum(sum1) FROM t1
;INSERT INTO t1 VALUES(sub_nextwrite, sub_sum1, sub_sum2)
;SELECT count(*) FROM t1
;PRAGMA integrity_check
;SELECT cnt, sum1, sum2 FROM t1 ORDER BY cnt
;PRAGMA journal_mode = WAL;
    CREATE TABLE t1(a INTEGER PRIMARY KEY, b UNIQUE)
;PRAGMA wal_checkpoint
;REPLACE INTO t1 VALUES(sub_row, randomblob(300))
;PRAGMA page_size = 1024;
    PRAGMA journal_mode = WAL;
    CREATE TABLE t1(x);
    BEGIN;
      INSERT INTO t1 VALUES(randomblob(900));
      INSERT INTO t1 SELECT randomblob(900) FROM t1;      /*     2 */
      INSERT INTO t1 SELECT randomblob(900) FROM t1;      /*     4 */
      INSERT INTO t1 SELECT randomblob(900) FROM t1;      /*     8 */
      INSERT INTO t1 SELECT randomblob(900) FROM t1;      /*    16 */
      INSERT INTO t1 SELECT randomblob(900) FROM t1;      /*    32 */
      INSERT INTO t1 SELECT randomblob(900) FROM t1;      /*    64 */
      INSERT INTO t1 SELECT randomblob(900) FROM t1;      /*   128 */
      INSERT INTO t1 SELECT randomblob(900) FROM t1;      /*   256 */
      INSERT INTO t1 SELECT randomblob(900) FROM t1;      /*   512 */
      INSERT INTO t1 SELECT randomblob(900) FROM t1;      /*  1024 */
      INSERT INTO t1 SELECT randomblob(900) FROM t1;      /*  2048 */
      INSERT INTO t1 SELECT randomblob(900) FROM t1;      /*  4096 */
      INSERT INTO t1 SELECT randomblob(900) FROM t1;      /*  8192 */
      INSERT INTO t1 SELECT randomblob(900) FROM t1;      /* 16384 */
      INSERT INTO t1 SELECT randomblob(900) FROM t1;      /* 32768 */
      INSERT INTO t1 SELECT randomblob(900) FROM t1;      /* 65536 */
    COMMIT
;SELECT count(*) FROM t1;