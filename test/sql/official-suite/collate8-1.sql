-- original: collate8.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a TEXT COLLATE nocase);
    INSERT INTO t1 VALUES('aaa');
    INSERT INTO t1 VALUES('BBB');
    INSERT INTO t1 VALUES('ccc');
    INSERT INTO t1 VALUES('DDD');
    SELECT a FROM t1 ORDER BY a
;SELECT rowid FROM t1 WHERE a<'ccc' ORDER BY 1
;SELECT rowid FROM t1 WHERE a<'ccc' COLLATE binary ORDER BY 1
;SELECT rowid FROM t1 WHERE +a<'ccc' ORDER BY 1
;SELECT a FROM t1 ORDER BY +a
;SELECT a AS x FROM t1 ORDER BY "x"
;SELECT a AS x FROM t1 WHERE x<'ccc' ORDER BY 1
;SELECT a AS x FROM t1 WHERE x<'ccc' COLLATE binary ORDER BY [x]
;SELECT a AS x FROM t1 WHERE +x<'ccc' ORDER BY 1
;SELECT a AS x FROM t1 ORDER BY +x
;CREATE TABLE t2(a);
    INSERT INTO t2 VALUES('abc');
    INSERT INTO t2 VALUES('ABC');
    SELECT a AS x FROM t2 WHERE x='abc'
;SELECT a AS x FROM t2 WHERE x='abc' COLLATE nocase
;SELECT a AS x FROM t2 WHERE (x COLLATE nocase)='abc'
;SELECT a COLLATE nocase AS x FROM t2 WHERE x='abc'
;SELECT a COLLATE nocase AS x FROM t2 WHERE (x COLLATE binary)='abc'
;SELECT a COLLATE nocase AS x FROM t2 WHERE x='abc' COLLATE binary
;SELECT * FROM t2 WHERE (a COLLATE nocase)='abc' COLLATE binary
;SELECT a COLLATE nocase AS x FROM t2 WHERE 'abc'=x COLLATE binary
;SELECT 'abc'==('ABC'||'') COLLATE nocase;
  SELECT 'abc'==('ABC'||'' COLLATE nocase);
  SELECT 'abc'==('ABC'||('' COLLATE nocase));
  SELECT 'abc'==('ABC'||upper('' COLLATE nocase))
;SELECT 'abc'==('ABC'||max('' COLLATE nocase,'' COLLATE binary))
;SELECT 'abc'==('ABC'||max('' COLLATE binary,'' COLLATE nocase))
;SELECT 'abc'==('ABC'||CASE WHEN 1-1=2 THEN '' COLLATE nocase
                                        ELSE '' COLLATE binary END);
  SELECT 'abc'==('ABC'||CASE WHEN 1+1=2 THEN '' COLLATE nocase
                                        ELSE '' COLLATE binary END)
;SELECT 'abc'==('ABC'||CASE WHEN 1=2 THEN '' COLLATE binary
                                      ELSE '' COLLATE nocase END);