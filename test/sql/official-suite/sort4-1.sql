-- original: sort4.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA threads=5
;PRAGMA threads
;DROP TABLE IF EXISTS t1
;PRAGMA page_size = 4096;