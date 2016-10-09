-- original: alter2.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE abc(a, b);
    INSERT INTO abc VALUES(1, 2);
    INSERT INTO abc VALUES(3, 4);
    INSERT INTO abc VALUES(5, 6)
;SELECT * FROM abc
;UPDATE abc SET c = 10 WHERE a = 1;
    SELECT * FROM abc
;CREATE INDEX abc_i ON abc(c)
;SELECT c FROM abc ORDER BY c
;SELECT * FROM abc WHERE c = 10
;SELECT sum(a), c FROM abc GROUP BY c
;SELECT * FROM abc
;UPDATE abc SET d = 11 WHERE c IS NULL AND a<4;
    SELECT * FROM abc
;SELECT typeof(d) FROM abc
;DROP TABLE abc
;CREATE TABLE abc2(a, b, c);
      INSERT INTO abc2 VALUES(1, 2, 10);
      INSERT INTO abc2 VALUES(3, 4, NULL);
      INSERT INTO abc2 VALUES(5, 6, NULL);
      CREATE VIEW abc2_v AS SELECT * FROM abc2;
      SELECT * FROM abc2_v
;SELECT * FROM abc2_v
;DROP TABLE abc2;
      DROP VIEW abc2_v
;CREATE TABLE abc3(a, b);
      CREATE TABLE blog(o, n);
      CREATE TRIGGER abc3_t AFTER UPDATE OF b ON abc3 BEGIN
        INSERT INTO blog VALUES(old.b, new.b);
      END
;INSERT INTO abc3 VALUES(1, 4);
      UPDATE abc3 SET b = 2 WHERE b = 4;
      SELECT * FROM blog
;INSERT INTO abc3 VALUES(3, 4);
      INSERT INTO abc3 VALUES(5, 6)
;SELECT * FROM abc3
;UPDATE abc3 SET b = b*2 WHERE a<4;
      SELECT * FROM abc3
;SELECT * FROM blog
;CREATE TABLE clog(o, n);
      CREATE TRIGGER abc3_t2 AFTER UPDATE OF c ON abc3 BEGIN
        INSERT INTO clog VALUES(old.c, new.c);
      END;
      UPDATE abc3 SET c = a*2;
      SELECT * FROM clog
;CREATE TABLE abc3(a, b)
;SELECT 1 FROM sqlite_master LIMIT 1
;VACUUM
;ATTACH 'test2.db' AS aux;
      CREATE TABLE aux.t1(a, b)
;CREATE TABLE t1(a, b)
;DROP TABLE t1;
    CREATE TABLE t1(a);
    INSERT INTO t1 VALUES(1);
    INSERT INTO t1 VALUES(2);
    INSERT INTO t1 VALUES(3);
    INSERT INTO t1 VALUES(4);
    SELECT * FROM t1
;SELECT * FROM t1 LIMIT 1
;SELECT a, typeof(a), b, typeof(b), c, typeof(c) FROM t1 LIMIT 1
;SELECT a, typeof(a), b, typeof(b), c, typeof(c) FROM t1 LIMIT 1
;SELECT a, typeof(a), b, typeof(b), c, typeof(c) FROM t1 LIMIT 1
;CREATE TRIGGER trig1 BEFORE UPDATE ON t1 BEGIN
      SELECT set_val(
          old.b||' '||typeof(old.b)||' '||old.c||' '||typeof(old.c)||' '||
          new.b||' '||typeof(new.b)||' '||new.c||' '||typeof(new.c) 
      );
      END
;UPDATE t1 SET c = 10 WHERE a = 1;
    SELECT a, typeof(a), b, typeof(b), c, typeof(c) FROM t1 LIMIT 1
;CREATE TRIGGER trig2 BEFORE DELETE ON t1 BEGIN
      SELECT set_val(
          old.b||' '||typeof(old.b)||' '||old.c||' '||typeof(old.c)
      );
      END
;DELETE FROM t1 WHERE a = 2
;CREATE TABLE t2(a);
      INSERT INTO t2 VALUES('a');
      INSERT INTO t2 VALUES('b');
      INSERT INTO t2 VALUES('c');
      INSERT INTO t2 VALUES('d')
;SELECT quote(a), quote(b), quote(c) FROM t2 LIMIT 1
;CREATE INDEX i1 ON t2(b);
      SELECT a FROM t2 WHERE b = X'ABCD'
;DELETE FROM t2 WHERE a = 'c';
      SELECT a FROM t2 WHERE b = X'ABCD'
;SELECT count(b) FROM t2 WHERE b = X'ABCD';