-- original: malloc.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

BEGIN TRANSACTION;
    CREATE TABLE t1(a);
    INSERT INTO t1 VALUES(1);
    INSERT INTO t1 SELECT a*2 FROM t1;
    INSERT INTO t1 SELECT a*2 FROM t1;
    INSERT INTO t1 SELECT a*2 FROM t1;
    INSERT INTO t1 SELECT a*2 FROM t1;
    INSERT INTO t1 SELECT a*2 FROM t1;
    INSERT INTO t1 SELECT a*2 FROM t1;
    INSERT INTO t1 SELECT a*2 FROM t1;
    INSERT INTO t1 SELECT a*2 FROM t1;
    INSERT INTO t1 SELECT a*2 FROM t1;
    INSERT INTO t1 SELECT a*2 FROM t1;
    DELETE FROM t1 where rowid%5 = 0;
    COMMIT
;CREATE TABLE t1(a, b);
  INSERT INTO t1 VALUES(1, 2);
  INSERT INTO t1 VALUES(3, 4);
  INSERT INTO t1 VALUES(5, 6);
  INSERT INTO t1 VALUES(7, randstr(1200,1200))
;ATTACH 'test2.db' as test2;
  CREATE TABLE abc1(a, b, c);
  CREATE TABLE test2.abc2(a, b, c)
;CREATE TABLE abc(a, b, c)
;SELECT * FROM sqlite_master
;ATTACH 'test2.db' as aux
;PRAGMA journal_mode = DELETE;    /* For inmemory_journal permutation */
      PRAGMA synchronous = 0;
      CREATE TABLE t1(a, b);
      INSERT INTO t1 VALUES(1, 2);
      BEGIN;
      INSERT INTO t1 VALUES(3, 4)
;CREATE TABLE t1(a, b COLLATE string_compare);
      INSERT INTO t1 VALUES(10, 'string');
      INSERT INTO t1 VALUES(10, 'string2')
;SELECT * FROM sqlite_master
;PRAGMA encoding = "UTF16be";
    CREATE TABLE abc(a, b, c)
;CREATE TABLE t1(x)
;PRAGMA cache_size = 10;
      PRAGMA locking_mode = exclusive;
      BEGIN;
      CREATE TABLE abc(a, b, c);
      CREATE INDEX abc_i ON abc(a, b, c);
      INSERT INTO abc 
        VALUES(randstr(100,100), randstr(100,100), randstr(100,100));
      INSERT INTO abc 
        SELECT randstr(100,100), randstr(100,100), randstr(100,100) FROM abc;
      INSERT INTO abc 
        SELECT randstr(100,100), randstr(100,100), randstr(100,100) FROM abc;
      INSERT INTO abc 
        SELECT randstr(100,100), randstr(100,100), randstr(100,100) FROM abc;
      INSERT INTO abc 
        SELECT randstr(100,100), randstr(100,100), randstr(100,100) FROM abc;
      INSERT INTO abc 
        SELECT randstr(100,100), randstr(100,100), randstr(100,100) FROM abc;
      COMMIT
;UPDATE abc SET a = 0 WHERE oid%2
;ROLLBACK
;PRAGMA integrity_check
;CREATE TABLE t1(a, b, c)
;CREATE TABLE t1(a, b, c);
    CREATE VIEW v1 AS SELECT * FROM t1;
    CREATE TRIGGER v1t1 INSTEAD OF DELETE ON v1 BEGIN SELECT 1; END;
    CREATE TRIGGER v1t2 INSTEAD OF INSERT ON v1 BEGIN SELECT 1; END;
    CREATE TRIGGER v1t3 INSTEAD OF UPDATE ON v1 BEGIN SELECT 1; END
;CREATE TABLE abc(a, b, c);
  CREATE INDEX i1 ON abc(a, b);
  INSERT INTO abc VALUES(1, 2, 3);
  INSERT INTO abc VALUES(4, 5, 6)
;SELECT a FROM abc ORDER BY a
;UPDATE abc SET b = b - 1 WHERE a = sub_a
;BEGIN;
  CREATE TABLE t1(a, b);
  INSERT INTO t1 VALUES(1, randomblob(210));
  INSERT INTO t1 VALUES(1, randomblob(210));
  INSERT INTO t1 VALUES(1, randomblob(210));
  INSERT INTO t1 VALUES(1, randomblob(210));
  INSERT INTO t1 VALUES(1, randomblob(210));
  COMMIT
;INSERT INTO t1 VALUES(1, randomblob(210))
;CREATE TABLE t1(a, b);
  CREATE INDEX i1 ON t1(a);
  CREATE VIEW v1 AS SELECT * FROM t1 INDEXED BY i1 WHERE a = 10
;CREATE TABLE t1(a TEXT, b TEXT)
;CREATE TABLE t1(x PRIMARY KEY);
    INSERT INTO t1 VALUES(randstr(500,500));
    INSERT INTO t1 VALUES(randstr(500,500));
    INSERT INTO t1 VALUES(randstr(500,500))
;BEGIN;
      DELETE FROM t1;
    ROLLBACK
;PRAGMA journal_mode = persist;
  PRAGMA journal_size_limit = 1024;
  CREATE TABLE t1(a PRIMARY KEY, b)
;PRAGMA locking_mode = normal;
    BEGIN;
    CREATE TABLE t1(a PRIMARY KEY, b);
    INSERT INTO t1 VALUES(1, 'one');
    INSERT INTO t1 VALUES(2, 'two');
    INSERT INTO t1 VALUES(3, 'three');
    COMMIT;
    PRAGMA locking_mode = exclusive
;PRAGMA locking_mode = normal;
    SELECT b FROM t1
;UPDATE t1 SET a = a + 3
;PRAGMA locking_mode = normal;
    UPDATE t1 SET a = a + 3
;PRAGMA integrity_check
;PRAGMA cache_size = 10
;CREATE TABLE abc(a, b)
;INSERT INTO abc VALUES(randstr(100,100), randstr(1000,1000))
;PRAGMA cache_size = 10
;CREATE TABLE abc(a PRIMARY KEY, b)
;INSERT INTO abc VALUES(randstr(100,100), randstr(1000,1000))
;CREATE TABLE t1(a, b);
  INSERT INTO t1 VALUES(1, 2);
  INSERT INTO t1 VALUES(3, 4)
;PRAGMA locking_mode
;CREATE TABLE t1(a, b);
      INSERT INTO t1 VALUES(1, 2)
;INSERT INTO t1 VALUES(3, 4)
;CREATE TABLE t1(a);
  INSERT INTO t1 VALUES('fghij');
  INSERT INTO t1 VALUES('pqrst');
  INSERT INTO t1 VALUES('abcde');
  INSERT INTO t1 VALUES('uvwxy');
  INSERT INTO t1 VALUES('klmno')
;SELECT * FROM t1 ORDER BY 1 COLLATE utf16bin
;SELECT * FROM t1 ORDER BY 1 COLLATE utf16bin
;DROP TABLE IF EXISTS t1;
  CREATE TABLE t1(a COLLATE utf16bin);
  INSERT INTO t1 VALUES('fghij' || sub_big);
  INSERT INTO t1 VALUES('pqrst' || sub_big);
  INSERT INTO t1 VALUES('abcde' || sub_big);
  INSERT INTO t1 VALUES('uvwxy' || sub_big);
  INSERT INTO t1 VALUES('klmno' || sub_big);
  CREATE INDEX i1 ON t1(a)
;SELECT * FROM t1 WHERE a = ('abcde' || sub_big)
;CREATE TABLE t1(x INTEGER PRIMARY KEY, y, z);
  CREATE TABLE t2(a, b);
  CREATE VIEW a002 AS SELECT *, sum(b) AS m FROM t2 GROUP BY a
;SELECT * FROM sqlite_master
;SELECT t1.z, a002.m
    FROM t1 JOIN a002 ON t1.y=a002.m
    WHERE t1.x IN (1,2,3);