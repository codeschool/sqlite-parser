-- original: autovacuum.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA auto_vacuum = 1;
    CREATE TABLE av1(a);
    CREATE INDEX av1_idx ON av1(a)
;INSERT INTO av1 (oid, a) VALUES(sub_i, '[make_str sub_i sub_ENTRY_LEN]')
;pragma integrity_check
;pragma integrity_check
;select a from av1 order by rowid
;DROP TABLE av1
;CREATE TABLE av1(x);
    SELECT rootpage FROM sqlite_master ORDER BY rootpage
;select * from av1
;CREATE TABLE av2(x);
    SELECT rootpage FROM sqlite_master ORDER BY rootpage
;CREATE TABLE av3(x);
    SELECT rootpage FROM sqlite_master ORDER BY rootpage
;CREATE TABLE av4(x);
    SELECT rootpage FROM sqlite_master ORDER BY rootpage
;select * from av1
;INSERT INTO av2 SELECT 'av1' || x FROM av1;
    INSERT INTO av3 SELECT 'av2' || x FROM av1;
    INSERT INTO av4 SELECT 'av3' || x FROM av1
;select x from av2
;select x from av3
;select x from av4
;DROP TABLE av2;
    SELECT rootpage FROM sqlite_master ORDER BY rootpage
;SELECT x FROM av3
;SELECT x FROM av4
;DROP TABLE av1;
    DROP TABLE av3;
    BEGIN;
    DROP TABLE av4
;CREATE TABLE avsub_i (x)
;SELECT rootpage FROM sqlite_master ORDER by rootpage
;CREATE TABLE avsub_i (x)
;SELECT rootpage FROM sqlite_master ORDER by rootpage
;DROP TABLE avsub_i
;CREATE TABLE av1(a PRIMARY KEY, b, c);
    INSERT INTO av1 VALUES('av1 a', 'av1 b', 'av1 c');

    CREATE TABLE av2(a PRIMARY KEY, b, c);
    CREATE INDEX av2_i1 ON av2(b);
    CREATE INDEX av2_i2 ON av2(c);
    INSERT INTO av2 VALUES('av2 a', 'av2 b', 'av2 c');

    CREATE TABLE av3(a PRIMARY KEY, b, c);
    CREATE INDEX av3_i1 ON av3(b);
    INSERT INTO av3 VALUES('av3 a', 'av3 b', 'av3 c');

    CREATE TABLE av4(a, b, c);
    CREATE INDEX av4_i1 ON av4(a);
    CREATE INDEX av4_i2 ON av4(b);
    CREATE INDEX av4_i3 ON av4(c);
    CREATE INDEX av4_i4 ON av4(a, b, c);
    INSERT INTO av4 VALUES('av4 a', 'av4 b', 'av4 c')
;SELECT name, rootpage FROM sqlite_master
;SELECT * FROM av1 WHERE a = 'av1 a'
;SELECT * FROM av2 WHERE a = 'av2 a' AND b = 'av2 b' AND c = 'av2 c'
;SELECT * FROM av3 WHERE a = 'av3 a' AND b = 'av3 b'
;SELECT * FROM av4 WHERE a = 'av4 a' AND b = 'av4 b' AND c = 'av4 c'
;DROP TABLE av3;
    SELECT name, rootpage FROM sqlite_master
;SELECT * FROM av1 WHERE a = 'av1 a'
;SELECT * FROM av2 WHERE a = 'av2 a' AND b = 'av2 b' AND c = 'av2 c'
;SELECT * FROM av4 WHERE a = 'av4 a' AND b = 'av4 b' AND c = 'av4 c'
;DROP TABLE av1;
    SELECT name, rootpage FROM sqlite_master
;SELECT * FROM av2 WHERE a = 'av2 a' AND b = 'av2 b' AND c = 'av2 c'
;SELECT * FROM av4 WHERE a = 'av4 a' AND b = 'av4 b' AND c = 'av4 c'
;DROP TABLE av4;
    SELECT name, rootpage FROM sqlite_master
;SELECT * FROM av2 WHERE a = 'av2 a' AND b = 'av2 b' AND c = 'av2 c'
;PRAGMA auto_vacuum
;PRAGMA auto_vacuum
;PRAGMA auto_vacuum = 0;
    PRAGMA auto_vacuum
;PRAGMA auto_vacuum
;CREATE TABLE av1(x);
    PRAGMA auto_vacuum
;PRAGMA auto_vacuum = 1;
    PRAGMA auto_vacuum
;DROP TABLE av1
;PRAGMA auto_vacuum = 1;
    PRAGMA auto_vacuum
;CREATE TABLE av1(a, b);
    BEGIN
;SELECT sum(a) FROM av1
;SELECT sum(a) FROM av1
;COMMIT
;PRAGMA auto_vacuum=1;
    CREATE TABLE t1(a);
    CREATE TABLE t2(a);
    DROP TABLE t1;
    PRAGMA integrity_check
;PRAGMA auto_vacuum=1;
    CREATE TABLE t1(a, b);
    CREATE INDEX i1 ON t1(a);
    CREATE TABLE t2(a);
    CREATE INDEX i2 ON t2(a);
    CREATE TABLE t3(a);
    CREATE INDEX i3 ON t2(a);
    CREATE INDEX x ON t1(b);
    DROP TABLE t3;
    PRAGMA integrity_check;
    DROP TABLE t2;
    PRAGMA integrity_check;
    DROP TABLE t1;
    PRAGMA integrity_check
;PRAGMA auto_vacuum=1;
    CREATE TABLE t1(a, b, PRIMARY KEY(a, b));
    INSERT INTO t1 VALUES(randstr(400,400),randstr(400,400));
    INSERT INTO t1 SELECT randstr(400,400), randstr(400,400) FROM t1; -- 2
    INSERT INTO t1 SELECT randstr(400,400), randstr(400,400) FROM t1; -- 4
    INSERT INTO t1 SELECT randstr(400,400), randstr(400,400) FROM t1; -- 8
    INSERT INTO t1 SELECT randstr(400,400), randstr(400,400) FROM t1; -- 16
    INSERT INTO t1 SELECT randstr(400,400), randstr(400,400) FROM t1; -- 32
;CREATE TABLE t2(a, b, PRIMARY KEY(a, b));
    INSERT INTO t2 SELECT randstr(400,400), randstr(400,400) FROM t1; -- 2
    CREATE TABLE t3(a, b, PRIMARY KEY(a, b));
    INSERT INTO t3 SELECT randstr(400,400), randstr(400,400) FROM t1; -- 2
    CREATE TABLE t4(a, b, PRIMARY KEY(a, b));
    INSERT INTO t4 SELECT randstr(400,400), randstr(400,400) FROM t1; -- 2
    CREATE TABLE t5(a, b, PRIMARY KEY(a, b));
    INSERT INTO t5 SELECT randstr(400,400), randstr(400,400) FROM t1; -- 2
;BEGIN;
    DELETE FROM t4;
    COMMIT;
    SELECT count(*) FROM t1
;PRAGMA auto_vacuum
;BEGIN EXCLUSIVE
;COMMIT
;DROP TABLE t1;
    DROP TABLE t2;
    DROP TABLE t3;
    DROP TABLE t4;
    DROP TABLE t5;
    PRAGMA page_count
;CREATE TABLE t1(a INTEGER PRIMARY KEY, b);
    INSERT INTO t1 VALUES(NULL, randstr(50,50))
;INSERT INTO t1 SELECT NULL, randstr(50,50) FROM t1
;INSERT INTO t1 SELECT NULL, randstr(50,50) FROM t1
;DELETE FROM t1 WHERE rowid > (SELECT max(a)/2 FROM t1);