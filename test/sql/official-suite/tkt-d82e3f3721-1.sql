-- original: tkt-d82e3f3721.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a INTEGER PRIMARY KEY AUTOINCREMENT, b);
    INSERT INTO t1 VALUES(null,'abc');
    INSERT INTO t1 VALUES(null,'def');
    DELETE FROM t1;
    INSERT INTO t1 VALUES(null,'ghi');
    SELECT * FROM t1
;CREATE TEMP TABLE t2(a INTEGER PRIMARY KEY AUTOINCREMENT, b);
    INSERT INTO t2 VALUES(null,'jkl');
    INSERT INTO t2 VALUES(null,'mno');
    DELETE FROM t2;
    INSERT INTO t2 VALUES(null,'pqr');
    SELECT * FROM t2
;SELECT 'main', * FROM main.sqlite_sequence
    UNION ALL
    SELECT 'temp', * FROM temp.sqlite_sequence
    ORDER BY 2
;VACUUM;
    SELECT 'main', * FROM main.sqlite_sequence
    UNION ALL
    SELECT 'temp', * FROM temp.sqlite_sequence
    ORDER BY 2
;CREATE TEMP TABLE t3(x);
    INSERT INTO t3 VALUES(1)
;CREATE TABLE t3(y,z);
    INSERT INTO t3 VALUES(8,9)
;SELECT * FROM temp.t3 JOIN main.t3
;VACUUM;
    SELECT * FROM temp.t3 JOIN main.t3;