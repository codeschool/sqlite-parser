-- original: hook.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t2(a,b)
;INSERT INTO t2 VALUES(1,2);
    INSERT INTO t2 SELECT a+1, b+1 FROM t2;
    INSERT INTO t2 SELECT a+2, b+2 FROM t2
;SELECT * FROM t2
;INSERT INTO t2 VALUES(5,6)
;SELECT * FROM t2
;SELECT * FROM t2
;INSERT INTO t2 VALUES(7,8)
;CREATE TABLE t3(x,y)
;SELECT * FROM t3 ORDER BY x
;CREATE TABLE t1(a INTEGER PRIMARY KEY, b);
    CREATE TABLE t1w(a INT PRIMARY KEY, b) WITHOUT ROWID
;INSERT INTO t1 VALUES(1, 'one');
    INSERT INTO t1 VALUES(2, 'two');
    INSERT INTO t1 VALUES(3, 'three');
    INSERT INTO t1w SELECT * FROM t1
;INSERT INTO t1 VALUES(4, 'four');
    DELETE FROM t1 WHERE b = 'two';
    UPDATE t1 SET b = '' WHERE a = 1 OR a = 3;
    DELETE FROM t1 WHERE 1; -- Avoid the truncate optimization (for now)
;INSERT INTO t1w VALUES(4, 'four');
    DELETE FROM t1w WHERE b = 'two';
    UPDATE t1w SET b = '' WHERE a = 1 OR a = 3;
    DELETE FROM t1w WHERE 1; -- Avoid the truncate optimization (for now)
;CREATE TRIGGER r1 AFTER INSERT ON t1 BEGIN SELECT RAISE(IGNORE); END
;DROP TRIGGER r1
;CREATE TABLE t2(c INTEGER PRIMARY KEY, d);
      CREATE TRIGGER t1_trigger AFTER INSERT ON t1 BEGIN
        INSERT INTO t2 VALUES(new.a, new.b);
        UPDATE t2 SET d = d || ' via trigger' WHERE new.a = c;
        DELETE FROM t2 WHERE new.a = c;
      END
;INSERT INTO t1 VALUES(1, 'one');
      INSERT INTO t1 VALUES(2, 'two')
;INSERT INTO t1 VALUES(1, 'one');
    INSERT INTO t1 VALUES(2, 'two')
;ATTACH 'test2.db' AS aux;
      CREATE TABLE aux.t3(a INTEGER PRIMARY KEY, b);
      INSERT INTO aux.t3 SELECT * FROM t1;
      UPDATE t3 SET b = 'two or so' WHERE a = 2;
      DELETE FROM t3 WHERE 1; -- Avoid the truncate optimization (for now)
;DROP TRIGGER t1_trigger
;CREATE INDEX t1_i ON t1(b);
    INSERT INTO t1 VALUES(3, 'three');
    UPDATE t1 SET b = '';
    DELETE FROM t1 WHERE a > 1
;SELECT * FROM t1 UNION SELECT * FROM t3;
      SELECT * FROM t1 UNION ALL SELECT * FROM t3;
      SELECT * FROM t1 INTERSECT SELECT * FROM t3;
      SELECT * FROM t1 EXCEPT SELECT * FROM t3;
      SELECT * FROM t1 ORDER BY b;
      SELECT * FROM t1 GROUP BY b
;CREATE TABLE t4(a UNIQUE, b);
    INSERT INTO t4 VALUES(1, 'a');
    INSERT INTO t4 VALUES(2, 'b')
;REPLACE INTO t4 VALUES(1, 'c')
;SELECT * FROM t4 ORDER BY a
;PRAGMA recursive_triggers = on;
    REPLACE INTO t4 VALUES(1, 'd')
;SELECT * FROM t4 ORDER BY a
;BEGIN;
    ROLLBACK
;SELECT count(*) FROM t1
;SELECT * FROM t1;