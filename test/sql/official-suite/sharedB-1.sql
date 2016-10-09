-- original: sharedB.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(x,y TEXT COLLATE nocase);
    WITH RECURSIVE
      c(i) AS (VALUES(1) UNION ALL SELECT i+1 FROM c WHERE i<100)
    INSERT INTO t1(x,y) SELECT i, printf('x%03dy',i) FROM c;
    CREATE INDEX t1yx ON t1(y,x)
;SELECT x FROM t1 WHERE y='X014Y'
;SELECT x FROM t1 WHERE y='X014Y';