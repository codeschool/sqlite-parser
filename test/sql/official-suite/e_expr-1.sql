-- original: e_expr.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT 0 < 2 LIKE 1,   (0 < 2) LIKE 1,   0 < (2 LIKE 1)
;SELECT 0 LIKE 0 < 2,   (0 LIKE 0) < 2,   0 LIKE (0 < 2)
;SELECT 2 LIKE 2 == 1,   (2 LIKE 2) == 1,    2 LIKE (2 == 1)
;SELECT 2 == 2 LIKE 1,   (2 == 2) LIKE 1,    2 == (2 LIKE 1)
;SELECT 0 < 2 == 1,   (0 < 2) == 1,   0 < (2 == 1)
;SELECT 0 == 0 < 2,   (0 == 0) < 2,   0 == (0 < 2)
;SELECT -   10
;SELECT +   10
;SELECT ~10
;SELECT NOT 10
;SELECT  72%5
;SELECT  72%-5
;SELECT -72%-5
;SELECT -72%5
;SELECT NULL IS     NULL
;SELECT 'ab' IS     NULL
;SELECT NULL IS     'ab'
;SELECT 'ab' IS     'ab'
;SELECT NULL ==     NULL
;SELECT 'ab' ==     NULL
;SELECT NULL ==     'ab'
;SELECT 'ab' ==     'ab'
;SELECT NULL IS NOT NULL
;SELECT 'ab' IS NOT NULL
;SELECT NULL IS NOT 'ab'
;SELECT 'ab' IS NOT 'ab'
;SELECT NULL !=     NULL
;SELECT 'ab' !=     NULL
;SELECT NULL !=     'ab'
;SELECT 'ab' !=     'ab'
;SELECT sub_lhs = sub_rhs, sub_lhs != sub_rhs
;SELECT  'abcd' < 'bbbb'    COLLATE reverse
;SELECT ('abcd' < 'bbbb')   COLLATE reverse
;SELECT  'abcd' <= 'bbbb'   COLLATE reverse
;SELECT ('abcd' <= 'bbbb')  COLLATE reverse
;SELECT  'abcd' > 'bbbb'    COLLATE reverse
;SELECT ('abcd' > 'bbbb')   COLLATE reverse
;SELECT  'abcd' >= 'bbbb'   COLLATE reverse
;SELECT ('abcd' >= 'bbbb')  COLLATE reverse
;SELECT  'abcd' =  'ABCD'  COLLATE nocase
;SELECT ('abcd' =  'ABCD') COLLATE nocase
;SELECT  'abcd' == 'ABCD'  COLLATE nocase
;SELECT ('abcd' == 'ABCD') COLLATE nocase
;SELECT  'abcd' IS 'ABCD'  COLLATE nocase
;SELECT ('abcd' IS 'ABCD') COLLATE nocase
;SELECT  'abcd' != 'ABCD'      COLLATE nocase
;SELECT ('abcd' != 'ABCD')     COLLATE nocase
;SELECT  'abcd' <> 'ABCD'      COLLATE nocase
;SELECT ('abcd' <> 'ABCD')     COLLATE nocase
;SELECT  'abcd' IS NOT 'ABCD'  COLLATE nocase
;SELECT ('abcd' IS NOT 'ABCD') COLLATE nocase
;SELECT 'bbb' BETWEEN 'AAA' AND 'CCC' COLLATE nocase
;SELECT ('bbb' BETWEEN 'AAA' AND 'CCC') COLLATE nocase
;CREATE TABLE t24(a COLLATE NOCASE, b);
  INSERT INTO t24 VALUES('aaa', 1);
  INSERT INTO t24 VALUES('bbb', 2);
  INSERT INTO t24 VALUES('ccc', 3)
;SELECT 'BBB' = a FROM t24
;SELECT a = 'BBB' FROM t24
;SELECT 'BBB' = a COLLATE binary FROM t24
;SELECT a COLLATE binary = 'BBB' FROM t24
;SELECT typeof(5)
;SELECT typeof(5.1)
;SELECT typeof('5.1')
;SELECT typeof(X'ABCD')
;SELECT typeof(NULL)
;SELECT typeof(3.4e-02)
;SELECT typeof(3e+5)
;SELECT 3.4e-02
;SELECT 3e+4
;SELECT 'is not'
;SELECT typeof('is not')
;SELECT 'isn''t'
;SELECT typeof('isn''t')
;SELECT typeof(X'0123456789ABCDEF')
;SELECT typeof(x'0123456789ABCDEF')
;SELECT typeof(X'0123456789abcdef')
;SELECT typeof(x'0123456789abcdef')
;SELECT typeof(X'53514C697465')
;SELECT NULL
;SELECT typeof(NULL)
;SELECT 0, +0, -0
;SELECT 1, +1, -1
;SELECT 2, +2, -2
;SELECT 1.4, +1.4, -1.4
;SELECT 1.5e+5, +1.5e+5, -1.5e+5
;SELECT 0.0001, +0.0001, -0.0001
;SELECT 123
;SELECT 123.4e05
;SELECT 'abcde'
;SELECT X'414243'
;SELECT NULL
;SELECT CURRENT_TIME
;SELECT CURRENT_DATE
;SELECT CURRENT_TIMESTAMP
;ATTACH 'test.db2' AS dbname;
  CREATE TABLE dbname.tblname(cname)
;SELECT 1 == 10 BETWEEN 0 AND 2
;SELECT (1 == 10) BETWEEN 0 AND 2
;SELECT 1 == (10 BETWEEN 0 AND 2)
;SELECT  6 BETWEEN 4 AND 8 == 1
;SELECT (6 BETWEEN 4 AND 8) == 1
;SELECT  6 BETWEEN 4 AND (8 == 1)
;SELECT  5 BETWEEN 0 AND 0  != 1;