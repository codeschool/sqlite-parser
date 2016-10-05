-- original: index2.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT c123 FROM t1
;SELECT count(*) FROM t1
;SELECT round(sum(c1000)) FROM t1
;EXPLAIN SELECT c9 FROM t1 ORDER BY c1, c2, c3, c4, c5
;SELECT c9 FROM t1 ORDER BY c1, c2, c3, c4, c5, c6 LIMIT 5;