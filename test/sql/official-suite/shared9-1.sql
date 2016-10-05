-- original: shared9.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

ATTACH 'test.db2' AS 'fred';
    CREATE TABLE fred.t1(a, b, c);
    CREATE VIEW fred.v1 AS SELECT * FROM t1;

    CREATE TABLE fred.t2(a, b);
    CREATE TABLE fred.t3(a, b);
    CREATE TRIGGER fred.trig AFTER INSERT ON t2 BEGIN
      DELETE FROM t3;
      INSERT INTO t3 SELECT * FROM t2;
    END;
    INSERT INTO t2 VALUES(1, 2);
    SELECT * FROM t3
;ATTACH 'test.db2' AS 'jones'
;SELECT * FROM v1
;INSERT INTO t2 VALUES(3, 4)
;CREATE VIRTUAL TABLE fred.t4 USING fts4;
      INSERT INTO t4 VALUES('hello world')
;INSERT INTO t4 VALUES('shared cache');
      SELECT * FROM t4 WHERE t4 MATCH 'hello'
;SELECT * FROM t4 WHERE t4 MATCH 'c*'
;CREATE TABLE t1(a, b, c COLLATE collate1);
    CREATE INDEX i1 ON t1(a COLLATE collate2, c, b)
;INSERT INTO t1 VALUES('abc', 'def', 'ghi')
;CREATE TABLE t1(a COLLATE mycollate, CHECK (a IN ('one', 'two', 'three')));
    INSERT INTO t1 VALUES('one')
;INSERT INTO t1 VALUES('two')
;CREATE TABLE t1(a, CHECK (a COLLATE mycollate IN ('one', 'two', 'three')));
    INSERT INTO t1 VALUES('one')
;INSERT INTO t1 VALUES('two')
;BEGIN; 
      CREATE TABLE t1(a, b);
      CREATE TABLE t2(a, b);
      INSERT INTO t1 VALUES(1, 2);
      INSERT INTO t2 VALUES(1, 2)
;BEGIN;
      INSERT INTO t1 VALUES(3, 4)
;BEGIN;
        SELECT * FROM t1
;SELECT * FROM t2;