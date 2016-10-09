-- original: sortfault.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA cache_size = 5
;PRAGMA threads=sub_nWorker
;PRAGMA cache_size = 5
;WITH r(x,y) AS (
          SELECT 1, sub_str
          UNION ALL
          SELECT x+1, sub_str FROM r
          LIMIT 200
      )
      SELECT count(x), length(y) FROM r GROUP BY (x%5)
;PRAGMA cache_size = 5
;WITH r(x,y) AS (
          SELECT 100, sub_str
          UNION ALL
          SELECT x-1, sub_str FROM r
          LIMIT 100
      )
      SELECT count(x), length(y) FROM r GROUP BY y COLLATE utf16bin, (x%5)
;PRAGMA cache_size = 5
;WITH r(x,y) AS (
            SELECT 300, sub_str2
            UNION ALL
            SELECT x-1, sub_str2 FROM r
            LIMIT 300
        )
        SELECT count(x), length(y) FROM r GROUP BY y, (x%5)
;CREATE TABLE t1(a, b, c); 
  INSERT INTO t1 VALUES(1, 2, 3)
;INSERT INTO t1 SELECT
        ((a<<3) +b) & 2147483647,
        ((b<<3) +c) & 2147483647,
        ((c<<3) +a) & 2147483647
      FROM t1 ORDER BY rowid DESC LIMIT 1
;CREATE UNIQUE INDEX i1 ON t1(a,b,c)
;CREATE TABLE t1(a, b, c); 
  INSERT INTO t1 VALUES(sub_a, sub_b, sub_c); 
  INSERT INTO t1 VALUES(sub_c, sub_b, sub_a)
;SELECT * FROM t1 ORDER BY a;