-- original: shared8.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a, b);
    INSERT INTO t1 VALUES(1, 1);
    INSERT INTO t1 VALUES(2, 2);
    INSERT INTO t1 VALUES(3, 3);
    INSERT INTO t1 VALUES(4, 4);
    CREATE VIEW v1 AS SELECT a, roman(b) FROM t1;
    SELECT * FROM v1
;PRAGMA writable_schema = 1;
    DELETE FROM sqlite_master WHERE 1;
    PRAGMA writable_schema = 0;
    SELECT * FROM sqlite_master
;SELECT * FROM v1
;SELECT * FROM v1
;SELECT * FROM v1
;SELECT * FROM v1
;SELECT * FROM v1
;SELECT * FROM v1;