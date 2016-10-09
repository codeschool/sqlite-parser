-- original: sysfault.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a, b);
    INSERT INTO t1 VALUES(1, 2);
    PRAGMA journal_mode = WAL;
    INSERT INTO t1 VALUES(3, 4);
    SELECT * FROM t1;
    CREATE TEMP TABLE t2(x);
    INSERT INTO t2 VALUES('y')
;CREATE TABLE t1(a, b);
        INSERT INTO t1 VALUES(1, 2)
;SELECT * FROM t1
;CREATE TABLE t1(a, b, c, PRIMARY KEY(a));
    INSERT INTO t1 VALUES('abc', 'def', 'ghi');
    ATTACH 'test.db2' AS 'aux';
    CREATE TABLE aux.t2(x);
    INSERT INTO t2 VALUES(1)
;ATTACH 'test.db2' AS 'aux';
    SELECT * FROM t1;
    PRAGMA journal_mode = truncate;
    BEGIN;
      INSERT INTO t1 VALUES('jkl', 'mno', 'pqr');
      INSERT INTO t1 VALUES(randomblob(10000), 0, 0);
      UPDATE t2 SET x = 2;
    COMMIT;
    DELETE FROM t1 WHERE length(a)>3;
    SELECT * FROM t1;
    SELECT * FROM t2
;ATTACH 'test.db2' AS 'aux';
    SELECT * FROM t1;
    PRAGMA journal_mode = truncate;
    BEGIN;
      INSERT INTO t1 VALUES('jkl', 'mno', 'pqr');
      UPDATE t2 SET x = 2;
    COMMIT;
    SELECT * FROM t1;
    SELECT * FROM t2
;PRAGMA synchronous=OFF;
    CREATE TABLE t1(a, b);
    BEGIN;
      SELECT * FROM t1
;INSERT INTO t1 VALUES(randomblob(10000), randomblob(10000));
    SELECT length(a) +length(b) FROM t1;
    COMMIT
;CREATE TABLE t1(a, b);
  INSERT INTO t1 VALUES(1, 2)
;PRAGMA mmap_size = 1000000
;SELECT * FROM t1;