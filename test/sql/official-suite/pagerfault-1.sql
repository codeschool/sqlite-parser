-- original: pagerfault.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA journal_mode = DELETE;
    PRAGMA cache_size = 10;
    CREATE TABLE t1(a UNIQUE, b UNIQUE);
    INSERT INTO t1 VALUES(a_string(200), a_string(300));
    INSERT INTO t1 SELECT a_string(200), a_string(300) FROM t1;
    INSERT INTO t1 SELECT a_string(200), a_string(300) FROM t1;
    BEGIN;
      INSERT INTO t1 SELECT a_string(201), a_string(301) FROM t1;
      INSERT INTO t1 SELECT a_string(202), a_string(302) FROM t1;
      INSERT INTO t1 SELECT a_string(203), a_string(303) FROM t1;
      INSERT INTO t1 SELECT a_string(204), a_string(304) FROM t1
;SELECT count(*) FROM t1
;PRAGMA page_size = 4096;
    BEGIN;
      CREATE TABLE abc(a, b, c);
      INSERT INTO abc VALUES('o', 't', 't'); 
      INSERT INTO abc VALUES('f', 'f', 's'); 
      INSERT INTO abc SELECT * FROM abc; -- 4
      INSERT INTO abc SELECT * FROM abc; -- 8
      INSERT INTO abc SELECT * FROM abc; -- 16
      INSERT INTO abc SELECT * FROM abc; -- 32
      INSERT INTO abc SELECT * FROM abc; -- 64
      INSERT INTO abc SELECT * FROM abc; -- 128
      INSERT INTO abc SELECT * FROM abc; -- 256
    COMMIT;
    PRAGMA page_size = 1024;
    VACUUM
;SELECT * FROM abc
;SELECT * FROM abc
;ATTACH 'test.db2' AS aux;
    PRAGMA journal_mode = DELETE;
    PRAGMA main.cache_size = 10;
    PRAGMA aux.cache_size = 10;

    CREATE TABLE t1(a UNIQUE, b UNIQUE);
    CREATE TABLE aux.t2(a UNIQUE, b UNIQUE);
    INSERT INTO t1 VALUES(a_string(200), a_string(300));
    INSERT INTO t1 SELECT a_string(200), a_string(300) FROM t1;
    INSERT INTO t1 SELECT a_string(200), a_string(300) FROM t1;
    INSERT INTO t2 SELECT * FROM t1;

    BEGIN;
      INSERT INTO t1 SELECT a_string(201), a_string(301) FROM t1;
      INSERT INTO t1 SELECT a_string(202), a_string(302) FROM t1;
      INSERT INTO t1 SELECT a_string(203), a_string(303) FROM t1;
      INSERT INTO t1 SELECT a_string(204), a_string(304) FROM t1;
      REPLACE INTO t2 SELECT * FROM t1;
    COMMIT
;ATTACH 'test.db2' AS aux;
    SELECT count(*) FROM t2;
    SELECT count(*) FROM t1
;CREATE TABLE x(y);
    INSERT INTO x VALUES('z');
    SELECT * FROM x
;CREATE TABLE t1(a UNIQUE, b UNIQUE);
    INSERT INTO t1 VALUES(a_string(200), a_string(300));
    INSERT INTO t1 SELECT a_string(200), a_string(300) FROM t1;
    INSERT INTO t1 SELECT a_string(200), a_string(300) FROM t1
;PRAGMA journal_mode = PERSIST
;INSERT INTO t1 SELECT a_string(200), a_string(300) FROM t1
;PRAGMA journal_mode = PERSIST;
    PRAGMA journal_size_limit = 2048
;INSERT INTO t1 SELECT a_string(200), a_string(300) FROM t1
;PRAGMA journal_mode = PERSIST;
    ATTACH 'test2.db' AS aux;
    PRAGMA aux.journal_mode = PERSIST;
    PRAGMA aux.journal_size_limit = 0
;BEGIN;
      INSERT INTO t1 SELECT a_string(200), a_string(300) FROM t1;
      CREATE TABLE aux.t2 AS SELECT * FROM t1;
    COMMIT
;CREATE TABLE t1(a UNIQUE, b UNIQUE);
    INSERT INTO t1 VALUES(a_string(200), a_string(300))
;PRAGMA journal_mode = TRUNCATE
;INSERT INTO t1 SELECT a_string(200), a_string(300) FROM t1
;INSERT INTO t1 SELECT a_string(200), a_string(300) FROM t1
;PRAGMA journal_mode = TRUNCATE
;INSERT INTO t1 SELECT a_string(200), a_string(300) FROM t1
;INSERT INTO t1 SELECT a_string(200), a_string(300) FROM t1
;CREATE TABLE t2(a INTEGER PRIMARY KEY, b);
    BEGIN;
      INSERT INTO t2 VALUES(NULL, randomblob(1500));
      INSERT INTO t2 VALUES(NULL, randomblob(1500));
      INSERT INTO t2 SELECT NULL, randomblob(1500) FROM t2;    --  4
      INSERT INTO t2 SELECT NULL, randomblob(1500) FROM t2;    --  8
      INSERT INTO t2 SELECT NULL, randomblob(1500) FROM t2;    -- 16
      INSERT INTO t2 SELECT NULL, randomblob(1500) FROM t2;    -- 32
      INSERT INTO t2 SELECT NULL, randomblob(1500) FROM t2;    -- 64
    COMMIT;
    CREATE TABLE t1(a PRIMARY KEY, b);
    INSERT INTO t1 SELECT * FROM t2;
    DROP TABLE t2
;PRAGMA cache_size = 10;
    BEGIN;
      UPDATE t1 SET b = randomblob(1500)
;UPDATE t1 SET a = 65, b = randomblob(1500) WHERE (a+1)>200
;PRAGMA auto_vacuum = 1;
    CREATE TABLE t1(a INTEGER PRIMARY KEY, b);
    BEGIN;
      INSERT INTO t1 VALUES(NULL, randomblob(1500));
      INSERT INTO t1 VALUES(NULL, randomblob(1500));
      INSERT INTO t1 SELECT NULL, randomblob(1500) FROM t1;    --  4
      INSERT INTO t1 SELECT NULL, randomblob(1500) FROM t1;    --  8
      INSERT INTO t1 SELECT NULL, randomblob(1500) FROM t1;    -- 16
      INSERT INTO t1 SELECT NULL, randomblob(1500) FROM t1;    -- 32
      INSERT INTO t1 SELECT NULL, randomblob(1500) FROM t1;    -- 64
    COMMIT
;DELETE FROM t1 WHERE a>32
;BEGIN;
    DELETE FROM t1 WHERE a>32
;PRAGMA auto_vacuum = incremental;
    CREATE TABLE t1(x);
    CREATE TABLE t2(y);
    CREATE TABLE t3(z);

    INSERT INTO t1 VALUES(randomblob(900));
    INSERT INTO t1 VALUES(randomblob(900));
    DELETE FROM t1
;BEGIN;
      INSERT INTO t1 VALUES(randomblob(900));
      INSERT INTO t1 VALUES(randomblob(900));
      DROP TABLE t3;
      DROP TABLE t2;
      SAVEPOINT abc;
        PRAGMA incremental_vacuum
;PRAGMA cache_size = 10;
      BEGIN;
        CREATE TABLE xx(a, b, UNIQUE(a, b));
        INSERT INTO xx VALUES(a_string(200), a_string(200));
        INSERT INTO xx SELECT a_string(200), a_string(200) FROM xx;
        INSERT INTO xx SELECT a_string(200), a_string(200) FROM xx;
        INSERT INTO xx SELECT a_string(200), a_string(200) FROM xx;
        INSERT INTO xx SELECT a_string(200), a_string(200) FROM xx;
      COMMIT
;UPDATE xx SET a = a_string(300)
;PRAGMA journal_mode = TRUNCATE
;PRAGMA auto_vacuum = on;
    CREATE TABLE t1(x UNIQUE);
    CREATE TABLE t2(y UNIQUE);
    CREATE TABLE t3(z UNIQUE);
    BEGIN;
      INSERT INTO t1 VALUES(a_string(202));
      INSERT INTO t2 VALUES(a_string(203));
      INSERT INTO t3 VALUES(a_string(204));
      INSERT INTO t1 SELECT a_string(202) FROM t1;
      INSERT INTO t1 SELECT a_string(203) FROM t1;
      INSERT INTO t1 SELECT a_string(204) FROM t1;
      INSERT INTO t1 SELECT a_string(205) FROM t1;
      INSERT INTO t2 SELECT a_string(length(x)) FROM t1;
      INSERT INTO t3 SELECT a_string(length(x)) FROM t1;
    COMMIT
;PRAGMA cache_size = 10
;SAVEPOINT trans;
      UPDATE t2 SET y = y||'2';
      INSERT INTO t3 SELECT * FROM t2;
      DELETE FROM t1;
    ROLLBACK TO trans;
    UPDATE t1 SET x = x||'3';
    INSERT INTO t2 SELECT * FROM t1;
    DELETE FROM t3;
    RELEASE trans
;PRAGMA page_size = 1024;
    PRAGMA journal_mode = PERSIST;
    PRAGMA cache_size = 10;
    BEGIN;
      CREATE TABLE t1(x, y UNIQUE);
      INSERT INTO t1 VALUES(a_string(333), a_string(444));
      INSERT INTO t1 SELECT a_string(333+rowid), a_string(444+rowid) FROM t1;
      INSERT INTO t1 SELECT a_string(333+rowid), a_string(444+rowid) FROM t1;
      INSERT INTO t1 SELECT a_string(333+rowid), a_string(444+rowid) FROM t1;
      INSERT INTO t1 SELECT a_string(333+rowid), a_string(444+rowid) FROM t1;
      INSERT INTO t1 SELECT a_string(44), a_string(55) FROM t1 LIMIT 13;
    COMMIT
;PRAGMA cache_size = 10
;UPDATE t1 SET x = a_string(length(x)), y = a_string(length(y))
;CREATE TABLE t2 AS SELECT * FROM t1 LIMIT 10
;SELECT * FROM t1
;SELECT rowid FROM t1 LIMIT 2
;PRAGMA journal_mode = PERSIST;
    BEGIN;
      CREATE TABLE t1(x, y UNIQUE);
      INSERT INTO t1 VALUES(a_string(333), a_string(444));
    COMMIT
;CREATE TABLE xx(a, b)
;PRAGMA journal_mode = PERSIST;
    ATTACH 'test.db2' AS two;
    BEGIN;
      CREATE TABLE t1(x, y UNIQUE);
      CREATE TABLE two.t2(x, y UNIQUE);
      INSERT INTO t1 VALUES(a_string(333), a_string(444));
      INSERT INTO t2 VALUES(a_string(333), a_string(444));
    COMMIT
;PRAGMA page_size = 4096; CREATE TABLE xx(a)
;PRAGMA synchronous = off; 
    PRAGMA page_size = 4096; 
    CREATE TABLE xx(a)
;BEGIN;
      CREATE TABLE t1(x, y UNIQUE);
      INSERT INTO t1 VALUES(a_string(11), a_string(22));
      INSERT INTO t1 VALUES(a_string(11), a_string(22));
    COMMIT
;SELECT * FROM t1 LIMIT 1
;BEGIN; INSERT INTO t1 VALUES(a_string(333), a_string(555)); COMMIT;
      BEGIN; INSERT INTO t1 VALUES(a_string(333), a_string(555)); COMMIT
;CREATE TABLE t1(x, y UNIQUE)
;PRAGMA locking_mode = exclusive;
    PRAGMA journal_mode = wal;
    INSERT INTO t1 VALUES(1, 2);
    INSERT INTO t1 VALUES(3, 4);
    PRAGMA journal_mode = delete;
    INSERT INTO t1 VALUES(4, 5);
    PRAGMA journal_mode = wal;
    INSERT INTO t1 VALUES(6, 7);
    PRAGMA journal_mode = persist;
    INSERT INTO t1 VALUES(8, 9)
;CREATE TABLE t1(a PRIMARY KEY, b);
    INSERT INTO t1 VALUES(1862, 'Botha');
    INSERT INTO t1 VALUES(1870, 'Smuts');
    INSERT INTO t1 VALUES(1866, 'Hertzog')
;PRAGMA journal_mode = wal;
    PRAGMA journal_mode = delete
;PRAGMA synchronous = OFF
;PRAGMA journal_mode = wal;
    INSERT INTO t1 VALUES(22, 'Clarke');
    PRAGMA journal_mode = delete
;PRAGMA locking_mode = exclusive;
    PRAGMA journal_mode = wal
;PRAGMA journal_mode = delete
;PRAGMA journal_mode = delete
;PRAGMA journal_mode = wal
;INSERT INTO t1 VALUES(99, 'Bradman')
;PRAGMA journal_mode = delete
;PRAGMA journal_mode = delete
;PRAGMA journal_mode = wal
;INSERT INTO t1 VALUES(101, 'Latham')
;PRAGMA journal_mode = delete
;PRAGMA journal_mode = PERSIST;
    INSERT INTO qq VALUES('Beatty')
;PRAGMA journal_mode = delete
;PRAGMA auto_vacuum = FULL;
    BEGIN;
      CREATE TABLE t1(a, b);
      INSERT INTO t1 VALUES(a_string(5000), a_string(6000));
    COMMIT
;CREATE TABLE t2(a, b);
    INSERT INTO t2 SELECT * FROM t1; 
    DELETE FROM t1
;PRAGMA auto_vacuum = FULL;
    CREATE TABLE t1(x); INSERT INTO t1 VALUES(1);
    CREATE TABLE t2(x); INSERT INTO t2 VALUES(2);
    CREATE TABLE t3(x); INSERT INTO t3 VALUES(3);
    CREATE TABLE t4(x); INSERT INTO t4 VALUES(4);
    CREATE TABLE t5(x); INSERT INTO t5 VALUES(5);
    CREATE TABLE t6(x); INSERT INTO t6 VALUES(6)
;BEGIN;
      UPDATE t4 SET x = x+1;
      UPDATE t6 SET x = x+1;
      SAVEPOINT one;
        UPDATE t3 SET x = x+1;
        SAVEPOINT two;
          DROP TABLE t2;
      ROLLBACK TO one;
    COMMIT;
    SELECT * FROM t3;
    SELECT * FROM t4;
    SELECT * FROM t6
;PRAGMA cache_size = 10;
    PRAGMA auto_vacuum = FULL;
    CREATE TABLE t0(a, b)
;BEGIN;
      CREATE TABLE t1(a, b);
      CREATE TABLE t2(a, b);
      DROP TABLE t1;
    COMMIT
;PRAGMA cache_size = 10;
    CREATE TABLE t0(a PRIMARY KEY, b);
    INSERT INTO t0 VALUES(1, 2)
;SELECT * FROM t0 LIMIT 1
;INSERT INTO t0 SELECT a+1, b FROM t0
;INSERT INTO t0 SELECT a+2, b FROM t0
;PRAGMA page_size = 1024;
    PRAGMA journal_mode = WAL;
    PRAGMA journal_mode = DELETE
;CREATE TABLE t0(a PRIMARY KEY, b UNIQUE);
    INSERT INTO t0 VALUES(a_string(222), a_string(333));
    INSERT INTO t0 VALUES(a_string(223), a_string(334));
    INSERT INTO t0 VALUES(a_string(224), a_string(335));
    INSERT INTO t0 VALUES(a_string(225), a_string(336))
;INSERT INTO t0 SELECT a||'x', b||'x' FROM t0
;PRAGMA page_size = 1024;
    PRAGMA journal_mode = WAL;
    PRAGMA journal_mode = DELETE
;CREATE TABLE t0(a PRIMARY KEY, b UNIQUE);
    INSERT INTO t0 VALUES(a_string(222), a_string(333));
    INSERT INTO t0 VALUES(a_string(223), a_string(334))
;PRAGMA integrity_check
;PRAGMA page_size = 1024;
    PRAGMA auto_vacuum = 0;
    CREATE TABLE t1(a);
    CREATE INDEX i1 ON t1(a);
    INSERT INTO t1 VALUES(a_string(3000));
    CREATE TABLE t2(a);
    INSERT INTO t2 VALUES(1)
;INSERT INTO t2 VALUES(2)
;SELECT * FROM t2
;ATTACH 'test.db2' AS aux;
    CREATE TABLE t1(a, b);
    CREATE TABLE aux.t2(a, b)
;BEGIN;
      INSERT INTO t1 VALUES(1,2);
      INSERT INTO t2 VALUES(3,4); 
    COMMIT
;PRAGMA temp_store = file
;CREATE TABLE x(a, b)
;CREATE TEMP TABLE t1(a, b)
;PRAGMA temp.integrity_check
;SELECT * FROM t1 WHERE oid = sub_n
;PRAGMA page_size = 1024;
    PRAGMA auto_vacuum = 0;
    CREATE TABLE t1(a);
    INSERT INTO t1 VALUES(a_string(500));
    INSERT INTO t1 SELECT a_string(500) FROM t1;
    INSERT INTO t1 SELECT a_string(500) FROM t1;
    INSERT INTO t1 SELECT a_string(500) FROM t1;
    INSERT INTO t1 SELECT a_string(500) FROM t1;
    INSERT INTO t1 SELECT a_string(500) FROM t1
;PRAGMA cache_size = 10;
    BEGIN;
      INSERT INTO t1 VALUES(a_string(3000));
      INSERT INTO t1 VALUES(a_string(3000))
;PRAGMA page_size = 1024;
    PRAGMA journal_mode = truncate;
    PRAGMA auto_vacuum = full;
    PRAGMA locking_mode=exclusive;
    CREATE TABLE t1(a, b);
    INSERT INTO t1 VALUES(1, 2);
    PRAGMA page_size = 4096
;VACUUM
;SELECT * FROM t1
;PRAGMA page_size = 1024;
    CREATE TABLE t1(a, b);
    CREATE TABLE t2(a UNIQUE, b UNIQUE);
    INSERT INTO t2 VALUES( a_string(800), a_string(800) );
    INSERT INTO t2 SELECT a_string(800), a_string(800) FROM t2;
    INSERT INTO t2 SELECT a_string(800), a_string(800) FROM t2;
    INSERT INTO t2 SELECT a_string(800), a_string(800) FROM t2;
    INSERT INTO t2 SELECT a_string(800), a_string(800) FROM t2;
    INSERT INTO t2 SELECT a_string(800), a_string(800) FROM t2;
    INSERT INTO t2 SELECT a_string(800), a_string(800) FROM t2;
    INSERT INTO t1 VALUES (a_string(20000), a_string(20000));