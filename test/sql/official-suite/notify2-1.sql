-- original: notify2.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

ATTACH 'test2.db' AS aux2;
      ATTACH 'test3.db' AS aux3;
      CREATE TABLE main.t1(a INTEGER PRIMARY KEY, b);
      CREATE TABLE aux2.t2(a INTEGER PRIMARY KEY, b);
      CREATE TABLE aux3.t3(a INTEGER PRIMARY KEY, b);
      INSERT INTO t1 SELECT NULL, 0;
      INSERT INTO t2 SELECT NULL, 0;
      INSERT INTO t3 SELECT NULL, 0
;ATTACH 'test2.db' AS aux2;
      ATTACH 'test3.db' AS aux3
;SELECT (SELECT max(a) FROM t1)
           +(SELECT max(a) FROM t2)
           +(SELECT max(a) FROM t3);