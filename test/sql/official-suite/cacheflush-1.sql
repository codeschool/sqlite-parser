-- original: cacheflush.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a, b);
  INSERT INTO t1 VALUES(1, 2);
  BEGIN;
    INSERT INTO t1 VALUES(3, 4)
;COMMIT;
  CREATE TABLE t2(a, b);
  BEGIN;
    INSERT INTO t1 VALUES(5, 6);
    INSERT INTO t2 VALUES('a', 'b')
;COMMIT;
  CREATE TABLE t3(a, b);
  BEGIN;
    INSERT INTO t1 VALUES(7, 8);
    INSERT INTO t2 VALUES('c', 'd');
    INSERT INTO t3 VALUES('i', 'ii')
;SELECT a FROM t1
;COMMIT;
  BEGIN;
    INSERT INTO t1 VALUES(9, 10)
;BEGIN;
      SELECT * FROM t1
;COMMIT
;ATTACH 'test.db2' AS aux;
  CREATE TABLE aux.t4(x, y);
  INSERT INTO t4 VALUES('A', 'B');
  BEGIN;
    INSERT INTO t1 VALUES(11, 12);
    INSERT INTO t4 VALUES('C', 'D')
;COMMIT
;BEGIN;
    INSERT INTO t1 VALUES(13, 14);
    INSERT INTO t4 VALUES('E', 'F')
;BEGIN;
      SELECT * FROM t1
;COMMIT
;CREATE TABLE t1(x PRIMARY KEY);
    CREATE TABLE t2(y PRIMARY KEY);
    BEGIN;
      INSERT INTO t1 VALUES(randomblob(100));
      INSERT INTO t2 VALUES(randomblob(100));
      INSERT INTO t1 VALUES(randomblob(100));
      INSERT INTO t2 VALUES(randomblob(100))
;PRAGMA integrity_check
;COMMIT
;PRAGMA integrity_check
;SELECT count(*) FROM t1;
  SELECT count(*) FROM t2
;CREATE TABLE ta(a, aa);
    CREATE TABLE tb(b, bb);
    INSERT INTO ta VALUES('a', randomblob(500));
    INSERT INTO tb VALUES('b', randomblob(500));
    BEGIN;
      UPDATE ta SET a = 'A';
      SAVEPOINT one;
        UPDATE tb SET b = 'B'
;ROLLBACK TO one
;INSERT INTO tb VALUES('c', randomblob(10));
    INSERT INTO tb VALUES('d', randomblob(10));
    INSERT INTO tb VALUES('e', randomblob(10))
;SAVEPOINT two;
    UPDATE tb SET b = upper(b)
;ROLLBACK TO two
;ROLLBACK TO one
;ROLLBACK;
    SELECT a FROM ta;
    SELECT b FROM tb;