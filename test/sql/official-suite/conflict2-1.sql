-- original: conflict2.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a, b, c, PRIMARY KEY(a,b)) WITHOUT rowid;
    CREATE TABLE t2(x);
    SELECT c FROM t1 ORDER BY c
;COMMIT
;SELECT c FROM t1
;SELECT x FROM t2
;DROP TABLE t1;
    DROP TABLE t2;
    CREATE TABLE t1(a INTEGER PRIMARY KEY, b, c, UNIQUE(a,b)) WITHOUT rowid;
    CREATE TABLE t2(x);
    SELECT c FROM t1 ORDER BY c
;COMMIT
;SELECT c FROM t1
;SELECT x FROM t2
;DROP TABLE t1;
    DROP TABLE t2;
    CREATE TABLE t1(a, b, c INTEGER, PRIMARY KEY(c), UNIQUE(a,b)) WITHOUT rowid;
    CREATE TABLE t2(x);
    SELECT c FROM t1 ORDER BY c
;COMMIT
;SELECT c FROM t1
;SELECT x FROM t2
;DROP TABLE t2;
    CREATE TABLE t2(x);
    SELECT x FROM t2
;COMMIT
;SELECT c FROM t1
;SELECT x FROM t2
;DROP TABLE t2;
    CREATE TABLE t2(x);
    SELECT x FROM t2
;COMMIT
;SELECT c FROM t1
;SELECT x FROM t2
;DROP TABLE t2;
    CREATE TABLE t2(a,b,c);
    INSERT INTO t2 VALUES(1,2,1);
    INSERT INTO t2 VALUES(2,3,2);
    INSERT INTO t2 VALUES(3,4,1);
    INSERT INTO t2 VALUES(4,5,4);
    SELECT c FROM t2 ORDER BY b;
    CREATE TABLE t3(x);
    INSERT INTO t3 VALUES(1)
;pragma temp_store=file
;COMMIT
;SELECT a FROM t1 ORDER BY b
;SELECT x FROM t3
;DROP TABLE t1;
    DROP TABLE t2;
    DROP TABLE t3;
    CREATE TABLE t1(a PRIMARY KEY, b) without rowid
;SELECT count(*), min(a), max(b) FROM t1
;PRAGMA count_changes=on;
    UPDATE OR IGNORE t1 SET a=1000
;SELECT b FROM t1 WHERE a=1000
;SELECT count(*) FROM t1
;PRAGMA count_changes=on;
    UPDATE OR REPLACE t1 SET a=1001
;SELECT count(*) FROM t1
;DELETE FROM t1;
    INSERT INTO t1 VALUES(1,2)
;INSERT OR IGNORE INTO t1 VALUES(2,3)
;INSERT OR IGNORE INTO t1 VALUES(2,4)
;INSERT OR REPLACE INTO t1 VALUES(2,4)
;INSERT OR IGNORE INTO t1 SELECT * FROM t1
;INSERT OR IGNORE INTO t1 SELECT a+2,b+2 FROM t1
;INSERT OR IGNORE INTO t1 SELECT a+3,b+3 FROM t1
;PRAGMA count_changes=0;
    CREATE TABLE t2(
      a INTEGER PRIMARY KEY ON CONFLICT IGNORE,
      b INTEGER UNIQUE ON CONFLICT FAIL,
      c INTEGER UNIQUE ON CONFLICT REPLACE,
      d INTEGER UNIQUE ON CONFLICT ABORT,
      e INTEGER UNIQUE ON CONFLICT ROLLBACK
    ) WITHOUT rowid;
    CREATE TABLE t3(x);
    INSERT INTO t3 VALUES(1);
    SELECT * FROM t3
;SELECT * FROM t2
;SELECT * FROM t2
;COMMIT
;SELECT * FROM t3
;COMMIT
;SELECT * FROM t3
;COMMIT
;SELECT * FROM t3
;COMMIT
;SELECT * FROM t3
;COMMIT
;SELECT * FROM t3
;COMMIT
;SELECT * FROM t3
;COMMIT
;SELECT * FROM t3
;SELECT * FROM t1
;SELECT * FROM t4
;-- Create a database object (pages 2, 3 of the file)
    BEGIN;
      CREATE TABLE abc(a PRIMARY KEY, b, c) WITHOUT rowid;
      INSERT INTO abc VALUES(1, 2, 3);
      INSERT INTO abc VALUES(4, 5, 6);
      INSERT INTO abc VALUES(7, 8, 9);
    COMMIT
;PRAGMA cache_size = 10
;BEGIN;
      -- Make sure the pager is in EXCLUSIVE state.
      CREATE TABLE def(d, e, f);
      INSERT INTO def VALUES
          ('xxxxxxxxxxxxxxx', 'yyyyyyyyyyyyyyyy', 'zzzzzzzzzzzzzzzz');
      INSERT INTO def SELECT * FROM def;
      INSERT INTO def SELECT * FROM def;
      INSERT INTO def SELECT * FROM def;
      INSERT INTO def SELECT * FROM def;
      INSERT INTO def SELECT * FROM def;
      INSERT INTO def SELECT * FROM def;
      INSERT INTO def SELECT * FROM def;
      DELETE FROM abc WHERE a = 4
;ROLLBACK;
    SELECT * FROM abc
;BEGIN;
      -- Make sure the pager is in EXCLUSIVE state.
      UPDATE abc SET a=a+1;
      CREATE TABLE def(d, e, f);
      INSERT INTO def VALUES
          ('xxxxxxxxxxxxxxx', 'yyyyyyyyyyyyyyyy', 'zzzzzzzzzzzzzzzz');
      INSERT INTO def SELECT * FROM def;
      INSERT INTO def SELECT * FROM def;
      INSERT INTO def SELECT * FROM def;
      INSERT INTO def SELECT * FROM def;
      INSERT INTO def SELECT * FROM def;
      INSERT INTO def SELECT * FROM def;
      INSERT INTO def SELECT * FROM def;
      DELETE FROM abc WHERE a = 4
;ROLLBACK;
    SELECT * FROM abc
;BEGIN;
      -- Make sure the pager is in EXCLUSIVE state.
      CREATE TABLE def(d, e, f);
      INSERT INTO def VALUES
          ('xxxxxxxxxxxxxxx', 'yyyyyyyyyyyyyyyy', 'zzzzzzzzzzzzzzzz');
      INSERT INTO def SELECT * FROM def;
      INSERT INTO def SELECT * FROM def;
      INSERT INTO def SELECT * FROM def;
      INSERT INTO def SELECT * FROM def;
      INSERT INTO def SELECT * FROM def;
      INSERT INTO def SELECT * FROM def;
      INSERT INTO def SELECT * FROM def;
      DELETE FROM abc WHERE a = 4
;COMMIT;
    SELECT * FROM abc
;CREATE TABLE t5(a INTEGER PRIMARY KEY, b text) WITHOUT rowid;
    INSERT INTO t5 VALUES(1,'one');
    INSERT INTO t5 VALUES(2,'two');
    SELECT * FROM t5
;UPDATE OR IGNORE t5 SET a=a+1 WHERE a=1;
    SELECT * FROM t5
;UPDATE OR REPLACE t5 SET a=a+1 WHERE a=1;
    SELECT * FROM t5
;CREATE TABLE t13(a PRIMARY KEY CHECK(a!=2)) WITHOUT rowid;
    BEGIN;
    REPLACE INTO t13 VALUES(1)
;REPLACE INTO t13 VALUES(3);
    COMMIT;
    SELECT * FROM t13
;DROP TABLE IF EXISTS t1;
  CREATE TABLE t1(
    x TEXT PRIMARY KEY NOT NULL, 
    y TEXT NOT NULL,
    z INTEGER
  );
  INSERT INTO t1 VALUES('alpha','beta',1);
  CREATE UNIQUE INDEX t1xy ON t1(x,y);
  REPLACE INTO t1(x,y,z) VALUES('alpha','gamma',1);
  PRAGMA integrity_check;
  SELECT x,y FROM t1 INDEXED BY t1xy;
  SELECT x,y,z FROM t1 NOT INDEXED
;DROP TABLE IF EXISTS t1;
  CREATE TABLE t1(
    x TEXT PRIMARY KEY NOT NULL, 
    y TEXT NOT NULL,
    z INTEGER
  ) WITHOUT ROWID;
  INSERT INTO t1 VALUES('alpha','beta',1);
  CREATE UNIQUE INDEX t1xy ON t1(x,y);
  REPLACE INTO t1(x,y,z) VALUES('alpha','gamma',1);
  PRAGMA integrity_check;
  SELECT x,y FROM t1 INDEXED BY t1xy;
  SELECT x,y,z FROM t1 NOT INDEXED;