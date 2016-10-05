-- original: async4.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a, b, c)
;CREATE TABLE t3(a, b, c)
;CREATE INDEX i1 ON t2(a);
    CREATE INDEX i2 ON t1(a)
;pragma integrity_check
;CREATE TABLE t4(a, b)
;CREATE TABLE t5(a, b)
;CREATE TABLE t6(a, b);