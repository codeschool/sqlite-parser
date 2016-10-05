-- original: tkt2285.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA locking_mode = EXCLUSIVE
;BEGIN;
    CREATE TABLE abc(a, b, c);
    ROLLBACK
;SELECT * FROM sqlite_master
;BEGIN;
      CREATE TEMP TABLE abc(a, b, c);
      ROLLBACK
;SELECT * FROM sqlite_temp_master;