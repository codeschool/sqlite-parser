-- original: sharedlock.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a, b);
    INSERT INTO t1 VALUES(1, 'one');
    INSERT INTO t1 VALUES(2, 'two')
;SELECT * FROM t1 ORDER BY rowid
;INSERT INTO t1 VALUES(3, 'three')
;INSERT INTO t1 VALUES(4, 'four')
;DROP TABLE IF EXISTS t2;
    CREATE TABLE t2(x, y);
    INSERT INTO t2 VALUES(1, 2);
    INSERT INTO t2 VALUES(3, 4)
;SELECT * FROM t2;