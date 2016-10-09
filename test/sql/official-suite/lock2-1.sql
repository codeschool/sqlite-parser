-- original: lock2.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

select * from sqlite_master
;pragma lock_status
;BEGIN;
    CREATE TABLE abc(a, b, c)
;BEGIN;
      SELECT * FROM sqlite_master
;CREATE TABLE def(d, e, f)
;SELECT * FROM sqlite_master;
      COMMIT
;BEGIN;
      SELECT * FROM sqlite_master
;SELECT * FROM sqlite_master
;SELECT * FROM sqlite_master;