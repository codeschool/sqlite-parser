-- original: alter.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT 't1', * FROM t1;
    SELECT 't1''x1', * FROM "t1'x1";
    SELECT * FROM [temp table]
;ALTER TABLE [T1] RENAME to [-t1-];
    ALTER TABLE "t1'x1" RENAME TO T2;
    ALTER TABLE [temp table] RENAME to TempTab
;SELECT 't1', * FROM [-t1-];
    SELECT 't2', * FROM t2;
    SELECT * FROM temptab
;DROP TABLE TempTab
;ATTACH 'test2.db' AS aux
;CREATE TABLE t4(a PRIMARY KEY, b, c);
      CREATE TABLE aux.t4(a PRIMARY KEY, b, c);
      CREATE INDEX i4 ON t4(b);
      CREATE INDEX aux.i4 ON t4(b)
;INSERT INTO t4 VALUES('main', 'main', 'main');
      INSERT INTO aux.t4 VALUES('aux', 'aux', 'aux');
      SELECT * FROM t4 WHERE a = 'main'
;ALTER TABLE t4 RENAME TO t5;
      SELECT * FROM t4 WHERE a = 'aux'
;SELECT * FROM t5
;SELECT * FROM t5 WHERE b = 'main'
;ALTER TABLE aux.t4 RENAME TO t5;
      SELECT * FROM aux.t5 WHERE b = 'aux'
;CREATE TABLE tbl1   (a, b, c);
    INSERT INTO tbl1 VALUES(1, 2, 3)
;SELECT * FROM tbl1
;ALTER TABLE tbl1 RENAME TO tbl2;
    SELECT * FROM tbl2
;DROP TABLE tbl2
;CREATE TABLE t3(p,q,r)
;CREATE TABLE t6(a, b, c);
    -- Different case for the table name in the trigger.
    CREATE TRIGGER trig1 AFTER INSERT ON T6 BEGIN
      SELECT trigfunc('trig1', new.a, new.b, new.c);
    END
;INSERT INTO t6 VALUES(1, 2, 3)
;ALTER TABLE t6 RENAME TO t7;
    INSERT INTO t7 VALUES(4, 5, 6)
;DROP TRIGGER trig1
;CREATE TRIGGER trig2 AFTER INSERT ON main.t7 BEGIN
      SELECT trigfunc('trig2', new.a, new.b, new.c);
    END;
    INSERT INTO t7 VALUES(1, 2, 3)
;ALTER TABLE t7 RENAME TO t8;
    INSERT INTO t8 VALUES(4, 5, 6)
;DROP TRIGGER trig2
;CREATE TRIGGER trig3 AFTER INSERT ON main.'t8'BEGIN
      SELECT trigfunc('trig3', new.a, new.b, new.c);
    END;
    INSERT INTO t8 VALUES(1, 2, 3)
;ALTER TABLE t8 RENAME TO t9;
    INSERT INTO t9 VALUES(4, 5, 6)
;DROP TABLE t10
;INSERT INTO tbl1 VALUES('a', 'b', 'c')
;ALTER TABLE tbl1 RENAME TO tbl2;
    INSERT INTO tbl2 VALUES('d', 'e', 'f')
;ALTER TABLE tbl2 RENAME TO tbl3;
    INSERT INTO tbl3 VALUES('g', 'h', 'i')
;UPDATE tbl3 SET a = 'G' where a = 'g'
;DROP TABLE tbl3
;SELECT * FROM sqlite_temp_master WHERE type = 'trigger'
;CREATE TABLE tbl1(a INTEGER PRIMARY KEY AUTOINCREMENT);
    INSERT INTO tbl1 VALUES(10)
;INSERT INTO tbl1 VALUES(NULL);
    SELECT a FROM tbl1
;ALTER TABLE tbl1 RENAME TO tbl2;
    DELETE FROM tbl2;
    INSERT INTO tbl2 VALUES(NULL);
    SELECT a FROM tbl2
;DROP TABLE tbl2
;CREATE TABLE tbl1(a, b, c);
    INSERT INTO tbl1 VALUES('x', 'y', 'z')
;ALTER TABLE tbl1 RENAME TO tbl2;
    SELECT * FROM tbl2
;SELECT name FROM sqlite_master
   WHERE type='table' AND name NOT GLOB 'sqlite*'
;DROP TABLE "sub_tblname"
;SELECT max(oid) FROM sqlite_master
;CREATE TABLE t1(a TEXT COLLATE BINARY);
    ALTER TABLE t1 ADD COLUMN b INTEGER COLLATE NOCASE;
    INSERT INTO t1 VALUES(1,'-2');
    INSERT INTO t1 VALUES(5.4e-08,'5.4e-08');
    SELECT typeof(a), a, typeof(b), b FROM t1
;CREATE TABLE t2(a INTEGER);
    INSERT INTO t2 VALUES(1);
    INSERT INTO t2 VALUES(1);
    INSERT INTO t2 VALUES(2);
    ALTER TABLE t2 ADD COLUMN b INTEGER DEFAULT 9;
    SELECT sum(b) FROM t2
;SELECT a, sum(b) FROM t2 GROUP BY a
;SELECT SQLITE_RENAME_TRIGGER(0,0)
;SELECT SQLITE_RENAME_TABLE(0,0);
    SELECT SQLITE_RENAME_TABLE(10,20);
    SELECT SQLITE_RENAME_TABLE('foo', 'foo')
;CREATE TABLE xyz(x UNIQUE)
;ALTER TABLE xyz RENAME TO xyzu1234abc
;SELECT name FROM sqlite_master WHERE name GLOB 'xyz*'
;SELECT name FROM sqlite_master WHERE name GLOB 'sqlite_autoindex*'
;ALTER TABLE xyzu1234abc RENAME TO xyzabc
;SELECT name FROM sqlite_master WHERE name GLOB 'xyz*'
;SELECT name FROM sqlite_master WHERE name GLOB 'sqlite_autoindex*'
;ALTER TABLE t11 ADD COLUMN abc
;INSERT INTO t11 VALUES(1,2)
;ALTER TABLE t11b ADD COLUMN abc
;INSERT INTO t11b VALUES(3,4)
;ALTER TABLE t11c ADD COLUMN abc
;INSERT INTO t11c VALUES(5,6)
;CREATE TABLE t12(a, b, c);
    CREATE VIEW v1 AS SELECT * FROM t12
;SELECT * FROM v1
;SELECT * FROM v1
;CREATE TABLE /* hi */ t3102a(x);
    CREATE TABLE t3102b -- comment
    (y);
    CREATE INDEX t3102c ON t3102a(x);
    SELECT name FROM sqlite_master WHERE name GLOB 't3102*' ORDER BY 1
;ALTER TABLE t3102a RENAME TO t3102a_rename;
    SELECT name FROM sqlite_master WHERE name GLOB 't3102*' ORDER BY 1
;ALTER TABLE t3102b RENAME TO t3102b_rename;
    SELECT name FROM sqlite_master WHERE name GLOB 't3102*' ORDER BY 1
;CREATE TABLE t16a(a TEXT, b REAL, c INT, PRIMARY KEY(a,b)) WITHOUT rowid;
  INSERT INTO t16a VALUES('abc',1.25,99);
  ALTER TABLE t16a ADD COLUMN d TEXT DEFAULT 'xyzzy';
  INSERT INTO t16a VALUES('cba',5.5,98,'fizzle');
  SELECT * FROM t16a ORDER BY a
;ALTER TABLE t16a RENAME TO t16a_rn;
  SELECT * FROM t16a_rn ORDER BY a
;SELECT sqlite_rename_table('CREATE TABLE xyz(a,b,c)','abc')
;SELECT sqlite_rename_table('CREATE TABLE xyz(a,b,c)',NULL)
;SELECT sqlite_rename_table(NULL,'abc')
;SELECT sqlite_rename_trigger('CREATE TRIGGER r1 ON xyz WHEN','abc')
;SELECT sqlite_rename_trigger('CREATE TRIGGER r1 ON xyz WHEN',NULL)
;SELECT sqlite_rename_trigger(NULL,'abc')
;SELECT sqlite_rename_parent('CREATE TABLE t1(a REFERENCES "xyzzy")',
         'xyzzy','lmnop')
;SELECT sqlite_rename_parent('CREATE TABLE t1(a REFERENCES "xyzzy")',
         'xyzzy',NULL)
;SELECT sqlite_rename_parent('CREATE TABLE t1(a REFERENCES "xyzzy")',
         NULL, 'lmnop')
;SELECT sqlite_rename_parent(NULL,'abc','xyz')
;SELECT sqlite_rename_parent('create references ''','abc','xyz')
;SELECT sqlite_rename_parent('create references "abc"123" ','abc','xyz')
;SELECT sqlite_rename_parent("references '''",'abc','xyz');