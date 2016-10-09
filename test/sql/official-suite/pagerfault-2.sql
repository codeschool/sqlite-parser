-- original: pagerfault.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA cache_size = 10;
    BEGIN EXCLUSIVE
;PRAGMA page_size = 512;

    PRAGMA journal_mode = wal;
    PRAGMA wal_autocheckpoint = 0;
    PRAGMA cache_size = 100000;

    BEGIN;
      CREATE TABLE t2(a UNIQUE, b UNIQUE);
      INSERT INTO t2 VALUES( a_string(800), a_string(800) );
      INSERT INTO t2 SELECT a_string(800), a_string(800) FROM t2;
      INSERT INTO t2 SELECT a_string(800), a_string(800) FROM t2;
      INSERT INTO t2 SELECT a_string(800), a_string(800) FROM t2;
      INSERT INTO t2 SELECT a_string(800), a_string(800) FROM t2;
      INSERT INTO t2 SELECT a_string(800), a_string(800) FROM t2;
      INSERT INTO t2 SELECT a_string(800), a_string(800) FROM t2;
      INSERT INTO t2 SELECT a_string(800), a_string(800) FROM t2;
      INSERT INTO t2 SELECT a_string(800), a_string(800) FROM t2;
      INSERT INTO t2 SELECT a_string(800), a_string(800) FROM t2;
      INSERT INTO t2 SELECT a_string(800), a_string(800) FROM t2;
      INSERT INTO t2 SELECT a_string(800), a_string(800) FROM t2;
    COMMIT;
    CREATE TABLE t1(a PRIMARY KEY, b)
;PRAGMA mmap_size=0
;SELECT count(*) FROM t2
;BEGIN;
      INSERT INTO t1 VALUES(a_string(2000), a_string(2000));
      INSERT INTO t1 VALUES(a_string(2000), a_string(2000))
;ROLLBACK
;SELECT count(*) FROM t2
;SELECT count(*) FROM t2
;PRAGMA page_size = 1024;
    PRAGMA cache_size = 5;

    BEGIN;
      CREATE TABLE t2(a UNIQUE, b UNIQUE);
      INSERT INTO t2 VALUES( a_string(800), a_string(800) );
      INSERT INTO t2 SELECT a_string(800), a_string(800) FROM t2;
      INSERT INTO t2 SELECT a_string(800), a_string(800) FROM t2;
      INSERT INTO t2 SELECT a_string(800), a_string(800) FROM t2;
      INSERT INTO t2 SELECT a_string(800), a_string(800) FROM t2;
    COMMIT
;PRAGMA cache_size = 5;
        BEGIN;
        UPDATE t2 SET a = a_string(799)
;CREATE TABLE t1(x);
    INSERT INTO t1 VALUES(1);
    SELECT * FROM t1
;CREATE TABLE t1(x);
    INSERT INTO t1 VALUES('one')
;SELECT * FROM t1
;SELECT * FROM t1
;CREATE TABLE t1(a, b);
    INSERT INTO t1 VALUES(1, 2)
;VACUUM
;CREATE TABLE t1(a, b);
    INSERT INTO t1 VALUES(1, 2)
;VACUUM
;CREATE TABLE t1(x PRIMARY KEY)
;BEGIN;
      INSERT INTO t1 VALUES( randomblob(4000) );
      DELETE FROM t1
;CREATE TABLE t1(x PRIMARY KEY, y);
    INSERT INTO t1 VALUES(randomblob(200), randomblob(200));
    INSERT INTO t1 SELECT randomblob(200), randomblob(200) FROM t1;
    INSERT INTO t1 SELECT randomblob(200), randomblob(200) FROM t1;
    INSERT INTO t1 SELECT randomblob(200), randomblob(200) FROM t1
;UPDATE t1 SET x=randomblob(200)
;CREATE TABLE t1(x PRIMARY KEY, y);
    INSERT INTO t1 VALUES(randomblob(200), randomblob(200));
    INSERT INTO t1 SELECT randomblob(200), randomblob(200) FROM t1;
    INSERT INTO t1 SELECT randomblob(200), randomblob(200) FROM t1;
    INSERT INTO t1 SELECT randomblob(200), randomblob(200) FROM t1
;BEGIN;
    SELECT count(*) FROM sqlite_master
;PRAGMA cache_size = 1;
    BEGIN;
      UPDATE t1 SET x = randomblob(200)
;UPDATE t1 SET x = randomblob(200);