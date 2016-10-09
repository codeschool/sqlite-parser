-- original: sqldiff1.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a INTEGER PRIMARY KEY, b);
    CREATE TABLE t2(a INT PRIMARY KEY, b) WITHOUT ROWID;
    WITH RECURSIVE c(x) AS (VALUES(1) UNION ALL SELECT x+1 FROM c WHERE x<100)
    INSERT INTO t1(a,b) SELECT x, printf('abc-%d-xyz',x) FROM c;
    INSERT INTO t2(a,b) SELECT a, b FROM t1
;ATTACH 'test2.db' AS x2;
    DELETE FROM x2.t1 WHERE a=49;
    DELETE FROM x2.t2 WHERE a=48;
    INSERT INTO x2.t1(a,b) VALUES(1234,'hello');
    INSERT INTO x2.t2(a,b) VALUES(50.5,'xyzzy');
    CREATE TABLE x2.t3(a,b,c);
    INSERT INTO x2.t3 VALUES(111,222,333);
    CREATE TABLE main.t4(x,y,z);
    INSERT INTO t4 SELECT * FROM t3;