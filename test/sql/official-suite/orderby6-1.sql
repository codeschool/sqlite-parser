-- original: orderby6.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a,b,c,PRIMARY KEY(b,c)) WITHOUT ROWID
;WITH RECURSIVE
       cnt(x) AS (VALUES(1) UNION ALL SELECT x+1 FROM cnt WHERE x<1000)
     INSERT INTO t1 SELECT x, x%40, x/40 FROM cnt
;SELECT b,a,c FROM t1 ORDER BY +b,+a,+c
;SELECT b,a,c FROM t1 ORDER BY +b,+c DESC,+a
;SELECT b,a,c FROM t1 ORDER BY +b DESC,+c,+a
;SELECT b,a,c FROM t1 ORDER BY +b DESC,+a,+c
;CREATE TABLE t2(a,b,c,d,e,f,PRIMARY KEY(b,c,d,e,f)) WITHOUT ROWID
;WITH RECURSIVE
       cnt(x) AS (VALUES(0) UNION ALL SELECT x+1 FROM cnt WHERE x<242)
     INSERT INTO t2 SELECT x,  x%3, (x/3)%3, (x/9)%3, (x/27)%3, (x/81)%3
                      FROM cnt
;SELECT a FROM t2 ORDER BY +b,+c,+d,+e,+f
;SELECT a FROM t2 ORDER BY +b,+c,+d,+e,+f
;SELECT a FROM t2 ORDER BY +b,+c,+d,+e,+f
;SELECT a FROM t2 ORDER BY +b,+c,+d,+e,+f
;SELECT a FROM t2 ORDER BY +b,+c,+d,+e,+f
;SELECT a FROM t2 ORDER BY +b,+c,+d,+e,+f DESC
;SELECT a FROM t2 ORDER BY +b,+c,+d,+e DESC,+f
;SELECT a FROM t2 ORDER BY +b,+c,+d DESC,+e,+f
;SELECT a FROM t2 ORDER BY +b,+c DESC,+d,+e,+f
;SELECT a FROM t2 ORDER BY +b DESC,+c,+d,+e,+f
;SELECT a FROM t2 ORDER BY +b DESC,+c DESC,+d,+e,+f LIMIT 31
;SELECT a FROM t2 ORDER BY +b,+c,+d,+e,+f DESC LIMIT 8 OFFSET 7;