-- original: tkt-f3e5abed55.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

ATTACH 'test.db2' AS aux;
    CREATE TABLE main.t1(a, b);
    CREATE TABLE aux.t2(c, d)
;BEGIN; SELECT * FROM t1
;BEGIN;
      INSERT INTO t1 VALUES(1, 2);
      INSERT INTO t2 VALUES(1, 2)
;ATTACH 'test.db2' AS aux;
      BEGIN;
        INSERT INTO t1 VALUES(3, 4);
        INSERT INTO t2 VALUES(3, 4)
;BEGIN; SELECT * FROM t1
;COMMIT;
      SELECT * FROM t1;
      SELECT * FROM t2
;ATTACH 'test.db2' AS aux;
      SELECT * FROM t1;
      SELECT * FROM t2;