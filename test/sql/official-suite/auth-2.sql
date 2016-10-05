-- original: auth.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

DETACH test1
;ATTACH ':mem' || 'ory:' AS test1
;ATTACH DATABASE ':memory:' AS test1
;ATTACH DATABASE ':memory:' AS test1
;DETACH DATABASE test1
;SELECT name FROM sqlite_temp_master WHERE type='table'
;SELECT name FROM sqlite_temp_master WHERE type='table'
;SELECT name FROM sqlite_temp_master WHERE type='table'
;DETACH DATABASE test1
;SELECT name FROM sqlite_master WHERE type='table'
;SELECT name FROM sqlite_master WHERE type='table'
;SELECT name FROM sqlite_master WHERE type='table'
;CREATE TABLE t3(a PRIMARY KEY, b, c);
    CREATE INDEX t3_idx1 ON t3(c COLLATE BINARY);
    CREATE INDEX t3_idx2 ON t3(b COLLATE NOCASE)
;REINDEX t3_idx1
;REINDEX BINARY
;REINDEX NOCASE
;REINDEX t3
;DROP TABLE t3
;CREATE TEMP TABLE t3(a PRIMARY KEY, b, c);
      CREATE INDEX t3_idx1 ON t3(c COLLATE BINARY);
      CREATE INDEX t3_idx2 ON t3(b COLLATE NOCASE)
;REINDEX temp.t3_idx1
;REINDEX BINARY
;REINDEX NOCASE
;REINDEX temp.t3
;DROP TABLE t3
;CREATE TABLE t4(a,b,c);
      CREATE INDEX t4i1 ON t4(a);
      CREATE INDEX t4i2 ON t4(b,a,c);
      INSERT INTO t4 VALUES(1,2,3);
      ANALYZE
;SELECT count(*) FROM sqlite_stat1
;SELECT count(*) FROM sqlite_stat1
;CREATE TABLE t5(x)
;SELECT sql FROM sqlite_master WHERE name='t5'
;SELECT sql FROM sqlite_master WHERE name='t5'
;SELECT sql FROM sqlite_temp_master WHERE type='t5'
;DROP TABLE t5
;DROP TABLE IF EXISTS t1;
       CREATE TABLE t1(a,b);
       INSERT INTO t1 VALUES(1,2),(3,4),(5,6)
;CREATE TABLE t3(x INTEGER PRIMARY KEY, y, z)
;INSERT INTO t3 VALUES(44,55,66)
;CREATE TABLE tx(a1,a2,b1,b2,c1,c2);
      CREATE TRIGGER r1 AFTER UPDATE ON t2 FOR EACH ROW BEGIN
        INSERT INTO tx VALUES(OLD.a,NEW.a,OLD.b,NEW.b,OLD.c,NEW.c);
      END;
      UPDATE t2 SET a=a+1;
      SELECT * FROM tx
;DELETE FROM tx;
      UPDATE t2 SET a=a+100;
      SELECT * FROM tx
;UPDATE t2 SET a=a+1
;CREATE VIEW v1 AS SELECT a+b AS x FROM t2;
    CREATE TABLE v1chng(x1,x2);
    CREATE TRIGGER r2 INSTEAD OF UPDATE ON v1 BEGIN
      INSERT INTO v1chng VALUES(OLD.x,NEW.x);
    END;
    SELECT * FROM v1
;UPDATE v1 SET x=1 WHERE x=117
;CREATE TRIGGER r3 INSTEAD OF DELETE ON v1 BEGIN
      INSERT INTO v1chng VALUES(OLD.x,NULL);
    END;
    SELECT * FROM v1
;DELETE FROM v1 WHERE x=117
;SELECT count(a) AS cnt FROM t4 ORDER BY cnt
;DROP TABLE tx
;DROP TABLE v1chng
;SELECT name FROM (
        SELECT * FROM sqlite_master UNION ALL SELECT * FROM sqlite_temp_master)
      WHERE type='table'
      ORDER BY name
;CREATE TABLE t5 ( x );
      CREATE TRIGGER t5_tr1 AFTER INSERT ON t5 BEGIN 
        UPDATE t5 SET x = 1 WHERE NEW.x = 0;
      END
;INSERT INTO t5 (x) values(0)
;SELECT * FROM t5
;CREATE TABLE t6(a,b,c,d,e,f,g,h);
    INSERT INTO t6 VALUES(1,2,3,4,5,6,7,8)
;UPDATE t6 SET rowID=rowID+100
;SELECT rowid, * FROM t6;