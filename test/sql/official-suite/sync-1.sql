-- original: sync.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA fullfsync=OFF;
    CREATE TABLE t1(a,b);
    ATTACH DATABASE 'test2.db' AS db2;
    CREATE TABLE db2.t2(x,y)
;PRAGMA main.synchronous=on;
      PRAGMA db2.synchronous=on;
      BEGIN;
      INSERT INTO t1 VALUES(1,2);
      INSERT INTO t2 VALUES(3,4);
      COMMIT
;PRAGMA main.synchronous=full;
    PRAGMA db2.synchronous=full;
    BEGIN;
    INSERT INTO t1 VALUES(3,4);
    INSERT INTO t2 VALUES(5,6);
    COMMIT
;PRAGMA main.synchronous=off;
      PRAGMA db2.synchronous=off;
      BEGIN;
      INSERT INTO t1 VALUES(5,6);
      INSERT INTO t2 VALUES(7,8);
      COMMIT;