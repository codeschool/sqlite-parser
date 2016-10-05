-- original: attach3.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a, b);
  CREATE TABLE t2(c, d)
;CREATE TABLE t1(a, b);
  CREATE TABLE t2(c, d)
;ATTACH 'test2.db' AS aux
;CREATE TABLE aux.t3(e, f)
;SELECT * FROM sqlite_master WHERE name = 't3'
;SELECT * FROM aux.sqlite_master WHERE name = 't3'
;INSERT INTO t3 VALUES(1, 2);
    SELECT * FROM t3
;CREATE INDEX aux.i1 on t3(e)
;SELECT * FROM sqlite_master WHERE name = 'i1'
;SELECT * FROM aux.sqlite_master WHERE name = 'i1'
;DROP INDEX aux.i1;
    SELECT * FROM aux.sqlite_master WHERE name = 'i1'
;CREATE INDEX aux.i1 on t3(e);
    SELECT * FROM aux.sqlite_master WHERE name = 'i1'
;DROP INDEX i1;
    SELECT * FROM aux.sqlite_master WHERE name = 'i1'
;DROP TABLE aux.t1;
    SELECT name FROM aux.sqlite_master
;DROP TABLE t2;
    SELECT name FROM aux.sqlite_master
;DROP TABLE t2;
    SELECT name FROM aux.sqlite_master
;CREATE VIEW aux.v1 AS SELECT * FROM t3
;SELECT * FROM aux.sqlite_master WHERE name = 'v1'
;INSERT INTO aux.t3 VALUES('hello', 'world');
    SELECT * FROM v1
;DROP VIEW aux.v1
;SELECT * FROM aux.sqlite_master WHERE name = 'v1'
;CREATE TRIGGER aux.tr1 AFTER INSERT ON t3 BEGIN
      INSERT INTO t3 VALUES(new.e*2, new.f*2);
    END
;DELETE FROM t3;
    INSERT INTO t3 VALUES(10, 20);
    SELECT * FROM t3
;SELECT * FROM aux.sqlite_master WHERE name = 'tr1'
;DROP TRIGGER aux.tr1
;SELECT * FROM aux.sqlite_master WHERE name = 'tr1'
;CREATE TABLE main.t4(a, b, c);
      CREATE TABLE aux.t4(a, b, c);
      CREATE TEMP TRIGGER tst_trigger BEFORE INSERT ON aux.t4 BEGIN 
        SELECT 'hello world';
      END;
      SELECT count(*) FROM sqlite_temp_master
;DROP TABLE main.t4;
      SELECT count(*) FROM sqlite_temp_master
;DROP TABLE aux.t4;
      SELECT count(*) FROM sqlite_temp_master
;create temp table dummy(dummy)
;ATTACH DATABASE ? AS ?
;DETACH aux
;DETACH ?
;ATTACH DATABASE '' AS ''
;DETACH ''
;ATTACH DATABASE '' AS ?
;DETACH ''
;ATTACH DATABASE '' AS NULL
;DETACH ?
;DETACH '';