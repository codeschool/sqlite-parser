-- original: multiplex.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA page_size=1024;
    PRAGMA auto_vacuum=OFF;
    PRAGMA journal_mode=DELETE
;CREATE TABLE t1(a, b);
    INSERT INTO t1 VALUES(1, randomblob(1100));
    INSERT INTO t1 VALUES(2, randomblob(1100))
;INSERT INTO t1 VALUES(3, randomblob(1100))
;INSERT INTO t1 VALUES(3, randomblob(1100))
;INSERT INTO t1 VALUES(3, randomblob(1100))
;PRAGMA page_size = 1024;
    PRAGMA journal_mode = delete;
    PRAGMA auto_vacuum = off;
    CREATE TABLE t1(a PRIMARY KEY, b)
;INSERT INTO t1 VALUES(1, 'one');
    INSERT INTO t1 VALUES(2, randomblob(4000));
    INSERT INTO t1 VALUES(3, 'three');
    INSERT INTO t1 VALUES(4, randomblob(4000));
    INSERT INTO t1 VALUES(5, 'five');
    INSERT INTO t1 VALUES(6, randomblob(sub_g_chunk_size));
    INSERT INTO t1 VALUES(7, randomblob(sub_g_chunk_size))
;SELECT * FROM t1 WHERE a=1
;SELECT * FROM t1 WHERE a=3
;SELECT * FROM t1 WHERE a=5
;SELECT a,length(b) FROM t1 WHERE a=2
;SELECT a,length(b) FROM t1 WHERE a=4
;PRAGMA page_size = 1024;
        PRAGMA auto_vacuum = off
;PRAGMA journal_mode = sub_jmode
;CREATE TABLE t1(a PRIMARY KEY, b);
        INSERT INTO t1 VALUES(1, 'one');
        INSERT INTO t1 VALUES(2, randomblob(sub_g_chunk_size))
;SELECT b FROM t1 WHERE a=1
;SELECT length(b) FROM t1 WHERE a=2
;CREATE TABLE t1(a PRIMARY KEY, b);
    INSERT INTO t1 VALUES(1, randomblob(1000))
;INSERT INTO t1 VALUES(2, randomblob(65536))
;PRAGMA page_size = 1024;
    PRAGMA journal_mode = delete;
    PRAGMA auto_vacuum = off;
    CREATE TABLE t1(a PRIMARY KEY, b);
    INSERT INTO t1 VALUES(1, 'one')
;CREATE TABLE t2(a, b)
;CREATE TABLE t3(a, b)
;PRAGMA page_size = 1024;
      PRAGMA journal_mode = delete;
      PRAGMA auto_vacuum = off;
      CREATE TABLE t1(a, b)
;INSERT INTO t1 VALUES('x', 'y')
;INSERT INTO t1 VALUES('v', 'w')
;INSERT INTO t1 VALUES('t', 'u')
;INSERT INTO t1 VALUES('r', 's')
;INSERT INTO t1 VALUES(randomblob(500), randomblob(500))
;INSERT INTO t1 VALUES(randomblob(500), randomblob(500))
;INSERT INTO t1 VALUES(randomblob(500), randomblob(500))
;INSERT INTO t1 VALUES(randomblob(500), randomblob(500))
;INSERT INTO t1 VALUES(randomblob(500), randomblob(500))
;INSERT INTO t1 VALUES(randomblob(500), randomblob(500))
;INSERT INTO t1 VALUES(randomblob(500), randomblob(500))
;INSERT INTO t1 VALUES(randomblob(500), randomblob(500))
;CREATE TABLE t2(x); INSERT INTO t2 VALUES('tab-t2')
;SELECT * FROM t2
;INSERT INTO t2 VALUES(zeroblob(200000))
;SELECT count(*) FROM t2
;DELETE FROM t2 WHERE x = 'tab-t2'
;SELECT count(*) FROM t2
;INSERT INTO t2 VALUES(zeroblob(200000))
;PRAGMA auto_vacuum = 1;
    PRAGMA page_size = 1024;
    CREATE TABLE t1(a, b);
    INSERT INTO t1 VALUES(10, zeroblob(1200))
;DELETE FROM t1
;PRAGMA page_size=1024;
    PRAGMA journal_mode=DELETE;
    PRAGMA auto_vacuum=OFF
;CREATE TABLE t1(a, b);
    INSERT INTO t1 VALUES(1, randomblob(sub_g_chunk_size));
    INSERT INTO t1 VALUES(2, randomblob(sub_g_chunk_size))
;VACUUM;