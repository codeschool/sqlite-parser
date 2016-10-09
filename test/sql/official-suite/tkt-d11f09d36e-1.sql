-- original: tkt-d11f09d36e.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA synchronous = NORMAL;
    PRAGMA cache_size = 10;
    CREATE TABLE t1(x, y, UNIQUE(x, y));
    BEGIN
;INSERT INTO t1 VALUES(sub_i, sub_i)
;BEGIN;
      UPDATE t1 set x = x+10000;
    ROLLBACK
;PRAGMA integrity_check
;SAVEPOINT tr;
      UPDATE t1 set x = x+10000;
    ROLLBACK TO tr;
    RELEASE tr
;PRAGMA integrity_check;