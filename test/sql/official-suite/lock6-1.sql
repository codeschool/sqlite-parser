-- original: lock6.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA lock_proxy_file=":auto:";
        select * from sqlite_master;
        PRAGMA lock_proxy_file
;pragma lock_status
;PRAGMA lock_proxy_file=":auto:";
      PRAGMA lock_proxy_file
;PRAGMA lock_proxy_file
;BEGIN;
        SELECT * FROM sqlite_master
;PRAGMA lock_proxy_file="mine";
      select * from sqlite_master;