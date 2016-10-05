-- original: e_expr.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT CASE 'AbC' WHEN 'abc' THEN 'A' WHEN a THEN 'B' END FROM t1
;SELECT CASE a WHEN b THEN 'A' ELSE 'B' END FROM t1
;SELECT CASE b WHEN a THEN 'A' ELSE 'B' END FROM t1
;SELECT CASE 55 WHEN '55' THEN 'A' ELSE 'B' END
;SELECT CASE c WHEN '55' THEN 'A' ELSE 'B' END FROM t1
;SELECT CASE '34.5' WHEN d THEN 'A' ELSE 'B' END FROM t1
;SELECT CASE NULL WHEN NULL THEN 'A' ELSE 'B' END
;SELECT CASE NULL WHEN 'abc' THEN 'A' WHEN 'def' THEN 'B' END
;SELECT CASE NULL WHEN 'abc' THEN 'A' WHEN 'def' THEN 'B' ELSE 'C' END
;SELECT CASE WHEN var('a') THEN 'A' 
              WHEN var('b') THEN 'B' 
              WHEN var('c') THEN 'C' 
  END
;SELECT CASE '0' WHEN var('a') THEN 'A' 
                  WHEN var('b') THEN 'B' 
                  WHEN var('c') THEN 'C' 
  END
;CREATE TABLE t2(x, w1, r1, w2, r2, r3);
  INSERT INTO t2 VALUES(1, 1, 'R1', 2, 'R2', 'R3');
  INSERT INTO t2 VALUES(2, 1, 'R1', 2, 'R2', 'R3');
  INSERT INTO t2 VALUES(3, 1, 'R1', 2, 'R2', 'R3')
;SELECT CASE x WHEN w1 THEN r1 WHEN w2 THEN r2 ELSE r3 END FROM t2
;SELECT CASE WHEN x=w1 THEN r1 WHEN x=w2 THEN r2 ELSE r3 END FROM t2
;SELECT CASE ceval(x) WHEN w1 THEN r1 WHEN w2 THEN r2 ELSE r3 END FROM t2
;SELECT CASE 
    WHEN ceval(x)=w1 THEN r1 
    WHEN ceval(x)=w2 THEN r2 
    ELSE r3 END 
  FROM t2
;CREATE TABLE t3(a TEXT, b REAL, c INTEGER);
  INSERT INTO t3 VALUES(X'555655', '1.23abc', 4.5);
  SELECT typeof(a), a, typeof(b), b, typeof(c), c FROM t3
;SELECT 
    typeof(CAST(X'555655' as TEXT)), CAST(X'555655' as TEXT),
    typeof(CAST('1.23abc' as REAL)), CAST('1.23abc' as REAL),
    typeof(CAST(4.5 as INTEGER)), CAST(4.5 as INTEGER)
;PRAGMA encoding = 'utf-16le'
;PRAGMA encoding = 'utf-16be'
;PRAGMA encoding = 'utf-16le'
;PRAGMA encoding = 'utf-16le'
;PRAGMA encoding = 'utf-16be'
;PRAGMA encoding = 'utf-8'
;PRAGMA encoding = 'utf-16le'
;PRAGMA encoding = 'utf-16be'
;SELECT typeof(sub_castexpr), quote(sub_castexpr)
;SELECT typeof(sub_castexpr), quote(sub_castexpr)
;SELECT typeof(sub_castexpr), quote(sub_castexpr)
;CREATE TABLE t1(a, b);
  INSERT INTO t1 VALUES(1, 2);
  INSERT INTO t1 VALUES(NULL, 2);
  INSERT INTO t1 VALUES(1, NULL);
  INSERT INTO t1 VALUES(NULL, NULL)
;CREATE TABLE t2(a, b);
    INSERT INTO t2 VALUES('one', 'two');
    INSERT INTO t2 VALUES('three', NULL);
    INSERT INTO t2 VALUES(4, 5.0)
;CREATE TABLE t4(x, y);
  INSERT INTO t4 VALUES(1, 'one');
  INSERT INTO t4 VALUES(2, 'two');
  INSERT INTO t4 VALUES(3, 'three')
;SELECT CASE WHEN NULL THEN 'true' ELSE 'false' END
;SELECT CASE WHEN 0.0 THEN 'true' ELSE 'false' END
;SELECT CASE WHEN 0 THEN 'true' ELSE 'false' END
;SELECT CASE WHEN 'engligh' THEN 'true' ELSE 'false' END
;SELECT CASE WHEN '0' THEN 'true' ELSE 'false' END
;SELECT CASE WHEN 1 THEN 'true' ELSE 'false' END
;SELECT CASE WHEN 1.0 THEN 'true' ELSE 'false' END
;SELECT CASE WHEN 0.1 THEN 'true' ELSE 'false' END
;SELECT CASE WHEN -0.1 THEN 'true' ELSE 'false' END
;SELECT CASE WHEN '1english' THEN 'true' ELSE 'false' END;