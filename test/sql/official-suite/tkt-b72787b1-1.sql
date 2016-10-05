-- original: tkt-b72787b1.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE IF NOT EXISTS t4(q)
;CREATE TABLE t1(x);
    INSERT INTO t1 VALUES(1);
    INSERT INTO t1 VALUES(2);
    CREATE TABLE t2(y);
    INSERT INTO t2 SELECT x+2 FROM t1;
    INSERT INTO t2 SELECT x+4 FROM t1
;SELECT CASE WHEN y=3 THEN y+100 WHEN y==4 THEN runsql()+200
                ELSE 300+y END FROM t2
    UNION ALL
    SELECT * FROM t1;