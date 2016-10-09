-- original: savepoint.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT * FROM t2
;PRAGMA lock_status
;SELECT 'a', * FROM t1 ; SELECT 'b', * FROM t3
;INSERT INTO t2 VALUES(5, 6);
      RELEASE one
;SELECT * FROM t1;
      SELECT * FROM t2;
      SELECT * FROM t3
;PRAGMA lock_status
;SAVEPOINT one;
        INSERT INTO t1 VALUES('a', 'b');
        SAVEPOINT two;
          INSERT INTO t2 VALUES('c', 'd');
          SAVEPOINT three;
            INSERT INTO t3 VALUES('e', 'f')
;SELECT * FROM t1;
      SELECT * FROM t2;
      SELECT * FROM t3
;ROLLBACK TO two
;SELECT * FROM t1;
      SELECT * FROM t2;
      SELECT * FROM t3
;INSERT INTO t3 VALUES('g', 'h');
      ROLLBACK TO two
;SELECT * FROM t1;
      SELECT * FROM t2;
      SELECT * FROM t3
;ROLLBACK
;SELECT * FROM t1;
      SELECT * FROM t2;
      SELECT * FROM t3
;PRAGMA lock_status
;PRAGMA auto_vacuum = full
;CREATE TABLE t1(a, b, UNIQUE(a, b));
    INSERT INTO t1 VALUES(1, randstr(1000,1000));
    INSERT INTO t1 VALUES(2, randstr(1000,1000))
;SAVEPOINT one;
      CREATE TABLE t2(a, b, UNIQUE(a, b));
      SAVEPOINT two;
        CREATE TABLE t3(a, b, UNIQUE(a, b))
;ROLLBACK TO two
;CREATE TABLE t3(a, b, UNIQUE(a, b));
    ROLLBACK TO one
;ROLLBACK
;PRAGMA wal_checkpoint
;DROP TABLE IF EXISTS t1;
    DROP TABLE IF EXISTS t2;
    DROP TABLE IF EXISTS t3
;BEGIN;
      CREATE TABLE t1(a, b);
      CREATE TABLE t2(x, y);
      INSERT INTO t2 VALUES(1, 2);
      SAVEPOINT one;
        INSERT INTO t2 VALUES(3, 4);
        SAVEPOINT two;
          DROP TABLE t1;
        ROLLBACK TO two
;SELECT * FROM t2
;SELECT * FROM t2
;CREATE TABLE t4(a PRIMARY KEY, b);
    INSERT INTO t4 VALUES(1, 'one')
;SAVEPOINT one
;BEGIN;
        CREATE TABLE t1(a PRIMARY KEY, b);
        INSERT INTO t1 VALUES(1, 2);
      COMMIT;
      PRAGMA journal_mode = off
;BEGIN;
      INSERT INTO t1 VALUES(3, 4);
      INSERT INTO t1 SELECT a+4,b+4  FROM t1;
      COMMIT
;BEGIN;
        INSERT INTO t1 VALUES(9, 10);
        SAVEPOINT s1;
          INSERT INTO t1 VALUES(11, 12);
      COMMIT
;BEGIN;
        INSERT INTO t1 VALUES(13, 14);
        SAVEPOINT s1;
          INSERT INTO t1 VALUES(15, 16);
        ROLLBACK TO s1;
      ROLLBACK;
      SELECT * FROM t1
;CREATE TABLE foo(x);
      INSERT INTO foo VALUES(1);
      INSERT INTO foo VALUES(2)
;BEGIN;
        SELECT * FROM foo
;SAVEPOINT one;
      INSERT INTO foo VALUES(1)
;ROLLBACK TO one
;COMMIT
;RELEASE one
;BEGIN;
        SELECT * FROM foo
;SAVEPOINT one;
      INSERT INTO foo VALUES(1)
;COMMIT
;ROLLBACK TO one;
      INSERT INTO foo VALUES(3);
      INSERT INTO foo VALUES(4);
      INSERT INTO foo VALUES(5);
      RELEASE one
;CREATE INDEX fooidx ON foo(x)
;PRAGMA integrity_check
;CREATE TABLE foo(x);
      INSERT INTO foo VALUES(1);
      INSERT INTO foo VALUES(2)
;BEGIN; SELECT * FROM foo
;PRAGMA locking_mode = EXCLUSIVE;
      BEGIN;
        INSERT INTO foo VALUES(3)
;ROLLBACK
;COMMIT
;INSERT INTO foo VALUES(3);
      PRAGMA locking_mode = NORMAL;
      INSERT INTO foo VALUES(4)
;CREATE INDEX fooidx ON foo(x)
;PRAGMA integrity_check
;CREATE TABLE foo(x);
      INSERT INTO foo VALUES(1);
      INSERT INTO foo VALUES(2)
;SELECT * FROM foo
;INSERT INTO foo VALUES(3)
;SELECT * FROM foo
;INSERT INTO foo VALUES(4)
;CREATE INDEX fooidx ON foo(x)
;PRAGMA integrity_check
;SELECT * FROM foo
;BEGIN;
    CREATE TABLE t6(a, b);
    INSERT INTO t6 VALUES(1, 2);
    SAVEPOINT one;
      INSERT INTO t6 VALUES(3, 4);
    ROLLBACK TO one;
    SELECT * FROM t6;
  ROLLBACK
;CREATE TABLE t6(a, b);