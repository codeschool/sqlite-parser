-- original: unique2.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

DROP TABLE IF EXISTS t1
;INSERT INTO t1(x,y) VALUES(1,1),(2,2),(3,2),(4,3)
;DROP TABLE IF EXISTS t1
;INSERT INTO t1(w,x,y,z) VALUES(1,2,3,4),(2,3,3,4);