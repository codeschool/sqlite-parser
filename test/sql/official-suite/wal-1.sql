-- original: wal.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA auto_vacuum = 0
;PRAGMA page_size = 1024
;PRAGMA journal_mode = wal
;PRAGMA synchronous = normal
;PRAGMA auto_vacuum = 0
;PRAGMA synchronous = normal
;PRAGMA journal_mode = wal
;BEGIN;
    CREATE TABLE t1(a, b)
;SELECT * FROM sqlite_master
;INSERT INTO t1 VALUES(1, 2)
;INSERT INTO t1 VALUES(3, 4)
;INSERT INTO t1 VALUES(5, 6)
;INSERT INTO t1 VALUES(7, 8)
;INSERT INTO t1 VALUES(9, 10)
;SELECT * FROM t1
;BEGIN; SELECT * FROM t1
;INSERT INTO t1 VALUES(11, 12)
;SELECT * FROM t1
;SELECT * FROM t1
;INSERT INTO t1 VALUES(13, 14)
;SELECT * FROM t1
;SELECT * FROM t1
;COMMIT; SELECT * FROM t1
;BEGIN; DELETE FROM t1
;SELECT * FROM t1
;SELECT * FROM t1
;ROLLBACK
;SELECT * FROM t1
;DELETE FROM t1;
    BEGIN;
      INSERT INTO t1 VALUES('a', 'b');
      SAVEPOINT sp;
        INSERT INTO t1 VALUES('c', 'd');
        SELECT * FROM t1
;ROLLBACK TO sp;
      SELECT * FROM t1
;COMMIT;
    SELECT * FROM t1
;SELECT * FROM t1
;PRAGMA cache_size = 10
;CREATE TABLE t2(a, b);
    INSERT INTO t2 VALUES(blob(400), blob(400));
    SAVEPOINT tr;
      INSERT INTO t2 SELECT blob(400), blob(400) FROM t2; /*  2 */
      INSERT INTO t2 SELECT blob(400), blob(400) FROM t2; /*  4 */
      INSERT INTO t2 SELECT blob(400), blob(400) FROM t2; /*  8 */
      INSERT INTO t2 SELECT blob(400), blob(400) FROM t2; /* 16 */
      INSERT INTO t2 SELECT blob(400), blob(400) FROM t2; /* 32 */
      INSERT INTO t1 SELECT blob(400), blob(400) FROM t1; /*  2 */
      INSERT INTO t1 SELECT blob(400), blob(400) FROM t1; /*  4 */
      INSERT INTO t1 SELECT blob(400), blob(400) FROM t1; /*  8 */
      INSERT INTO t1 SELECT blob(400), blob(400) FROM t1; /* 16 */
      INSERT INTO t1 SELECT blob(400), blob(400) FROM t1; /* 32 */
      SELECT count(*) FROM t2
;ROLLBACK TO tr
;INSERT INTO t1 VALUES('x', 'y');
    RELEASE tr
;SELECT count(*) FROM t2
;SELECT count(*) FROM t2 ; SELECT count(*) FROM t1
;PRAGMA integrity_check
;PRAGMA journal_mode = WAL;
    CREATE TABLE t1(a, b);
    INSERT INTO t1 VALUES('a', 'b')
;SELECT * FROM t1
;PRAGMA cache_size = 10
;CREATE TABLE t2(a, b);
    BEGIN;
    INSERT INTO t2 VALUES(blob(400), blob(400));
    SAVEPOINT tr;
      INSERT INTO t2 SELECT blob(400), blob(400) FROM t2; /*  2 */
      INSERT INTO t2 SELECT blob(400), blob(400) FROM t2; /*  4 */
      INSERT INTO t2 SELECT blob(400), blob(400) FROM t2; /*  8 */
      INSERT INTO t2 SELECT blob(400), blob(400) FROM t2; /* 16 */
      INSERT INTO t2 SELECT blob(400), blob(400) FROM t2; /* 32 */
      INSERT INTO t1 SELECT blob(400), blob(400) FROM t1; /*  2 */
      INSERT INTO t1 SELECT blob(400), blob(400) FROM t1; /*  4 */
      INSERT INTO t1 SELECT blob(400), blob(400) FROM t1; /*  8 */
      INSERT INTO t1 SELECT blob(400), blob(400) FROM t1; /* 16 */
      INSERT INTO t1 SELECT blob(400), blob(400) FROM t1; /* 32 */
      SELECT count(*) FROM t2
;ROLLBACK TO tr
;INSERT INTO t1 VALUES('x', 'y');
    RELEASE tr;
    COMMIT
;SELECT count(*) FROM t2 ; SELECT count(*) FROM t1
;SELECT count(*) FROM t2 ; SELECT count(*) FROM t1
;PRAGMA integrity_check
;DELETE FROM t2;
    PRAGMA wal_checkpoint;
    BEGIN;
      INSERT INTO t2 VALUES('w', 'x');
      SAVEPOINT save;
        INSERT INTO t2 VALUES('y', 'z');
      ROLLBACK TO save;
    COMMIT
;SELECT * FROM t2
;CREATE TEMP TABLE t2(a, b);
    INSERT INTO t2 VALUES(1, 2)
;BEGIN;
      INSERT INTO t2 VALUES(3, 4);
      SELECT * FROM t2
;ROLLBACK;
    SELECT * FROM t2
;CREATE TEMP TABLE t3(x UNIQUE);
    BEGIN;
      INSERT INTO t2 VALUES(3, 4);
      INSERT INTO t3 VALUES('abc')
;COMMIT;
    SELECT * FROM t2
;PRAGMA page_size = 1024;
    CREATE TABLE t1(a, b);
    INSERT INTO t1 VALUES(1, 2)
;PRAGMA wal_checkpoint
;PRAGMA auto_vacuum = 1;
    PRAGMA journal_mode = wal;
    PRAGMA auto_vacuum
;PRAGMA page_size = 1024;
    CREATE TABLE t1(x);
    INSERT INTO t1 VALUES(blob(900));
    INSERT INTO t1 VALUES(blob(900));
    INSERT INTO t1 SELECT blob(900) FROM t1;       /*  4 */
    INSERT INTO t1 SELECT blob(900) FROM t1;       /*  8 */
    INSERT INTO t1 SELECT blob(900) FROM t1;       /* 16 */
    INSERT INTO t1 SELECT blob(900) FROM t1;       /* 32 */
    INSERT INTO t1 SELECT blob(900) FROM t1;       /* 64 */
    PRAGMA wal_checkpoint
;DELETE FROM t1 WHERE rowid<54;
    PRAGMA wal_checkpoint
;PRAGMA cache_size=2000;
    CREATE TABLE t1(x PRIMARY KEY);
    INSERT INTO t1 VALUES(blob(900));
    INSERT INTO t1 VALUES(blob(900));
    INSERT INTO t1 SELECT blob(900) FROM t1;       /*  4 */
    INSERT INTO t1 SELECT blob(900) FROM t1;       /*  8 */
    INSERT INTO t1 SELECT blob(900) FROM t1;       /* 16 */
    INSERT INTO t1 SELECT blob(900) FROM t1;       /* 32 */
    INSERT INTO t1 SELECT blob(900) FROM t1;       /* 64 */
    INSERT INTO t1 SELECT blob(900) FROM t1;       /* 128 */
    INSERT INTO t1 SELECT blob(900) FROM t1;       /* 256 */
;PRAGMA integrity_check
;PRAGMA integrity_check
;PRAGMA wal_checkpoint
;PRAGMA integrity_check
;PRAGMA auto_vacuum = 0;
      PRAGMA journal_mode = wal;
      CREATE TABLE t1(a, b);
      INSERT INTO t1 VALUES(1, 2);
      SELECT * FROM t1
;BEGIN; INSERT INTO t1 VALUES(3, 4)
;SELECT * FROM t1
;COMMIT
;SELECT * FROM t1
;BEGIN ; SELECT * FROM t1
;INSERT INTO t1 VALUES(5, 6)
;SELECT * FROM t1
;SELECT * FROM t1
;BEGIN; INSERT INTO t1 VALUES(7, 8) 
;BEGIN ; SELECT * FROM t1
;COMMIT
;BEGIN
;INSERT INTO t1 VALUES(9, 10)
;COMMIT
;SELECT * FROM t1
;BEGIN; SELECT * FROM t1
;INSERT INTO t1 VALUES(11, 12)
;SELECT * FROM t1
;COMMIT; BEGIN; SELECT * FROM t1
;PRAGMA wal_checkpoint
;BEGIN; SELECT * FROM t1
;SELECT * FROM t1
;SELECT * FROM t1
;PRAGMA wal_checkpoint
;BEGIN; SELECT * FROM t1
;PRAGMA wal_checkpoint
;INSERT INTO t1 VALUES(17, 18)
;SELECT * FROM t1
;INSERT INTO t1 VALUES(19, 20)
;PRAGMA wal_checkpoint
;BEGIN ; SELECT * FROM t1
;INSERT INTO t1 VALUES(21, 22)
;INSERT INTO t1 VALUES(23, 24)
;SELECT * FROM t1 ; COMMIT;