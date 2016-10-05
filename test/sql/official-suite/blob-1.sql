-- original: blob.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT X'01020304'
;SELECT x'ABCDEF'
;SELECT x''
;SELECT x'abcdEF12'
;SELECT x'0123456789abcdefABCDEF'
;CREATE TABLE t1(a BLOB, b BLOB);
    INSERT INTO t1 VALUES(X'123456', x'7890ab');
    INSERT INTO t1 VALUES(X'CDEF12', x'345678')
;SELECT * FROM t1
;CREATE INDEX i1 ON t1(a)
;SELECT * FROM t1
;SELECT * FROM t1 where a = X'123456'
;SELECT * FROM t1 where a = X'CDEF12'
;SELECT * FROM t1 where a = X'CD12'
;SELECT * FROM t1;