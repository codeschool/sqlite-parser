-- original: analyzer1.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a INTEGER PRIMARY KEY, b);
    CREATE TABLE t2(a INT PRIMARY KEY, b) WITHOUT ROWID;
    WITH RECURSIVE c(x) AS (VALUES(1) UNION ALL SELECT x+1 FROM c WHERE x<250)
    INSERT INTO t1(a,b) SELECT x, randomblob(200) FROM c;
    INSERT INTO t2(a,b) SELECT a, b FROM t1;