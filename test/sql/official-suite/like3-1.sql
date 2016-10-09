-- original: like3.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA encoding=UTF8;
  CREATE TABLE t1(a,b TEXT COLLATE nocase);
  INSERT INTO t1(a,b)
     VALUES(1,'abc'),
           (2,'ABX'),
           (3,'BCD'),
           (4,x'616263'),
           (5,x'414258'),
           (6,x'424344');
  CREATE INDEX t1ba ON t1(b,a);

  SELECT a, b FROM t1 WHERE b LIKE 'aB%' ORDER BY +a
;SELECT a, b FROM t1 WHERE +b LIKE 'aB%' ORDER BY +a
;CREATE TABLE t2(a, b TEXT);
  INSERT INTO t2 SELECT a, b FROM t1;
  CREATE INDEX t2ba ON t2(b,a);
  SELECT a, b FROM t2 WHERE b GLOB 'ab*' ORDER BY +a
;SELECT a, b FROM t2 WHERE +b GLOB 'ab*' ORDER BY +a
;SELECT a, b FROM t2 WHERE b>=x'6162' AND b GLOB 'ab*'
;SELECT a, b FROM t2 WHERE +b>=x'6162' AND +b GLOB 'ab*'
;SELECT a, b FROM t2 WHERE b GLOB 'ab*' AND b>=x'6162'
;SELECT a, b FROM t2 WHERE +b GLOB 'ab*' AND +b>=x'6162'
;CREATE TABLE t3(x TEXT PRIMARY KEY COLLATE nocase);
  INSERT INTO t3(x) VALUES('aaa'),('abc'),('abd'),('abe'),('acz');
  INSERT INTO t3(x) SELECT CAST(x AS blob) FROM t3;
  SELECT quote(x) FROM t3 WHERE x LIKE 'ab%' ORDER BY x
;SELECT quote(x) FROM t3 WHERE x LIKE 'ab%' ORDER BY x DESC
;SELECT quote(x) FROM t3 WHERE x LIKE 'ab%' ORDER BY +x DESC
;SELECT quote(x) FROM t3 WHERE x LIKE 'ab%' ORDER BY x ASC
;SELECT quote(x) FROM t3 WHERE x LIKE 'ab%' ORDER BY +x ASC
;CREATE TABLE t4(x TEXT COLLATE nocase);
  CREATE INDEX t4x ON t4(x DESC);
  INSERT INTO t4(x) SELECT x FROM t3;
  SELECT quote(x) FROM t4 WHERE x LIKE 'ab%' ORDER BY x
;SELECT quote(x) FROM t4 WHERE x LIKE 'ab%' ORDER BY x DESC
;SELECT quote(x) FROM t4 WHERE x LIKE 'ab%' ORDER BY +x DESC
;SELECT quote(x) FROM t4 WHERE x LIKE 'ab%' ORDER BY x ASC
;SELECT quote(x) FROM t4 WHERE x LIKE 'ab%' ORDER BY +x ASC;