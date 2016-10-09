-- original: autoinc.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT name FROM sqlite_master WHERE type='table'
;CREATE TABLE t1(x INTEGER PRIMARY KEY AUTOINCREMENT, y);
    SELECT name FROM sqlite_master WHERE type='table'
;SELECT * FROM sqlite_sequence
;SELECT * FROM sqlite_sequence
;SELECT name FROM sqlite_master WHERE type='table'
;SELECT * FROM sqlite_sequence
;INSERT INTO t1 VALUES(12,34);
    SELECT * FROM sqlite_sequence
;INSERT INTO t1 VALUES(1,23);
    SELECT * FROM sqlite_sequence
;INSERT INTO t1 VALUES(123,456);
    SELECT * FROM sqlite_sequence
;INSERT INTO t1 VALUES(NULL,567);
    SELECT * FROM sqlite_sequence
;DELETE FROM t1 WHERE y=567;
    SELECT * FROM sqlite_sequence
;INSERT INTO t1 VALUES(NULL,567);
    SELECT * FROM sqlite_sequence
;DELETE FROM t1;
    SELECT * FROM sqlite_sequence
;INSERT INTO t1 VALUES(12,34);
    SELECT * FROM sqlite_sequence
;INSERT INTO t1 VALUES(125,456);
    SELECT * FROM sqlite_sequence
;INSERT INTO t1 VALUES(-1234567,-1);
    SELECT * FROM sqlite_sequence
;INSERT INTO t1 VALUES(234,5678);
    SELECT * FROM sqlite_sequence
;DELETE FROM t1;
    INSERT INTO t1 VALUES(NULL,1);
    SELECT * FROM sqlite_sequence
;SELECT * FROM t1
;UPDATE sqlite_sequence SET seq=1234 WHERE name='t1';
    INSERT INTO t1 VALUES(NULL,2);
    SELECT * FROM t1
;SELECT * FROM sqlite_sequence
;UPDATE sqlite_sequence SET seq=NULL WHERE name='t1';
    INSERT INTO t1 VALUES(NULL,3);
    SELECT * FROM t1
;SELECT * FROM sqlite_sequence
;UPDATE sqlite_sequence SET seq='a-string' WHERE name='t1';
    INSERT INTO t1 VALUES(NULL,4);
    SELECT * FROM t1
;SELECT * FROM sqlite_sequence
;DELETE FROM sqlite_sequence WHERE name='t1';
    INSERT INTO t1 VALUES(NULL,5);
    SELECT * FROM t1
;SELECT * FROM sqlite_sequence
;UPDATE sqlite_sequence SET seq='-12345678901234567890'
      WHERE name='t1';
    INSERT INTO t1 VALUES(NULL,6);
    SELECT * FROM t1
;SELECT * FROM sqlite_sequence
;DELETE FROM t1 WHERE y>=3;
    INSERT INTO t1 SELECT NULL, y+2 FROM t1;
    SELECT * FROM t1
;SELECT * FROM sqlite_sequence
;CREATE TEMP TABLE t2 AS SELECT y FROM t1
;INSERT INTO t1 SELECT NULL, y+4 FROM t2;
      SELECT * FROM t1
;SELECT * FROM sqlite_sequence
;DELETE FROM t1;
      INSERT INTO t1 SELECT NULL, y FROM t2;
      SELECT * FROM t1
;SELECT * FROM sqlite_sequence
;CREATE TABLE t2(d, e INTEGER PRIMARY KEY AUTOINCREMENT, f);
    INSERT INTO t2(d) VALUES(1);
    SELECT * FROM sqlite_sequence
;INSERT INTO t2(d) VALUES(2);
    SELECT * FROM sqlite_sequence
;INSERT INTO t1(x) VALUES(10000);
    SELECT * FROM sqlite_sequence
;CREATE TABLE t3(g INTEGER PRIMARY KEY AUTOINCREMENT, h);
    INSERT INTO t3(h) VALUES(1);
    SELECT * FROM sqlite_sequence
;INSERT INTO t2(d,e) VALUES(3,100);
    SELECT * FROM sqlite_sequence
;SELECT name FROM sqlite_sequence
;DROP TABLE t1;
    SELECT name FROM sqlite_sequence
;DROP TABLE t3;
    SELECT name FROM sqlite_sequence
;DROP TABLE t2;
    SELECT name FROM sqlite_sequence
;SELECT 1, name FROM sqlite_master WHERE type='table';
      SELECT 2, name FROM sqlite_temp_master WHERE type='table'
;CREATE TABLE t1(x INTEGER PRIMARY KEY AUTOINCREMENT, y);
      CREATE TEMP TABLE t3(a INTEGER PRIMARY KEY AUTOINCREMENT, b);
      SELECT 1, name FROM sqlite_master WHERE type='table';
      SELECT 2, name FROM sqlite_temp_master WHERE type='table'
;SELECT 1, * FROM main.sqlite_sequence;
      SELECT 2, * FROM temp.sqlite_sequence
;INSERT INTO t1 VALUES(10,1);
      INSERT INTO t3 VALUES(20,2);
      INSERT INTO t1 VALUES(NULL,3);
      INSERT INTO t3 VALUES(NULL,4)
;SELECT * FROM t1 UNION ALL SELECT * FROM t3
;SELECT 1, * FROM main.sqlite_sequence;
      SELECT 2, * FROM temp.sqlite_sequence
;INSERT INTO t1 SELECT * FROM t3;
      SELECT 1, * FROM main.sqlite_sequence;
      SELECT 2, * FROM temp.sqlite_sequence
;INSERT INTO t3 SELECT x+100, y  FROM t1;
      SELECT 1, * FROM main.sqlite_sequence;
      SELECT 2, * FROM temp.sqlite_sequence
;DROP TABLE t3;
      SELECT 1, * FROM main.sqlite_sequence;
      SELECT 2, * FROM temp.sqlite_sequence
;CREATE TEMP TABLE t2(p INTEGER PRIMARY KEY AUTOINCREMENT, q);
      INSERT INTO t2 SELECT * FROM t1;
      DROP TABLE t1;
      SELECT 1, * FROM main.sqlite_sequence;
      SELECT 2, * FROM temp.sqlite_sequence
;DROP TABLE t2;
      SELECT 1, * FROM main.sqlite_sequence;
      SELECT 2, * FROM temp.sqlite_sequence
;CREATE TABLE t4(m INTEGER PRIMARY KEY AUTOINCREMENT, n);
      CREATE TABLE t5(o, p INTEGER PRIMARY KEY AUTOINCREMENT)
;ATTACH 'test2.db' as aux;
      SELECT 1, * FROM main.sqlite_sequence;
      SELECT 2, * FROM temp.sqlite_sequence;
      SELECT 3, * FROM aux.sqlite_sequence
;INSERT INTO t4 VALUES(NULL,1);
      SELECT 1, * FROM main.sqlite_sequence;
      SELECT 2, * FROM temp.sqlite_sequence;
      SELECT 3, * FROM aux.sqlite_sequence
;INSERT INTO t5 VALUES(100,200);
      SELECT * FROM sqlite_sequence
;SELECT 1, * FROM main.sqlite_sequence;
      SELECT 2, * FROM temp.sqlite_sequence;
      SELECT 3, * FROM aux.sqlite_sequence
;CREATE TABLE t6(v INTEGER PRIMARY KEY AUTOINCREMENT, w);
      INSERT INTO t6 VALUES(2147483647,1);
      SELECT seq FROM main.sqlite_sequence WHERE name='t6'
;CREATE TABLE t6(v INTEGER PRIMARY KEY AUTOINCREMENT, w);
      INSERT INTO t6 VALUES(9223372036854775807,1);
      SELECT seq FROM main.sqlite_sequence WHERE name='t6'
;CREATE TABLE t7(x INTEGER, y REAL, PRIMARY KEY(x AUTOINCREMENT));
    INSERT INTO t7(y) VALUES(123);
    INSERT INTO t7(y) VALUES(234);
    DELETE FROM t7;
    INSERT INTO t7(y) VALUES(345);
    SELECT * FROM t7
;INSERT INTO t1 VALUES(NULL);
    SELECT * FROM t1
;CREATE TABLE t2(x INTEGER PRIMARY KEY AUTOINCREMENT, y);
    INSERT INTO t2 VALUES(NULL, 1);
    CREATE TABLE t3(a INTEGER PRIMARY KEY AUTOINCREMENT, b);
    INSERT INTO t3 SELECT * FROM t2 WHERE y>1;

    SELECT * FROM sqlite_sequence WHERE name='t3'
;CREATE TABLE t3928(a INTEGER PRIMARY KEY AUTOINCREMENT, b);
      CREATE TRIGGER t3928r1 BEFORE INSERT ON t3928 BEGIN
        INSERT INTO t3928(b) VALUES('before1');
        INSERT INTO t3928(b) VALUES('before2');
      END;
      CREATE TRIGGER t3928r2 AFTER INSERT ON t3928 BEGIN
        INSERT INTO t3928(b) VALUES('after1');
        INSERT INTO t3928(b) VALUES('after2');
      END;
      INSERT INTO t3928(b) VALUES('test');
      SELECT * FROM t3928 ORDER BY a
;SELECT * FROM sqlite_sequence WHERE name='t3928'
;DROP TRIGGER t3928r1;
      DROP TRIGGER t3928r2;
      CREATE TRIGGER t3928r3 BEFORE UPDATE ON t3928 
        WHEN typeof(new.b)=='integer' BEGIN
           INSERT INTO t3928(b) VALUES('before-int-' || new.b);
      END;
      CREATE TRIGGER t3928r4 AFTER UPDATE ON t3928 
        WHEN typeof(new.b)=='integer' BEGIN
           INSERT INTO t3928(b) VALUES('after-int-' || new.b);
      END;
      DELETE FROM t3928 WHERE a!=1;
      UPDATE t3928 SET b=456 WHERE a=1;
      SELECT * FROM t3928 ORDER BY a
;SELECT * FROM sqlite_sequence WHERE name='t3928'
;CREATE TABLE t3928b(x);
      INSERT INTO t3928b VALUES(100);
      INSERT INTO t3928b VALUES(200);
      INSERT INTO t3928b VALUES(300);
      DELETE FROM t3928;
      CREATE TABLE t3928c(y INTEGER PRIMARY KEY AUTOINCREMENT, z);
      CREATE TRIGGER t3928br1 BEFORE DELETE ON t3928b BEGIN
        INSERT INTO t3928(b) VALUES('before-del-'||old.x);
        INSERT INTO t3928c(z) VALUES('before-del-'||old.x);
      END;
      CREATE TRIGGER t3928br2 AFTER DELETE ON t3928b BEGIN
        INSERT INTO t3928(b) VALUES('after-del-'||old.x);
        INSERT INTO t3928c(z) VALUES('after-del-'||old.x);
      END;
      DELETE FROM t3928b;
      SELECT * FROM t3928 ORDER BY a
;SELECT * FROM t3928c ORDER BY y
;SELECT * FROM sqlite_sequence WHERE name LIKE 't3928%' ORDER BY name
;CREATE TABLE ta69637_1(x INTEGER PRIMARY KEY AUTOINCREMENT, y);
      CREATE TABLE ta69637_2(z);
      CREATE TRIGGER ra69637_1 AFTER INSERT ON ta69637_2 BEGIN
        INSERT INTO ta69637_1(y) VALUES(new.z+1);
      END;
      INSERT INTO ta69637_2 VALUES(123);
      SELECT * FROM ta69637_1
;CREATE VIEW va69637_2 AS SELECT * FROM ta69637_2;
      CREATE TRIGGER ra69637_2 INSTEAD OF INSERT ON va69637_2 BEGIN
        INSERT INTO ta69637_1(y) VALUES(new.z+10000);
      END;
      INSERT INTO va69637_2 VALUES(123);
      SELECT * FROM ta69637_1;