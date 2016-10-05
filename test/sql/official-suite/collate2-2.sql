-- original: collate2.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT collate2t1.a FROM collate2t1, collate2t2 
      WHERE collate2t2.b = collate2t1.b
;SELECT collate2t1.a FROM collate2t1, collate2t3 
      WHERE collate2t1.b = collate2t3.b||''
      ORDER BY +collate2t1.a DESC
;SELECT collate2t1.a FROM collate2t1, collate2t3 
      WHERE collate2t3.b||'' = collate2t1.b
      ORDER BY +collate2t1.a DESC
;DROP TABLE collate2t3
;SELECT collate2t1.b FROM collate2t1 JOIN collate2t2 USING (b)
;SELECT collate2t1.b FROM collate2t2 JOIN collate2t1 USING (b)
;SELECT collate2t1.b FROM collate2t1 NATURAL JOIN collate2t2
;SELECT collate2t1.b FROM collate2t2 NATURAL JOIN collate2t1
;SELECT collate2t2.b FROM collate2t1 LEFT OUTER JOIN collate2t2 USING (b) order by collate2t1.oid
;SELECT collate2t1.b, collate2t2.b FROM collate2t2 LEFT OUTER JOIN collate2t1 USING (b)
;CREATE TABLE t1(x);
  INSERT INTO t1 VALUES('b');
  INSERT INTO t1 VALUES('B')
;SELECT * FROM t1 WHERE x COLLATE nocase BETWEEN 'a' AND 'c'
;SELECT * FROM t1 WHERE x BETWEEN 'a' COLLATE nocase AND 'c' COLLATE nocase
;SELECT * FROM t1 
  WHERE x COLLATE nocase BETWEEN 'a' COLLATE nocase AND 'c' COLLATE nocase
;SELECT * FROM t1 WHERE +x COLLATE nocase BETWEEN 'a' AND 'c'
;SELECT * FROM t1 WHERE +x BETWEEN 'a' COLLATE nocase AND 'c' COLLATE nocase
;SELECT * FROM t1 
  WHERE +x COLLATE nocase BETWEEN 'a' COLLATE nocase AND 'c' COLLATE nocase;