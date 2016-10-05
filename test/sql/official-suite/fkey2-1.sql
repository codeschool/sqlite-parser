-- original: fkey2.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA foreign_keys = on
;PRAGMA foreign_key_check(t1)
;PRAGMA foreign_key_check(t2)
;PRAGMA foreign_key_check(t3)
;PRAGMA foreign_key_check(t4)
;PRAGMA foreign_key_check(t7)
;PRAGMA foreign_key_check(t8)
;PRAGMA foreign_key_check(t1)
;PRAGMA foreign_key_check(t2)
;PRAGMA foreign_key_check(t3)
;PRAGMA foreign_key_check(t4)
;PRAGMA foreign_key_check(t7)
;PRAGMA foreign_key_check(t8)
;PRAGMA count_changes = 1
;PRAGMA foreign_key_check(t1)
;PRAGMA foreign_key_check(t2)
;PRAGMA foreign_key_check(t3)
;PRAGMA foreign_key_check(t4)
;PRAGMA foreign_key_check(t7)
;PRAGMA foreign_key_check(t8)
;PRAGMA count_changes = 0
;PRAGMA count_changes = 1
;PRAGMA count_changes = 0
;CREATE TABLE i(i INTEGER PRIMARY KEY);
    CREATE TABLE j(j REFERENCES i);
    INSERT INTO i VALUES(35);
    INSERT INTO j VALUES('35.0');
    SELECT j, typeof(j) FROM j
;CREATE TABLE i(i INT UNIQUE);
    CREATE TABLE j(j REFERENCES i(i));
    INSERT INTO i VALUES('35.0');
    INSERT INTO j VALUES('35.0');
    SELECT j, typeof(j) FROM j;
    SELECT i, typeof(i) FROM i
;CREATE TABLE i(i TEXT COLLATE nocase PRIMARY KEY);
    CREATE TABLE j(j TEXT COLLATE binary REFERENCES i(i));
    INSERT INTO i VALUES('SQLite');
    INSERT INTO j VALUES('sqlite')
;CREATE TABLE i(i TEXT PRIMARY KEY);        -- Colseq is "BINARY"
    CREATE TABLE j(j TEXT COLLATE nocase REFERENCES i(i));
    INSERT INTO i VALUES('SQLite')
;INSERT INTO i VALUES('sqlite');
    INSERT INTO j VALUES('sqlite');
    DELETE FROM i WHERE i = 'SQLite'
;CREATE TABLE ab(a PRIMARY KEY, b);
    CREATE TABLE cd(
      c PRIMARY KEY REFERENCES ab ON UPDATE CASCADE ON DELETE CASCADE, 
      d
    );
    CREATE TABLE ef(
      e REFERENCES cd ON UPDATE CASCADE, 
      f, CHECK (e!=5)
    )
;INSERT INTO ab VALUES(1, 'b');
    INSERT INTO cd VALUES(1, 'd');
    INSERT INTO ef VALUES(1, 'e')
;SELECT * FROM ab
;SELECT * FROM ab; SELECT * FROM cd; SELECT * FROM ef
;SELECT * FROM ab; SELECT * FROM cd; SELECT * FROM ef
;CREATE TABLE t1(
      node PRIMARY KEY, 
      parent REFERENCES t1 ON DELETE CASCADE
    );
    CREATE TABLE t2(node PRIMARY KEY, parent);
    CREATE TRIGGER t2t AFTER DELETE ON t2 BEGIN
      DELETE FROM t2 WHERE parent = old.node;
    END;
    INSERT INTO t1 VALUES(1, NULL);
    INSERT INTO t1 VALUES(2, 1);
    INSERT INTO t1 VALUES(3, 1);
    INSERT INTO t1 VALUES(4, 2);
    INSERT INTO t1 VALUES(5, 2);
    INSERT INTO t1 VALUES(6, 3);
    INSERT INTO t1 VALUES(7, 3);
    INSERT INTO t2 SELECT * FROM t1
;PRAGMA recursive_triggers = off
;BEGIN;
      DELETE FROM t1 WHERE node = 1;
      SELECT node FROM t1
;DELETE FROM t2 WHERE node = 1;
      SELECT node FROM t2;
    ROLLBACK
;PRAGMA recursive_triggers = on
;BEGIN;
      DELETE FROM t1 WHERE node = 1;
      SELECT node FROM t1
;DELETE FROM t2 WHERE node = 1;
      SELECT node FROM t2;
    ROLLBACK
;CREATE TABLE t1(a PRIMARY KEY, b);
      CREATE TABLE t2(a PRIMARY KEY, b REFERENCES t1(a));
      INSERT INTO t1 VALUES('hello', 'world');
      INSERT INTO t2 VALUES('key', 'hello')
;PRAGMA foreign_keys = off
;PRAGMA foreign_keys = on
;CREATE TABLE t1(a REFERENCES t2(c), b);
      CREATE TABLE t2(c UNIQUE, b);
      INSERT INTO t2 VALUES(1, 2);
      INSERT INTO t1 VALUES(1, 2);
      VACUUM
;CREATE TABLE t1(a PRIMARY KEY, b);
    CREATE TABLE t2(c INTEGER PRIMARY KEY REFERENCES t1, b)
;INSERT INTO t1 VALUES(1, 2);
    INSERT INTO t1 VALUES(2, 3);
    INSERT INTO t2 VALUES(1, 'A')
;UPDATE t2 SET c = 2
;DELETE FROM t1 WHERE a = 1
;PRAGMA foreign_keys
;CREATE TABLE t1(a INTEGER PRIMARY KEY, b);
    CREATE TABLE t2(
      c INTEGER PRIMARY KEY,
      d INTEGER DEFAULT 1 REFERENCES t1 ON DELETE SET DEFAULT
    );
    DELETE FROM t1
;INSERT INTO t1 VALUES(1, 'one');
    INSERT INTO t1 VALUES(2, 'two');
    INSERT INTO t2 VALUES(1, 2);
    SELECT * FROM t2;
    DELETE FROM t1 WHERE a = 2;
    SELECT * FROM t2
;INSERT INTO t1 VALUES(2, 'two');
    UPDATE t2 SET d = 2;
    DELETE FROM t1 WHERE a = 1;
    SELECT * FROM t2
;SELECT * FROM t1
;CREATE TABLE pp(a, b, c, PRIMARY KEY(b, c));
    CREATE TABLE cc(d DEFAULT 3, e DEFAULT 1, f DEFAULT 2,
        FOREIGN KEY(f, d) REFERENCES pp 
        ON UPDATE SET DEFAULT 
        ON DELETE SET NULL
    );
    INSERT INTO pp VALUES(1, 2, 3);
    INSERT INTO pp VALUES(4, 5, 6);
    INSERT INTO pp VALUES(7, 8, 9)
;INSERT INTO cc VALUES(6, 'A', 5);
    INSERT INTO cc VALUES(6, 'B', 5);
    INSERT INTO cc VALUES(9, 'A', 8);
    INSERT INTO cc VALUES(9, 'B', 8);
    UPDATE pp SET b = 1 WHERE a = 7;
    SELECT * FROM cc
;DELETE FROM pp WHERE a = 4;
    SELECT * FROM cc
;CREATE TABLE t3(x PRIMARY KEY REFERENCES t3 ON DELETE SET NULL);
  INSERT INTO t3(x) VALUES(12345);
  DROP TABLE t3
;CREATE TABLE t1(a INTEGER PRIMARY KEY, b, rowid, _rowid_, oid);
    CREATE TABLE t2(c, d, FOREIGN KEY(c) REFERENCES t1(a) ON UPDATE CASCADE);

    INSERT INTO t1 VALUES(10, 100, 'abc', 'def', 'ghi');
    INSERT INTO t2 VALUES(10, 100);
    UPDATE t1 SET a = 15;
    SELECT * FROM t2
;CREATE TABLE t1(a, b PRIMARY KEY);
    CREATE TABLE t2(
      x REFERENCES t1 ON UPDATE RESTRICT DEFERRABLE INITIALLY DEFERRED 
    );
    INSERT INTO t1 VALUES(1, 'one');
    INSERT INTO t1 VALUES(2, 'two');
    INSERT INTO t1 VALUES(3, 'three')
;BEGIN
;INSERT INTO t2 VALUES('two')
;UPDATE t1 SET b = 'four' WHERE b = 'one'
;DELETE FROM t1 WHERE b = 'two'
;INSERT INTO t1 VALUES(2, 'two');
    COMMIT
;CREATE TABLE t1(x COLLATE NOCASE PRIMARY KEY);
    CREATE TRIGGER tt1 AFTER DELETE ON t1 
      WHEN EXISTS ( SELECT 1 FROM t2 WHERE old.x = y )
    BEGIN
      INSERT INTO t1 VALUES(old.x);
    END;
    CREATE TABLE t2(y REFERENCES t1);
    INSERT INTO t1 VALUES('A');
    INSERT INTO t1 VALUES('B');
    INSERT INTO t2 VALUES('a');
    INSERT INTO t2 VALUES('b');

    SELECT * FROM t1;
    SELECT * FROM t2
;DELETE FROM t1
;SELECT * FROM t1;
    SELECT * FROM t2
;DROP TABLE t2;
    CREATE TABLE t2(y REFERENCES t1 ON DELETE RESTRICT);
    INSERT INTO t2 VALUES('a');
    INSERT INTO t2 VALUES('b')
;SELECT * FROM t1;
    SELECT * FROM t2
;CREATE TABLE up(
      c00, c01, c02, c03, c04, c05, c06, c07, c08, c09,
      c10, c11, c12, c13, c14, c15, c16, c17, c18, c19,
      c20, c21, c22, c23, c24, c25, c26, c27, c28, c29,
      c30, c31, c32, c33, c34, c35, c36, c37, c38, c39,
      PRIMARY KEY(c34, c35)
    );
    CREATE TABLE down(
      c00, c01, c02, c03, c04, c05, c06, c07, c08, c09,
      c10, c11, c12, c13, c14, c15, c16, c17, c18, c19,
      c20, c21, c22, c23, c24, c25, c26, c27, c28, c29,
      c30, c31, c32, c33, c34, c35, c36, c37, c38, c39,
      FOREIGN KEY(c39, c38) REFERENCES up ON UPDATE CASCADE
    )
;INSERT INTO up(c34, c35) VALUES('yes', 'no');
    INSERT INTO down(c39, c38) VALUES('yes', 'no');
    UPDATE up SET c34 = 'possibly';
    SELECT c38, c39 FROM down;
    DELETE FROM down
;INSERT INTO up(c34, c35) VALUES('yes', 'no');
    INSERT INTO down(c39, c38) VALUES('yes', 'no')
;DELETE FROM up WHERE c34 = 'possibly';
    SELECT c34, c35 FROM up;
    SELECT c39, c38 FROM down
;CREATE TABLE pp(a UNIQUE, b, c, PRIMARY KEY(b, c));
    CREATE TABLE cc(d, e, f UNIQUE, FOREIGN KEY(d, e) REFERENCES pp);
    INSERT INTO pp VALUES(1, 2, 3);
    INSERT INTO cc VALUES(2, 3, 1)
;SELECT * FROM pp;
      SELECT * FROM cc
;COMMIT;
      SELECT * FROM pp;
      SELECT * FROM cc
;REPLACE INTO pp(rowid, a, b, c) VALUES(1, 2, 2, 3);
    SELECT rowid, * FROM pp;
    SELECT * FROM cc
;REPLACE INTO pp(rowid, a, b, c) VALUES(2, 2, 2, 3);
    SELECT rowid, * FROM pp;
    SELECT * FROM cc
;CREATE TABLE t1(a PRIMARY KEY);
      CREATE TABLE t2(a, b)
;PRAGMA foreign_keys = off;
      ALTER TABLE t2 ADD COLUMN h DEFAULT 'text' REFERENCES t1;
      PRAGMA foreign_keys = on;
      SELECT sql FROM sqlite_master WHERE name='t2'
;SELECT sqlite_rename_parent(sub_zCreate, sub_zOld, sub_zNew)
;CREATE TABLE t1(a PRIMARY KEY, b REFERENCES t1);
      CREATE TABLE t2(a PRIMARY KEY, b REFERENCES t1, c REFERENCES t2);
      CREATE TABLE t3(a REFERENCES t1, b REFERENCES t2, c REFERENCES t1)
;SELECT sql FROM sqlite_master WHERE type = 'table'
;ALTER TABLE t1 RENAME TO t4
;SELECT sql FROM sqlite_master WHERE type = 'table'
;INSERT INTO t4 VALUES(1, NULL)
;INSERT INTO t3 VALUES(1, NULL, 1)
;CREATE TEMP TABLE t1(a PRIMARY KEY);
      CREATE TEMP TABLE t2(a, b)
;PRAGMA foreign_keys = off;
      ALTER TABLE t2 ADD COLUMN h DEFAULT 'text' REFERENCES t1;
      PRAGMA foreign_keys = on;
      SELECT sql FROM sqlite_temp_master WHERE name='t2'
;CREATE TEMP TABLE t1(a PRIMARY KEY, b REFERENCES t1);
      CREATE TEMP TABLE t2(a PRIMARY KEY, b REFERENCES t1, c REFERENCES t2);
      CREATE TEMP TABLE t3(a REFERENCES t1, b REFERENCES t2, c REFERENCES t1)
;SELECT sql FROM sqlite_temp_master WHERE type = 'table'
;ALTER TABLE t1 RENAME TO t4
;SELECT sql FROM sqlite_temp_master WHERE type = 'table'
;INSERT INTO t4 VALUES(1, NULL)
;INSERT INTO t3 VALUES(1, NULL, 1)
;ATTACH ':memory:' AS aux;
      CREATE TABLE aux.t1(a PRIMARY KEY);
      CREATE TABLE aux.t2(a, b)
;PRAGMA foreign_keys = off;
      ALTER TABLE t2 ADD COLUMN h DEFAULT 'text' REFERENCES t1;
      PRAGMA foreign_keys = on;
      SELECT sql FROM aux.sqlite_master WHERE name='t2'
;CREATE TABLE aux.t1(a PRIMARY KEY, b REFERENCES t1);
      CREATE TABLE aux.t2(a PRIMARY KEY, b REFERENCES t1, c REFERENCES t2);
      CREATE TABLE aux.t3(a REFERENCES t1, b REFERENCES t2, c REFERENCES t1)
;SELECT sql FROM aux.sqlite_master WHERE type = 'table'
;ALTER TABLE t1 RENAME TO t4;