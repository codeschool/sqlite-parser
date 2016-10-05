-- original: auth2.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a,b,c);
    INSERT INTO t1 VALUES(1,2,3)
;CREATE TABLE t2(x,y,z)
;CREATE VIEW v2 AS SELECT x+y AS a, y+z AS b from t2
;SELECT a, b FROM v2
;CREATE TABLE t3(p,q,r)
;SELECT b, a FROM v2;