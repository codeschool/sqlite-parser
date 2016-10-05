-- original: fuzz2.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

DROP TABLE IF EXISTS t0; CREATE TABLE t0(t)
;SELECT quote(t) FROM t0;