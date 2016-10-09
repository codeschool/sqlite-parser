-- original: incrvacuum2.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA page_size=1024;
    PRAGMA auto_vacuum=incremental;
    CREATE TABLE t1(x);
    INSERT INTO t1 VALUES(zeroblob(30000));
    DELETE FROM t1
;PRAGMA incremental_vacuum(1)
;PRAGMA incremental_vacuum(5)
;PRAGMA incremental_vacuum(1000)
;ATTACH DATABASE 'test2.db' AS aux;
      PRAGMA aux.auto_vacuum=incremental;
      CREATE TABLE aux.t2(x);
      INSERT INTO t2 VALUES(zeroblob(30000));
      INSERT INTO t1 SELECT * FROM t2;
      DELETE FROM t2;
      DELETE FROM t1
;PRAGMA aux.incremental_vacuum(1)
;PRAGMA aux.incremental_vacuum(5)
;PRAGMA main.incremental_vacuum(5)
;PRAGMA aux.incremental_vacuum
;PRAGMA incremental_vacuum(1)
;PRAGMA auto_vacuum = 'full';
    BEGIN;
    CREATE TABLE abc(a);
    INSERT INTO abc VALUES(randstr(1500,1500));
    COMMIT
;BEGIN;
    DELETE FROM abc;
    PRAGMA incremental_vacuum;
    COMMIT
;PRAGMA page_size = 512;
    PRAGMA auto_vacuum = 2;
    CREATE TABLE t1(x);
    INSERT INTO t1 VALUES(randomblob(400));
    INSERT INTO t1 SELECT * FROM t1;            --    2
    INSERT INTO t1 SELECT * FROM t1;            --    4
    INSERT INTO t1 SELECT * FROM t1;            --    8
    INSERT INTO t1 SELECT * FROM t1;            --   16
    INSERT INTO t1 SELECT * FROM t1;            --   32
    INSERT INTO t1 SELECT * FROM t1;            --  128
    INSERT INTO t1 SELECT * FROM t1;            --  256
    INSERT INTO t1 SELECT * FROM t1;            --  512
    INSERT INTO t1 SELECT * FROM t1;            -- 1024
    INSERT INTO t1 SELECT * FROM t1;            -- 2048
    INSERT INTO t1 SELECT * FROM t1;            -- 4096
    INSERT INTO t1 SELECT * FROM t1;            -- 8192
    DELETE FROM t1 WHERE oid>512;
    DELETE FROM t1
;PRAGMA journal_mode = WAL;
      PRAGMA incremental_vacuum(1)
;PRAGMA wal_checkpoint
;PRAGMA journal_mode = WAL
;PRAGMA wal_checkpoint
;PRAGMA incremental_vacuum(1);