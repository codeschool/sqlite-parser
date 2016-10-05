-- original: alias.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(x);
    INSERT INTO t1 VALUES(9);
    INSERT INTO t1 VALUES(8);
    INSERT INTO t1 VALUES(7);
    SELECT x, sequence() FROM t1
;SELECT x, sequence() AS y FROM t1 WHERE y>0
;SELECT x, sequence() AS y FROM t1 WHERE y>0 AND y<99
;SELECT x, sequence() AS y FROM t1 WHERE y>0 AND y<99 AND y!=55
;SELECT x, sequence() AS y FROM t1
     WHERE y>0 AND y<99 AND y!=55 AND y NOT IN (56,57,58)
       AND y NOT LIKE 'abc%' AND y%10==2
;SELECT x, sequence() AS y FROM t1 WHERE y BETWEEN 0 AND 99
;SELECT x, 1-sequence() AS y FROM t1 ORDER BY y
;SELECT x, sequence() AS y FROM t1 ORDER BY -y
;SELECT x, sequence() AS y FROM t1 ORDER BY x%2, y
;SELECT random()&2147483647 AS r FROM t1, t1, t1, t1 ORDER BY r
;SELECT 4 UNION SELECT 1 ORDER BY 1
;SELECT 4 UNION SELECT 1 UNION SELECT 9 ORDER BY 1
;SELECT sequence(*) AS y, count(*) AS z FROM t1 GROUP BY y ORDER BY z, y;