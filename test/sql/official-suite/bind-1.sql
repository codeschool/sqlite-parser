-- original: bind.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a,b,c)
;SELECT rowid, * FROM t1
;SELECT rowid, * FROM t1
;SELECT rowid, * FROM t1
;DELETE FROM t1
;SELECT rowid, * FROM t1
;SELECT rowid, * FROM t1
;DELETE FROM t1
;DELETE FROM t1
;SELECT rowid, * FROM t1
;SELECT rowid, * FROM t1
;SELECT typeof(a), typeof(b), typeof(c) FROM t1
;DELETE FROM t1
;SELECT rowid, * FROM t1
;SELECT typeof(a), typeof(b), typeof(c) FROM t1
;DELETE FROM t1
;SELECT rowid, * FROM t1
;SELECT typeof(a), typeof(b), typeof(c) FROM t1
;DELETE FROM t1
;SELECT rowid, * FROM t1
;SELECT typeof(a), typeof(b), typeof(c) FROM t1
;DELETE FROM t1
;SELECT rowid, * FROM t1
;SELECT typeof(a), typeof(b), typeof(c) FROM t1
;DELETE FROM t1
;SELECT rowid, * FROM t1
;SELECT typeof(a), typeof(b), typeof(c) FROM t1
;DELETE FROM t1
;DELETE FROM t1
;SELECT * FROM t1
;PRAGMA encoding
;SELECT  hex(a), hex(b), hex(c) FROM t1
;SELECT  hex(a), hex(b), hex(c) FROM t1
;SELECT  hex(a), hex(b), hex(c) FROM t1
;SELECT typeof(a), typeof(b), typeof(c) FROM t1
;DELETE FROM t1
;SELECT rowid, * FROM t1
;SELECT typeof(a), typeof(b), typeof(c) FROM t1
;DELETE FROM t1
;SELECT * FROM t1
;SELECT hex(a), hex(b), hex(c) FROM t1
;SELECT hex(a), hex(b), hex(c) FROM t1
;SELECT hex(a), hex(b), hex(c) FROM t1
;SELECT typeof(a), typeof(b), typeof(c) FROM t1
;DELETE FROM t1
;CREATE TABLE t2(a,b,c,d,e,f)
;SELECT * FROM t2
;SELECT * FROM t2
;pragma encoding
;CREATE TABLE t3(x BLOB)
;SELECT typeof(x), length(x), quote(x),
             length(cast(x AS BLOB)), quote(cast(x AS BLOB)) FROM t3
;SELECT quote(cast(x_coalesce(x) AS blob)) FROM t3
;CREATE TABLE t4(a,b,c,d,e,f,g,h)
;SELECT * FROM t4
;DELETE FROM t4
;SELECT * FROM t4
;DELETE FROM t4
;SELECT * FROM t4
;DELETE FROM t4
;SELECT * FROM t4;