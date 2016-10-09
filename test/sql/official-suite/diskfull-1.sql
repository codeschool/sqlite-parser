-- original: diskfull.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(x);
    INSERT INTO t1 VALUES(randstr(1000,1000));
    INSERT INTO t1 SELECT * FROM t1;
    INSERT INTO t1 SELECT * FROM t1;
    INSERT INTO t1 SELECT * FROM t1;
    INSERT INTO t1 SELECT * FROM t1;
    CREATE INDEX t1i1 ON t1(x);
    CREATE TABLE t2 AS SELECT x AS a, x AS b FROM t1;
    CREATE INDEX t2i1 ON t2(b);