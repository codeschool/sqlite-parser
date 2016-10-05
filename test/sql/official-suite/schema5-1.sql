-- original: schema5.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a,b,c, PRIMARY KEY(a) UNIQUE (a) CONSTRAINT one);
    INSERT INTO t1 VALUES(1,2,3);
    SELECT * FROM t1
;DROP TABLE t1;
    CREATE TABLE t1(a,b,c,
        CONSTRAINT one PRIMARY KEY(a) CONSTRAINT two CHECK(b<10) UNIQUE(b)
        CONSTRAINT three
    );
    INSERT INTO t1 VALUES(1,2,3);
    SELECT * FROM t1
;DROP TABLE t1;
    CREATE TABLE t1(a,b,c,
       UNIQUE(a) CONSTRAINT one,
       PRIMARY KEY(b,c) CONSTRAINT two
    );
    INSERT INTO t1 VALUES(1,2,3);