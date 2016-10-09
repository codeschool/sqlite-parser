-- original: like.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(x TEXT)
;INSERT INTO t1 VALUES(:str)
;SELECT count(*) FROM t1
;SELECT x FROM t1 WHERE x LIKE 'abc' ORDER BY 1
;SELECT x FROM t1 WHERE x GLOB 'abc' ORDER BY 1
;SELECT x FROM t1 WHERE x LIKE 'ABC' ORDER BY 1
;SELECT x FROM t1 WHERE x LIKE 'aBc' ORDER BY 1
;SELECT x FROM t1 WHERE x LIKE 'abc' ORDER BY 1
;PRAGMA case_sensitive_like; -- no argument; does not change setting
    SELECT x FROM t1 WHERE x LIKE 'abc' ORDER BY 1
;SELECT x FROM t1 WHERE x GLOB 'abc' ORDER BY 1
;SELECT x FROM t1 WHERE x LIKE 'ABC' ORDER BY 1
;SELECT x FROM t1 WHERE x LIKE 'aBc' ORDER BY 1
;PRAGMA case_sensitive_like=off;
    SELECT x FROM t1 WHERE x LIKE 'abc' ORDER BY 1
;PRAGMA case_sensitive_like;  -- No argument, does not change setting.
    SELECT x FROM t1 WHERE x LIKE 'abc' ORDER BY 1
;SELECT x FROM t1 WHERE x REGEXP 'abc' ORDER BY 1
;SELECT x FROM t1 WHERE x REGEXP '^abc' ORDER BY 1
;SELECT x FROM t1 WHERE x MATCH '*abc*' ORDER BY 1
;SELECT x FROM t1 WHERE x MATCH 'abc*' ORDER BY 1
;PRAGMA case_sensitive_like=on;
    CREATE INDEX i1 ON t1(x)
;PRAGMA case_sensitive_like=off
;PRAGMA case_sensitive_like=on;
    DROP INDEX i1
;CREATE INDEX i1 ON t1(x)
;PRAGMA case_sensitive_like=on
;PRAGMA case_sensitive_like=off
;PRAGMA case_sensitive_like=on
;PRAGMA case_sensitive_like=off
;CREATE TABLE t2(x TEXT COLLATE NOCASE);
    INSERT INTO t2 SELECT * FROM t1 ORDER BY rowid;
    CREATE INDEX i2 ON t2(x COLLATE NOCASE)
;PRAGMA case_sensitive_like=on
;PRAGMA case_sensitive_like=off
;PRAGMA case_sensitive_like=off
;PRAGMA case_sensitive_like=on
;PRAGMA case_sensitive_like=off
;PRAGMA case_sensitive_like=off;
    INSERT INTO t2 VALUES('ZZ-upper-upper');
    INSERT INTO t2 VALUES('zZ-lower-upper');
    INSERT INTO t2 VALUES('Zz-upper-lower');
    INSERT INTO t2 VALUES('zz-lower-lower')
;PRAGMA case_sensitive_like=on;
    CREATE TABLE t3(x TEXT);
    CREATE INDEX i3 ON t3(x);
    INSERT INTO t3 VALUES('ZZ-upper-upper');
    INSERT INTO t3 VALUES('zZ-lower-upper');
    INSERT INTO t3 VALUES('Zz-upper-lower');
    INSERT INTO t3 VALUES('zz-lower-lower')
;INSERT INTO t2 VALUES(sub_x2)
;SELECT * FROM t2 WHERE x LIKE '''a%'
;SELECT rowid, * FROM t1 WHERE rowid GLOB '1*' ORDER BY rowid
;CREATE TABLE t8(x);
    INSERT INTO t8 VALUES('abcdef');
    INSERT INTO t8 VALUES('ghijkl');
    INSERT INTO t8 VALUES('mnopqr');
    SELECT 1, x FROM t8 WHERE x LIKE '%h%';
    SELECT 2, x FROM t8 WHERE x LIKE '%h%' ESCAPE 'x'
;SELECT 1, x FROM t8 WHERE x LIKE '%h%';
    SELECT 2, x FROM t8 WHERE x LIKE '%h%' ESCAPE 'x'
;SELECT 1, x FROM t8 WHERE x LIKE '%h%';
    SELECT 2, x FROM t8 WHERE x LIKE '%h%' ESCAPE 'x'
;SELECT 1, x FROM t8 WHERE x LIKE '%h%';
    SELECT 2, x FROM t8 WHERE x LIKE '%h%' ESCAPE 'x'
;CREATE TABLE t10(
        a INTEGER PRIMARY KEY,
        b INTEGER COLLATE nocase UNIQUE,
        c NUMBER COLLATE nocase UNIQUE,
        d BLOB COLLATE nocase UNIQUE,
        e COLLATE nocase UNIQUE,
        f TEXT COLLATE nocase UNIQUE
      );
      INSERT INTO t10 VALUES(1,1,1,1,1,1);
      INSERT INTO t10 VALUES(12,12,12,12,12,12);
      INSERT INTO t10 VALUES(123,123,123,123,123,123);
      INSERT INTO t10 VALUES(234,234,234,234,234,234);
      INSERT INTO t10 VALUES(345,345,345,345,345,345);
      INSERT INTO t10 VALUES(45,45,45,45,45,45)
;CREATE TABLE t10b(
        a INTEGER PRIMARY KEY,
        b INTEGER UNIQUE,
        c NUMBER UNIQUE,
        d BLOB UNIQUE,
        e UNIQUE,
        f TEXT UNIQUE
      );
      INSERT INTO t10b SELECT * FROM t10
;CREATE TABLE t11(
      a INTEGER PRIMARY KEY,
      b TEXT COLLATE nocase,
      c TEXT COLLATE binary
    );
    INSERT INTO t11 VALUES(1, 'a','a');
    INSERT INTO t11 VALUES(2, 'ab','ab');
    INSERT INTO t11 VALUES(3, 'abc','abc');
    INSERT INTO t11 VALUES(4, 'abcd','abcd');
    INSERT INTO t11 VALUES(5, 'A','A');
    INSERT INTO t11 VALUES(6, 'AB','AB');
    INSERT INTO t11 VALUES(7, 'ABC','ABC');
    INSERT INTO t11 VALUES(8, 'ABCD','ABCD');
    INSERT INTO t11 VALUES(9, 'x','x');
    INSERT INTO t11 VALUES(10, 'yz','yz');
    INSERT INTO t11 VALUES(11, 'X','X');
    INSERT INTO t11 VALUES(12, 'YZ','YZ');
    SELECT count(*) FROM t11
;PRAGMA case_sensitive_like=OFF
;PRAGMA case_sensitive_like=ON
;PRAGMA case_sensitive_like=OFF;
    CREATE INDEX t11b ON t11(b)
;PRAGMA case_sensitive_like=ON
;PRAGMA case_sensitive_like=OFF;
    DROP INDEX t11b;
    CREATE INDEX t11bnc ON t11(b COLLATE nocase)
;CREATE INDEX t11bb ON t11(b COLLATE binary)
;PRAGMA case_sensitive_like=ON
;PRAGMA case_sensitive_like=OFF
;CREATE INDEX t11cnc ON t11(c COLLATE nocase);
    CREATE INDEX t11cb ON t11(c COLLATE binary)
;CREATE TABLE t12nc(id INTEGER, x TEXT UNIQUE COLLATE nocase);
  INSERT INTO t12nc VALUES(1,'abcde'),(2,'uvwxy'),(3,'ABCDEF');
  CREATE TABLE t12b(id INTEGER, x TEXT UNIQUE COLLATE binary);
  INSERT INTO t12b VALUES(1,'abcde'),(2,'uvwxy'),(3,'ABCDEF');
  SELECT id FROM t12nc WHERE x LIKE 'abc%' ORDER BY +id
;SELECT id FROM t12b WHERE x LIKE 'abc%' ORDER BY +id
;SELECT id FROM t12nc WHERE x LIKE 'abc%' COLLATE binary ORDER BY +id
;SELECT id FROM t12b WHERE x LIKE 'abc%' COLLATE binary ORDER BY +id
;SELECT id FROM t12nc WHERE x LIKE 'abc%' COLLATE nocase ORDER BY +id
;SELECT id FROM t12b WHERE x LIKE 'abc%' COLLATE nocase ORDER BY +id
;EXPLAIN QUERY PLAN
  SELECT id FROM t12nc WHERE x LIKE 'abc%' ORDER BY +id
;EXPLAIN QUERY PLAN
  SELECT id FROM t12b WHERE x LIKE 'abc%' ORDER BY +id
;EXPLAIN QUERY PLAN
  SELECT id FROM t12nc WHERE x LIKE 'abc%' COLLATE nocase ORDER BY +id
;EXPLAIN QUERY PLAN
  SELECT id FROM t12b WHERE x LIKE 'abc%' COLLATE nocase ORDER BY +id
;EXPLAIN QUERY PLAN
  SELECT id FROM t12nc WHERE x LIKE 'abc%' COLLATE binary ORDER BY +id
;EXPLAIN QUERY PLAN
  SELECT id FROM t12b WHERE x LIKE 'abc%' COLLATE binary ORDER BY +id;