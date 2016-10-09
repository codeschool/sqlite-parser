-- original: collate3.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE collate3t1(c1 UNIQUE)
;DROP TABLE collate3t1
;CREATE TABLE t1(a COLLATE caseless); 
    INSERT INTO t1 VALUES('Abc2');
    INSERT INTO t1 VALUES('abc1');
    INSERT INTO t1 VALUES('aBc3')
;SELECT * FROM t1 ORDER BY a
;CREATE INDEX i1 ON t1(a)
;SELECT * FROM t1 ORDER BY a
;DROP TABLE t1;
    CREATE TABLE t1(a);
    CREATE INDEX i1 ON t1(a COLLATE caseless);
    INSERT INTO t1 VALUES('Abc2');
    INSERT INTO t1 VALUES('abc1');
    INSERT INTO t1 VALUES('aBc3');
    SELECT * FROM t1 ORDER BY a COLLATE caseless
;DROP TABLE t1
;CREATE TABLE collate3t1(c1 COLLATE string_compare, c2)
;CREATE INDEX collate3t1_i1 ON collate3t1(c1);
    INSERT INTO collate3t1 VALUES('xxx', 'yyy')
;select * from collate3t1
;DROP TABLE collate3t1
;CREATE TABLE collate3t1(a, b);
    INSERT INTO collate3t1 VALUES('hello', NULL);
    CREATE INDEX collate3i1 ON collate3t1(a COLLATE user_defined)
;DROP TABLE collate3t1
;CREATE TABLE collate3t1(a, b);
    INSERT INTO collate3t1 VALUES('2', NULL);
    INSERT INTO collate3t1 VALUES('101', NULL);
    INSERT INTO collate3t1 VALUES('12', NULL);
    CREATE VIEW collate3v1 AS SELECT * FROM collate3t1 
        ORDER BY 1 COLLATE user_defined;
    SELECT * FROM collate3v1
;DROP TABLE collate3t1
;DROP TABLE collate3t1;
    CREATE TABLE collate3t1(a COLLATE unk)
;DROP TABLE collate3t1;