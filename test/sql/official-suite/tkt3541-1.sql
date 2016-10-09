-- original: tkt3541.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(x);
    INSERT INTO t1 VALUES(123);
    SELECT CASE ~max(x) WHEN min(x) THEN 1 ELSE max(x) END FROM t1
;SELECT CASE NOT max(x) WHEN min(x) THEN 1 ELSE max(x) END FROM t1;