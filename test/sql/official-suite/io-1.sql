-- original: io.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA auto_vacuum = OFF;
    PRAGMA page_size = 1024;
    CREATE TABLE abc(a,b)
;INSERT INTO abc VALUES(1,randstr(230,230))
;INSERT INTO abc VALUES(2,randstr(230,230))
;INSERT INTO abc VALUES(3,randstr(230,230))
;INSERT INTO abc VALUES(4,randstr(230,230))
;INSERT INTO abc VALUES(5,randstr(230,230))
;INSERT INTO abc VALUES(6,randstr(230,230))
;INSERT INTO abc VALUES(7,randstr(230,230))
;INSERT INTO abc VALUES(8,randstr(230,230))
;INSERT INTO abc VALUES(9,randstr(230,230))
;DELETE FROM abc; VACUUM
;INSERT INTO abc VALUES(1, 2)
;INSERT INTO abc VALUES(3, 4)
;BEGIN;
    INSERT INTO abc VALUES(5, 6)
;SELECT * FROM abc
;COMMIT
;SELECT * FROM abc
;CREATE TABLE def(d, e)
;BEGIN;
    INSERT INTO abc VALUES(7, 8)
;INSERT INTO def VALUES('a', 'b')
;COMMIT
;BEGIN IMMEDIATE;
    -- INSERT INTO abc VALUES(9, randstr(1000,1000))
;SELECT * FROM abc
;ATTACH 'test2.db' AS aux;
      PRAGMA aux.page_size = 1024;
      CREATE TABLE aux.abc2(a, b);
      BEGIN;
      INSERT INTO abc VALUES(9, 10)
;INSERT INTO abc2 SELECT * FROM abc
;SELECT * FROM abc UNION ALL SELECT * FROM abc2
;SELECT * FROM abc UNION ALL SELECT * FROM abc2
;BEGIN;
    DELETE FROM abc
;SELECT * FROM abc
;ROLLBACK;
    SELECT * FROM abc
;BEGIN;
    INSERT INTO abc VALUES(9, 10)
;ROLLBACK
;PRAGMA auto_vacuum = OFF;
    PRAGMA page_size = 2048;
    CREATE TABLE abc(a, b)
;BEGIN;
    INSERT INTO abc VALUES(9, 10)
;COMMIT
;BEGIN;
    INSERT INTO abc VALUES(11, 12)
;ROLLBACK
;BEGIN;
    INSERT INTO abc VALUES(11, 12)
;ROLLBACK
;PRAGMA locking_mode = exclusive;
    PRAGMA locking_mode
;INSERT INTO abc VALUES(11, 12)
;PRAGMA locking_mode = normal;
    INSERT INTO abc VALUES(13, 14)
;PRAGMA auto_vacuum=OFF
;CREATE TABLE abc(a, b)
;PRAGMA temp_store = memory;
      PRAGMA cache_size = 10;
      BEGIN;
      INSERT INTO abc VALUES('hello', 'world');
      INSERT INTO abc SELECT * FROM abc;
      INSERT INTO abc SELECT * FROM abc;
      INSERT INTO abc SELECT * FROM abc;
      INSERT INTO abc SELECT * FROM abc;
      INSERT INTO abc SELECT * FROM abc;
      INSERT INTO abc SELECT * FROM abc;
      INSERT INTO abc SELECT * FROM abc;
      INSERT INTO abc SELECT * FROM abc;
      INSERT INTO abc SELECT * FROM abc;
      INSERT INTO abc SELECT * FROM abc;
      INSERT INTO abc SELECT * FROM abc
;COMMIT
;DELETE FROM abc
;INSERT INTO abc VALUES('a', 'b')
;BEGIN
;INSERT INTO abc VALUES('c', 'd')
;COMMIT
;INSERT INTO abc SELECT * FROM abc;
    INSERT INTO abc SELECT * FROM abc;
    INSERT INTO abc SELECT * FROM abc;
    INSERT INTO abc SELECT * FROM abc;
    INSERT INTO abc SELECT * FROM abc;
    INSERT INTO abc SELECT * FROM abc;
    INSERT INTO abc SELECT * FROM abc;
    INSERT INTO abc SELECT * FROM abc;
    INSERT INTO abc SELECT * FROM abc;
    INSERT INTO abc SELECT * FROM abc;
    INSERT INTO abc SELECT * FROM abc
;PRAGMA synchronous = full;
      PRAGMA cache_size = 10;
      PRAGMA synchronous
;BEGIN;
    UPDATE abc SET a = 'x'
;PRAGMA auto_vacuum=OFF
;CREATE TABLE abc(a, b, c)
;PRAGMA mmap_size = 0;
    PRAGMA page_size = 1024;
    PRAGMA cache_size = 2000;
    CREATE TABLE t1(x);
    CREATE TABLE t2(x);
    CREATE TABLE t3(x);
    CREATE INDEX i3 ON t3(x);
    INSERT INTO t3 VALUES(randomblob(100));
    INSERT INTO t3 SELECT randomblob(100) FROM t3;
    INSERT INTO t3 SELECT randomblob(100) FROM t3;
    INSERT INTO t3 SELECT randomblob(100) FROM t3;
    INSERT INTO t3 SELECT randomblob(100) FROM t3;
    INSERT INTO t3 SELECT randomblob(100) FROM t3;
    INSERT INTO t3 SELECT randomblob(100) FROM t3;
    INSERT INTO t3 SELECT randomblob(100) FROM t3;
    INSERT INTO t3 SELECT randomblob(100) FROM t3;
    INSERT INTO t3 SELECT randomblob(100) FROM t3;
    INSERT INTO t3 SELECT randomblob(100) FROM t3;
    INSERT INTO t3 SELECT randomblob(100) FROM t3
;PRAGMA cache_size = 2000;
    PRAGMA mmap_size = 0;
    SELECT x FROM t3 ORDER BY rowid;
    SELECT x FROM t3 ORDER BY x;