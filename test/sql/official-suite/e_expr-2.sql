-- original: e_expr.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT (5 BETWEEN 0 AND 0) != 1
;SELECT  5 BETWEEN 0 AND (0 != 1)
;SELECT  1 != 0  BETWEEN 0 AND 2
;SELECT (1 != 0) BETWEEN 0 AND 2
;SELECT  1 != (0 BETWEEN 0 AND 2)
;SELECT 1 LIKE 10 BETWEEN 0 AND 2
;SELECT (1 LIKE 10) BETWEEN 0 AND 2
;SELECT 1 LIKE (10 BETWEEN 0 AND 2)
;SELECT  6 BETWEEN 4 AND 8 LIKE 1
;SELECT (6 BETWEEN 4 AND 8) LIKE 1
;SELECT  6 BETWEEN 4 AND (8 LIKE 1)
;SELECT 0 AND 0 BETWEEN 0 AND 1
;SELECT 0 AND (0 BETWEEN 0 AND 1)
;SELECT (0 AND 0) BETWEEN 0 AND 1
;SELECT 0 BETWEEN -1 AND 1 AND 0
;SELECT (0 BETWEEN -1 AND 1) AND 0
;SELECT 0 BETWEEN -1 AND (1 AND 0)
;SELECT 2 < 3 BETWEEN 0 AND 1
;SELECT (2 < 3) BETWEEN 0 AND 1
;SELECT 2 < (3 BETWEEN 0 AND 1)
;SELECT 2 BETWEEN 1 AND 2 < 3
;SELECT 2 BETWEEN 1 AND (2 < 3)
;SELECT (2 BETWEEN 1 AND 2) < 3
;SELECT 'abc%' LIKE 'abcde'
;SELECT 'abcde' LIKE 'abc%'
;SELECT 'abde'    LIKE 'ab%de'
;SELECT 'abXde'   LIKE 'ab%de'
;SELECT 'abABCde' LIKE 'ab%de'
;SELECT 'abde'    LIKE 'ab_de'
;SELECT 'abXde'   LIKE 'ab_de'
;SELECT 'abABCde' LIKE 'ab_de'
;SELECT 'abc' LIKE 'aBc'
;SELECT 'aBc' LIKE 'aBc'
;SELECT 'ac'  LIKE 'aBc'
;SELECT 'A' LIKE 'a'
;SELECT 'u00c6' LIKE 'u00e6'
;SELECT 'abc%'  LIKE 'abcX%' ESCAPE 'X'
;SELECT 'abc5'  LIKE 'abcX%' ESCAPE 'X'
;SELECT 'abc'   LIKE 'abcX%' ESCAPE 'X'
;SELECT 'abcX%' LIKE 'abcX%' ESCAPE 'X'
;SELECT 'abc%%' LIKE 'abcX%' ESCAPE 'X'
;SELECT 'abc_'  LIKE 'abcX_' ESCAPE 'X'
;SELECT 'abc5'  LIKE 'abcX_' ESCAPE 'X'
;SELECT 'abc'   LIKE 'abcX_' ESCAPE 'X'
;SELECT 'abcX_' LIKE 'abcX_' ESCAPE 'X'
;SELECT 'abc__' LIKE 'abcX_' ESCAPE 'X'
;SELECT 'abcX'  LIKE 'abcXX' ESCAPE 'X'
;SELECT 'abc5'  LIKE 'abcXX' ESCAPE 'X'
;SELECT 'abc'   LIKE 'abcXX' ESCAPE 'X'
;SELECT 'abcXX' LIKE 'abcXX' ESCAPE 'X'
;SELECT 'abc' LIKE 'def'
;SELECT 'abc' LIKE 'def' ESCAPE 'X'
;SELECT 'abcxyz' LIKE 'ABC%'
;PRAGMA case_sensitive_like = 1
;SELECT 'abcxyz' LIKE 'ABC%'
;SELECT 'ABCxyz' LIKE 'ABC%'
;PRAGMA case_sensitive_like = 0
;SELECT 'abcxyz' LIKE 'ABC%'
;SELECT 'ABCxyz' LIKE 'ABC%'
;SELECT 'abcxyz' GLOB 'abc%'
;SELECT 'abcxyz' GLOB 'abc*'
;SELECT 'abcxyz' GLOB 'abc___'
;SELECT 'abcxyz' GLOB 'abc???'
;SELECT 'abcxyz' GLOB 'abc*'
;SELECT 'ABCxyz' GLOB 'abc*'
;SELECT 'abcxyz' GLOB 'ABC*'
;SELECT 'abcxyz' NOT GLOB 'ABC*'
;SELECT 'abcxyz' NOT GLOB 'abc*'
;SELECT 'abcxyz' NOT LIKE 'ABC%'
;SELECT 'abcxyz' NOT LIKE 'abc%'
;SELECT 'abdxyz' NOT LIKE 'abc%'
;SELECT 'abcxyz' NOT GLOB NULL
;SELECT 'abcxyz' NOT LIKE NULL
;SELECT NULL NOT GLOB 'abc*'
;SELECT NULL NOT LIKE 'ABC%'
;SELECT 'abc' GLOB 'def'
;SELECT 'X' NOT GLOB 'Y'
;SELECT 'abc' REGEXP 'def'
;SELECT 'X' NOT REGEXP 'Y'
;SELECT 'abc' MATCH 'def'
;SELECT 'X' NOT MATCH 'Y'
;SELECT CASE WHEN 1 THEN 'true' WHEN 0 THEN 'false' ELSE 'else' END
;SELECT CASE 0 WHEN 1 THEN 'true' WHEN 0 THEN 'false' ELSE 'else' END
;SELECT CASE WHEN var('a') THEN 'A' 
              WHEN var('b') THEN 'B' 
              WHEN var('c') THEN 'C' END
;SELECT CASE WHEN var('c') THEN 'C' 
              WHEN var('b') THEN 'B' 
              WHEN var('a') THEN 'A' 
              ELSE 'no result'
  END
;SELECT CASE WHEN var('a') THEN 'A' 
              WHEN var('b') THEN 'B' 
              WHEN var('c') THEN 'C' 
              ELSE 'no result'
  END
;SELECT CASE WHEN var('a') THEN 'A' 
              WHEN var('b') THEN 'B' 
              WHEN var('c') THEN 'C'
              ELSE 'no result'
  END
;SELECT CASE WHEN var('a') THEN 'A' 
              WHEN var('b') THEN 'B' 
              WHEN var('c') THEN 'C'
              ELSE 'no result'
  END
;SELECT CASE WHEN var('a') THEN 'A' 
              WHEN var('b') THEN 'B' 
              WHEN var('c') THEN 'C'
              ELSE 'no result'
  END
;SELECT CASE WHEN var('a') THEN 'A' 
              WHEN var('b') THEN 'B' 
              WHEN var('c') THEN 'C'
  END
;SELECT CASE WHEN NULL THEN 'A' WHEN 1 THEN 'B' END
;SELECT CASE WHEN 0 THEN 'A' WHEN NULL THEN 'B' ELSE 'C' END
;SELECT CASE var('a') WHEN 1 THEN 'A' WHEN 2 THEN 'B' WHEN 3 THEN 'C' END
;SELECT CASE 23 WHEN 1 THEN 'A' WHEN 23 THEN 'B' WHEN 23 THEN 'C' END
;SELECT CASE 1 WHEN 1 THEN 'A' WHEN 23 THEN 'B' WHEN 23 THEN 'C' END
;SELECT CASE 24 WHEN 1 THEN 'A' WHEN 23 THEN 'B' WHEN 23 THEN 'C' ELSE 'D' END
;SELECT CASE 24 WHEN 1 THEN 'A' WHEN 23 THEN 'B' WHEN 23 THEN 'C' END
;SELECT CASE 24 WHEN 1 THEN 'A' WHEN 23 THEN 'B' WHEN 23 THEN 'C' END
;CREATE TABLE t1(
    a TEXT     COLLATE NOCASE,
    b          COLLATE REVERSE,
    c INTEGER,
    d BLOB
  );
  INSERT INTO t1 VALUES('abc', 'cba', 55, 34.5)
;SELECT CASE a WHEN 'xyz' THEN 'A' WHEN 'AbC' THEN 'B' END FROM t1;