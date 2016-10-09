-- original: pcache.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA cache_size=12;
    PRAGMA auto_vacuum=0;
    PRAGMA mmap_size=0
;BEGIN;
    CREATE TABLE t1(a, b, c);
    CREATE TABLE t2(a, b, c);
    CREATE TABLE t3(a, b, c);
    CREATE TABLE t4(a, b, c);
    CREATE TABLE t5(a, b, c)
;CREATE TABLE t6(a, b, c);
    CREATE TABLE t7(a, b, c);
    CREATE TABLE t8(a, b, c);
    CREATE TABLE t9(a, b, c)
;PRAGMA cache_size; PRAGMA cache_size=10
;BEGIN;
    SELECT * FROM sqlite_master
;CREATE INDEX i1 ON t1(a, b);
    CREATE INDEX i2 ON t2(a, b);
    CREATE INDEX i3 ON t3(a, b);
    CREATE INDEX i4 ON t4(a, b);
    CREATE INDEX i5 ON t5(a, b);
    CREATE INDEX i6 ON t6(a, b);
    CREATE INDEX i7 ON t7(a, b);
    CREATE INDEX i8 ON t8(a, b);
    CREATE INDEX i9 ON t9(a, b);
    CREATE INDEX i10 ON t9(a, b);
    CREATE INDEX i11 ON t9(a, b)
;CREATE TABLE t10(a, b, c)
;ROLLBACK
;PRAGMA cache_size = 20
;SELECT * FROM t1 ORDER BY a; SELECT * FROM t1;
    SELECT * FROM t2 ORDER BY a; SELECT * FROM t2;
    SELECT * FROM t3 ORDER BY a; SELECT * FROM t3;
    SELECT * FROM t4 ORDER BY a; SELECT * FROM t4;
    SELECT * FROM t5 ORDER BY a; SELECT * FROM t5;
    SELECT * FROM t6 ORDER BY a; SELECT * FROM t6;
    SELECT * FROM t7 ORDER BY a; SELECT * FROM t7;
    SELECT * FROM t8 ORDER BY a; SELECT * FROM t8;
    SELECT * FROM t9 ORDER BY a; SELECT * FROM t9
;PRAGMA cache_size = 15
;SELECT * FROM sqlite_master
;SELECT * FROM t1 ORDER BY a; SELECT * FROM t1;
    SELECT * FROM t2 ORDER BY a; SELECT * FROM t2;
    SELECT * FROM t3 ORDER BY a; SELECT * FROM t3;
    SELECT * FROM t4 ORDER BY a; SELECT * FROM t4;
    SELECT * FROM t5 ORDER BY a; SELECT * FROM t5;
    SELECT * FROM t6 ORDER BY a; SELECT * FROM t6;
    SELECT * FROM t7 ORDER BY a; SELECT * FROM t7;
    SELECT * FROM t8 ORDER BY a; SELECT * FROM t8;
    SELECT * FROM t9 ORDER BY a; SELECT * FROM t9;