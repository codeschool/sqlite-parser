-- original: 8_3_names.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA cache_size=10;
    CREATE TABLE t1(x);
    INSERT INTO t1 VALUES(randomblob(20000));
    BEGIN;
    DELETE FROM t1;
    INSERT INTO t1 VALUES(randomblob(15000))
;ROLLBACK;
    SELECT length(x) FROM t1
;PRAGMA cache_size=10;
    CREATE TABLE t1(x);
    INSERT INTO t1 VALUES(randomblob(20000));
    BEGIN;
    DELETE FROM t1;
    INSERT INTO t1 VALUES(randomblob(15000))
;COMMIT;
    SELECT length(x) FROM t1
;PRAGMA integrity_check;
    SELECT length(x) FROM t1
;PRAGMA cache_size=10;
    CREATE TABLE t1(x);
    INSERT INTO t1 VALUES(randomblob(20000));
    BEGIN;
    DELETE FROM t1;
    INSERT INTO t1 VALUES(randomblob(15000))
;COMMIT;
    SELECT length(x) FROM t1
;PRAGMA integrity_check;
    SELECT length(x) FROM t1
;CREATE TABLE t1(x);
    INSERT INTO t1 VALUES(1);
    ATTACH 'file:./test2.db?8_3_names=1' AS db2;
    CREATE TABLE db2.t2(y);
    INSERT INTO t2 VALUES(2);
    BEGIN;
      INSERT INTO t1 VALUES(3);
      INSERT INTO t2 VALUES(4);
    COMMIT;
    SELECT * FROM t1, t2 ORDER BY x, y
;PRAGMA journal_mode=WAL;
    CREATE TABLE t1(x);
    CREATE VIRTUAL TABLE nums USING wholenumber;
    INSERT INTO t1 SELECT value FROM nums WHERE value BETWEEN 1 AND 1000;
    BEGIN;
    UPDATE t1 SET x=x*2
;BEGIN;
    SELECT sum(x) FROM t1
;COMMIT;
    SELECT sum(x) FROM t1
;SELECT sum(x) FROM t1;