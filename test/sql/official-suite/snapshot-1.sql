-- original: snapshot.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a, b);
  INSERT INTO t1 VALUES(1, 2);
  INSERT INTO t1 VALUES(3, 4)
;BEGIN; SELECT * FROM t1
;PRAGMA journal_mode = WAL;
    BEGIN;
      INSERT INTO t1 VALUES(5, 6);
      INSERT INTO t1 VALUES(7, 8)
;BEGIN;
    SELECT * FROM t1
;COMMIT;
    INSERT INTO t1 VALUES(9, 10);
    SELECT * FROM t1
;SELECT * FROM t1
;BEGIN;
      SELECT * FROM t1
;INSERT INTO t1 VALUES(11, 12);
    SELECT * FROM t1
;SELECT * FROM t1
;DELETE FROM t1 WHERE a>6
;INSERT INTO t1 VALUES('a', 'b');
    INSERT INTO t1 VALUES('c', 'd');
    SELECT * FROM t1
;SELECT * FROM t1
;CREATE TABLE t2(x, y);
  INSERT INTO t2 VALUES('a', 'b');
  INSERT INTO t2 VALUES('c', 'd');
  BEGIN;
    SELECT * FROM t2
;COMMIT
;INSERT INTO t2 VALUES('e', 'f')
;BEGIN;
      SELECT * FROM t2
;COMMIT;
    BEGIN;
      INSERT INTO t2 VALUES('g', 'h')
;PRAGMA journal_mode = DELETE
;BEGIN
;PRAGMA journal_mode = wal;
  CREATE TABLE t3(i, j);
  INSERT INTO t3 VALUES('o', 't');
  INSERT INTO t3 VALUES('t', 'f');
  BEGIN;
    SELECT * FROM t3
;INSERT INTO t3 VALUES('f', 's'); 
    BEGIN
;SELECT * FROM t3
;COMMIT;
    PRAGMA wal_checkpoint;
    BEGIN
;INSERT INTO t3 VALUES('s', 'e');
    INSERT INTO t3 VALUES('n', 't');
    BEGIN;
      SELECT * FROM t3
;COMMIT;
    PRAGMA wal_checkpoint;
    BEGIN
;SELECT * FROM t3
;COMMIT;
    INSERT INTO t3 VALUES('e', 't');
    BEGIN
;PRAGMA journal_mode = wal;
  CREATE TABLE x1(x, xx, xxx);
  INSERT INTO x1 VALUES('z', 'zz', 'zzz');
  BEGIN;
    SELECT * FROM x1
;INSERT INTO x1 VALUES('a', 'aa', 'aaa');
    COMMIT
;PRAGMA wal_checkpoint
;PRAGMA journal_mode = wal;
  CREATE TABLE x1(x, xx, xxx);
  INSERT INTO x1 VALUES('z', 'zz', 'zzz');
  BEGIN;
    PRAGMA user_version
;INSERT INTO x1 VALUES('a', 'aa', 'aaa');
    COMMIT
;PRAGMA user_version ; BEGIN
;SELECT * FROM x1;