-- original: tkt-54844eea3f.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a INTEGER PRIMARY KEY);
    INSERT INTO t1 VALUES(1);
    INSERT INTO t1 VALUES(4);

    CREATE TABLE t2(b INTEGER PRIMARY KEY);
    INSERT INTO t2 VALUES(1);
    INSERT INTO t2 VALUES(2);
    INSERT INTO t2 SELECT b+2 FROM t2;
    INSERT INTO t2 SELECT b+4 FROM t2;
    INSERT INTO t2 SELECT b+8 FROM t2;
    INSERT INTO t2 SELECT b+16 FROM t2;

    CREATE TABLE t3(c INTEGER PRIMARY KEY);
    INSERT INTO t3 VALUES(1);
    INSERT INTO t3 VALUES(2);
    INSERT INTO t3 VALUES(3)
;SELECT 'test-2', t3.c, (
          SELECT count(*) 
          FROM t1 JOIN (SELECT DISTINCT t3.c AS p FROM t2) AS x ON t1.a=x.p
    )
    FROM t3
;CREATE TABLE t4(a, b, c);
    INSERT INTO t4 VALUES('a', 1, 'one');
    INSERT INTO t4 VALUES('a', 2, 'two');
    INSERT INTO t4 VALUES('b', 1, 'three');
    INSERT INTO t4 VALUES('b', 2, 'four');
    SELECT ( 
      SELECT c FROM (
        SELECT * FROM t4 WHERE a=out.a ORDER BY b LIMIT 10 OFFSET 1
      ) WHERE b=out.b
    ) FROM t4 AS out;