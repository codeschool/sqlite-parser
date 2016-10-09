-- original: withM.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(x INTEGER, y INTEGER);
  INSERT INTO t1 VALUES(123, 456)
;WITH tmp AS ( SELECT * FROM t1 )
    SELECT * FROM tmp
;WITH w1 AS ( SELECT * FROM t1 ),
         w2 AS ( 
           WITH w3 AS ( SELECT * FROM w1 )
           SELECT * FROM w3
         )
    SELECT * FROM w2
;WITH w1(a,b) AS ( 
      SELECT 1, 1
      UNION ALL
      SELECT a+1, b + 2*a + 1 FROM w1
    )
    SELECT * FROM w1 LIMIT 5;