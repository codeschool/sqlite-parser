-- original: backup.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

select * from sqlite_master
;select * from sqlite_master
;BEGIN;
    CREATE TABLE t1(a, b);
    CREATE INDEX i1 ON t1(a, b);
    INSERT INTO t1 VALUES(1, randstr(1000,1000));
    INSERT INTO t1 VALUES(2, randstr(1000,1000));
    INSERT INTO t1 VALUES(3, randstr(1000,1000));
    INSERT INTO t1 VALUES(4, randstr(1000,1000));
    INSERT INTO t1 VALUES(5, randstr(1000,1000));
    COMMIT
;ATTACH 'sub_zDestFile' AS bak
;PRAGMA page_size = 1024;
      BEGIN;
      CREATE TABLE t1(a, b);
      CREATE INDEX i1 ON t1(a, b);
      INSERT INTO t1 VALUES(1, randstr(1000,1000));
      INSERT INTO t1 VALUES(2, randstr(1000,1000));
      INSERT INTO t1 VALUES(3, randstr(1000,1000));
      INSERT INTO t1 VALUES(4, randstr(1000,1000));
      INSERT INTO t1 VALUES(5, randstr(1000,1000));
      COMMIT
;PRAGMA sub_file_dest.page_size = sub_pgsz_dest
;PRAGMA sub_file_dest.integrity_check
;PRAGMA page_size = 1024
;PRAGMA page_size = sub_nDestPgsz
;BEGIN; 
      CREATE TABLE t1(a, b);
      CREATE INDEX i1 ON t1(a, b);
      COMMIT
;INSERT INTO t1 VALUES(sub_ii, randstr(200,200))
;INSERT INTO t1 VALUES(sub_ii, randstr(1000,1000))
;PRAGMA integrity_check
;PRAGMA page_size = 512
;CREATE TABLE tsub_iTab(a, b, c)
;PRAGMA page_size = 4096
;CREATE TABLE tsub_iTab(a, b, c)
;ATTACH 'test3.db' AS aux1;
    CREATE TABLE aux1.t1(a, b)
;ATTACH 'test4.db' AS aux2;
    CREATE TABLE aux2.t2(a, b)
;CREATE TABLE t1(a, b);
    INSERT INTO t1 VALUES(1, 2)
;PRAGMA page_size = 4096;
    CREATE TABLE t2(a, b);
    INSERT INTO t2 VALUES(3, 4)
;BEGIN;
      CREATE TABLE t1(a, b);
      CREATE INDEX i1 ON t1(a, b);
      INSERT INTO t1 VALUES(1, randstr(1000,1000));
      INSERT INTO t1 VALUES(2, randstr(1000,1000));
      INSERT INTO t1 VALUES(3, randstr(1000,1000));
      INSERT INTO t1 VALUES(4, randstr(1000,1000));
      INSERT INTO t1 VALUES(5, randstr(1000,1000));
      COMMIT
;PRAGMA page_count
;UPDATE t1 SET a = a + 1
;PRAGMA cache_size = 10;
      BEGIN;
      INSERT INTO t1 SELECT '', randstr(1000,1000) FROM t1;
      INSERT INTO t1 SELECT '', randstr(1000,1000) FROM t1;
      INSERT INTO t1 SELECT '', randstr(1000,1000) FROM t1;
      INSERT INTO t1 SELECT '', randstr(1000,1000) FROM t1;
      COMMIT
;BEGIN;
      UPDATE t1 SET a = a + 1;
      ROLLBACK
;UPDATE t1 SET b = randstr(1000,1000)
;VACUUM
;UPDATE t1 SET b = randstr(1000,1000)
;PRAGMA page_size = 2048;
      VACUUM
;PRAGMA auto_vacuum = incremental;
      BEGIN;
      CREATE TABLE t1(a, b);
      CREATE INDEX i1 ON t1(a, b);
      INSERT INTO t1 VALUES(1, randstr(1000,1000));
      INSERT INTO t1 VALUES(2, randstr(1000,1000));
      INSERT INTO t1 VALUES(3, randstr(1000,1000));
      INSERT INTO t1 VALUES(4, randstr(1000,1000));
      INSERT INTO t1 VALUES(5, randstr(1000,1000));
      COMMIT
;DELETE FROM t1;
      PRAGMA incremental_vacuum
;BEGIN;
    CREATE TABLE t1(a, b);
    CREATE INDEX i1 ON t1(a, b);
    INSERT INTO t1 VALUES(1, randstr(1000,1000));
    INSERT INTO t1 VALUES(2, randstr(1000,1000));
    INSERT INTO t1 VALUES(3, randstr(1000,1000));
    INSERT INTO t1 VALUES(4, randstr(1000,1000));
    INSERT INTO t1 VALUES(5, randstr(1000,1000));
    COMMIT
;CREATE TABLE t2(a PRIMARY KEY, b)
;CREATE TABLE t1(a, b);
    CREATE INDEX i1 ON t1(a, b);
    INSERT INTO t1 VALUES(1, randstr(1000,1000));
    INSERT INTO t1 SELECT a+ 1, randstr(1000,1000) FROM t1;
    INSERT INTO t1 SELECT a+ 2, randstr(1000,1000) FROM t1;
    INSERT INTO t1 SELECT a+ 4, randstr(1000,1000) FROM t1;
    INSERT INTO t1 SELECT a+ 8, randstr(1000,1000) FROM t1;
    INSERT INTO t1 SELECT a+16, randstr(1000,1000) FROM t1;
    INSERT INTO t1 SELECT a+32, randstr(1000,1000) FROM t1;
    INSERT INTO t1 SELECT a+64, randstr(1000,1000) FROM t1
;BEGIN EXCLUSIVE
;ROLLBACK
;BEGIN;
    INSERT INTO t1 VALUES(1, 4)
;ROLLBACK
;BEGIN ; CREATE TABLE t2(a, b)
;COMMIT
;BEGIN;
    SELECT * FROM sqlite_master
;PRAGMA lock_status
;BEGIN;
      CREATE TABLE t1(a, b);
      INSERT INTO t1 VALUES(1, randstr(1000,1000));
      INSERT INTO t1 VALUES(2, randstr(1000,1000));
      INSERT INTO t1 VALUES(3, randstr(1000,1000));
      INSERT INTO t1 VALUES(4, randstr(1000,1000));
      INSERT INTO t1 VALUES(5, randstr(1000,1000));
      CREATE INDEX i1 ON t1(a, b);
      COMMIT
;UPDATE t1 SET b = randstr(500,500)
;PRAGMA integrity_check
;CREATE TABLE t1(a INTEGER PRIMARY KEY, b BLOB);
      BEGIN;
        INSERT INTO t1 VALUES(NULL, randomblob(200));
        INSERT INTO t1 SELECT NULL, randomblob(200) FROM t1;
        INSERT INTO t1 SELECT NULL, randomblob(200) FROM t1;
        INSERT INTO t1 SELECT NULL, randomblob(200) FROM t1;
        INSERT INTO t1 SELECT NULL, randomblob(200) FROM t1;
        INSERT INTO t1 SELECT NULL, randomblob(200) FROM t1;
        INSERT INTO t1 SELECT NULL, randomblob(200) FROM t1;
        INSERT INTO t1 SELECT NULL, randomblob(200) FROM t1;
        INSERT INTO t1 SELECT NULL, randomblob(200) FROM t1;
      COMMIT;
      SELECT count(*) FROM t1
;pragma page_count
;UPDATE t1 SET b = randomblob(200) WHERE a IN (1, 250);