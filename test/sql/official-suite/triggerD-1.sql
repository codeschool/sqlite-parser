-- original: triggerD.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(rowid, oid, _rowid_, x);
    CREATE TABLE log(a,b,c,d,e);
    CREATE TRIGGER r1 BEFORE INSERT ON t1 BEGIN
      INSERT INTO log VALUES('r1', new.rowid, new.oid, new._rowid_, new.x);
    END;
    CREATE TRIGGER r2 AFTER INSERT ON t1 BEGIN
      INSERT INTO log VALUES('r2', new.rowid, new.oid, new._rowid_, new.x);
    END;
    CREATE TRIGGER r3 BEFORE UPDATE ON t1 BEGIN
      INSERT INTO log VALUES('r3.old', old.rowid, old.oid, old._rowid_, old.x);
      INSERT INTO log VALUES('r3.new', new.rowid, new.oid, new._rowid_, new.x);
    END;
    CREATE TRIGGER r4 AFTER UPDATE ON t1 BEGIN
      INSERT INTO log VALUES('r4.old', old.rowid, old.oid, old._rowid_, old.x);
      INSERT INTO log VALUES('r4.new', new.rowid, new.oid, new._rowid_, new.x);
    END;
    CREATE TRIGGER r5 BEFORE DELETE ON t1 BEGIN
      INSERT INTO log VALUES('r5', old.rowid, old.oid, old._rowid_, old.x);
    END;
    CREATE TRIGGER r6 AFTER DELETE ON t1 BEGIN
      INSERT INTO log VALUES('r6', old.rowid, old.oid, old._rowid_, old.x);
    END
;INSERT INTO t1 VALUES(100,200,300,400);
    SELECT * FROM log
;DELETE FROM log;
    UPDATE t1 SET rowid=rowid+1;
    SELECT * FROM log
;DELETE FROM log;
    DELETE FROM t1;
    SELECT * FROM log
;DROP TABLE t1;
    CREATE TABLE t1(w,x,y,z);
    CREATE TRIGGER r1 BEFORE INSERT ON t1 BEGIN
      INSERT INTO log VALUES('r1', new.rowid, new.oid, new._rowid_, new.x);
    END;
    CREATE TRIGGER r2 AFTER INSERT ON t1 BEGIN
      INSERT INTO log VALUES('r2', new.rowid, new.oid, new._rowid_, new.x);
    END;
    CREATE TRIGGER r3 BEFORE UPDATE ON t1 BEGIN
      INSERT INTO log VALUES('r3.old', old.rowid, old.oid, old._rowid_, old.x);
      INSERT INTO log VALUES('r3.new', new.rowid, new.oid, new._rowid_, new.x);
    END;
    CREATE TRIGGER r4 AFTER UPDATE ON t1 BEGIN
      INSERT INTO log VALUES('r4.old', old.rowid, old.oid, old._rowid_, old.x);
      INSERT INTO log VALUES('r4.new', new.rowid, new.oid, new._rowid_, new.x);
    END;
    CREATE TRIGGER r5 BEFORE DELETE ON t1 BEGIN
      INSERT INTO log VALUES('r5', old.rowid, old.oid, old._rowid_, old.x);
    END;
    CREATE TRIGGER r6 AFTER DELETE ON t1 BEGIN
      INSERT INTO log VALUES('r6', old.rowid, old.oid, old._rowid_, old.x);
    END
;DELETE FROM log;
    INSERT INTO t1 VALUES(100,200,300,400);
    SELECT * FROM log
;DELETE FROM log;
    UPDATE t1 SET x=x+1;
    SELECT * FROM log
;DELETE FROM log;
    DELETE FROM t1;
    SELECT * FROM log
;CREATE TABLE t300(x);
    CREATE TEMP TABLE t300(x);
    CREATE TABLE t301(y);
    CREATE TRIGGER main.r300 AFTER INSERT ON t300 BEGIN
      INSERT INTO t301 VALUES(10000 +new.x);
    END;
    INSERT INTO main.t300 VALUES(3);
    INSERT INTO temp.t300 VALUES(4);
    SELECT * FROM t301
;DELETE FROM t301;
    CREATE TRIGGER temp.r301 AFTER INSERT ON t300 BEGIN
      INSERT INTO t301 VALUES(20000 +new.x);
    END;
    INSERT INTO main.t300 VALUES(3);
    INSERT INTO temp.t300 VALUES(4);
    SELECT * FROM t301
;CREATE TABLE t1(x);
    ATTACH 'test2.db' AS db2;
    CREATE TABLE db2.t2(y);
    CREATE TABLE db2.log(z);
    CREATE TRIGGER db2.trig AFTER INSERT ON db2.t2 BEGIN
      INSERT INTO log(z) VALUES(new.y);
    END;
    INSERT INTO t2 VALUES(123);
    SELECT * FROM log
;INSERT INTO t2 VALUES(234);
    SELECT * FROM log;