-- original: wal5.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA synchronous = NORMAL
;PRAGMA page_size = 1024;
        PRAGMA auto_vacuum = 0;
        CREATE TABLE t1(x, y);
        PRAGMA journal_mode = WAL;
        INSERT INTO t1 VALUES(1, zeroblob(1200));
        INSERT INTO t1 VALUES(2, zeroblob(1200));
        INSERT INTO t1 VALUES(3, zeroblob(1200))
;BEGIN; SELECT x FROM t1
;INSERT INTO t1 VALUES(4, zeroblob(1200))
;INSERT INTO t1 VALUES(5, zeroblob(1200))
;BEGIN ; SELECT x FROM t1
;INSERT INTO t1 VALUES(6, zeroblob(1200))
;BEGIN ; SELECT x FROM t1
;ATTACH 'test.db2' AS aux
;ATTACH 'test.db2' AS aux
;ATTACH 'test.db2' AS aux
;PRAGMA aux.auto_vacuum = 0;
      PRAGMA main.auto_vacuum = 0;
      PRAGMA main.page_size=1024; PRAGMA main.journal_mode=WAL;
      PRAGMA aux.page_size=1024;  PRAGMA aux.journal_mode=WAL
;CREATE TABLE t1(a, b);
        INSERT INTO t1 VALUES(1, 2);
        CREATE TABLE aux.t2(a, b);
        INSERT INTO t2 VALUES(1, 2)
;CREATE TABLE t1(a, b);
        INSERT INTO t1 VALUES(1, 2);
        CREATE TABLE aux.t2(a, b);
        INSERT INTO t2 VALUES(1, 2);
        INSERT INTO t2 VALUES(3, 4)
;BEGIN; SELECT * FROM t1
;CREATE TABLE t1(a, b);
        INSERT INTO t1 VALUES(1, 2);
        CREATE TABLE aux.t2(a, b);
        INSERT INTO t2 VALUES(1, 2)
;BEGIN; SELECT * FROM t1
;INSERT INTO t1 VALUES(3, 4)
;INSERT INTO t2 VALUES(3, 4)
;COMMIT ; BEGIN ; SELECT * FROM t1
;COMMIT
;COMMIT
;CREATE TABLE t1(a, b);
          INSERT INTO t1 VALUES(1, 2)
;BEGIN; INSERT INTO t1 VALUES(3, 4)
;BEGIN; SELECT * FROM t1
;PRAGMA auto_vacuum = 0;
        PRAGMA journal_mode = WAL;
        PRAGMA synchronous = normal;
        CREATE TABLE t1(x, y)
;PRAGMA journal_mode
;PRAGMA journal_mode
;PRAGMA journal_mode
;PRAGMA page_size = 1024;
        PRAGMA auto_vacuum = 0;
        PRAGMA journal_mode = WAL;
        PRAGMA synchronous = normal;
        CREATE TABLE t1(x, y);
        CREATE INDEX i1 ON t1(x, y);
        INSERT INTO t1 VALUES(1, 2);
        INSERT INTO t1 VALUES(3, 4)
;SELECT * FROM t1
;INSERT INTO t1 VALUES('a', 'b')
;PRAGMA page_size = 1024;
        PRAGMA auto_vacuum = 0;
        PRAGMA journal_mode = WAL;
        PRAGMA synchronous = normal;
        CREATE TABLE t1(x, y);
        CREATE INDEX i1 ON t1(x, y);
        INSERT INTO t1 VALUES(1, 2);
        INSERT INTO t1 VALUES(3, 4);
        INSERT INTO t1 VALUES(5, 6)
;BEGIN; SELECT * FROM t1
;BEGIN; INSERT INTO t1 VALUES(7, 8)
;ROLLBACK
;COMMIT
;INSERT INTO t1 VALUES(7, 8);
        INSERT INTO t1 VALUES(9, 10);
        SELECT * FROM t1
;BEGIN; SELECT * FROM t1
;COMMIT;