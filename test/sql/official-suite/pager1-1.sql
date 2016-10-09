-- original: pager1.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT rowid, * FROM sub_table WHERE rowid = (sub_id-1)
;CREATE TABLE t1(a PRIMARY KEY, b);
      CREATE INDEX i1 ON t1(b);
      INSERT INTO t1 VALUES(1, 'one'); INSERT INTO t1 VALUES(2, 'two')
;SELECT * FROM t1
;SELECT * FROM t1
;BEGIN;
        INSERT INTO t1 VALUES(3, 'three')
;SELECT * FROM t1
;SELECT * FROM t1
;COMMIT
;SELECT * FROM t1
;SELECT * FROM t1
;SELECT * FROM t1
;ROLLBACK
;BEGIN; SELECT * FROM t1
;SELECT * FROM t1
;BEGIN;  
      UPDATE t1 SET a = a + 10
;PRAGMA lock_status
;PRAGMA lock_status
;SELECT * FROM t1
;SELECT * FROM t1
;SELECT * FROM t1
;PRAGMA lock_status
;SELECT * FROM t1
;SELECT * FROM t1
;COMMIT
;UPDATE t1 SET a = a+10
;COMMIT
;SELECT * FROM t1
;SELECT * FROM t1
;SELECT * FROM t1
;BEGIN ; INSERT INTO t1 VALUES('x', 'y')
;BEGIN ; SELECT * FROM t1
;CREATE TABLE t1(a PRIMARY KEY, b);
    CREATE TABLE counter(
      i CHECK (i<5), 
      u CHECK (u<10)
    );
    INSERT INTO counter VALUES(0, 0);
    CREATE TRIGGER tr1 AFTER INSERT ON t1 BEGIN
      UPDATE counter SET i = i+1;
    END;
    CREATE TRIGGER tr2 AFTER UPDATE ON t1 BEGIN
      UPDATE counter SET u = u+1;
    END
;SELECT * FROM counter
;PRAGMA cache_size = 10;
  BEGIN;
    INSERT INTO t1 VALUES(1, randomblob(1500));
    INSERT INTO t1 VALUES(2, randomblob(1500));
    INSERT INTO t1 VALUES(3, randomblob(1500));
    SELECT * FROM counter
;SELECT * FROM counter
;SELECT a FROM t1
;COMMIT
;PRAGMA auto_vacuum = 2;
      PRAGMA cache_size = 10;
      CREATE TABLE z(x INTEGER PRIMARY KEY, y);
      BEGIN;
        INSERT INTO z VALUES(NULL, a_string(800));
        INSERT INTO z SELECT NULL, a_string(800) FROM z;     --   2
        INSERT INTO z SELECT NULL, a_string(800) FROM z;     --   4
        INSERT INTO z SELECT NULL, a_string(800) FROM z;     --   8
        INSERT INTO z SELECT NULL, a_string(800) FROM z;     --  16
        INSERT INTO z SELECT NULL, a_string(800) FROM z;     --  32
        INSERT INTO z SELECT NULL, a_string(800) FROM z;     --  64
        INSERT INTO z SELECT NULL, a_string(800) FROM z;     -- 128
        INSERT INTO z SELECT NULL, a_string(800) FROM z;     -- 256
      COMMIT
;PRAGMA auto_vacuum
;CREATE TABLE x(y, z);
    INSERT INTO x VALUES(1, 2)
;SELECT * FROM x
;ATTACH 'test.db2' AS aux;
    PRAGMA journal_mode = DELETE;
    PRAGMA main.cache_size = 10;
    PRAGMA aux.cache_size = 10;
    CREATE TABLE t1(a UNIQUE, b UNIQUE);
    CREATE TABLE aux.t2(a UNIQUE, b UNIQUE);
    INSERT INTO t1 VALUES(a_string(200), a_string(300));
    INSERT INTO t1 SELECT a_string(200), a_string(300) FROM t1;
    INSERT INTO t1 SELECT a_string(200), a_string(300) FROM t1;
    INSERT INTO t2 SELECT * FROM t1;
    BEGIN;
      INSERT INTO t1 SELECT a_string(201), a_string(301) FROM t1;
      INSERT INTO t1 SELECT a_string(202), a_string(302) FROM t1;
      INSERT INTO t1 SELECT a_string(203), a_string(303) FROM t1;
      INSERT INTO t1 SELECT a_string(204), a_string(304) FROM t1;
      REPLACE INTO t2 SELECT * FROM t1;
    COMMIT
;SELECT count(*) FROM t1;
    PRAGMA integrity_check
;SELECT count(*) FROM t1;
    PRAGMA integrity_check
;SELECT count(*) FROM t1;
    PRAGMA integrity_check
;SELECT count(*) FROM t1;
    PRAGMA integrity_check
;PRAGMA journal_mode = DELETE;
    CREATE TABLE t1(a, b);
    INSERT INTO t1 VALUES(1, 2);
    INSERT INTO t1 VALUES(3, 4)
;SELECT * FROM t1
;BEGIN;
          INSERT INTO a SELECT * FROM b WHERE rowid<=3;
          INSERT INTO b SELECT * FROM a WHERE rowid<=3;
        COMMIT
;ATTACH 'sub_prefix2' AS aux
;ATTACH 'sub_prefix2' AS aux
;PRAGMA journal_mode = DELETE;
  PRAGMA page_size = 1024;
  CREATE TABLE t1(a, b);
  CREATE TABLE t2(a, b);
  INSERT INTO t1 VALUES('I', 'II');
  INSERT INTO t2 VALUES('III', 'IV');
  BEGIN;
    INSERT INTO t1 VALUES(1, 2);
    INSERT INTO t2 VALUES(3, 4);
  COMMIT
;SELECT * FROM t1;
  SELECT * FROM t2
;SELECT * FROM t1;
  SELECT * FROM t2
;SELECT * FROM t1;
  SELECT * FROM t2
;SELECT * FROM t1;
  SELECT * FROM t2
;PRAGMA journal_mode = DELETE;
    ATTACH 'test.db2' AS two;
    CREATE TABLE t1(a, b);
    CREATE TABLE two.t2(a, b);
    INSERT INTO t1 VALUES(1, 't1.1');
    INSERT INTO t2 VALUES(1, 't2.1');
    BEGIN;
      UPDATE t1 SET b = 't1.2';
      UPDATE t2 SET b = 't2.2';
    COMMIT
;SELECT * FROM t1
;ATTACH 'test.db2' AS two;
  SELECT * FROM t2
;PRAGMA journal_mode = DELETE;
    ATTACH 'test.db3' AS three;
    CREATE TABLE three.t3(a, b);
    INSERT INTO t3 VALUES(1, 't3.1');
    BEGIN;
      UPDATE t2 SET b = 't2.3';
      UPDATE t3 SET b = 't3.3';
    COMMIT
;SELECT * FROM t1
;ATTACH 'test.db2' AS two;
  SELECT * FROM t2
;ATTACH 'test.db3' AS three;
  SELECT * FROM t3
;PRAGMA journal_mode = DELETE;
  CREATE TABLE t1(x PRIMARY KEY, y);
  CREATE INDEX i1 ON t1(y);
  INSERT INTO t1 VALUES('I',   'one');
  INSERT INTO t1 VALUES('II',  'four');
  INSERT INTO t1 VALUES('III', 'nine');
  BEGIN;
    INSERT INTO t1 VALUES('IV', 'sixteen');
    INSERT INTO t1 VALUES('V' , 'twentyfive');
  COMMIT
;SELECT * FROM t1
;SELECT * FROM t1
;ATTACH 'test.db2' AS aux;
    CREATE TABLE t1(a, b);
    CREATE TABLE aux.t2(a, b);
    INSERT INTO t1 VALUES(17, 'Lenin');
    INSERT INTO t1 VALUES(22, 'Stalin');
    INSERT INTO t1 VALUES(53, 'Khrushchev')
;BEGIN;
      INSERT INTO t1 VALUES(64, 'Brezhnev');
      INSERT INTO t2 SELECT * FROM t1
;BEGIN;
      SELECT * FROM t2
;SELECT * FROM t2
;PRAGMA journal_mode = memory;
    BEGIN;
      INSERT INTO t1 VALUES(84, 'Andropov');
      INSERT INTO t2 VALUES(84, 'Andropov');
    COMMIT
;PRAGMA journal_mode = off;
    BEGIN;
      INSERT INTO t1 VALUES(85, 'Gorbachev');
      INSERT INTO t2 VALUES(85, 'Gorbachev');
    COMMIT
;ATTACH 'test.db2' AS aux
;PRAGMA journal_mode = DELETE;
    PRAGMA synchronous = NORMAL;
    BEGIN;
      INSERT INTO t1 VALUES(85, 'Gorbachev');
      INSERT INTO t2 VALUES(85, 'Gorbachev');
    COMMIT
;PRAGMA synchronous = full;
    BEGIN;
      DELETE FROM t1 WHERE b = 'Lenin';
      DELETE FROM t2 WHERE b = 'Lenin';
    COMMIT
;ATTACH 'test.db2' AS aux;
    PRAGMA journal_mode = PERSIST;
    CREATE TABLE t3(a, b);
    INSERT INTO t3 SELECT randomblob(1500), randomblob(1500) FROM t1;
    UPDATE t3 SET b = randomblob(1500)
;PRAGMA synchronous = full;
    BEGIN;
      DELETE FROM t1 WHERE b = 'Stalin';
      DELETE FROM t2 WHERE b = 'Stalin';
    COMMIT
;PRAGMA auto_vacuum = none;
    PRAGMA max_page_count = 10;
    CREATE TABLE t2(a, b);
    CREATE TABLE t3(a, b);
    CREATE TABLE t4(a, b);
    CREATE TABLE t5(a, b);
    CREATE TABLE t6(a, b);
    CREATE TABLE t7(a, b);
    CREATE TABLE t8(a, b);
    CREATE TABLE t9(a, b);
    CREATE TABLE t10(a, b)
;PRAGMA max_page_count
;PRAGMA max_page_count = 15
;CREATE TABLE t11(a, b)
;BEGIN;
    INSERT INTO t11 VALUES(1, 2);
    PRAGMA max_page_count = 13
;INSERT INTO t11 VALUES(3, 4);
    PRAGMA max_page_count = 10
;COMMIT
;PRAGMA max_page_count = 10
;SELECT * FROM t11
;PRAGMA max_page_count
;PRAGMA locking_mode = EXCLUSIVE;
    CREATE TABLE t1(a, b);
    BEGIN;
      PRAGMA journal_mode = delete;
      PRAGMA journal_mode = truncate
;INSERT INTO t1 VALUES(1, 2)
;PRAGMA journal_mode = persist
;COMMIT
;PRAGMA journal_mode = persist;
    PRAGMA journal_size_limit
;PRAGMA auto_vacuum = 1;
      CREATE TABLE x1(x);
      INSERT INTO x1 VALUES('Charles');
      INSERT INTO x1 VALUES('James');
      INSERT INTO x1 VALUES('Mary');
      SELECT * FROM x1
;PRAGMA cache_size = 10;
    BEGIN;
      CREATE TABLE ab(a, b, UNIQUE(a, b));
      INSERT INTO ab VALUES( a_string(200), a_string(300) );
      INSERT INTO ab SELECT a_string(200), a_string(300) FROM ab;
      INSERT INTO ab SELECT a_string(200), a_string(300) FROM ab;
      INSERT INTO ab SELECT a_string(200), a_string(300) FROM ab;
      INSERT INTO ab SELECT a_string(200), a_string(300) FROM ab;
      INSERT INTO ab SELECT a_string(200), a_string(300) FROM ab;
      INSERT INTO ab SELECT a_string(200), a_string(300) FROM ab;
      INSERT INTO ab SELECT a_string(200), a_string(300) FROM ab;
    COMMIT
;PRAGMA cache_size = 10
;UPDATE ab SET a = a_string(201)
;UPDATE ab SET b = a_string(301)
;SELECT count(*) FROM ab
;UPDATE ab SET a = a_string(202)
;BEGIN;
      UPDATE ab SET b = a_string(301);
    ROLLBACK;