-- original: async5.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

ATTACH 'test2.db' AS next;
    CREATE TABLE main.t1(a, b);
    CREATE TABLE next.t2(a, b);
    BEGIN;
      INSERT INTO t1 VALUES(1, 2);
      INSERT INTO t2 VALUES(3, 4);
    COMMIT
;SELECT * FROM t1
;SELECT * FROM t2
;BEGIN;
      INSERT INTO t1 VALUES('a', 'b');
      INSERT INTO t2 VALUES('c', 'd');
    COMMIT
;SELECT * FROM t1
;SELECT * FROM t2;