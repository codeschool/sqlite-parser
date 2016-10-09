-- original: intarray.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a INTEGER PRIMARY KEY, b)
;INSERT INTO t1(a,b) VALUES(sub_i,sub_b)
;CREATE TABLE t2(x INTEGER PRIMARY KEY, y);
    INSERT INTO t2 SELECT * FROM t1;
    SELECT b FROM t1 WHERE a IN (12,34,56,78) ORDER BY a
;SELECT type, name FROM sqlite_temp_master
     ORDER BY name
;SELECT b FROM t1 WHERE a IN ia3 ORDER BY a
;SELECT b FROM t1 WHERE a IN ia3 ORDER BY a
;SELECT count(b) FROM t1 WHERE a NOT IN ia3 ORDER BY a
;REPLACE INTO t1 SELECT * FROM t2;
    DELETE FROM t1 WHERE a NOT IN ia1;
    SELECT count(*) FROM t1
;DELETE FROM t1 WHERE a IN ia1;
    SELECT count(*) FROM t1
;CREATE TEMP TABLE t3(p,q);
    INSERT INTO t3 SELECT * FROM t2;
    SELECT count(*) FROM t3 WHERE p IN ia1
;SELECT count(*) FROM t3 WHERE p IN ia1;