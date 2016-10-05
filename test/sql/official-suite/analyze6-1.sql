-- original: analyze6.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE cat(x INT, yz TEXT);
    CREATE UNIQUE INDEX catx ON cat(x);
    /* Give cat 16 unique integers */
    INSERT INTO cat(x) VALUES(1);
    INSERT INTO cat(x) VALUES(2);
    INSERT INTO cat(x) SELECT x+2 FROM cat;
    INSERT INTO cat(x) SELECT x+4 FROM cat;
    INSERT INTO cat(x) SELECT x+8 FROM cat;

    CREATE TABLE ev(y INT);
    CREATE INDEX evy ON ev(y);
    /* ev will hold 32 copies of 16 integers found in cat */
    INSERT INTO ev SELECT x FROM cat;
    INSERT INTO ev SELECT x FROM cat;
    INSERT INTO ev SELECT y FROM ev;
    INSERT INTO ev SELECT y FROM ev;
    INSERT INTO ev SELECT y FROM ev;
    INSERT INTO ev SELECT y FROM ev;
    ANALYZE;
    SELECT count(*) FROM cat;
    SELECT count(*) FROM ev
;SELECT count(*) FROM ev, cat WHERE x=y
;SELECT count(*) FROM cat, ev WHERE x=y
;CREATE TABLE t201(x INTEGER PRIMARY KEY, y UNIQUE, z);
    CREATE INDEX t201z ON t201(z);
    ANALYZE
;SELECT * FROM t201 WHERE z=5
;SELECT * FROM t201 WHERE y=5
;SELECT * FROM t201 WHERE x=5
;INSERT INTO t201 VALUES(1,2,3),(2,3,4),(3,4,5);
    ANALYZE t201
;SELECT * FROM t201 WHERE z=5
;SELECT * FROM t201 WHERE y=5
;SELECT * FROM t201 WHERE x=5
;INSERT INTO t201 VALUES(4,5,7);
    INSERT INTO t201 SELECT x+100, y+100, z+100 FROM t201;
    INSERT INTO t201 SELECT x+200, y+200, z+200 FROM t201;
    INSERT INTO t201 SELECT x+400, y+400, z+400 FROM t201;
    ANALYZE t201
;SELECT * FROM t201 WHERE z=5
;SELECT * FROM t201 WHERE y=5
;SELECT * FROM t201 WHERE x=5;