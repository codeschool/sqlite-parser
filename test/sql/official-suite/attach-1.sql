-- original: attach.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a,b);
    INSERT INTO t1 VALUES(1,2);
    INSERT INTO t1 VALUES(3,4);
    SELECT * FROM t1
;CREATE TABLE t2(x,y);
    INSERT INTO t2 VALUES(1,'x');
    INSERT INTO t2 VALUES(2,'y');
    SELECT * FROM t2
;ATTACH DATABASE 'test2.db' AS two;
    SELECT * FROM two.t2
;SELECT * FROM t2
;DETACH DATABASE two;
    SELECT * FROM t1
;ATTACH 'test.db' AS db2;
    ATTACH 'test.db' AS db3;
    ATTACH 'test.db' AS db4;
    ATTACH 'test.db' AS db5;
    ATTACH 'test.db' AS db6;
    ATTACH 'test.db' AS db7;
    ATTACH 'test.db' AS db8;
    ATTACH 'test.db' AS db9
;DETACH db5
;select * from sqlite_temp_master
;CREATE TABLE tx(x1,x2,y1,y2);
    CREATE TRIGGER r1 AFTER UPDATE ON t2 FOR EACH ROW BEGIN
      INSERT INTO tx(x1,x2,y1,y2) VALUES(OLD.x,NEW.x,OLD.y,NEW.y);
    END;
    SELECT * FROM tx
;UPDATE t2 SET x=x+10;
    SELECT * FROM tx
;CREATE TABLE tx(x1,x2,y1,y2);
    SELECT * FROM tx
;ATTACH 'test2.db' AS db2
;UPDATE db2.t2 SET x=x+10;
    SELECT * FROM db2.tx
;SELECT * FROM main.tx
;SELECT type, name, tbl_name FROM db2.sqlite_master
;CREATE INDEX i2 ON t2(x);
    SELECT * FROM t2 WHERE x>5
;SELECT type, name, tbl_name FROM sqlite_master
;SELECT type, name, tbl_name FROM sqlite_master
;SELECT type, name, tbl_name FROM db2.sqlite_master
;ATTACH 'test2.db' AS db2;
    SELECT type, name, tbl_name FROM db2.sqlite_master
;SELECT * FROM t1
;DELETE FROM t2;
    INSERT INTO t2 VALUES(21, 'x');
    INSERT INTO t2 VALUES(22, 'y');
    CREATE TABLE tx(x1,x2,y1,y2);
    INSERT INTO tx VALUES(1, 11, 'x', 'x');
    INSERT INTO tx VALUES(2, 12, 'y', 'y');
    INSERT INTO tx VALUES(11, 21, 'x', 'x');
    INSERT INTO tx VALUES(12, 22, 'y', 'y');
    CREATE INDEX i2 ON t2(x)
;SELECT * FROM t2
;UPDATE t2 SET x=x+1 WHERE x=50
;SELECT * FROM t2
;UPDATE t2 SET x=0 WHERE 0
;SELECT * FROM t1
;SELECT * FROM t1
;ROLLBACK
;SELECT * FROM t1
;DETACH db2
;CREATE TABLE t3(x,y);
    CREATE UNIQUE INDEX t3i1 ON t3(x);
    INSERT INTO t3 VALUES(1,2);
    SELECT * FROM t3
;CREATE TABLE t3(a,b);
    CREATE UNIQUE INDEX t3i1b ON t3(a);
    INSERT INTO t3 VALUES(9,10);
    SELECT * FROM t3
;ATTACH DATABASE 'test2.db' AS db2;
    SELECT * FROM db2.t3
;SELECT * FROM main.t3
;INSERT INTO db2.t3 VALUES(9,10);
    SELECT * FROM db2.t3
;DETACH db2
;CREATE TABLE t4(x);
      CREATE TRIGGER t3r3 AFTER INSERT ON t3 BEGIN
        INSERT INTO t4 VALUES('db2.' || NEW.x);
      END;
      INSERT INTO t3 VALUES(6,7);
      SELECT * FROM t4
;CREATE TABLE t4(y);
      CREATE TRIGGER t3r3 AFTER INSERT ON t3 BEGIN
        INSERT INTO t4 VALUES('main.' || NEW.a);
      END;
      INSERT INTO main.t3 VALUES(11,12);
      SELECT * FROM main.t4
;CREATE TABLE t4(x);
    INSERT INTO t3 VALUES(6,7);
    INSERT INTO t4 VALUES('db2.6');
    INSERT INTO t4 VALUES('db2.13')
;CREATE TABLE t4(y);
    INSERT INTO main.t3 VALUES(11,12);
    INSERT INTO t4 VALUES('main.11')
;ATTACH DATABASE 'test2.db' AS db2;
    INSERT INTO db2.t3 VALUES(13,14);
    SELECT * FROM db2.t4 UNION ALL SELECT * FROM main.t4
;INSERT INTO main.t4 VALUES('main.15')
;INSERT INTO main.t3 VALUES(15,16);
    SELECT * FROM db2.t4 UNION ALL SELECT * FROM main.t4
;INSERT INTO main.t4 VALUES('main.15')
;ATTACH DATABASE 'test2.db' AS db2;
    INSERT INTO db2.t3 VALUES(13,14);
    INSERT INTO main.t3 VALUES(15,16)
;DETACH DATABASE db2
;CREATE VIEW v3 AS SELECT x*100+y FROM t3;
    SELECT * FROM v3
;CREATE VIEW v3 AS SELECT a*100+b FROM t3;
    SELECT * FROM v3
;ATTACH DATABASE 'test2.db' AS db2;
    SELECT * FROM db2.v3
;SELECT * FROM main.v3
;CREATE TABLE t1(a,b,c)
;CREATE TABLE t1(x); BEGIN EXCLUSIVE
;ATTACH 'test4.db' AS aux1;
    CREATE TABLE aux1.t1(a, b);
    INSERT INTO aux1.t1 VALUES(1, 2);
    ATTACH 'test4.db' AS aux2;
    SELECT * FROM aux2.t1
;COMMIT;
    SELECT * FROM aux2.t1
;ATTACH '' AS noname;
    ATTACH ':memory:' AS inmem;
    BEGIN;
    CREATE TABLE noname.noname(x);
    CREATE TABLE inmem.inmem(y);
    CREATE TABLE main.main(z);
    COMMIT;
    SELECT name FROM noname.sqlite_master;
    SELECT name FROM inmem.sqlite_master
;ATTACH printf('file:%09000x/x.db?mode=memory&cache=shared',1) AS aux1;
  CREATE TABLE aux1.t1(x,y);
  INSERT INTO aux1.t1(x,y) VALUES(1,2),(3,4);
  SELECT * FROM aux1.t1;