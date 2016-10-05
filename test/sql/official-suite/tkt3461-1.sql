-- original: tkt3461.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a, b);
    INSERT INTO t1 VALUES(1, 2)
;SELECT a, b+1 AS b_plus_one FROM t1 WHERE a=1
;SELECT a, b+1 AS b_plus_one FROM t1 WHERE a=1 OR b_plus_one
;SELECT a, b+1 AS b_plus_one 
    FROM t1 
    WHERE CASE WHEN a=1 THEN 1 ELSE b_plus_one END
;CREATE TABLE t2(c, d);
    INSERT INTO t2 VALUES(3, 4)
;SELECT a, b+1 AS b_plus_one, c, d 
    FROM t1 LEFT JOIN t2 
    ON (a=c AND d=b_plus_one);