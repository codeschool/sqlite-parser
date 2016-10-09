-- original: tkt3935.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a, b);
    CREATE TABLE t2(c, d)
;SELECT j1.b FROM ( SELECT * FROM t1 INNER JOIN t2 ON a=c ) AS j1
;SELECT j1.b FROM (t1 INNER JOIN t2 ON a=c) AS j1;