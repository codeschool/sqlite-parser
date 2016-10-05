-- original: incrvacuum_ioerr.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA auto_vacuum = 'incremental';
  CREATE TABLE abc(a);
  INSERT INTO abc VALUES(randstr(1500,1500))
;PRAGMA auto_vacuum = 'full';
    PRAGMA cache_size = 10;
    BEGIN;
    CREATE TABLE abc(a, UNIQUE(a))
;INSERT INTO abc VALUES(randstr(1500,1500))
;PRAGMA auto_vacuum = 'incremental';
    BEGIN;
    CREATE TABLE a(i integer, b blob);
    INSERT INTO a VALUES(1, randstr(1500,1500));
    INSERT INTO a VALUES(2, randstr(1500,1500))
;DELETE FROM a WHERE oid
;PRAGMA page_size = 1024;
      PRAGMA locking_mode = exclusive;
      PRAGMA auto_vacuum = 'incremental';
      BEGIN;
      CREATE TABLE a(i integer, b blob)
;INSERT INTO a VALUES(sub_ii, randstr(800,1500))
;DELETE FROM a WHERE oid
;pragma page_count
;pragma page_count;