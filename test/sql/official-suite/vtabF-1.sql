-- original: vtabF.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a, b);
    CREATE INDEX i1 ON t1(a);
    CREATE INDEX i2 ON t1(b);
    INSERT INTO t1 VALUES(10,110);
    INSERT INTO t1 VALUES(11,111);
    INSERT INTO t1 SELECT a+2, b+2 FROM t1;
    INSERT INTO t1 SELECT null, b+4 FROM t1;
    INSERT INTO t1 SELECT null, b+8 FROM t1;
    INSERT INTO t1 SELECT null, b+16 FROM t1;
    ANALYZE;
    CREATE VIRTUAL TABLE tv1 USING echo(t1);
    SELECT b FROM t1 WHERE a IS NOT NULL
;SELECT b FROM tv1 WHERE a IS NOT NULL;