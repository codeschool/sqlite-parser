-- original: sort3.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA cache_size = 20000;
  WITH r(x,y) AS (
    SELECT 1, randomblob(1000)
    UNION ALL
    SELECT x+1, randomblob(1000) FROM r
    LIMIT 2200000
  )
  SELECT count(*), sum(length(y)) FROM r GROUP BY (x%5);